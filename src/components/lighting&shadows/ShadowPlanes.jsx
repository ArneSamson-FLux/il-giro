import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

export function BakePlane({props, opacityValue}){

    const { nodes, materials } = useGLTF("./models/bake-plat.glb");

    const alphaMap1 = useTexture('./images/bakes/bake.jpg');
    alphaMap1.flipY = false;

    return (
        <group 
            {...props} 
            dispose={null
        }>
            <mesh
                geometry={nodes.Plane002.geometry}
                renderOrder={1}
            >
                <meshBasicMaterial
                    attach="material"
                    alphaMap={alphaMap1}
                    color="#000"
                    metalness={0}
                    roughness={1}
                    transparent
                    opacity={opacityValue}
                    // depthTest={false}
                    depthWrite={false}
                />
            </mesh>
      </group>
    );
}

export function BakePlaneSmall({props, opacityValue}){

    const { nodes, materials } = useGLTF("./models/bake-plat.glb");

    const alphaMap1 = useTexture('./images/bakes/bake2.jpg');
    alphaMap1.flipY = false;

    return (
        <group 
            {...props} 
            dispose={null}
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
                    opacity={opacityValue}
                    depthWrite={false}

                />
            </mesh>
      </group>
    );
}

useGLTF.preload('./models/bake-plat.glb');