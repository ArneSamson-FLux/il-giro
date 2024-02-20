import React from 'react';
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

export default function Cooktop({position, materialUrl}){

    const albedoTexture = useTexture(materialUrl+"albedo.jpg");
    const normalTexture = useTexture(materialUrl+"normal.jpg");
    const roughnessTexture = useTexture(materialUrl+"roughness.jpg");

    return <>
        <mesh
            position={position}
        >
            <cylinderGeometry args={[0.5, 0.5, 1, 32]}/>
            <meshStandardMaterial
                map={albedoTexture}
                normalMap={normalTexture}
                roughnessMap={roughnessTexture}
            />
        </mesh>
    </>
}