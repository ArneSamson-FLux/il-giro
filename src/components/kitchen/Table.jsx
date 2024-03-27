import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three'
import { useGLTF, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three';
import { useDrag } from "@use-gesture/react";

import Tap1 from './accessoires/Tap1.jsx';
import Tap2 from './accessoires/Tap2.jsx';

import Reginox from './accessoires/ReginoxBowl.jsx';

import { useTexture } from '../../helper/useTexture.tsx';

import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfigStore.jsx';
import useUIStore from '../../store/useUIStore.jsx';

export default function Table({ props }) {

    const {
        mainMaterial,
        tableTopMaterial,

        tablePosition,

        allBevelled,
    } = useConfig();

    const {
        isFocussedOnIsland
    } = useScene();

    const { setCurrentPage } = useUIStore();


    const [albedoTexture, normalTexture, roughnessTexture, metallnessTexture] = useTexture([
        mainMaterial + "albedo.jpg",
        mainMaterial + "normal.jpg",
        mainMaterial + "roughness.jpg",
        mainMaterial + "metallic.jpg"
    ]);

    albedoTexture.anisotropy = 16;

    metallnessTexture.name = "metalnessMap";

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnessTexture,
        metalness: 1,
        roughness: 1,
    });

    const { nodes, materials } = useGLTF("./models/base-island.glb");


    const meshRef = useRef();

    useEffect(() => {

        if (meshRef.current) {
            const geometry = meshRef.current.geometry;

            const uvAttributeName = allBevelled ? "uv1" : "uv2";
            const uvAttribute = geometry.getAttribute(uvAttributeName);

            if (uvAttribute) {
                const uvBufferAttribute = new THREE.BufferAttribute(uvAttribute.array, uvAttribute.itemSize);

                geometry.setAttribute('uv', uvBufferAttribute);
            }
        }
    }, [nodes, allBevelled]);

    const { cameraFocus, setCameraFocus, setIsFocussedOnIsland } = useScene();

    const [needPointer, setNeedPointer] = useState(false);

    useCursor(needPointer, "pointer")

    const tableRef = useRef();


    const handleClick = () => {
        setCurrentPage(2);
        setCameraFocus([sinkPosition[0], sinkPosition[1] + 1, sinkPosition[2]]);
        setIsFocussedOnIsland(true, false, false);
    }

    const handlePointerOver = () => {
        setNeedPointer(true);
    }

    const handlePointerOut = () => {
        setNeedPointer(false);
    }

    const handlePointerMissed = () => {
        setIsFocussedOnIsland(false, false, false);
    }


    return <>

        <a.group
            name='sink-group'
            ref={tableRef}
            position={tablePosition}
            dispose={null}
        >
            <group
                name='sink-hovers-group'
                onPointerOver={
                    (e) => {
                        handlePointerOver();
                        e.stopPropagation();
                    }
                }
                onPointerOut={
                    (e) => {
                        handlePointerOut();
                        e.stopPropagation();
                    }
                }
                onClick={
                    (e) => {
                        handleClick();
                        e.stopPropagation();
                    }
                }
                onPointerMissed={
                    (e) => {
                        setIsFocussedOnIsland(false, false, false);
                        e.stopPropagation();
                    }

                }
            >
                <mesh
                    ref={meshRef}
                    castShadow
                    receiveShadow
                    geometry={nodes['island-low'].geometry}
                    material={material}
                >
                    <mesh
                        visible={allBevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes.bevel.geometry}
                        material={material}
                    />
                    <mesh
                        visible={!allBevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes.straight.geometry}
                        material={material}
                    />
                </mesh>

            </group>
        </a.group>

    </>
}

useGLTF.preload('./models/base-island.glb')