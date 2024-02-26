import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

export default function LiquorStand({props}){
    const { nodes, materials } = useGLTF("./models/liquorStand.glb");
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.liquorStand.geometry}
                material={nodes.liquorStand.material}
                position={[0, 1.43, 0]}
            />
        </group>
    );
}

useGLTF.preload('./models/liquorStand.glb')