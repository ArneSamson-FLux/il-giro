import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three'
import { useGLTF, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three';
import { useDrag } from "@use-gesture/react";

import BaseIsland from './BaseIsland.jsx';

import Tap1 from './accessoires/Tap1.jsx';
import Tap2 from './accessoires/Tap2.jsx';

import Reginox from './accessoires/ReginoxBowl.jsx';

import TableTop from './accessoires/TableTop.jsx';
import TableTopCutFilled from './accessoires/TableTopCutFilled.jsx';
import TableTopCutOut from './accessoires/TableTopCutOut.jsx';

import { BakePlaneSmall } from '../lighting&shadows/ShadowPlanes.jsx'
import Indicator from '../indicator/Indicator.jsx';

import { useTexture } from '../../helper/useTexture.tsx';

import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfigStore.jsx';
import useUIStore from '../../store/useUIStore.jsx';

export default function Sink({ props }) {

    const {
        tableTopMaterial,

        sinkPosition,
        sinkRotation,

        tapType,

        dragMode,
        isDraggingSink,
        setIsDraggingSink,
        setIsDragging
    } = useConfig();

    const {
        isFocussedOnIsland
    } = useScene();

    const { setCurrentPage } = useUIStore();

    const { setCameraFocus, setIsFocussedOnIsland } = useScene();

    const [hovered, setHover] = useState(null);

    const [needPointer, setNeedPointer] = useState(false);

    useCursor(needPointer, "pointer")

    const sinkRef = useRef();


    //animate sink and dragging_____________________________________________________________________________________
    const springProps = useSpring({
        position: hovered ? [sinkPosition[0], 0.1, sinkPosition[2]] : [sinkPosition[0], 0, sinkPosition[2]],
        rotation: isDraggingSink ? [0, 0, 0] : sinkRotation,
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

    // const indicatorPosition = [sinkPosition[0], 0.1, sinkPosition[2]];

    const handleClick = () => {
        if (dragMode) return;
        setCurrentPage(3);
        setCameraFocus([sinkPosition[0], sinkPosition[1] + 1, sinkPosition[2]]);
        setIsFocussedOnIsland(true, false, false);
    }

    const handlePointerOver = (e) => {
        e.stopPropagation();
        // const hasBakePlaneChild = sinkRef.current.children.some((child) => {
        //     return child.children.some((grandchild) => {
        //         return grandchild.name === "bakePlaneSmall-group";
        //     });
        // });

        // if (hasBakePlaneChild) {
        //     return;
        // }
        setNeedPointer(true);
        if (dragMode) return;
        setHover(true);
    }

    const handlePointerOut = () => {
        setNeedPointer(false);
        setHover(false);
    }

    const handlePointerMissed = () => {
        if (dragMode) return;
        setIsFocussedOnIsland(false, false, false);
    }


    return <>

        {/* {isFocussedOnIsland.sink && <Indicator position={indicatorPosition} />} */}


        <a.group
            name='sink-group'
            ref={sinkRef}
            rotation={sinkRotation}
            position={sinkPosition}
            dispose={null}
        // {...springProps}
        >
            <group
                name='sink-hovers-group'
                onPointerOver={
                    (e) => {
                        handlePointerOver(e);
                        e.stopPropagation();
                    }
                }
                onPointerOut={
                    (e) => {
                        handlePointerOut();
                        e.stopPropagation();
                    }
                }
                onClick={
                    (e) => {
                        handleClick();
                        e.stopPropagation();
                    }
                }
                onPointerMissed={
                    (e) => {
                        if (dragMode) return;
                        setIsFocussedOnIsland(false, false, false);
                        e.stopPropagation();
                    }

                }
                {...(dragMode ? dragPos() : {})}

            >
                <BaseIsland />

                <>
                    <TableTopCutOut
                        props={
                            {
                                position: [0, 0, 0],
                                rotation: [0, 0, 0],
                            }
                        }
                        materialUrl={tableTopMaterial}
                    />

                    <Reginox
                        props={
                            {
                                position: [0, 0, 0],
                                rotation: [0, 0, 0],
                            }
                        }
                    />
                </>


                {tapType === '1' &&
                    <Tap1
                        props={
                            {
                                position: [0, 0.01, 0],
                                rotation: [0, 0, 0],
                            }
                        }
                    />
                }

                {tapType === '2' &&

                    <Tap2
                        props={
                            {
                                position: [0, 0, 0],
                                rotation: [0, 0, 0],
                            }
                        }
                    />
                }

            </group>

        </a.group>
    </>
}