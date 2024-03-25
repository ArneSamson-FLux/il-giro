import React from "react";
import { useEffect } from "react";

import useConfig from "../../../store/useConfig.jsx";
import useScene from "../../../store/useScene.jsx";

export default function ExtraButtons() {

    const {

        setSinkChosen,
        setCooktopChosen,
        setTowerChosen,
        setTableChosen,

        currentPage,
        setCurrentPage,
        dragMode,
        setDragMode,
        setLandingPageVisible,
    } = useConfig();

    const {
        setCameraFocus,
    } = useScene();

    const handleZoom = () => {
        if (currentPage === 0) return;
        setCameraFocus([0, 1, 0]);
        setCurrentPage(0);

    }

    const handleDragMode = () => {
        setDragMode(!dragMode);
    }

    const handleBackHome = () => {
        setLandingPageVisible(true);
        setSinkChosen(false);
        setCooktopChosen(false);
        setTowerChosen(false);
        setTableChosen(false);
    }

    return <>
        <div
            className='extra-buttons'
        >
            <div
                className='extra-buttons__zoom-out'
            >
                <button
                    onClick={handleBackHome}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.375 9.75L1 5.375M1 5.375L5.375 1M1 5.375H11.5C12.4283 5.375 13.3185 5.74375 13.9749 6.40013C14.6313 7.0565 15 7.94674 15 8.875V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <div
                className='extra-buttons__zoom-out'
            >
                <button
                    onClick={handleZoom}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='zoom-out__image'>
                        <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19 19L14.65 14.65" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 9H12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* <div
                className={dragMode ? 'extra-buttons__move--active' : 'extra-buttons__move'}
            >
                <button
                    onClick={handleDragMode}
                >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={dragMode ? 'move__image--active' : 'move__image'}>
                        <path d="M4 8L1 11L4 14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 4L11 1L14 4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 18L11 21L8 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18 8L21 11L18 14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 11H21" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11 1V21" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div> */}
        </div>
    </>
}