import React, { useRef } from "react";
import * as THREE from 'three'
import { useGLTF} from "@react-three/drei";

import { useTexture } from '../../../helper/useTexture.tsx';


export default function Reginox({props, materialUrl}) {

    const [albedoTexture, normalTexture, roughnessTexture, metallnessTexture] = useTexture([
        materialUrl+"albedo.jpg",
        materialUrl+"normal.jpg",
        materialUrl+"roughness.jpg",
        materialUrl+"metallic.jpg"
    ]);

    // const aoTexture = useTexture("./images/bakes/Reginox.jpg");
    // aoTexture.flipY = false;

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnessTexture,
        metalness: 1,
        roughness: 0,
        // aoMap: aoTexture,
        // aoMapIntensity: 1,
    });

  
    const { nodes, materials } = useGLTF("./models/Reginox.glb");
   
    return (
        <group 
            name="sink-bowl-group"
            {...props} 
            dispose={null}
        >
            <mesh
                name="sink-bowl-mesh"
                castShadow
                receiveShadow
                geometry={nodes.Reginox.geometry}
                material={material}
                position={[0, 0.782, 0.242]}
            />
        </group>
    );
    }

useGLTF.preload("./models/Reginox.glb");