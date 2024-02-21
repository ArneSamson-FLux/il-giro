import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

export default function Tap1({materialUrl, bevelled, props}){

    const albedoTexture = useTexture(materialUrl+"albedo.jpg");
    const normalTexture = useTexture(materialUrl+"normal.jpg");
    const roughnessTexture = useTexture(materialUrl+"roughness.jpg");

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture
    });
    
    const { nodes, materials } = useGLTF("/models/tap2.glb");
    return (
      <group {...props} dispose={null}>
        <group position={[0, 0.973, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["tap2-Quooker_1"].geometry}
            material={material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["tap2-Quooker_2"].geometry}
            material={material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["tap2-Quooker_3"].geometry}
            material={materials["iMeshh Red Plastic"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["tap2-Quooker_4"].geometry}
            material={materials["iMeshh Plastic"]}
          />
          <mesh
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