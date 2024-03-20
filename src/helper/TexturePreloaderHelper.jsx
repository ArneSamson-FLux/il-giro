import useConfig from '../store/useConfig.jsx'
import { useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function TexturePreloader() {

    const {allMaterials} = useConfig();

    let albedoTexture;
    let normalTexture;
    let roughnessTexture;
    let metallnessTexture;

    console.log(allMaterials);

    useEffect(() => {
        allMaterials.map((material) => {
            albedoTexture = new THREE.TextureLoader().load(material.url + "albedo.jpg");
            normalTexture = new THREE.TextureLoader().load(material.url + "normal.jpg");
            roughnessTexture = new THREE.TextureLoader().load(material.url + "roughness.jpg");
            metallnessTexture = new THREE.TextureLoader().load(material.url + "metallic.jpg");
        })
    }, [allMaterials])

    const material = new THREE.MeshStandardMaterial();
    material.map = albedoTexture;
    material.normalMap = normalTexture;
    material.roughnessMap = roughnessTexture;
    material.metalnessMap = metallnessTexture;

    return null;

}