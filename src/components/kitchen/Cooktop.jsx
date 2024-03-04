import React, {useRef, useState} from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { useDrag } from "@use-gesture/react";

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

    const { setCurrentPage, currentPage, dragMode, setIsDragging, isDraggingCooktop, setIsDraggingCooktop } = useConfig();
    const { setCameraFocus } = useScene();

    const [hovered, setHover] = useState(null);

    const [needPointer, setNeedPointer] = useState(false);

    useCursor(needPointer, "pointer")

    const cookTopRef = useRef();

    const [position, setPosition] = useState([1.5, 0, 0]);

    //animate sink and dragging_____________________________________________________________________________________
    const springProps = useSpring({
        position: currentPage !== 1 && hovered ? [position[0], 0.2, position[2]] : [position[0], 0, position[2]],
        scale: isDraggingCooktop ? [1.1, 1.1, 1.1] : [1, 1, 1],
        rotation: isDraggingCooktop ? [0, 0, 0] : [0, -0.5, 0],
        config: { 
                tension: 250, 
                friction: 50,
            }
    });

    const planeIntersectPoint = new THREE.Vector3();
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    const dragPos = useDrag(
        ({ active, event }) => {
            setIsDraggingCooktop (active);
            setIsDragging(active);

            if(active){
                event.ray.intersectPlane(floorPlane, planeIntersectPoint);
                setPosition([planeIntersectPoint.x, 0, planeIntersectPoint.z]);
            }

            event.stopPropagation();

            return;
        }
    );
    //_____________________________________________________________________________________________________________

    return <>
        <a.group 
            name='cooktop-group'
            ref={cookTopRef}
            {...props} 
            dispose={null}
            {...springProps}
            
        >
            <group
                name='cooktop-hovers-group'
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
                        setCurrentPage(2);
                        setCameraFocus([position[0], position[1] + 1, position[2]]);
                        e.stopPropagation();
                    }
                }
                {...(dragMode ? dragPos() : {})}          
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