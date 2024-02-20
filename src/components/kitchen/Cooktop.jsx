import React from 'react';
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

export default function Cooktop({position, materialTextureUrl}){

    const albedoTexture = useTexture(materialTextureUrl);
    console.log(materialTextureUrl);

    return <>
        <mesh
            position={position}
        >
            <cylinderGeometry args={[0.5, 0.5, 1, 32]}/>
            <meshStandardMaterial
                map={albedoTexture}
            />
        </mesh>
    </>
}