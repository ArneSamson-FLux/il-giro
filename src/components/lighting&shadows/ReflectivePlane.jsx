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

                // color={0xF9f9f9}
                // color={0xffffff}
                color={0xd3d3d3}
                mixStrength={1}
                mirror={0.3}
                resolution={1024}
                depthScale={0}
                reflectorOffset={0}

                // alphaMap={alphaMap}
                // transparent={true}
                // depthWrite={false}
            />
        </mesh>
    </>
}