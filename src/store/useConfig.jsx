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

        //config settings_______________________________________________________________________________
        sinkAmount: 1,
        cooktopAmount: 1,
        towerAmount: 1,

        sinkMaterial: null,
        cookTopMaterial: null,
        towerMaterial: null,

        sinkBevelled: false,
        cooktopBevelled: false,
        towerBevelled: true,

        tapMaterial: null,
        tapType: 'tap1',

        sinkBowlMaterial: null,

        stoveType: 'gas',

        applianceType: 'oven',

        towerAccessoryMaterial: null,

        //Actions_______________________________________________________________________________________
        setSinkAmount: (amount) => set({sinkAmount: amount}),
        setCooktopAmount: (amount) => set({cooktopAmount: amount}),
        setTowerAmount: (amount) => set({towerAmount: amount}),

        //material
        setSinkMaterial: (material) => set({sinkMaterial: material}),
        setCooktopMaterial: (material) => set({cooktopMaterial: material}),
        setTowerMaterial: (material) => set({towerMaterial: material}),

        //bevel
        setSinkBevelled: (bevelled) => set({sinkBevelled: bevelled}),
        setCooktopBevelled: (bevelled) => set({cooktopBevelled: bevelled}),
        setTowerBevelled: (bevelled) => set({towerBevelled: bevelled}),

        //tap
        setTapMaterial: (material) => set({tapMaterial: material}),
        setTapType: (type) => set({tapType: type}),

        //sink
        setSinkBowlMaterial: (material) => set({sinkBowlMaterial: material}),

        //stove
        setStoveType: (type) => set({stoveType: type}),

        //appliance
        setApplianceType: (type) => set({applianceType: type}),

        //tower accessory
        setTowerAccessoryMaterial: (material) => set({towerAccessoryMaterial: material})

    }
})