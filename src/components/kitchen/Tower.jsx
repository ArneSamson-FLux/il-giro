import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three'
import { useGLTF, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { useDrag } from "@use-gesture/react";

// import Fridge from './accessoires/Fridge.jsx';
// import Oven from './accessoires/Oven.jsx';
import LiquorStand from './accessoires/LiquorStand.jsx';

import {BakePlane} from '../lighting&shadows/ShadowPlanes.jsx'

import { useTexture } from '../../helper/useTexture.tsx';

import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfig.jsx';

export default function Tower({materialUrl, bevelled, doorOpening, fridgeOrOven , props, accessoryMaterialUrl}){

    const [albedoTexture, normalTexture, roughnessTexture, metallnessTexture] = useTexture([
        materialUrl+"albedo.jpg",
        materialUrl+"normal.jpg",
        materialUrl+"roughness.jpg",
        materialUrl+"metallic.jpg"
    ]);

    albedoTexture.anisotropy = 16;
    
    const aoTexture = useTexture("./images/bakes/tower-straight_Bake1_PBR_Ambient Occlusion.jpg");
    aoTexture.flipY = false;

    const aoTexture2 = useTexture("./images/bakes/tower-straight.002_Bake1_PBR_Ambient Occlusion.jpg");
    aoTexture2.flipY = false;

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnessTexture,
        metalness: 1,
        roughness: 1,
    });

    const towerMaterial = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnessTexture,
        metalness: 1,
        aoMap: aoTexture,
        aoMapIntensity: 0.7,
        roughness: 1,
    });

    const tower2material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnessTexture,
        metalness: 1,
        aoMap: aoTexture2,
        aoMapIntensity: 0.7,
        roughness: 1,
    });

    const { nodes, materials } = useGLTF("./models/base-island-high.glb");

    const { setCurrentPage, currentPage, dragMode, isDraggingTower, setIsDraggingTower, setIsDragging } = useConfig();
    const { setCameraFocus, isFocussedOnIsland, setIsFocussedOnIsland } = useScene();

    const [hovered, setHover] = useState(null);

    const [needPointer, setNeedPointer] = useState(false);

    useCursor(needPointer, "pointer")

    const towerRef = useRef();

    const [position, setPosition] = useState([0, 0, -1]);

    //animate tower and dragging_____________________________________________________________________________________
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
                        setCurrentPage(5);
                        setCameraFocus([position[0], position[1] + 1, position[2] ]);
                        setIsFocussedOnIsland(true);
                        e.stopPropagation();
                    }
                }
                {...(dragMode ? dragPos() : {})}           
            >
                <mesh
                    name='cabinet'
                    castShadow
                    receiveShadow
                    geometry={nodes.tower.geometry}
                    material={material}
                >
                    <mesh
                        name='door'
                        castShadow
                        receiveShadow
                        geometry={nodes.door.geometry}
                        material={material}
                        position={[0.425, 1.185, 0.339]}
                        rotation={[0, doorOpening, 0]}
                    />
                    {fridgeOrOven === 'fridge' && <>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes['inside-cooler'].geometry}
                            material={material}>
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.grill002.geometry}
                                material={materials['[Metal_Aluminum_Anodized]']}
                                position={[-0.304, 0.055, 0.291]}
                            />
                            <group
                                position={[-0.053, 0.01, -0.026]}
                                rotation={[0, -1.571, 0]}
                                scale={[1, 1.008, 1]}
                            >
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes['C-865mm_1-Door-cabinet'].geometry}
                                    material={materials.Steel_med}
                                />
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes['C-865mm_1-Door-cabinet_1'].geometry}
                                    material={materials[' Steel_light']}
                                />
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes['C-865mm_1-Door-cabinet_2'].geometry}
                                    material={materials['[0136_Charcoal]']}
                                />
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes['C-865mm_1-Door-cabinet_3'].geometry}
                                    material={materials.Material}
                                />
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes['C-865mm_1-Door-cabinet_4'].geometry}
                                    material={materials['[0133_Gray]']}
                                />
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes['C-865mm_1-Door-cabinet_5'].geometry}
                                    material={materials['[0129_WhiteSmoke]']}
                                />
                                <group
                                    position={[0.313, 0.894, 0.233]}
                                    scale={[1, 0.992, 1]}
                                    rotation={[0, Math.min(-doorOpening + 0.5, 0), 0]}
                                >
                                    <mesh
                                        castShadow
                                        receiveShadow
                                        geometry={nodes['G-Object070'].geometry}
                                        material={materials.Material}
                                    />
                                    <mesh
                                        castShadow
                                        receiveShadow
                                        geometry={nodes['G-Object070_1'].geometry}
                                        material={materials['[Translucent_Glass_Gray]']}
                                    />
                                    <mesh
                                        castShadow
                                        receiveShadow
                                        geometry={nodes['G-Object070_2'].geometry}
                                        material={materials[' Steel_light']}
                                    />
                                </group>
                            </group>
                        </mesh>
                        </>
                    }

                    {fridgeOrOven === 'oven' && <>
                         <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes['inside-shelf'].geometry}
                            material={material}
                            position={[0, -0.048, 0]}
                        >
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes['shelf-bottom'].geometry}
                                material={nodes['inside-shelf'].material}
                                position={[0, 0.301, 0.059 + doorOpening/6]}
                                rotation={[0, -1.571, 0]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes['shelf-middle'].geometry}
                                material={nodes['inside-shelf'].material}
                                position={[0, 0.544, 0.059 + doorOpening/8]}
                                rotation={[0, -1.571, 0]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes['shelf-top'].geometry}
                                material={nodes['inside-shelf'].material}
                                position={[0, 0.788, 0.059 + doorOpening/12]}
                                rotation={[0, -1.571, 0]}
                            />
                        </mesh>
                        </>
                    }
                </mesh>

            
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

useGLTF.preload('./models/base-island-high.glb')