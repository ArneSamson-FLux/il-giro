import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three'
import { useGLTF, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { useDrag } from "@use-gesture/react";

import TableTop from './accessoires/TableTop.jsx';

import GasStove from './accessoires/GasStove.jsx'
import ElectricStove from './accessoires/ElectricStove.jsx';

import { BakePlaneSmall } from '../lighting&shadows/ShadowPlanes.jsx'
import Indicator from '../indicator/Indicator.jsx';

import { useTexture } from '../../helper/useTexture.tsx';

import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfigStore.jsx';
import useUIStore from '../../store/useUIStore.jsx';

export default function Cooktop() {

    const {
        mainMaterial,
        tableTopMaterial,

        cooktopPosition,
        cooktopRotation,

        allBevelled,

        stoveType,

        dragMode,
        isDraggingCooktop,
        setIsDraggingCooktop,
        setIsDragging
    } = useConfig();

    const { setCurrentPage } = useUIStore();

    const [albedoTexture, normalTexture, roughnessTexture, metallnessTexture] = useTexture([
        mainMaterial + "albedo.jpg",
        mainMaterial + "normal.jpg",
        mainMaterial + "roughness.jpg",
        mainMaterial + "metallic.jpg"
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

        if (meshRef.current) {
            const geometry = meshRef.current.geometry;

            const uvAttributeName = allBevelled ? "uv1" : "uv2";
            const uvAttribute = geometry.getAttribute(uvAttributeName);

            if (uvAttribute) {
                const uvBufferAttribute = new THREE.BufferAttribute(uvAttribute.array, uvAttribute.itemSize);

                geometry.setAttribute('uv', uvBufferAttribute);
            }
        }
    }, [nodes, allBevelled]);

    const { setCameraFocus, setIsFocussedOnIsland, isFocussedOnIsland } = useScene();

    const [hovered, setHover] = useState(null);

    const [needPointer, setNeedPointer] = useState(false);

    useCursor(needPointer, "pointer")

    const cookTopRef = useRef();

    //animate sink and dragging_____________________________________________________________________________________
    const springProps = useSpring({
        position: hovered ? [cooktopPosition[0], 0.1, cooktopPosition[2]] : [cooktopPosition[0], 0, cooktopPosition[2]],
        scale: isDraggingCooktop ? [1.1, 1.1, 1.1] : [1, 1, 1],
        rotation: isDraggingCooktop ? [0, 0, 0] : cooktopRotation,
        config: {
            tension: 250,
            friction: 50,
        }
    });

    const planeIntersectPoint = new THREE.Vector3();
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    const dragPos = useDrag(
        ({ active, event }) => {
            setIsDraggingCooktop(active);
            setIsDragging(active);

            if (active) {
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

    const indicatorPosition = [cooktopPosition[0], 0.1, cooktopPosition[2]];

    const handleClick = () => {
        if (dragMode) return;
        setCurrentPage(3);
        setCameraFocus([cooktopPosition[0], cooktopPosition[1] + 1, cooktopPosition[2]]);
        setIsFocussedOnIsland(false, true, false);
    }

    const handlePointerOver = () => {
        if (dragMode) return;
        setHover(true);
    }

    const handlePointerOut = () => {
        if (dragMode) return;
        setHover(false);
    }

    const handlePointerMissed = () => {
        if (dragMode) return;
        setIsFocussedOnIsland(false, false, false);
    }

    return <>

        {/* {isFocussedOnIsland.cooktop && <Indicator position={indicatorPosition} />} */}

        <a.group
            name='cooktop-group'
            ref={cookTopRef}
            rotation={cooktopRotation}
            position={cooktopPosition}
            dispose={null}
        // {...springProps}
        >
            <group
                name='cooktop-hovers-group'
                onPointerOver={
                    (e) => {
                        handlePointerOver();
                        e.stopPropagation();
                    }
                }
                onPointerOut={
                    (e) => {
                        setNeedPointer(false);
                        e.stopPropagation();
                    }
                }
                onClick={
                    (e) => {
                        handleClick();
                        e.stopPropagation();
                    }
                }
                //on misclick
                onPointerMissed={
                    (e) => {
                        handlePointerMissed();
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
                        visible={allBevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes.bevel.geometry}
                        material={material}
                    />
                    <mesh
                        visible={!allBevelled}
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

                {stoveType === "1" &&
                    <GasStove
                        props={
                            {
                                position: [0, 0, 0],
                            }
                        }
                    />
                }

                {stoveType === "2" &&
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