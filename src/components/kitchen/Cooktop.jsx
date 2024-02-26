import React from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

import GasStove from './accessoires/GasStove.jsx'
import ElectricStove from './accessoires/ElectricStove.jsx';


export default function Cooktop({materialUrl, bevelled, stoveType, props}){

    const albedoTexture = useTexture(materialUrl+"albedo.jpg");
    const normalTexture = useTexture(materialUrl+"normal.jpg");
    const roughnessTexture = useTexture(materialUrl+"roughness.jpg");
    const metallnesTexture = useTexture(materialUrl+"metallic.jpg");

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnesTexture,
        metalness: 1,
    });

    const { nodes, materials } = useGLTF("./models/kitchen-low.glb");

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

        


        {stoveType === "gas" &&
            <GasStove
                props={
                    {
                        position: [0, 0.957, 0.12],
                    }
                }
            />
        }
        
        {stoveType === "electric" &&
            <ElectricStove
                props={
                    {
                        position: [0, 0.97, 0.1],
                        scale: [0.9, 0.9, 0.9],
                        rotation: [0, 0, 0],
                    }
                }
            />
        }

        </group>

    </>
}

useGLTF.preload('./models/kitchen-low.glb')