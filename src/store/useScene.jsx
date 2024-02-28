import { create } from 'zustand';

export default create((set) => {

    return {
        cameraCoords: [0, 2, 4],

        cameraFocus: [0, 0, 0],

        setCameraCoords: (coords) => set({ cameraCoords: coords }),
        setCameraFocus: (coords) => set({ cameraFocus: coords }),
    }
});