import * as THREE from 'three'
import Cooktop from './kitchen/Cooktop.jsx'
import Sink from './kitchen/Sink.jsx'
import Tower from './kitchen/Tower.jsx'

import useMaterials from '../store/useMaterials.jsx'

export default function Scene() {

    const { woodMaterialTexture, marbleMaterialTexture } = useMaterials();
        

    return <>

        <Cooktop
            position={[0, 0, 1.5]}
            materialTextureUrl={woodMaterialTexture}
        />
        <Sink
            position={[0, 0, -1.5]}
            materialTextureUrl={marbleMaterialTexture}
        />

        <Tower
            position={[1, 0.5, 0]}
            materialTextureUrl={woodMaterialTexture}
        />
    
    </>
}