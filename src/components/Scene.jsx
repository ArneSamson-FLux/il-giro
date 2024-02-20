import * as THREE from 'three'
import Cooktop from './kitchen/Cooktop.jsx'
import Sink from './kitchen/Sink.jsx'
import Tower from './kitchen/Tower.jsx'

import useConfig from '../store/useConfig.jsx'

export default function Scene() {

    const { woodMaterialTextureUrl, metalMaterialTextureUrl, sinkAmount, cooktopAmount, towerAmount } = useConfig();
    

    const islands = [];
    for (let i = 0; i < sinkAmount; i++){
        islands.push(
            <Sink
                key={'sink'+i}
                position={[0, 0, -1.5 - i]}
                materialTextureUrl={metalMaterialTextureUrl}
            />
        )
    }
    for(let i =0; i < cooktopAmount; i++){
        islands.push(
            <Cooktop
                key={'cooktop'+i}
                position={[0, 0, 1.5 + i]}
                materialTextureUrl={woodMaterialTextureUrl}
            />
        )
    }
    for(let i =0; i < towerAmount; i++){
        islands.push(
            <Tower
                key={'tower'+i}
                position={[1 + i , 0.5, 0]}
                materialTextureUrl={woodMaterialTextureUrl}
            />
        )
    }
    

    return <>

        {islands}
    
    </>
}