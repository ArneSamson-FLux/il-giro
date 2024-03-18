import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

export default function Tap1({materialUrl, bevelled, props}){

    const albedoTexture = useTexture(materialUrl+"albedo.jpg");
    const metallnesTexture = useTexture(materialUrl+"metallic.jpg");

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,

        metalnessMap: metallnesTexture,
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