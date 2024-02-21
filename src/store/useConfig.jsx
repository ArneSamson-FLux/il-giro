import { create } from 'zustand';
import {TextureLoader, MeshStandardMaterial, SRGBColorSpace, ClampToEdgeWrapping, LinearFilter} from 'three';

export default create((set) => {    
    let materialData;

    fetch('/src/data/data.json')
        .then(response => response.json())
        .then(data => {
            // materialData = data.materials;
            // set({
            //     woodMaterialUrl: materialData.woodMaterial.url,
            //     metalMaterialUrl: materialData.metalMaterial.url,
            //     leatherMaterialUrl: materialData.leatherMaterial.url
            // });

            materialData = data.materials;

            materialData = data.materials;
            const materialUrls = Object.values(materialData).map(material => material.url);
            console.log(materialUrls);
            set({ materialUrls });

            // // Loop over each material in the JSON and create a store item for it
            // Object.entries(materialData).forEach(([materialKey, materialValue]) => {
            //     set((state) => ({
            //         [`${materialKey}Url`]: materialValue.url,
            //         ...state // Ensure to merge with existing state
            //     }));
            // });

        })
        .catch(error => console.error('Error fetching texture:', error));

    return{
        //materials
        // woodMaterialUrl: null,
        // metalMaterialUrl: null,
        // leatherMaterialUrl: null,
        materialUrls: [],

        //config settings
        sinkAmount: 1,
        cooktopAmount: 1,
        towerAmount: 1

    }
})