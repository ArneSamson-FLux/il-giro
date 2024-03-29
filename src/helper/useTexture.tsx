import { Cache, Texture } from "three";
import {
    CACHE_PREFIX,
    CloneId,
    CustomTextureLoader,
    FetchCache,
} from "./CustomTextureLoader";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { generateUUID } from "three/src/math/MathUtils.js";

const loader = new CustomTextureLoader();

type UseTextureReturn<Url> = Url extends string[] ? Texture[] : Texture;
type OnLoadFunction<Url> = (
    texture: UseTextureReturn<Url>
) => UseTextureReturn<Url> | void;

export function useTexture<Url extends string[] | string>(
    path: Url,
    onLoad?:
        | OnLoadFunction<Url>
        | { onLoad?: OnLoadFunction<Url>; clone?: boolean; customId?: CloneId },
    loadingCallback?: (isLoading: boolean) => void
): UseTextureReturn<Url> {
    const paths: string[] = Array.isArray(path) ? path : [path];
    const [textures, setTextures] = useState(
        Array(paths.length).fill(undefined)
    );
    const texturesExist = Boolean(textures[0]);
    const texturesResult = texturesExist
        ? textures
        : suspend(getTextures, paths);

    // Id used to cache clones individually incase clone is set to true
    const id: CloneId = useMemo(() => {
        if (typeof onLoad === "function" || !onLoad?.clone) return undefined;
        if (onLoad?.customId) return onLoad.customId;

        return generateUUID();
    }, []);

    useEffect(() => {
        const handleSetTextures = (textures: Texture[], urls: string[]) => {
            setTextures((prev) => {
                const newTextures: Texture[] = [...prev];
                for (let i = 0; i < textures.length; i++) {
                    const texture = textures[i];
                    const index = paths.findIndex((p) => urls[i] === p);
                    newTextures.splice(index, 0, texture);
                }
                return newTextures;
            });
            loadingCallback?.(false);
        };

        const loadTextures = async (texturePaths: string[]) => {
            try {
                const notCached: string[] = [];

                const results = texturePaths.map((p, index) => {
                    const cache = Cache.get(CACHE_PREFIX + p);
                    const fetching: FetchCache = Cache.get(`fetching-${p}`);

                    if (cache && fetching === "fulfilled") {
                        if (id) {
                            const clonePath = CACHE_PREFIX + p + `/?id=${id}`;
                            const cachedClone = Cache.get(clonePath);
                            if (cachedClone) return cachedClone;
                        } else {
                            return cache;
                        }
                    }
                    notCached.push(p);
                    return textures[index];
                });
                setTextures(results);

                if (notCached.length) {
                    getTextures(
                        notCached,
                        loadingCallback,
                        (textures) => handleSetTextures(textures, notCached),
                        id
                    );
                }
            } catch (error) {
                console.error(error);
            }
        };

        loadTextures(paths);

        return () => {
            loader.abort();
        };
    }, [JSON.stringify(paths)]);

    const result = Array.isArray(path) ? texturesResult : texturesResult[0];

    useLayoutEffect(() => {
        if (typeof onLoad === "function") {
            return void onLoad?.(result);
        }
        onLoad?.onLoad?.(result);
    }, [onLoad, id]);

    return result;
}

// Preload textures and add them to cache
useTexture.preload = function <T extends string | string[]>(path: T) {
    const paths: string[] = Array.isArray(path) ? path : [path];
    return void suspend(getTextures, paths);
};

// Clear textures from cache
useTexture.clear = function <T extends string | string[]>(
    path?: T | undefined
) {
    if (!path && Cache.files) {
        Object.keys(Cache.files).forEach((key) => {
            if (key.includes(CACHE_PREFIX)) {
                Cache.remove(key);
            }
        });
    }

    const paths = Array.isArray(path) ? path : [path];
    paths.forEach((path) => {
        Cache.remove(CACHE_PREFIX + path);
    });
};

// based on suspend-react, modified to work with Three Cache -> https://github.com/pmndrs/suspend-react
const suspend = <Keys extends string[]>(
    fn: typeof getTextures,
    paths: Keys,
    id?: CloneId
): Texture[] => {
    const uncachedPaths = paths.filter((key) => !Cache.get(CACHE_PREFIX + key));

    if (!uncachedPaths.length) {
        const result = paths.map((key) => {
            const cache = Cache.get(CACHE_PREFIX + key);
            return cache;
        });

        return result;
    }

    const promise = fn(paths, undefined, undefined, id);
    throw promise;
    return undefined as unknown as UseTextureReturn<Keys>; // Dont see a way to type this correctly
};

const getTextures = async (
    texturePaths: string[],
    loadingCallback?: (loading: boolean) => void,
    resultCallback?: (textures: Texture[]) => void,
    id?: CloneId
) => {
    if (!loader.controller || loader.controller.signal.aborted) {
        const controller = new AbortController();
        loader.setController(controller);
    }

    const textures = Array(texturePaths.length);

    try {
        for (let i = 0; i < texturePaths.length; i++) {
            const path = texturePaths[i];

            await loader
                .loadPath(path, () => loadingCallback?.(true), id)
                .then((texture: Texture) => {
                    textures[i] = texture;
                });
        }

        resultCallback?.(textures);

        return textures;
    } catch (error) {
        throw new Error();
    }
};
