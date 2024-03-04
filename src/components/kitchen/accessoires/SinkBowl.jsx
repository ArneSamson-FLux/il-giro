import React, { useRef } from "react";
import * as THREE from 'three'
import { useGLTF, useTexture } from "@react-three/drei";

export default function SinkBowl({props, materialUrl}) {

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
        metalness: 1,
        roughness: 0
    });

  
    const { nodes, materials } = useGLTF("./models/sink-bowl.glb");
   
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
                geometry={nodes.sink001.geometry}
                material={material}
                position={[0, 0.917, 0.26]}
                scale={[0.197, 0.261, 0.197]}
            />
        </group>
    );
    }

useGLTF.preload("./models/sink-bowl.glb");