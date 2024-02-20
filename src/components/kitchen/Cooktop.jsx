import React from 'react';
import * as THREE from 'three'

import { WoodMaterial } from '../Materials.jsx'



export default function Cooktop({position}){
    return <>
        <mesh
            position={position}
        >
            <cylinderGeometry args={[1, 1, 2, 32]}/>
            <WoodMaterial/>
        </mesh>
    </>
}