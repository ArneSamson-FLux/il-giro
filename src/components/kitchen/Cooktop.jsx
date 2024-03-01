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

    const { nodes, materials } = useGLTF("./models/kitchen-low.glb");

    const { setCurrentPage, currentPage } = useConfig();

    const { isHovering, setIsHovering } = useScene();

    const [hovered, hover] = useState(null);
    const [ shadowOpacity, setShadowOpacity ] = useState(0.9);
    const [ shadowScale, setShadowScale ] = useState([1, 1, 1]);
    const [ shadowPosition, setShadowPosition ] = useState([0, 0, 0]);

    useCursor(hovered, "pointer")

    const cookTopRef = useRef();

    useFrame(() => {
        if (hovered){
            if(currentPage !== 2) {
                gsap.to(cookTopRef.current.position, {
                    y: 0.2,
                    duration: 0.5,
                    onUpdate: () => {
                        if (shadowOpacity > 0.6 ) {
                            setShadowOpacity(shadowOpacity - 0.015);
                        }
                    }
                })
            }
        } else {
            gsap.to(cookTopRef.current.position, {
                y: 0,
                duration: 0.5,
                onUpdate: () => {
                    if (shadowOpacity < 0.9 ) { 
                        setShadowOpacity(shadowOpacity + 0.015);
                    }
                }
            })
        }
    })

    return <>
        <group 
            ref={cookTopRef}
            {...props} 
            dispose={null}
            onClick={
                (e) => {
                    setCurrentPage(2);
                    e.stopPropagation();
                }
            }
            onPointerOver={
                (e) => {
                    // setIsHovering(true);
                    hover(true);
                }
            }
            onPointerOut={
                (e) => {
                    // setIsHovering(false);
                hover(false);
                }
            }
        >
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

            <BakePlaneSmall
                props={
                    {
                        position: shadowPosition
                    }
                }
                opacityValue={shadowOpacity}
                isHovering={hovered}

            />

        </group>


    </>
}

useGLTF.preload('./models/kitchen-low.glb')