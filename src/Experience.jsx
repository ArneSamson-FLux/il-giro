import { useThree, extend, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Text, Environment, Lightformer, CameraControls, ContactShadows, SoftShadows } from '@react-three/drei';
import * as THREE from 'three';

import ConfigUi from './components/ConfigUi.jsx';
import Scene from './components/Scene.jsx';
import Lights from './components/Lights.jsx';

import { Perf } from 'r3f-perf'

export default function Experience() {

  return <>

    <Perf position="top-left" />

    {/* <OrbitControls
            enableDamping={true}
            makeDefault
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 6}
            enablePan={false}
            enableRotate={true}
            target={[0, 1, -1]}
            position={[0, 0, 4]}
            
    /> */}

    <CameraControls
      draggingSmoothTime={0.2}
      maxPolarAngle={Math.PI / 2}
      maxDistance={10}
      minDistance={2}
      setOrbitPoint={[0, 1, -1]}
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

        <SoftShadows
          size={50}
          samples={20}
          focus={2}
        />

    <Scene/>

  </>

}