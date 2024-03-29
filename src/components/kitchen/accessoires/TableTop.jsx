import React, { useRef } from 'react';
import * as THREE from 'three'
import {  useGLTF } from '@react-three/drei'

import { useTexture } from '../../../helper/useTexture.tsx';


export default function TableTop({props, materialUrl}){

    const [albedoTexture, normalTexture, roughnessTexture, metallnessTexture] = useTexture([
        materialUrl+"albedo.jpg",
        materialUrl+"normal.jpg",
        materialUrl+"roughness.jpg",
        materialUrl+"metallic.jpg"
    ]);

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnessTexture,
        metalness: 1,
        roughness: 1,
    });


    const { nodes, materials } = useGLTF("./models/table-top.glb");
    return (
        <group
            name='tabletop'
            {...props}
            dispose={null}
        >
            <mesh
                name='tabletopMesh'
                castShadow
                receiveShadow
                geometry={nodes.tabletop.geometry}
                material={material}
                scale={[1.111, 1, 1.111]}
            />
        </group>
    );
}

useGLTF.preload('./models/table-top.glb')