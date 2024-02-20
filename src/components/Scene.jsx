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
                props={
                    {
                        position: [-1, 0, 0],
                        rotation: [0, 0, 0],
                        scale: [1, 1, 1],
                    }
                }
                bevelled = {true}
            />
        )
    }
    for(let i =0; i < cooktopAmount; i++){
        islands.push(
            <Cooktop
                key={'cooktop'+i}
                position={[0, 0, 1.5 + i]}
                materialUrl={woodMaterialUrl}
                props={
                    {
                        position: [1, 0, 0],
                        rotation: [0, 0, 0],
                        scale: [1, 1, 1],
                    }
                }
                bevelled = {true}

            />
        )
    }
    for(let i =0; i < towerAmount; i++){
        islands.push(
            <Tower
                key={'tower'+i}
                position={[1 + i , 0.5, 0]}
                materialUrl={leatherMaterialUrl}
                props={
                    {
                        position: [0, 0, -1],
                        rotation: [0, 0, 0],
                        scale: [1, 1, 1],
                    }
                }
                bevelled = {true}

            />
        )
    }
    

    return <>

        {islands}
    
    </>
}