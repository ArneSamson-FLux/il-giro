import React from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

export default function Sink({position, materialUrl, bevelled, props}){    

    const albedoTexture = useTexture(materialUrl+"albedo.jpg");
    const normalTexture = useTexture(materialUrl+"normal.jpg");
    const roughnessTexture = useTexture(materialUrl+"roughness.jpg");

    albedoTexture.colorSpace = THREE.SRGBColorSpace;
    normalTexture.colorSpace = THREE.SRGBColorSpace;
    roughnessTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture
    });

    const { nodes, materials } = useGLTF("./models/kitchen-low.glb");

    return <>
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.top.geometry}
                material={material}
                position={[0, 1.193, 0]}
                rotation={[0, -1.484, 0]}
                scale={[1, 1.1, 1]}
            >
                <mesh
                    visible={bevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes["bevelled-under"].geometry}
                    material={material}
                />
                <mesh
                    visible={!bevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes["straight-under"].geometry}
                    material={material}
                />
            </mesh>
         </group>
    </>
}

useGLTF.preload('./models/kitchen-low.glb')