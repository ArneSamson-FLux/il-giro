import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

export default function Tap1({materialUrl, bevelled, props}){

    const albedoTexture = useTexture(materialUrl+"albedo.jpg");
    const normalTexture = useTexture(materialUrl+"normal.jpg");
    const roughnessTexture = useTexture(materialUrl+"roughness.jpg");
    const metallnesTexture = useTexture(materialUrl+"metallic.jpg");

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        // normalMap: normalTexture,
        // roughnessMap: roughnessTexture,
        metalnessMap: metallnesTexture,
        metalness: 1,
        roughness: 0
    });
    
    const { nodes, materials } = useGLTF("/models//tap1.glb");
    
    return (
        <group 
            name="tap1-group"
            {...props} 
            dispose={null}
        >
            <mesh
                name="tap1-mesh"
                castShadow
                receiveShadow
                geometry={nodes.Tap1.geometry}
                material={material}
                position={[0, 0.973, 0]}
            />
        </group>
    );
}

useGLTF.preload('/models/tap1.glb')