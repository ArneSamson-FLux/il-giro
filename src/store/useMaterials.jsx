import { create } from 'zustand';
import {TextureLoader, MeshStandardMaterial, SRGBColorSpace, ClampToEdgeWrapping, LinearFilter} from 'three';

export default create((set) => {    
    let configData;

    fetch('/data.json')
        .then(response => response.json())
        .then(data => {
            configData = data;
            console.log('configData:', configData);
            set({
                woodMaterialTexture: configData.woodMaterial.textureUrl,
                marbleMaterialTexture: configData.marbleMaterial.textureUrl
            });
        })
        .catch(error => console.error('Error fetching texture:', error));

    return{
        woodMaterialTexture: null,
        marbleMaterialTexture: null,



    }
})