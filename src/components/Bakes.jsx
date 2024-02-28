import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

export default function BakePlane({props}){

    const { nodes, materials } = useGLTF("./models/bake-plat.glb");

    // const alphaMap = new THREE.TextureLoader().load( './images/bakes/tower-alpha2.jpg' );
    //use useTexture

    const alphaMap = useTexture('./images/bakes/tower-alpha2.jpg');
    alphaMap.flipY = false;

    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes.Plane002.geometry}
                // material={materials["Material.002"]}
                scale={[2.762, 1, 4.565]}
            >
                <meshBasicMaterial
                    attach="material"
                    alphaMap={alphaMap}
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