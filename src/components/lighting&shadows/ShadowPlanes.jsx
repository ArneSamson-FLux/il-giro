import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'
import gsap from 'gsap';
import { useFrame } from '@react-three/fiber';


export function BakePlane({props, opacityValue, isHovering}){
    
    const { nodes, materials } = useGLTF("./models/bake-plat.glb");
    
    const alphaMap1 = useTexture('./images/bakes/bake.jpg');
    alphaMap1.flipY = false;
    
    const bigPlaneRef = useRef();

    useFrame(() => {
        if(isHovering){
            if(bigPlaneRef.current){
                gsap.to(bigPlaneRef.current.position, {
                    z: -1.1,
                    duration: 0.5,
                });
                
            }
        } else {
            if(bigPlaneRef.current){
                gsap.to(bigPlaneRef.current.position, {
                    z: -1,
                    duration: 0.5,
                });
            }
        }
    });
    
    return (
        <group 
            ref={bigPlaneRef}
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

export function BakePlaneSmall({props, opacityValue, isHovering}){

    const { nodes, materials } = useGLTF("./models/bake-plat.glb");

    const alphaMap1 = useTexture('./images/bakes/bake2.jpg');
    alphaMap1.flipY = false;

    const smallPlaneRef = useRef();

    useFrame(() => {
        if(isHovering){

            if(smallPlaneRef.current){
                gsap.to(smallPlaneRef.current.position, {
                    z: -0.1,
                    duration: 0.5,
                });
            }
        } else {
            if(smallPlaneRef.current){
                gsap.to(smallPlaneRef.current.position, {
                    z: 0,
                    duration: 0.5,
                });
            }
        }
    }
    );

    return (
        <group 
            ref={smallPlaneRef}
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