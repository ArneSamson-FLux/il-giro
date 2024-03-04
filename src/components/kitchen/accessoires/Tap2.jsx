import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

export default function Tap1({materialUrl, bevelled, props}){

    const albedoTexture = useTexture(materialUrl+"albedo.jpg");
    const normalTexture = useTexture(materialUrl+"normal.jpg");
    const roughnessTexture = useTexture(materialUrl+"roughness.jpg");
    const metallnesTexture = useTexture(materialUrl+"metallic.jpg");

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        // normalMap: normalTexture,
        // roughnessMap: roughnessTexture,
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
            <group 
                name="tap2-group"
                position={[0, 0.973, 0]}
            >
                <mesh
                    name='tap2-mesh-1'
                    castShadow
                    receiveShadow
                    geometry={nodes["tap2-Quooker_1"].geometry}
                    material={material}
                />
                <mesh
                    name='tap2-mesh-2'
                    castShadow
                    receiveShadow
                    geometry={nodes["tap2-Quooker_2"].geometry}
                    material={material}
                />
                <mesh
                    name='tap2-mesh-3'
                    castShadow
                    receiveShadow
                    geometry={nodes["tap2-Quooker_3"].geometry}
                    material={materials["iMeshh Red Plastic"]}
                />
                <mesh
                    name='tap2-mesh-4'
                    castShadow
                    receiveShadow
                    geometry={nodes["tap2-Quooker_4"].geometry}
                    material={materials["iMeshh Plastic"]}
                />
                <mesh
                    name='tap2-mesh-5'
                    castShadow
                    receiveShadow
                    geometry={nodes["tap2-Quooker_5"].geometry}
                    material={material}
                />
            </group>
        </group>
    );
}

useGLTF.preload('/models/tap2.glb')