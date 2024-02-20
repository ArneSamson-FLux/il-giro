import * as THREE from 'three'
import Cooktop from './kitchen/Cooktop.jsx'
import Sink from './kitchen/Sink.jsx'
import Tower from './kitchen/Tower.jsx'

import useConfig from '../store/useConfig.jsx'

export default function Scene() {

    const { woodMaterialUrl, metalMaterialUrl, leatherMaterialUrl ,sinkAmount, cooktopAmount, towerAmount } = useConfig();
    

    const islands = [];
    for (let i = 0; i < sinkAmount; i++){
        islands.push(
            <Sink
                key={'sink'+i}
                position={[0, 0, -1.5 - i]}
                materialUrl={metalMaterialUrl}
            />
        )
    }
    for(let i =0; i < cooktopAmount; i++){
        islands.push(
            <Cooktop
                key={'cooktop'+i}
                position={[0, 0, 1.5 + i]}
                materialUrl={woodMaterialUrl}
            />
        )
    }
    for(let i =0; i < towerAmount; i++){
        islands.push(
            <Tower
                key={'tower'+i}
                position={[1 + i , 0.5, 0]}
                materialUrl={leatherMaterialUrl}
            />
        )
    }
    

    return <>

        {islands}
    
    </>
}