import React from 'react';
import * as THREE from 'three'

import { WoodMaterial } from '../Materials.jsx'



export default function Cooktop(){
    return <>
        <mesh>
            <cylinderGeometry args={[1, 1, 2, 32]}/>
            <WoodMaterial/>
        </mesh>
    </>
}