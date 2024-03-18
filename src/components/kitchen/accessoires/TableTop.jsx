import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

export default function TableTop({props, materialUrl}){

const albedoTexture = useTexture(materialUrl+"albedo.jpg");
    const normalTexture = useTexture(materialUrl+"normal.jpg");
    const roughnessTexture = useTexture(materialUrl+"roughness.jpg");
    const metallnesTexture = useTexture(materialUrl+"metallic.jpg");

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnesTexture,
        metalness: 0,
        roughness: 1,
        aoMapIntensity: 0.9,
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
                geometry={nodes.tabletop001.geometry}
                material={material}
                scale={[1.111, 1, 1.111]}
            />
        </group>
    );
}

useGLTF.preload('./models/table-top.glb')