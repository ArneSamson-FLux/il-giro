import { create } from 'zustand';
import {TextureLoader, MeshStandardMaterial, SRGBColorSpace, ClampToEdgeWrapping, LinearFilter} from 'three';

export default create((set) => {    
    let configData;

    fetch('/src/data/data.json')
        .then(response => response.json())
        .then(data => {
            configData = data;
            set({
                woodMaterialUrl: configData.woodMaterial.url,
                metalMaterialUrl: configData.metalMaterial.url,
                leatherMaterialUrl: configData.leatherMaterial.url
            });
        })
        .catch(error => console.error('Error fetching texture:', error));

    return{
        //materials
        woodMaterialUrl: null,
        metalMaterialUrl: null,
        leatherMaterialUrl: null,

        //config settings
        sinkAmount: 1,
        cooktopAmount: 1,
        towerAmount: 1

    }
})