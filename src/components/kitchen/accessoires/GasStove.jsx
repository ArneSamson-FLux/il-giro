import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

export default function GasStove({props}){
    const { nodes, materials } = useGLTF("./models/gas-stove.glb");
    
    return (
        <group 
            name='gas-stove-group'
            {...props} 
            dispose={null}
        >
            <mesh
                name='stove-knobs-mesh'
                castShadow
                receiveShadow
                geometry={nodes.SWITCHES.geometry}
                material={materials["black_metal.003"]}
                position={[0.122, 0.021, 0.167]}
                scale={0.012}
            />

            <group
                name='pit-1-group'
                position={[0.184, 0.013, -0.055]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={0.013}
            >
                <mesh
                    name='pit-1-mesh-1'
                    castShadow
                    receiveShadow
                    geometry={nodes.chrome_chrome1_0010.geometry}
                    material={materials["Rough Iron Steel"]}
                />
                <mesh
                    name='pit-1-mesh-2'
                    castShadow
                    receiveShadow
                    geometry={nodes.chrome_chrome1_0010_1.geometry}
                    material={materials.lambert7}
                />
                <mesh
                    name='pit-1-mesh-3'
                    castShadow
                    receiveShadow
                    geometry={nodes.chrome_chrome1_0010_2.geometry}
                    material={materials["Rough Iron Steel.001"]}
                />
                <mesh
                    name='pit-1-mesh-4'
                    castShadow
                    receiveShadow
                    geometry={nodes.chrome_chrome1_0010_3.geometry}
                    material={materials.lambert7}
                />
            </group>
            <group
                name='pit-2-group'
                position={[-0.147, 0.021, -0.201]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={0.015}
            >
                <mesh
                    name='pit-2-mesh-1'
                    castShadow
                    receiveShadow
                    geometry={nodes.chrome_chrome1_0011.geometry}
                    material={materials["Rough Iron Steel.001"]}
                />
                <mesh
                    name='pit-2-mesh-2'
                    castShadow
                    receiveShadow
                    geometry={nodes.chrome_chrome1_0011_1.geometry}
                    material={materials.lambert7}
                />
                <mesh
                    name='pit-2-mesh-3'
                    castShadow
                    receiveShadow
                    geometry={nodes.chrome_chrome1_0011_2.geometry}
                    material={materials.lambert7}
                />
            </group>
            <group
                name='pit-3-group'
                position={[-0.147, 0.018, 0.091]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={0.009}
            >
                <mesh
                    name='pit-3-mesh-1'
                    castShadow
                    receiveShadow
                    geometry={nodes.chrome_chrome1_0012.geometry}
                    material={materials.lambert7}
                />
                <mesh
                    name='pit-3-mesh-2'
                    castShadow
                    receiveShadow
                    geometry={nodes.chrome_chrome1_0012_1.geometry}
                    material={materials["Rough Iron Steel"]}
                />
                <mesh
                    name='pit-3-mesh-3'
                    castShadow
                    receiveShadow
                    geometry={nodes.chrome_chrome1_0012_2.geometry}
                    material={materials["Rough Iron Steel.001"]}
                />
                <mesh
                    name='pit-3-mesh-4'
                    castShadow
                    receiveShadow
                    geometry={nodes.chrome_chrome1_0012_3.geometry}
                    material={materials.lambert7}
                />
            </group>
        </group>
    );
}

useGLTF.preload('/models/gas-stove.glb')