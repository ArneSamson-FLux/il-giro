import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

export default function Tap1({materialUrl, props}){

    const albedoTexture = useTexture(materialUrl+"albedo.jpg");
    const metallnesTexture = useTexture(materialUrl+"metallic.jpg");

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        metalnessMap: metallnesTexture,
        metalness: 1,
        roughness: 0
    });
    
    const { nodes, materials } = useGLTF("/models/tap1.glb");
    
    return (
        <group 
            name="tap1-group"
            {...props} 
            dispose={null}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['3DGeom~3771_(C-3DGeom~3771_Defintion#3)'].geometry}
                material={material}
                position={[-0.029, 0.874, -0.026]}
                scale={1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['3DGeom~5954_(C-3DGeom~5954_Defintion#4)'].geometry}
                material={material}
                position={[-0.029, 0.874, -0.026]}
                scale={1}
            />
        </group>
    );
}

useGLTF.preload('/models/tap1.glb')