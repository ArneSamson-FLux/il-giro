import { create } from 'zustand';

export default create((set) => {    
    let materialData;
    let categoryData;

    fetch('/data.json')
        .then(response => response.json())
        .then(data => {
            categoryData = data.categories;
            materialData = data.materials;
            // console.log('materialData:', materialData);
            // console.log('categoryData:', categoryData);

            const allCategories = {};
            Object.entries(categoryData).forEach(([category, materials]) => {
                allCategories[category] = materials.map(materialName => ({
                    name: materialName,
                    url: materialData[materialName]?.url || '' // Get material URL from material data
                }));
            });

            const allMaterials = Object.entries(materialData).map(([name, material]) => ({
                name,
                url: material.url
            }));

            // console.log('allMaterials:', allMaterials);
            console.log('allCategories:', allCategories);

            set({ allMaterials, allCategories });
        })
        .catch(error => console.error('Error fetching texture:', error));

    return{
        //materials
        allMaterials: [],
        allCategories: [],

        //config settings_______________________________________________________________________________
        sinkAmount: 1,
        cooktopAmount: 1,
        towerAmount: 1,

        sinkMaterial: "./placeholder/",
        cooktopMaterial: "./placeholder/",
        towerMaterial: "./placeholder/",
        
        mainMaterial: "./placeholder/",
        accentMaterial: "./placeholder/",
        tableTopMaterial: "./placeholder/",

        sinkBevelled: true,
        cooktopBevelled: false,
        towerBevelled: true,
        allBevelled: false,

        tapMaterial: "./placeholder/",
        tapType: '1',

        sinkBowlMaterial: "./placeholder/",

        stoveType: 'electric',

        applianceType: 'fridge',

        towerAccessoryMaterial: "./placeholder/",

        edgeFinish: 'rect',

        doorOpeningRotation: 1.5,

        currentPage: 0,

        dragMode: false,
        isDragging: false,

        isDraggingSink: false,
        isDraggingCooktop: false,
        isDraggingTower: false,

        //Actions_______________________________________________________________________________________
        setSinkAmount: (amount) => set({sinkAmount: amount}),
        setCooktopAmount: (amount) => set({cooktopAmount: amount}),
        setTowerAmount: (amount) => set({towerAmount: amount}),

        //material
        setSinkMaterial: (material) => set({sinkMaterial: material}),
        setCooktopMaterial: (material) => set({cooktopMaterial: material}),
        setTowerMaterial: (material) => set({towerMaterial: material}),

        setMainMaterial: (material) => set({mainMaterial: material}),
        setAccentMaterial: (material) => set({accentMaterial: material}),
        setTableTopMaterial: (material) => set({tableTopMaterial: material}),

        //bevel
        setSinkBevelled: (bevelled) => set({sinkBevelled: bevelled}),
        setCooktopBevelled: (bevelled) => set({cooktopBevelled: bevelled}),
        setTowerBevelled: (bevelled) => set({towerBevelled: bevelled}),
        setAllBevelled: (bevelled) => set({allBevelled: bevelled}),

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
        setTowerAccessoryMaterial: (material) => set({towerAccessoryMaterial: material}),

        //edge finish
        setEdgeFinish: (finish) => set({edgeFinish: finish}),

        //door opening
        setDoorOpeningRotation: (rotation) => set({doorOpeningRotation: rotation}),

        //page
        setCurrentPage: (page) => set({currentPage: page}),

        //drag mode
        setDragMode: (mode) => set({dragMode: mode}),
        setIsDragging: (dragging) => set({isDragging: dragging}),

        setIsDraggingSink: (dragging) => set({isDraggingSink: dragging}),
        setIsDraggingCooktop: (dragging) => set({isDraggingCooktop: dragging}),
        setIsDraggingTower: (dragging) => set({isDraggingTower: dragging}),

    }
})