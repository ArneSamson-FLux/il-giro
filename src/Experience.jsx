import React, { Suspense, useRef, useState, useEffect } from 'react';
import { useThree, extend, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Text, Environment, Lightformer, CameraControls, ContactShadows, SoftShadows } from '@react-three/drei';
import * as THREE from 'three';

import Scene from './components/Scene.jsx';
import Lights from './components/lighting&shadows/Lights.jsx';
import Env from './components/lighting&shadows/Env.jsx';

import useScene from './store/useScene.jsx'
import useConfig from './store/useConfigStore.jsx'
import useUIStore from './store/useUIStore.jsx';

import { Perf } from 'r3f-perf'
import { update } from '@react-spring/three';

export default function Experience() {

    const camera = useRef()
    const [cameraPosition, setCameraPosition] = useState(null)

    const { cameraFocus, setCameraFocus, isFocussedOnIsland, setIsFocussedOnIsland } = useScene();
    const { isDragging } = useConfig();
    const { currentPage, setCurrentPage } = useUIStore();

    useEffect(() => {

        camera.current.moveTo(...cameraFocus, true);

        updateViewOffset();

        window.addEventListener('resize', updateViewOffset);

        return () => {
            window.removeEventListener('resize', updateViewOffset);
        }

    }
        , [cameraFocus, setCameraFocus])

    useEffect(() => {
        if (camera.current) {
            camera.current.dollyTo(4, false);
        }
    }, [camera.current])

    const updateViewOffset = () => {
        if (window.innerWidth > 1000) {
            const widthOffset = 150;
            camera.current.camera.setViewOffset(window.innerWidth, window.innerHeight, widthOffset, 0, window.innerWidth, window.innerHeight);
            camera.current.camera.updateProjectionMatrix();
        } else {
            const heightOffset = 180;
            camera.current.camera.setViewOffset(window.innerWidth, window.innerHeight, 0, heightOffset, window.innerWidth, window.innerHeight);
            camera.current.camera.updateProjectionMatrix();
        }
    }

    const [prevCamDist, setPrevCamDist] = useState(4);

    useEffect(() => {
        const handleScroll = (e) => {

            const currentDistance = cameraPosition.distanceTo(new THREE.Vector3(...cameraFocus));
            const roundedCurrentDistance = Math.round(currentDistance * 100) / 100;

            // console.log('before ', + prevCamDist, roundedCurrentDistance);

            if (prevCamDist < roundedCurrentDistance) {

                const distance = cameraPosition.distanceTo(new THREE.Vector3(...cameraFocus));
                const roundedDistanceToCamera = Math.round(distance * 100) / 100;


                if (roundedDistanceToCamera && roundedDistanceToCamera > 3.98 && !isDragging) {
                    setCameraFocus([0, 1, 0]);
                    setCurrentPage(0);
                    setIsFocussedOnIsland(false);
                }

            }
            setPrevCamDist(roundedCurrentDistance);
            // console.log('after ', + prevCamDist, roundedCurrentDistance);

        };

        window.addEventListener('wheel', handleScroll);

        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [
        cameraPosition,
        isDragging,
        cameraFocus,
        setCameraFocus,
        setCurrentPage,
        setIsFocussedOnIsland,
        prevCamDist
    ]);

    useFrame((state) => {
        if (camera.current) {
            setCameraPosition(state.camera.position);
        }
    });

    return <>

        {/* <Perf
        position="top-left"
        style={{ transform: 'translateX(15vw)'}}
    /> */}

        <CameraControls
            ref={camera}
            draggingSmoothTime={0.2}
            maxPolarAngle={Math.PI / 2}
            maxZoom={4}
            maxDistance={4}
            minDistance={2}
            enabled={!isDragging}
        />

        <Env />

        <Lights />

        <Scene />

    </>

}