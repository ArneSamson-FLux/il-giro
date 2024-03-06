import React from 'react';
import { MeshReflectorMaterial } from '@react-three/drei';

export default function ReflectivePlane({props}){

    return <>
        <mesh
            {...props}
        >
            <planeGeometry/>
            <MeshReflectorMaterial
                color={0xFAF9F6}
                mixStrength={1}
                mirror={0.3}
                resolution={1024}
                depthScale={0}
                reflectorOffset={0}
            />
        </mesh>
    </>
}