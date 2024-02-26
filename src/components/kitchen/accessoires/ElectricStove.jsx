import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

export default function ElectricStove({props}) {
    const { nodes, materials } = useGLTF("./models/electric-stove.glb");
    return (
        <group {...props} dispose={null}>
            <group position={[0, 0, -0.051]} scale={0.898}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["electric-stovetop_1"].geometry}
                    material={materials["FrontColor.001"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["electric-stovetop_2"].geometry}
                    material={materials["plastico.001"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["electric-stovetop_3"].geometry}
                    material={materials["parrilla.001"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["electric-stovetop_4"].geometry}
                    material={materials["vidrio.001"]}
                />
            </group>
        </group>
    );
}
  
useGLTF.preload("./models/electric-stove.glb");
  