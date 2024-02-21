import React from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

import Tap1 from './accessoires/Tap1';
import Tap2 from './accessoires/Tap2';

export default function Sink({materialUrl, bevelled, accessoryMaterialUrl, tapType , props}){    

    const albedoTexture = useTexture(materialUrl+"albedo.jpg");
    const normalTexture = useTexture(materialUrl+"normal.jpg");
    const roughnessTexture = useTexture(materialUrl+"roughness.jpg");
    const metallnessTexture = useTexture(materialUrl+"metallic.jpg");

    metallnessTexture.name = "metalnessMap";

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        // normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnessTexture,
        metalness: 1,
    });

    const { nodes, materials } = useGLTF("./models/kitchen-low.glb",);

    return <>
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.top.geometry}
                material={material}
                position={[0, 1.193, 0]}
                rotation={[0, -1.484, 0]}
                scale={[1, 1.1, 1]}
            >
                <mesh
                    visible={bevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes["bevelled-under"].geometry}
                    material={material}
                />
                <mesh
                    visible={!bevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes["straight-under"].geometry}
                    material={material}
                />
            </mesh>
            {tapType === "tap1" && <Tap1
                    materialUrl={accessoryMaterialUrl}
                    bevelled={bevelled}
                    props={{rotation: [0, 0, 0]}}
                />
            }
            {tapType === "tap2" && <Tap2
                    materialUrl={accessoryMaterialUrl}
                    bevelled={bevelled}
                    props={{rotation: [0, 0, 0]}}
                />
            }
         </group>
    </>
}

useGLTF.preload('./models/kitchen-low.glb')