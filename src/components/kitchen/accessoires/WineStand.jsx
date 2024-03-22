import React, { useRef } from 'react';
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { useTexture } from '../../../helper/useTexture.tsx';

export default function WineStand({ props, materialUrl, size }) {

    const albedoTexture = useTexture(materialUrl + "albedo.jpg");
    const normalTexture = useTexture(materialUrl + "normal.jpg");
    const roughnessTexture = useTexture(materialUrl + "roughness.jpg");
    const metallnesTexture = useTexture(materialUrl + "metallic.jpg");
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


    const { nodes } = useGLTF("./models/winestand.glb");
    return (
        <group
            name='liquorStand'
            {...props}
            dispose={null}
        >
            {size === 'tall' &&
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['tall-stand'].geometry}
                    material={material}
                />
            }
            {size === 'medium' &&
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['medium-stand'].geometry}
                    material={material}
                />
            }
            {size === 'small' &&
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['small-stand'].geometry}
                    material={material}
                />
            }
        </group>
    );
}

useGLTF.preload('./models/winestand.glb')