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

    const { nodes, materials } = useGLTF("./models/kitchen-low-sink.glb",);

    const { isHovering, setIsHovering } = useScene();
    
    const { setCurrentPage, currentPage } = useConfig();
    
    const [hovered, hover] = useState(null);
    const [ shadowOpacity, setShadowOpacity ] = useState(0.9);
    const [ shadowScale, setShadowScale ] = useState([1, 1, 1]);
    const [ shadowPosition, setShadowPosition ] = useState([-1.5, 0, 0]);
    
    useCursor(hovered, "pointer")
    
    const sinkRef = useRef();

    useFrame(() => {
        if (hovered){
            if(currentPage !== 1) {
                gsap.to(sinkRef.current.position, {
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
            gsap.to(sinkRef.current.position, {
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
            ref={sinkRef}
            {...props} 
            dispose={null}
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
            onClick={
                (e) => {
                    setCurrentPage(1);
                    e.stopPropagation();
                }
            }
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.top002.geometry}
                material={material}
                position={[0, 1.193, 0]}
                rotation={[0, -1.484, 0]}
                scale={[1, 1.1, 1]}
            >
                <mesh
                    visible={bevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes["bevelled-under002"].geometry}
                    material={material}
                />
                <mesh
                    visible={!bevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes["straight-under002"].geometry}
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

            <SinkBowl
                materialUrl={sinkBowlMaterial}
                props={{rotation: [0, 0, 0]}}
            />

        </group>

        <BakePlaneSmall
            props={
                {
                    position: shadowPosition
                }
            }
            opacityValue={shadowOpacity}

        />
    </>
}

useGLTF.preload('./models/kitchen-low-sink.glb')