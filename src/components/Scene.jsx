import * as THREE from 'three'
import Cooktop from './kitchen/Cooktop.jsx'
import Sink from './kitchen/Sink.jsx'
import Tower from './kitchen/Tower.jsx'
import { useControls } from 'leva'

import useConfig from '../store/useConfig.jsx'

export default function Scene() {

    const { materialUrls ,sinkAmount, cooktopAmount, towerAmount } = useConfig();

    //useControls
    const { levaSinkAmount, levaCooktopAmount, levaTowerAmount
    } = useControls("amount", {
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
        }
    })

    const { levaSinkMaterial, levaCooktopMaterial, levaTowerMaterial
    } = useControls("material", {
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

    const {levaSinkBevelled, levaCooktopBevelled, levaTowerBevelled
    } = useControls("bevel", {
        levaSinkBevelled: {
            value: true,
            label: 'Sink Bevelled'
        },
        levaCooktopBevelled: {
            value: true,
            label: 'Cooktop Bevelled'
        },
        levaTowerBevelled: {
            value: false,
            label: 'Tower Bevelled'
        }
    })

    const {levaTapMaterial, levaTapType
    } = useControls("tap", {
        levaTapMaterial: {
            value: materialUrls[1],
            label: 'Tap Material',
            options: materialUrls
        },
        levaTapType: {
            value: "tap1",
            label: 'Tap Type',
            options: {
                tap1: 'tap1',
                tap2: 'tap2'
            }
        }
    })

    const {LevaStoveType
    } = useControls("stove", {
        LevaStoveType: {
            value: "gas",
            label: 'Stove Type',
            options: {
                gas: 'gas',
                electric: 'electric'
            }
        }
    })

    const {LevaSinkBowlMat
    } = useControls("sinkBowl", {
        LevaSinkBowlMat: {
            value: materialUrls[1],
            label: 'Sink Bowl Material',
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
                        position: [-1 - i, 0, 0],
                        rotation: [0, 0.5, 0],
                        scale: [1, 1, 1],
                    }
                }
                bevelled = {levaSinkBevelled}
                accessoryMaterialUrl={levaTapMaterial}
                tapType={levaTapType}
                sinkBowlMaterial={LevaSinkBowlMat}
            />
        )
    }
    for(let i =0; i < levaCooktopAmount; i++){
        islands.push(
            <Cooktop
                key={'cooktop'+i}
                materialUrl={levaCooktopMaterial}
                props={
                    {
                        position: [1 + i, 0, 0],
                        rotation: [0, -0.5, 0],
                        scale: [1, 1, 1],
                    }
                }
                bevelled = {levaCooktopBevelled}
                stoveType={LevaStoveType}

            />
        )
    }
    for(let i =0; i < levaTowerAmount; i++){
        islands.push(
            <Tower
                key={'tower'+i}
                materialUrl={levaTowerMaterial}
                props={
                    {
                        position: [0, 0, -1 - i],
                        rotation: [0, 0, 0],
                        scale: [1, 1, 1],
                    }
                }
                bevelled = {levaTowerBevelled}

            />
        )
    }
    

    return <>

        {islands}

        <mesh
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
        >
            <planeGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
        </mesh>

        {/* <mesh
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={[1, 1, 1]}
        >
            <sphereGeometry attach="geometry" args={[1, 32, 32]} />
            <meshStandardMaterial
                attach="material"
                color="white"
                metalness={1}
                roughness={0}
                envMapIntensity={2}
                envMap={null}
            />
        </mesh> */}
    
    </>
}