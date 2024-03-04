import React, {useRef, useState, useEffect} from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three';
import { useDrag } from "@use-gesture/react";

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
    
    const { setCurrentPage, currentPage, dragMode, isDragging, setIsDragging } = useConfig();
    
    const [hovered, hover] = useState(null);

    const [needPointer, setNeedPointer] = useState(false);
    
    useCursor(needPointer, "pointer")
    
    const sinkRef = useRef();

    const [position, setPosition] = useState([-1.5, 0, 0]);

    const planeIntersectPoint = new THREE.Vector3();
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    const springProps = useSpring({
        position: currentPage !== 1 && hovered ? [position[0], 0.2, 0] : [position[0], 0, 0],
        config: { 
                tension: 250, 
                friction: 50,
            }
    });

    const [spring, api] = useSpring(() => ({
        position: position,
        scale: 1,
        rotation: [0, 0.5, 0],
        config: { friction: 10 }
    }));

    const dragPos = useDrag(
        ({ active, timeStamp, event }) => {
            setIsDragging(active);

            if(active){
                event.ray.intersectPlane(floorPlane, planeIntersectPoint);
                setPosition([planeIntersectPoint.x, 0, planeIntersectPoint.z]);
            }

            api.start({
                position: position,
                scale: active ? 1.1 : 1,
                rotation: active ? [0, 0, 0] : [0, 0.5, 0],
                config: {
                    tension: 120,
                    friction: 10,
                }
            });

            return timeStamp;
        }
    );

    return <>
        <a.group
            name='sink-group'
            ref={sinkRef}
            {...props} 
            dispose={null}

            {...spring}

        >
            <group
                name='sink-hovers-group'
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
                onClick={
                    (e) => {
                        if(dragMode) return;
                        setCurrentPage(1);
                        e.stopPropagation();
                    }
                }
                {...(dragMode ? dragPos() : {})}           

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
                        // rotation: !isDragging ? [0, -0.5, 0] : [0, 0, 0],
                        rotation: [0, -0.5, 0],
                    }
                }

            />
        </a.group>

    </>
}

useGLTF.preload('./models/kitchen-low-sink.glb')