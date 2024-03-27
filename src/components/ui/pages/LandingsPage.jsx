import React, { useEffect } from "react";

import useConfig from "../../../store/useConfigStore";
import useScene from "../../../store/useScene";
import useUIStore from "../../../store/useUIStore";

import BevelledSelection from "../components/BevelledSelection";

export default function LandingsPage() {

    const {
        sinkChosen,
        cooktopChosen,
        towerChosen,
        tableChosen,
        setSinkChosen,
        setCooktopChosen,
        setTowerChosen,
        setTableChosen,

        setSinkPosition,
        setSinkRotation,
        setCooktopPosition,
        setCooktopRotation,
        setTowerPosition,
        setTablePosition,
    } = useConfig();

    const {
        setCameraFocus,
    } = useScene();

    const {
        setLandingPageVisible,
    } = useUIStore();

    return <>
        <div
            className='landings-page'
        >

            <button
                onClick={() => {
                    setLandingPageVisible(false);
                    setCameraFocus([0, 1, 0]);
                }
                }
            >
                <h5
                >
                    Start configuring
                </h5>
            </button>


        </div >
    </>
}