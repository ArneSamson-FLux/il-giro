import * as THREE from 'three'
import Cooktop from './kitchen/Cooktop.jsx'
import Sink from './kitchen/Sink.jsx'
import Tower from './kitchen/Tower.jsx'
import { useControls } from 'leva'

import useConfig from '../store/useConfig.jsx'

export default function Scene() {

    const {
        materialUrls,
        sinkAmount, 
        cooktopAmount, 
        towerAmount, 
        sinkMaterial,
        cooktopMaterial,
        towerMaterial, 
        sinkBevelled,
        cooktopBevelled,
        towerBevelled,
        tapMaterial,
        tapType,
        sinkBowlMaterial,
        stoveType,
        applianceType,
        towerAccessoryMaterial
    } = useConfig();

    //useControls
    const {levaDoorOpening
    } = useControls("door", {
        levaDoorOpening: {
            value: 1.5,
            min: 0,
            max: 2,
            step: 0.01,
            label: 'Door Opening'
        }
    })

    const islands = [];

    for (let i = 0; i < sinkAmount; i++){
        islands.push(
            <Sink
                key={'sink'+i}
                materialUrl={
                    sinkMaterial ? sinkMaterial : materialUrls[0]
                }
                props={
                    {
                        position: [-1.5 - i, 0, 0],
                        rotation: [0, 0.5, 0],
                        scale: [1, 1, 1],
                    }
                }
                bevelled = {sinkBevelled}
                accessoryMaterialUrl={
                    tapMaterial ? tapMaterial : materialUrls[1]
                }
                tapType={tapType}
                sinkBowlMaterial={
                    sinkBowlMaterial ? sinkBowlMaterial : materialUrls[8]
                }
            />
        )
    }
    for(let i =0; i < cooktopAmount; i++){
        islands.push(
            <Cooktop
                key={'cooktop'+i}
                materialUrl={
                    cooktopMaterial ? cooktopMaterial : materialUrls[1]
                }
                props={
                    {
                        position: [1.5 + i, 0, 0],
                        rotation: [0, -0.5, 0],
                        scale: [1, 1, 1],
                    }
                }
                bevelled = {cooktopBevelled}
                stoveType={stoveType}

            />
        )
    }
    for(let i =0; i < towerAmount; i++){
        islands.push(
            <Tower
                key={'tower'+i}
                materialUrl={
                    towerMaterial ? towerMaterial : materialUrls[4]
                }
                props={
                    {
                        position: [0, 0, -1 - i],
                        rotation: [0, 0, 0],
                        scale: [1, 1, 1],
                    }
                }
                bevelled = {towerBevelled}
                doorOpening = {levaDoorOpening}
                fridgeOrOven = {applianceType}
                accessoryMaterialUrl={
                    towerAccessoryMaterial ? towerAccessoryMaterial : materialUrls[5]
                }

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