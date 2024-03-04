import React, {useRef, useState} from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

import GasStove from './accessoires/GasStove.jsx'
import ElectricStove from './accessoires/ElectricStove.jsx';

import {BakePlaneSmall} from '../lighting&shadows/ShadowPlanes.jsx'

import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfig.jsx';

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

    const tabletopMaterial = new THREE.MeshStandardMaterial({
        map: albedoTexture,
    });

    const { nodes, materials } = useGLTF("./models/kitchen-low.glb");

    const { setCurrentPage, currentPage } = useConfig();

    const { isHovering, setIsHovering } = useScene();

    const [hovered, hover] = useState(null);

    useCursor(hovered, "pointer")

    const cookTopRef = useRef();

    useFrame(() => {
        if (hovered){
            if(currentPage !== 2) {
                gsap.to(cookTopRef.current.position, {
                    y: 0.2,
                    duration: 0.5,
                })
            }
        } else {
            gsap.to(cookTopRef.current.position, {
                y: 0,
                duration: 0.5,
            })
        }
    })

    return <>
        <group 
            ref={cookTopRef}
            {...props} 
            dispose={null}
            
        >
            <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.top.geometry}
                    material={material}
                    position={[0, 1.193, 0]}
                    rotation={[0, -1.484, 0]}
                    scale={[1, 1.1, 1]}

                    onClick={
                        (e) => {
                            setCurrentPage(2);
                            e.stopPropagation();
                        }
                    }
                    onPointerOver={
                        (e) => {
                            hover(true);
                            e.stopPropagation();
                        }
                    }
                    onPointerOut={
                        (e) => {
                        hover(false);
                        e.stopPropagation();
                        }
                    }
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
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.tabletop.geometry}
                    material={tabletopMaterial}
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

            <BakePlaneSmall
                props={
                    {
                        position: [0, 0, 0]
                    }
                }
            />

        </group>


    </>
}

useGLTF.preload('./models/kitchen-low.glb')