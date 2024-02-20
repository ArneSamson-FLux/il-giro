import { useThree, extend, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Text } from '@react-three/drei';
import Scene from './components/Scene.jsx';
import Lights from './components/Lights.jsx';

export default function Experience() {

  return <>

    <OrbitControls
            enableDamping={true}
            makeDefault
    />
    <Lights/>
    <Scene/>

  </>

}