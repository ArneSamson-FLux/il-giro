import { create } from 'zustand';

export default create((set) => {

    return {
        cameraCoords: [0, 2, 4],

        setCameraCoords: (coords) => set({ cameraCoords: coords }),
    }
});