import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

export default function Oven({props}){
    const { nodes, materials } = useGLTF("./models/oven.glb");
    return (
        <group
            name="oven-group-container" 
            {...props}
            dispose={null}
        >
            <group 
                name="oven-group"
                position={[0.006, 0.378, 0.188]} 
                scale={[0.223, 0.271, 0.255]}
            >
                <mesh
                    name="oven-body-mesh"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube007.geometry}
                    material={materials["frigo rim"]}
                />
                <mesh
                    name="oven-glass-mesh"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube007_1.geometry}
                    material={materials["frigo glass"]}
                />
            </group>
        </group>
  );
}

useGLTF.preload('./models/oven.glb')