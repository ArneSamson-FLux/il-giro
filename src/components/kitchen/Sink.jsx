import React, {useRef, useState} from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";

import { Selection, Select, EffectComposer, Outline } from '@react-three/postprocessing'

import Tap1 from './accessoires/Tap1.jsx';
import Tap2 from './accessoires/Tap2.jsx';

import SinkBowl from './accessoires/SinkBowl.jsx';

import {BakePlaneSmall} from '../lighting&shadows/ShadowPlanes.jsx'

import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfig.jsx';

export default function Sink({materialUrl, bevelled, accessoryMaterialUrl, tapType , sinkBowlMaterial , props}){    

    const albedoTexture = useTexture(materialUrl+"albedo.jpg");
    const normalTexture = useTexture(materialUrl+"normal.jpg");
    const roughnessTexture = useTexture(materialUrl+"roughness.jpg");
    const metallnessTexture = useTexture(materialUrl+"metallic.jpg");

    metallnessTexture.name = "metalnessMap";

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnessTexture,
        metalness: 1,
    });

    const tabletopMaterial = new THREE.MeshStandardMaterial({
        map: albedoTexture,
    });

    const { nodes, materials } = useGLTF("./models/kitchen-low-sink.glb",);

    const { isHovering, setIsHovering } = useScene();
    
    const { setCurrentPage, currentPage } = useConfig();
    
    const [hovered, hover] = useState(null);
    
    useCursor(hovered, "pointer")
    
    const sinkRef = useRef();

    useFrame(() => {
        if (hovered){
            if(currentPage !== 1) {
                gsap.to(sinkRef.current.position, {
                    y: 0.2,
                    duration: 0.5,
                })
            }
        } else {
            gsap.to(sinkRef.current.position, {
                y: 0,
                duration: 0.5,
            })
        }
    })

    return <>
        <group
            name='sink-group'
            ref={sinkRef}
            {...props} 
            dispose={null}
            
        >
            <group
                name='sink-hovers-group'
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
                onClick={
                    (e) => {
                        setCurrentPage(1);
                        e.stopPropagation();
                    }
                }
            >
                <mesh
                    name='sink-mesh'
                    castShadow
                    receiveShadow
                    geometry={nodes.top.geometry}
                    material={material}
                    position={[0, 1.193, 0]}
                    rotation={[0, -1.484, 0]}
                    scale={[1, 1.1, 1]}
                >
                    <mesh
                        name='sink-bevel-mesh'
                        visible={bevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes["bevelled-under"].geometry}
                        material={material}
                    />
                    <mesh
                        name='sink-straight-mesh'
                        visible={!bevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes["straight-under"].geometry}
                        material={material}
                    />
                    <mesh
                        name='sink-tabletop-mesh'
                        castShadow
                        receiveShadow
                        geometry={nodes.tabletop.geometry}
                        material={tabletopMaterial}
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

                <SinkBowl
                    materialUrl={sinkBowlMaterial}
                    props={{rotation: [0, 0, 0]}}
                />
            </group>

            <BakePlaneSmall
                props={
                    {
                        position: [0, 0, 0],
                    }
                }

            />
        </group>

    </>
}

useGLTF.preload('./models/kitchen-low-sink.glb')