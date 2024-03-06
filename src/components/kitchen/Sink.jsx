import React, {useRef, useState, useEffect} from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three';
import { useDrag } from "@use-gesture/react";

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

    const { nodes, materials } = useGLTF("./models/kitchen-low-sink.glb");
    
    const { setCurrentPage, currentPage, dragMode, isDraggingSink, setIsDraggingSink, setIsDragging } = useConfig();
    const { setCameraFocus, setIsFocussedOnIsland } = useScene();
    
    const [hovered, setHover] = useState(null);

    const [needPointer, setNeedPointer] = useState(false);
    
    useCursor(needPointer, "pointer")
    
    const sinkRef = useRef();

    const [position, setPosition] = useState([-1.5, 0, 0]);

    //animate sink and dragging_____________________________________________________________________________________
    const springProps = useSpring({
        // position: currentPage !== 1 && hovered ? [position[0], 0.2, position[2]] : [position[0], 0, position[2]],
        position: hovered ? [position[0], 0.2, position[2]] : [position[0], 0, position[2]],
        rotation: isDraggingSink ? [0, 0, 0] : [0, 0.5, 0],
        scale: isDraggingSink ? [1.1, 1.1, 1.1] : [1, 1, 1],
        config: { 
                tension: 250, 
                friction: 50,
            }
    });

    const planeIntersectPoint = new THREE.Vector3();
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    const dragPos = useDrag(
        ({ active, event }) => {
            setIsDraggingSink(active);
            setIsDragging(active);

            if(active){
                event.ray.intersectPlane(floorPlane, planeIntersectPoint);
                let newPosition = ([planeIntersectPoint.x, 0, planeIntersectPoint.z]);

                newPosition[0] = THREE.MathUtils.clamp(newPosition[0], -4.5, 4.5);
                newPosition[2] = THREE.MathUtils.clamp(newPosition[2], -4.5, 4.5);

                setPosition(newPosition);
            }

            event.stopPropagation();

            return;
        }
    );
    //_____________________________________________________________________________________________________________

    return <>
        <a.group
            name='sink-group'
            ref={sinkRef}
            {...props} 
            dispose={null}
            {...springProps}
        >
            <group
                name='sink-hovers-group'
                onPointerOver={
                    (e) => {
                        setNeedPointer(true);
                        if(dragMode) return;
                        setHover(true);
                        e.stopPropagation();
                    }
                }
                onPointerOut={
                    (e) => {
                        setNeedPointer(false);
                        setHover(false);
                        e.stopPropagation();
                    }
                }
                onClick={
                    (e) => {
                        if(dragMode) return;
                        setCurrentPage(1);
                        setCameraFocus([position[0], position[1] + 1, position[2]]);
                        setIsFocussedOnIsland(true);
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
                        geometry={nodes.tabletop001.geometry}
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
                        rotation: [0, -0.5, 0],
                    }
                }

            />
        </a.group>

    </>
}

useGLTF.preload('./models/kitchen-low-sink.glb')