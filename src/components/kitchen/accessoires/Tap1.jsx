import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

export default function Tap1({materialUrl, bevelled, props}){
    
    const { nodes, materials } = useGLTF("/models//tap1.glb");
    
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Tap1.geometry}
                material={nodes.Tap1.material}
                position={[0, 0.973, 0]}
            />
        </group>
    );
}

useGLTF.preload('/models/tap1.glb')