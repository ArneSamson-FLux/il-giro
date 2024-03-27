import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three'
import { useGLTF, useCursor } from '@react-three/drei'

import { useTexture } from '../../helper/useTexture.tsx';

import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfigStore.jsx';
import useUIStore from '../../store/useUIStore.jsx';

export default function BaseIsland({ props }) {

    const {
        mainMaterial,

        allBevelled,
    } = useConfig();


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


    return <>

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

    </>
}

useGLTF.preload('./models/base-island.glb')