import React, { useRef } from 'react';
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { useTexture } from '../../../helper/useTexture.tsx';

export default function LiquorStand({props, materialUrl}){

    const albedoTexture = useTexture(materialUrl+"albedo.jpg");
    const normalTexture = useTexture(materialUrl+"normal.jpg");
    const roughnessTexture = useTexture(materialUrl+"roughness.jpg");
    const metallnesTexture = useTexture(materialUrl+"metallic.jpg");
    const aoTexture = useTexture("./images/bakes/liquorstand-ao.jpg");
    aoTexture.flipY = false;

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnesTexture,
        metalness: 1,
        roughness: 0,
        aoMap: aoTexture,
        aoMapIntensity: 0.9,
    });


    const { nodes, materials } = useGLTF("./models/liquorStand.glb");
    return (
        <group
            name='liquorStand'
            {...props}
            dispose={null}
        >
            <mesh
                name='liquorStandMesh'
                castShadow
                receiveShadow
                geometry={nodes.liquorStand.geometry}
                material={material}
                position={[0, 1.43, 0]}
            />
        </group>
    );
}

useGLTF.preload('./models/liquorStand.glb')