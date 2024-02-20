import * as THREE from 'three'
import Cooktop from './kitchen/Cooktop.jsx'
import Sink from './kitchen/Sink.jsx'

import useMaterials from '../store/useMaterials.jsx'

export default function Scene() {

    const { woodMaterialTexture, marbleMaterialTexture } = useMaterials();
        

    return <>

        <Cooktop
            position={[0, 0, 2]}
            materialTextureUrl={woodMaterialTexture}
        />
        <Sink
            position={[0, 0, -2]}
            materialTextureUrl={marbleMaterialTexture}
        />
    
    </>
}