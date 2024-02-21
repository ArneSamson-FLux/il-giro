import * as THREE from 'three'
import Cooktop from './kitchen/Cooktop.jsx'
import Sink from './kitchen/Sink.jsx'
import Tower from './kitchen/Tower.jsx'
import { useControls } from 'leva'

import useConfig from '../store/useConfig.jsx'

export default function Scene() {

    const { materialUrls ,sinkAmount, cooktopAmount, towerAmount } = useConfig();

    //useControls
    const { levaSinkAmount, levaCooktopAmount, levaTowerAmount, levaSinkMaterial, levaCooktopMaterial, levaTowerMaterial
    } = useControls({
        levaSinkAmount: {
            value: sinkAmount,
            min: 0,
            max: 10,
            step: 1,
            label: 'Sink Amount'
        },
        levaCooktopAmount: {
            value: cooktopAmount,
            min: 0,
            max: 10,
            step: 1,
            label: 'Cooktop Amount'
        },
        levaTowerAmount: {
            value: towerAmount,
            min: 0,
            max: 10,
            step: 1,
            label: 'Tower Amount'
        },
        levaSinkMaterial: {
            value: materialUrls[0],
            label: 'Sink Material',
            options: materialUrls
        },
        levaCooktopMaterial: {
            value: materialUrls[1],
            label: 'Cooktop Material',
            options: materialUrls
        },
        levaTowerMaterial: {
            value: materialUrls[2],
            label: 'Tower Material',
            options: materialUrls
        }
    })

    const islands = [];

    for (let i = 0; i < levaSinkAmount; i++){
        islands.push(
            <Sink
                key={'sink'+i}
                materialUrl={levaSinkMaterial}
                props={
                    {
                        position: [-1, 0, 0 - i],
                        rotation: [0, 0, 0],
                        scale: [1, 1, 1],
                    }
                }
                bevelled = {true}
            />
        )
    }
    for(let i =0; i < levaCooktopAmount; i++){
        islands.push(
            <Cooktop
                key={'cooktop'+i}
                position={[0, 0, 1.5 + i]}
                materialUrl={levaCooktopMaterial}
                props={
                    {
                        position: [1, 0, 0 - i],
                        rotation: [0, 0, 0],
                        scale: [1, 1, 1],
                    }
                }
                bevelled = {false}

            />
        )
    }
    for(let i =0; i < levaTowerAmount; i++){
        islands.push(
            <Tower
                key={'tower'+i}
                position={[1 + i , 0.5, 0]}
                materialUrl={levaTowerMaterial}
                props={
                    {
                        position: [0, 0, -1 - i],
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