import { useThree, extend, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Text, Environment, Lightformer } from '@react-three/drei';
import Scene from './components/Scene.jsx';
import Lights from './components/Lights.jsx';

export default function Experience() {

  return <>

    <OrbitControls
            enableDamping={true}
            makeDefault
    />
    <Environment
      files={"/HDR/3.hdr"}
      background={false}
      //rotate the HDR

      
    />
    <Lights/>
    <Scene/>

  </>

}