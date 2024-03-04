import React, { useRef } from "react";
import * as THREE from "three";
import { useTexture, useGLTF } from "@react-three/drei";

export default function Fridge({ props }) {
    const { nodes, materials } = useGLTF("./models/fridge.glb");
    
    return (
        <group
            name="fridge-group-container"
            {...props}
            dispose={null}
        >
            <group 
                name="fridge-group"
                position={[0.006, 0.378, 0.188]} 
                scale={[0.223, 0.271, 0.255]}
            >
                <mesh
                    name="fridge-body-mesh"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube006.geometry}
                    material={materials["frigo rim"]}
                />
                <mesh
                    name="fridge-glass-mesh"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube006_1.geometry}
                    material={materials["frigo glass"]}
                />
            </group>
        </group>
    );
}

useGLTF.preload("./models/fridge.glb");
