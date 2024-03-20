import React, {useRef, useState, useEffect} from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { useDrag } from "@use-gesture/react";

import TableTop from './accessoires/TableTop.jsx';

import GasStove from './accessoires/GasStove.jsx'
import ElectricStove from './accessoires/ElectricStove.jsx';

import {BakePlaneSmall} from '../lighting&shadows/ShadowPlanes.jsx'

import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfig.jsx';

export default function Cooktop({materialUrl, bevelled, tableTopMaterial, stoveType, props}){

    const [albedoTexture, normalTexture, roughnessTexture, metallnessTexture] = useTexture([
        materialUrl+"albedo.jpg",
        materialUrl+"normal.jpg",
        materialUrl+"roughness.jpg",
        materialUrl+"metallic.jpg"
    ]);

    albedoTexture.anisotropy = 16;

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnessTexture,
        metalness: 1,
    });

    const { nodes, materials } = useGLTF("./models/base-island.glb");

    const meshRef = useRef();

    useEffect(() => {
        
        if(meshRef.current){
            const geometry = meshRef.current.geometry;

            const uvAttributeName = bevelled ? "uv1" : "uv2";
            const uvAttribute = geometry.getAttribute(uvAttributeName);

            if (uvAttribute) {
                const uvBufferAttribute = new THREE.BufferAttribute(uvAttribute.array, uvAttribute.itemSize);
                
                geometry.setAttribute('uv', uvBufferAttribute);
            }
        }
    }, [nodes, bevelled]);

    const { setCurrentPage, currentPage, dragMode, setIsDragging, isDraggingCooktop, setIsDraggingCooktop } = useConfig();
    const { setCameraFocus, setIsFocussedOnIsland } = useScene();

    const [hovered, setHover] = useState(null);

    const [needPointer, setNeedPointer] = useState(false);

    useCursor(needPointer, "pointer")

    const cookTopRef = useRef();

    const [position, setPosition] = useState([1.5, 0, 0]);

    //animate sink and dragging_____________________________________________________________________________________
    const springProps = useSpring({
        // position: currentPage !== 1 && hovered ? [position[0], 0.2, position[2]] : [position[0], 0, position[2]],
        position: hovered ? [position[0], 0.2, position[2]] : [position[0], 0, position[2]],
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
                let newPosition = ([planeIntersectPoint.x, 0, planeIntersectPoint.z]);

                newPosition[0] = THREE.MathUtils.clamp(newPosition[0], -4.5, 4.5);
                newPosition[2] = THREE.MathUtils.clamp(newPosition[2], -4.5, 4.5);

                setPosition(newPosition);            }

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
                        setCurrentPage(4);
                        setCameraFocus([position[0], position[1] + 1, position[2]]);
                        setIsFocussedOnIsland(true);
                        e.stopPropagation();
                    }
                }
                {...(dragMode ? dragPos() : {})}          
            >

                <mesh
                    ref={meshRef}
                    castShadow
                    receiveShadow
                    geometry={nodes['island-low'].geometry}
                    material={material}
                >
                    <mesh
                        visible={bevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes.bevel.geometry}
                        material={material}
                    />
                    <mesh
                        visible={!bevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes.straight.geometry}
                        material={material}
                    />
                </mesh>

                <TableTop
                    props={
                        {
                            position: [0, 0, 0],
                            rotation: [0, 0, 0],
                        }
                    }
                    materialUrl={tableTopMaterial}
                />

                {stoveType === "gas" &&
                    <GasStove
                        props={
                            {
                                position: [0, 0, 0],
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

useGLTF.preload('./models/base-island.glb')