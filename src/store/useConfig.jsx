import { create } from 'zustand';
import {TextureLoader, MeshStandardMaterial, SRGBColorSpace, ClampToEdgeWrapping, LinearFilter} from 'three';

export default create((set) => {    
    let materialData;

    fetch('/src/data/data.json')
        .then(response => response.json())
        .then(data => {
            materialData = data.materials;
            const materialUrls = Object.values(materialData).map(material => material.url);
            set({ materialUrls });
        })
        .catch(error => console.error('Error fetching texture:', error));

    return{
        //materials
        materialUrls: [],

        //config settings
        sinkAmount: 1,
        cooktopAmount: 1,
        towerAmount: 1

    }
})