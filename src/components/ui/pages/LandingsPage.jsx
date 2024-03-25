import React, { useEffect } from "react";

import useConfig from "../../../store/useConfig";
import useScene from "../../../store/useScene";

import BevelledSelection from "../components/BevelledSelection";

export default function LandingsPage() {

    const {
        sinkChosen,
        cooktopChosen,
        towerChosen,
        setSinkChosen,
        setCooktopChosen,
        setTowerChosen,

        setLandingPageVisible,
    } = useConfig();

    const {
        setCameraFocus,
    } = useScene();


    return <>
        <div
            className='landings-page'
        >
            <h1>Choose the wanted modules</h1>

            <div
                className='landings-page__modules'
            >
                <div
                    className={`landings-page__module ${sinkChosen ? 'landings-page__module--chosen' : ''}`}
                    onClick={() => {
                        setSinkChosen(!sinkChosen);
                    }
                    }
                >
                    <h3>The Sink</h3>
                </div>
                <div
                    className={`landings-page__module ${cooktopChosen ? 'landings-page__module--chosen' : ''}`}
                    onClick={() => {
                        setCooktopChosen(!cooktopChosen);
                    }
                    }
                >
                    <h3>The Cooktop</h3>
                </div>
                <div
                    className={`landings-page__module ${towerChosen ? 'landings-page__module--chosen' : ''}`}
                    onClick={() => {
                        setTowerChosen(!towerChosen);
                    }
                    }
                >
                    <h3>The Tower</h3>
                </div>
                <div
                    className='landings-page__module'
                >
                    <h3>The Island</h3>
                </div>
            </div>

            <BevelledSelection />

            <h5
                className='landings-page__start'
                onClick={() => {
                    setLandingPageVisible(false);
                    setCameraFocus([0, 1, 0]);
                }
                }
            >
                Start configuring
            </h5>

        </div>
    </>
}