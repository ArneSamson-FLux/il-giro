import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

export function BakePlane({ props }) {

    const { nodes, materials } = useGLTF("./models/bake-plat.glb");

    const alphaMap1 = useTexture('./images/bakes/bake.jpg');
    alphaMap1.flipY = false;

    const bigPlaneRef = useRef();

    useEffect(() => {
        if (bigPlaneRef.current) {
            bigPlaneRef.current.rotation.y = - bigPlaneRef.current.parent.rotation.y;
        }
    }, [props]);

    // useFrame(() => {
    //     if(bigPlaneRef.current){
    //         bigPlaneRef.current.position.y =  - bigPlaneRef.current.parent.position.y;
    //         bigPlaneRef.current.position.z =  - bigPlaneRef.current.parent.position.y / 3;
    //         if(bigPlaneRef.current.children[0].material){
    //             bigPlaneRef.current.children[0].material.opacity = (1 - (bigPlaneRef.current.parent.position.y * 1.5)) * 1;
    //         };
    //     }
    // });

    return (
        <group
            name='bakePlane-group'
            ref={bigPlaneRef}
            {...props}
            dispose={null}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <mesh
                name='bakePlane-mesh'
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
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}

export function BakePlaneSmall({ props }) {

    const { nodes, materials } = useGLTF("./models/bake-plat.glb");

    const alphaMap1 = useTexture('./images/bakes/bake2.jpg');
    alphaMap1.flipY = false;

    const smallPlaneRef = useRef();


    useEffect(() => {
        if (smallPlaneRef.current) {
            smallPlaneRef.current.rotation.y = - smallPlaneRef.current.parent.parent.rotation.y;
        }
    }, [props]);

    // useFrame(() => {
    //     if (smallPlaneRef.current) {
    //         smallPlaneRef.current.position.y = - smallPlaneRef.current.parent.position.y;
    //         smallPlaneRef.current.position.z = - smallPlaneRef.current.parent.position.y / 3;
    //         if (smallPlaneRef.current.children[0].material) {
    //             smallPlaneRef.current.children[0].material.opacity = (1 - (smallPlaneRef.current.parent.position.y * 1.5)) * 1;
    //         };
    //     }
    // }
    // );

    return (
        <group
            name='bakePlaneSmall-group'
            ref={smallPlaneRef}
            {...props}
            dispose={null}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <mesh
                name='bakePlaneSmall-mesh'
                geometry={nodes.Plane002.geometry}
            >
                <meshBasicMaterial
                    attach="material"
                    alphaMap={alphaMap1}
                    color="#000"
                    metalness={0}
                    roughness={1}
                    transparent
                    depthWrite={false}

                />
            </mesh>
        </group>
    );
}

useGLTF.preload('./models/bake-plat.glb');