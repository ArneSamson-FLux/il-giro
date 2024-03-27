import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three'
import { useGLTF, useCursor } from '@react-three/drei'
import { a } from '@react-spring/three';

import BaseIsland from './BaseIsland.jsx';
import TableFlat from './TableFlat.jsx';

import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfigStore.jsx';
import useUIStore from '../../store/useUIStore.jsx';

export default function Table({ props }) {

    const {
        mainMaterial,
        tableTopMaterial,

        tablePosition,
        tableRotation,

        allBevelled,
    } = useConfig();

    const {
        isFocussedOnIsland
    } = useScene();

    const { setCurrentPage } = useUIStore();

    const meshRef = useRef();

    const { cameraFocus, setCameraFocus, setIsFocussedOnIsland } = useScene();

    const [needPointer, setNeedPointer] = useState(false);

    useCursor(needPointer, "pointer")

    const tableRef = useRef();

    const handleClick = () => {
        setCurrentPage(2);
        setCameraFocus([sinkPosition[0], sinkPosition[1] + 1, sinkPosition[2]]);
        setIsFocussedOnIsland(true, false, false);
    }

    const handlePointerOver = () => {
        setNeedPointer(true);
    }

    const handlePointerOut = () => {
        setNeedPointer(false);
    }

    const handlePointerMissed = () => {
        setIsFocussedOnIsland(false, false, false);
    }


    return <>

        <a.group
            name='sink-group'
            ref={tableRef}
            position={tablePosition}
            rotation={tableRotation}
            dispose={null}
        >
            <group
                name='sink-hovers-group'
                onPointerOver={
                    (e) => {
                        handlePointerOver();
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
                        setIsFocussedOnIsland(false, false, false);
                        e.stopPropagation();
                    }

                }
            >
                <TableFlat
                    props={{

                    }}
                />
                <BaseIsland
                    props={{
                        position: [0.995, 0, -0.005]
                    }}
                />

                <BaseIsland
                    props={{
                        position: [-0.995, 0, -0.005]
                    }}
                />

            </group>

        </a.group>

    </>
}