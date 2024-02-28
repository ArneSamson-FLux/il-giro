import { create } from 'zustand';

export default create((set) => {

    return {
        cameraCoords: [0, 2, 4],

        cameraFocus: [0, 1, 0],

        isHovering: false,

        setCameraCoords: (coords) => set({ cameraCoords: coords }),
        setCameraFocus: (coords) => set({ cameraFocus: coords }),
        setIsHovering: (bool) => set({ isHovering: bool }),
    }
});