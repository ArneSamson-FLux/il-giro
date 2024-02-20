import React from 'react';
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

export default function Sink({position, materialTextureUrl}){

    const texture = useTexture(materialTextureUrl);

    return <>
        <mesh
            position={position}
        >
            <cylinderGeometry args={[0.5, 0.5, 2, 32]}/>
            <meshStandardMaterial
                map={texture}
            />
        </mesh>
    </>
}