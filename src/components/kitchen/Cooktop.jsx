import React, {useRef, useState} from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';

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

    const { setCurrentPage, currentPage, dragMode } = useConfig();

    const [hovered, hover] = useState(null);

    const [needPointer, setNeedPointer] = useState(false);

    useCursor(needPointer, "pointer")

    const cookTopRef = useRef();

    const springProps = useSpring({
        position: currentPage !== 2 && hovered ? [1.5, 0.2, 0] : [1.5, 0, 0],
        config: { 
                tension: 250, 
                friction: 50,
            }
    });

    return <>
        <a.group 
            name='cooktop-group'
            ref={cookTopRef}
            {...props} 
            dispose={null}
            position={springProps.position}
            
        >
            <group
                name='cooktop-hovers-group'
                onClick={
                    (e) => {
                        if(dragMode) return
                        setCurrentPage(2);
                        e.stopPropagation();
                    }
                }
                onPointerOver={
                    (e) => {
                        setNeedPointer(true);
                        if(dragMode) return;
                        hover(true);
                        e.stopPropagation();
                    }
                }
                onPointerOut={
                    (e) => {
                        setNeedPointer(false);
                        hover(false);
                        e.stopPropagation();
                    }
                }
            >

                <mesh
                    name='cooktop-mesh'
                    castShadow
                    receiveShadow
                    geometry={nodes.top.geometry}
                    material={material}
                    position={[0, 1.193, 0]}
                    rotation={[0, -1.484, 0]}
                    scale={[1, 1.1, 1]}
                >
                    <mesh
                        name='cooktop-bevelled-mesh'
                        visible={bevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes["bevelled-under"].geometry}
                        material={material}
                    />
                    <mesh
                        name='cooktop-straight-mesh'
                        visible={!bevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes["straight-under"].geometry}
                        material={material}
                    />
                    <mesh
                        name='cooktop-tabletop-mesh'
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
            </group>

            <BakePlaneSmall
                props={
                    {
                        position: [0, 0, 0],
                        rotation: [0, 0.5, 0],
                    }
                }
            />

        </a.group>

    </>
}

useGLTF.preload('./models/kitchen-low.glb')