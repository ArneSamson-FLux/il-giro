import { create } from 'zustand';

export default create((set) => {

    return {

        toolTip: {
            target: null,
            content: "",
            active: false,
        },
        currentPage: 0,


        setToolTip: (target, content, active) =>
            set((state) => ({
                toolTip: {
                    target,
                    content,
                    active,
                },
            })),
        setCurrentPage: (page) => set({ currentPage: page }),


    }
});