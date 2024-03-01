import * as THREE from 'three'
import Cooktop from './kitchen/Cooktop.jsx'
import Sink from './kitchen/Sink.jsx'
import Tower from './kitchen/Tower.jsx'
// import { useControls } from 'leva'

import useConfig from '../store/useConfig.jsx'

export default function Scene() {

    const {
        allMaterials,
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
        towerAccessoryMaterial,
        doorOpeningRotation,

        currentPage,
        setCurrentPage,
    } = useConfig();

    const islands = [];

    for (let i = 0; i < sinkAmount; i++){
        islands.push(
            <Sink
                key={'sink'+i}
                materialUrl={
                    sinkMaterial ? sinkMaterial : allMaterials[0].url
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
                    tapMaterial ? tapMaterial : allMaterials[1].url
                }
                tapType={tapType}
                sinkBowlMaterial={
                    sinkBowlMaterial ? sinkBowlMaterial : allMaterials[8].url
                }
            />
        )
    }
    for(let i =0; i < cooktopAmount; i++){
        islands.push(
            <Cooktop
                key={'cooktop'+i}
                materialUrl={
                    cooktopMaterial ? cooktopMaterial : allMaterials[0].url
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
                    towerMaterial ? towerMaterial : allMaterials[4].url
                }
                props={
                    {
                        position: [0, 0, -1 - i],
                        rotation: [0, 0, 0],
                        scale: [1, 1, 1],
                    }
                }
                bevelled = {towerBevelled}
                doorOpening = {doorOpeningRotation}
                fridgeOrOven = {applianceType}
                accessoryMaterialUrl={
                    towerAccessoryMaterial ? towerAccessoryMaterial : allMaterials[5].url
                }

            />
        )
    }

    return <>

        {islands}

        {/* <mesh
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
        >
            <planeGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
        </mesh> */}

        {/* <mesh
            position={[0, -0.05, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
        > */}
            {/* <planeGeometry attach="geometry" args={[100, 100]} /> */}
            {/* <shadowMaterial attach="material" opacity={0.3} /> */}
        {/* </mesh> */}

    
    </>
}