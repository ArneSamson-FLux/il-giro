import { useThree, extend, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Text, Environment, Lightformer } from '@react-three/drei';
import Scene from './components/Scene.jsx';
import Lights from './components/Lights.jsx';
import * as THREE from 'three';

import { Perf } from 'r3f-perf'

export default function Experience() {

  return <>

    <Perf position="top-left" />

    <OrbitControls
            enableDamping={true}
            makeDefault
    />
    <Environment
      files={"/HDR/myHDR.hdr"}
      background={false}
      //rotate the HDR
    />

    {/* <Environment
      background={true}
    >
      <Lightformer
          visible={true}
          form="rect"
          intensity={2}
          position={new THREE.Vector3().setFromSphericalCoords(
            1, // distance
            0.7, // phi
            1.3 // theta
          )}
          rotation={[0, 0, 0]}
          scale={[10, 10, 10]}
          target={[0, 0, 0]}
          castShadow={false}
          receiveShadow={false}
        />
    </Environment> */}
    <Lights/>
    <Scene/>

  </>

}