import React, { useRef } from 'react';
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { useTexture } from '../../../helper/useTexture.tsx';

export default function Tap1({materialUrl, bevelled, props}){

    const [albedoTexture,  metallnessTexture] = useTexture([
        materialUrl+"albedo.jpg",
        materialUrl+"metallic.jpg"
    ]);

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        metalnessMap: metallnessTexture,
        metalness: 1,
        roughness: 0

    });
    
    const { nodes, materials } = useGLTF("/models/tap2.glb");
    return (

        <group 
            name="tap2-group-container"
            {...props} 
            dispose={null}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Bridge.geometry}
                material={material}
            />
        </group>
    );
}

useGLTF.preload('/models/tap2.glb')