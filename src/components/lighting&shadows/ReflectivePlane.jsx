import React from 'react';
import { MeshReflectorMaterial, useTexture } from '@react-three/drei';

export default function ReflectivePlane({props}){

    //new alphamap
    const alphaMap = useTexture('./images/bakes/mirror_alpha.jpg');
    alphaMap.flipY = false;

    return <>
        <mesh
            name='reflectivePlane'
            {...props}
        >
            <circleGeometry/>
            <MeshReflectorMaterial
                color={0xffffff}
                blur={[300, 100]}
                mixBlur={1}
                mixStrength={40}
                resolution={1024}
                roughness={0.2}
                metalness={0}
                depthScale={0.8}
                minDepthThreshold={0.2}
                maxDepthThreshold={1.4}
            />
        </mesh>
    </>
}