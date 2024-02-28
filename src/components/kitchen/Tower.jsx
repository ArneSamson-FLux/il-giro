import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

import Fridge from './accessoires/Fridge.jsx';
import Oven from './accessoires/Oven.jsx';
import LiquorStand from './accessoires/LiquorStand.jsx';

import useConfig from '../../store/useConfig.jsx';

export default function Sink({materialUrl, bevelled, doorOpening, fridgeOrOven , props, accessoryMaterialUrl}){

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

    const { nodes, materials } = useGLTF("./models/kitchen-high-hollow.glb");

    const { setCurrentPage } = useConfig();

    return <>
        <group 
            {...props} 
            dispose={null}
            onClick={
                (e) => {
                    setCurrentPage(3);
                }
            }
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["tower-straight"].geometry}
                material={material}
            >
                {/* //door */}
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.door001.geometry}
                    material={material}
                    position={[0.388, 1.088, 0.316]}
                    scale={[1, 1.1, 1]}
                    rotation={[0, doorOpening, 0]}
                >
                    <mesh
                        visible={bevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes["door-bevel"].geometry}
                        material={material}
                    />
                    <mesh
                        visible={!bevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes["door-straight"].geometry}
                        material={material}
                    />
                </mesh>

                {/* tower underside */}
                <mesh
                    visible={bevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes["tower-bevel"].geometry}
                    material={material}
                />
                <mesh
                    visible={!bevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes["tower-straight002"].geometry}
                    material={material}
                />
            </mesh>

            {fridgeOrOven === "fridge"
            && <Fridge/>
            }

            {fridgeOrOven === "oven"
            && <Oven/>
            }

            <LiquorStand
                materialUrl={accessoryMaterialUrl}
            />

        </group>
        

    </>
}

useGLTF.preload('./models/kitchen-high-hollow.glb')