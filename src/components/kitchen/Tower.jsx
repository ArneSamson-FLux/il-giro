import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

import Fridge from './accessoires/Fridge.jsx';
import Oven from './accessoires/Oven.jsx';
import LiquorStand from './accessoires/LiquorStand.jsx';

import {BakePlane} from '../lighting&shadows/ShadowPlanes.jsx'


import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfig.jsx';
import { set } from 'mongoose';

export default function Tower({materialUrl, bevelled, doorOpening, fridgeOrOven , props, accessoryMaterialUrl}){

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

    const { setCurrentPage, currentPage } = useConfig();

    const { isHovering, setIsHovering } = useScene();

    const [hovered, setHover] = useState(null);

    useCursor(hovered, "pointer")

    const towerRef = useRef();

    useFrame(() => {
        if (hovered){
            if(currentPage !== 3) {
                gsap.to(towerRef.current.position, {
                    y: 0.2,
                    duration: 0.5,
                })  
            }
        } else {
            gsap.to(towerRef.current.position, {
                y: 0,
                duration: 0.5,
            })
        }
    })

    return <>
        <group 
            ref={towerRef}
            {...props} 
            dispose={null}
            onClick={
                (e) => {
                    setCurrentPage(3);
                    e.stopPropagation();
                }
            }
            onPointerOver={
                (e) => {
                    setHover(true);
                }
            }
            onPointerOut={
                (e) => {
                    setHover(false);
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

            <BakePlane
                props={
                    {
                        position: [0, 0, 0],
                    }
                }

            />

        </group>

        

    </>
}

useGLTF.preload('./models/kitchen-high-hollow.glb')