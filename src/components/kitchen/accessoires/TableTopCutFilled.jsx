import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

export default function TableTopCutFilled({props, materialUrl}){

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
        metalness: 0,
        roughness: 1,
    });


    const { nodes, materials } = useGLTF("./models/table-top-cut-filled.glb");
    return (
        <group
            name='tabletop'
            {...props}
            dispose={null}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['table-top-cut-filled'].geometry}
                // material={nodes['table-top-cut'].material}
                material={material}
                scale={[1.111, 1, 1.111]}
            />
        </group>
    );
}

useGLTF.preload('./models/table-top-cut-filled.glb')