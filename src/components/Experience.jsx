import { useThree, extend, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Text } from '@react-three/drei';


export default function Experience() {

  return <>

    <OrbitControls
            enableDamping={true}
            makeDefault //used to make the orbit controls the default controls and disable them when using the gizzmo
    />

    <Html>
      <h1>hello</h1>
    </Html>

  </>

}