import React, { Suspense, useRef, useState, useEffect } from 'react';
import { useThree, extend, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Text, Environment, Lightformer, CameraControls, ContactShadows, SoftShadows } from '@react-three/drei';
import * as THREE from 'three';

import Scene from './components/Scene.jsx';
import Lights from './components/lighting&shadows/Lights.jsx';

import useScene from './store/useScene.jsx'
import useConfig from './store/useConfig.jsx'

import { Perf } from 'r3f-perf'
import { set } from 'mongoose';

export default function Experience() {

    const camera = useRef()

    const { cameraCoords, cameraFocus, setCameraFocus, isFocussedOnIsland, setIsFocussedOnIsland } = useScene();

    const { isDragging, setCurrentPage, currentPage } = useConfig();

    useEffect(() => {
        
        camera.current.moveTo(...cameraFocus, true)

    }
    , [cameraFocus, setCameraFocus])

    const defaultFocus = [0, 1, 0];
    const [canZoomOut, setCanZoomOut] = useState(false);

    useFrame((state) => {

        if(!canZoomOut) {

            const distance = state.camera.position.distanceTo(new THREE.Vector3(...cameraFocus));
            if(distance > 3.8 && !isDragging) {

                setCameraFocus(defaultFocus);
                setCurrentPage(0);
                setIsFocussedOnIsland(false);
                setCanZoomOut(true);
            }
        }

    });

    useEffect(() => {

        if(isFocussedOnIsland) {
            
            const timer = setTimeout(() => {
                
                setCanZoomOut(false);
                
            }, 3000);
        }

    }, [isFocussedOnIsland])

    useEffect(() => {
        if(camera.current) {
            camera.current.dollyTo(4, false);
        }
    }, [camera.current])


  return <>

    <Perf
        position="top-left"
        style={{ transform: 'translateX(15vw)'}}
    />

    <CameraControls
      ref={camera}
      draggingSmoothTime={0.2}
      maxPolarAngle={Math.PI / 2}
      maxZoom={4}
      maxDistance={4}
      minDistance={2}
      enabled={!isDragging}
    />


    <Environment
      files={"/HDR/4.hdr"}
      background={false}
    >
      <Lightformer
          visible={true}
          form="rect"
          intensity={1}
          position={new THREE.Vector3().setFromSphericalCoords(
            2, // distance
            1.2, // phi
            1.5 // theta
          )}
          rotation={[0, 0, 0]}
          scale={[5, 2, 5]}
          target={[0, 0, 0]}
          castShadow={false}
          receiveShadow={false}
        />
        <Lightformer
          visible={true}
          form="rect"
          intensity={2}
          position={new THREE.Vector3().setFromSphericalCoords(
            1.5, // distance
            1, // phi
            4.2 // theta
          )}
          rotation={[0, 0, 0]}
          scale={[5, 2, 5]}
          target={[0, 0, 0]}
          castShadow={false}
          receiveShadow={false}
        />
    </Environment>
      
    <Lights/>

    {/* <ContactShadows opacity={0.2} scale={5} blur={0.1} far={10} resolution={512} color="#000000"  frames={1}/> */}

        {/* <SoftShadows
          size={50}
          samples={20}
          focus={2}
        /> */}

    <Scene/>

  </>

}