import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useShadowHelper from '../../helper/useShadowHelper.jsx'

export default function Lights()
{
    const lightRef = useRef()

    // const helper = useShadowHelper(lightRef)

    return <>
        <directionalLight
            ref={lightRef}
            castShadow
            position={ [ 0, 4, 5 ] }
            intensity={ 4.5 }
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 0.1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 5 }
            shadow-camera-right={ 5 }
            shadow-camera-bottom={ - 4 }
            shadow-camera-left={ - 5 }
            shadow-bias={ 0.006}
            shadow-normalBias={ 0.03 }
        />
        {/* <ambientLight intensity={ 1.4 } /> */}
    </>
}