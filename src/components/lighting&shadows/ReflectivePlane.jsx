import React from 'react';
import { MeshReflectorMaterial } from '@react-three/drei';

export default function ReflectivePlane({props}){

    return <>
        <mesh
            name='reflectivePlane'
            {...props}
        >
            <planeGeometry/>
            <MeshReflectorMaterial
                // blur={[400, 100]}
                // color={0xFAF9F6}
                // // mixStrength={1}
                // // mirror={0.3}
                // // resolution={1024}
                // // depthScale={0}
                // // reflectorOffset={0}
                // resolution={1024}
                // mixBlur={1}
                // mixStrength={7}
                // roughness={0}
                // mirror={0.5}
                // depthScale={1}
                // minDepthThreshold={0.5}

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