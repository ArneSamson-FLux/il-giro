import * as THREE from 'three'
import Cooktop from './kitchen/Cooktop.jsx'
import Sink from './kitchen/Sink.jsx'

export default function Scene() {
    return <>

        <Cooktop
            position={[0, 0, 2]}
        />
        <Sink
            position={[0, 0, -2]}
        />
    
    </>
}