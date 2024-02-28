import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

export function BakePlane({props}){

    const { nodes, materials } = useGLTF("./models/bake-plat.glb");

    const alphaMap1 = useTexture('./images/bakes/bake.jpg');
    alphaMap1.flipY = false;

    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes.Plane002.geometry}
            >
                <meshBasicMaterial
                    attach="material"
                    alphaMap={alphaMap1}
                    color="#000"
                    metalness={0}
                    roughness={1}
                    transparent
                    opacity={0.7}
                />
            </mesh>
      </group>
    );
}

export function BakePlaneSmall({props}){

    const { nodes, materials } = useGLTF("./models/bake-plat.glb");

    const alphaMap1 = useTexture('./images/bakes/bake2.jpg');
    alphaMap1.flipY = false;

    return (
        <group 
            {...props} 
            ispose={null}
            // renderOrder={1}    
        >
            <mesh
                geometry={nodes.Plane002.geometry}
            >
                <meshBasicMaterial
                    attach="material"
                    alphaMap={alphaMap1}
                    color="#000"
                    metalness={0}
                    roughness={1}
                    transparent
                    opacity={0.7}
                />
            </mesh>
      </group>
    );
}

useGLTF.preload('./models/bake-plat.glb');