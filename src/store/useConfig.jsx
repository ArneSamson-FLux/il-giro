import { create } from 'zustand';
import {TextureLoader, MeshStandardMaterial, SRGBColorSpace, ClampToEdgeWrapping, LinearFilter} from 'three';

export default create((set) => {    
    let configData;

    fetch('/data.json')
        .then(response => response.json())
        .then(data => {
            configData = data;
            set({
                woodMaterialTextureUrl: configData.woodMaterial.albedoUrl,
                metalMaterialTextureUrl: configData.metalMaterial.textureUrl
            });
        })
        .catch(error => console.error('Error fetching texture:', error));

    return{
        //materials
        woodMaterialTextureUrl: null,
        metalMaterialTextureUrl: null,

        //config settings
        sinkAmount: 1,
        cooktopAmount: 1,
        towerAmount: 1

    }
})