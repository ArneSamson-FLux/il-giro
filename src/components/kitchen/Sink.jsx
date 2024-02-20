import React from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

export default function Sink({position, materialUrl, props}){    

    const albedoTexture = useTexture(materialUrl+"albedo.jpg");
    const normalTexture = useTexture(materialUrl+"normal.jpg");
    const roughnessTexture = useTexture(materialUrl+"roughness.jpg");

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture
    });

    const { nodes, materials } = useGLTF("./models/geo-low.glb");

    return <>
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder005.geometry}
                material={material}
                position={[0, 0.7, 0]}
                rotation={[0, -1.484, 0]}
                scale={[1, 1.1, 1]}
            >
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.bevel006.geometry}
                material={material}
                position={[0, -1.036, 0]}
                scale={[1, 0.068, 1]}
                />
            </mesh>
        </group>
    </>
}

useGLTF.preload('./models/geo-low.glb')