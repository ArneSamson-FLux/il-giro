import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Lights()
{
    const lightRef = useRef()

    useFrame((state) => {
        lightRef.current.position.z = state.camera.position.z + 1 - 4
        lightRef.current.target.position.z = state.camera.position.z
        lightRef.current.target.updateMatrixWorld()
    })

    return <>
        <directionalLight
            ref={lightRef}
            castShadow
            position={ [ 4, 4, 1 ] }
            intensity={ 4.5 }
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 10 }
            shadow-camera-right={ 10 }
            shadow-camera-bottom={ - 10 }
            shadow-camera-left={ - 10 }
        />
        <ambientLight intensity={ 1.4 } />
    </>
}