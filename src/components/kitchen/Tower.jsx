import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { useDrag } from "@use-gesture/react";

import Fridge from './accessoires/Fridge.jsx';
import Oven from './accessoires/Oven.jsx';
import LiquorStand from './accessoires/LiquorStand.jsx';

import {BakePlane} from '../lighting&shadows/ShadowPlanes.jsx'

import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfig.jsx';

export default function Tower({materialUrl, bevelled, doorOpening, fridgeOrOven , props, accessoryMaterialUrl}){

    const albedoTexture = useTexture(materialUrl+"albedo.jpg");

    const aoTexture = useTexture("./images/bakes/tower-straight_Bake1_PBR_Ambient Occlusion.jpg");
    aoTexture.flipY = false;

    const aoTexture2 = useTexture("./images/bakes/tower-straight.002_Bake1_PBR_Ambient Occlusion.jpg");
    aoTexture2.flipY = false;

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

    const towerMaterial = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnesTexture,
        metalness: 1,
        aoMap: aoTexture,
        aoMapIntensity: 0.7,
    });

    const tower2material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnesTexture,
        metalness: 1,
        aoMap: aoTexture2,
        aoMapIntensity: 0.7,
    });

    const { nodes, materials } = useGLTF("./models/kitchen-high-hollow.glb");

    const { setCurrentPage, currentPage, dragMode, isDraggingTower, setIsDraggingTower, setIsDragging } = useConfig();
    const { setCameraFocus, isFocussedOnIsland, setIsFocussedOnIsland } = useScene();

    const [hovered, setHover] = useState(null);

    const [needPointer, setNeedPointer] = useState(false);

    useCursor(needPointer, "pointer")

    const towerRef = useRef();

    const [position, setPosition] = useState([0, 0, -1]);

    //animate sink and dragging_____________________________________________________________________________________
    const springProps = useSpring({
        // position: currentPage !== 1 && hovered ? [position[0], 0.2, position[2]] : [position[0], 0, position[2]],
        position: hovered ? [position[0], 0.2, position[2]] : [position[0], 0, position[2]],
        scale: isDraggingTower ? [1.1, 1.1, 1.1] : [1, 1, 1],
        config: { 
                tension: 250, 
                friction: 50,
            }
    });

    const planeIntersectPoint = new THREE.Vector3();
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    const dragPos = useDrag(
        ({ active, event }) => {
            setIsDraggingTower (active);
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
            name='tower-group'
            ref={towerRef}
            {...props} 
            dispose={null}
            position={springProps.position}
            {...springProps}
        >
            <group
                name='tower-hovers-group'
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
                        setCurrentPage(3);
                        setCameraFocus([position[0], position[1] + 1, position[2] ]);
                        setIsFocussedOnIsland(true);
                        e.stopPropagation();
                    }
                }
                {...(dragMode ? dragPos() : {})}           
            >
                <mesh
                    name='tower-mesh'
                    castShadow
                    receiveShadow
                    geometry={nodes["tower-straight"].geometry}
                    material={towerMaterial}
                >
                    {/* //door */}
                    <mesh
                        name='door-mesh'
                        castShadow
                        receiveShadow
                        geometry={nodes.door001.geometry}
                        material={material}
                        position={[0.388, 1.088, 0.316]}
                        scale={[1, 1.1, 1]}
                        rotation={[0, doorOpening, 0]}
                    >
                        <mesh
                            name='door-bevel-mesh'
                            visible={bevelled}
                            castShadow
                            receiveShadow
                            geometry={nodes["door-bevel"].geometry}
                            material={material}
                        />
                        <mesh
                            name='door-straight-mesh'
                            visible={!bevelled}
                            castShadow
                            receiveShadow
                            geometry={nodes["door-straight"].geometry}
                            material={material}
                        />
                    </mesh>

                    {/* tower underside */}
                    <mesh
                        name='tower-bevel-mesh'
                        visible={bevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes["tower-bevel"].geometry}
                        material={tower2material}
                    />
                    <mesh
                        name='tower-straight-mesh'
                        visible={!bevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes["tower-straight002"].geometry}
                        material={tower2material}
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

            </group>

            <BakePlane
                props={
                    {
                        position: [0, 0, 0],
                    }
                }

            />

        </a.group>

        

    </>
}

useGLTF.preload('./models/kitchen-high-hollow.glb')