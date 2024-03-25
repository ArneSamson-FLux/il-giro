import React, { useEffect } from "react";

import useConfig from "../../../store/useConfig";
import useScene from "../../../store/useScene";

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
        setCooktopPosition,
        setTowerPosition,
        setTablePosition,

        setLandingPageVisible,
    } = useConfig();

    const {
        setCameraFocus,
    } = useScene();

    // useEffect(() => {
    //     setPositions();
    // }, [sinkChosen, cooktopChosen, towerChosen, tableChosen, setSinkPosition, setCooktopPosition, setTowerPosition, setTablePosition]);


    function setPositions() {
        switch (true) {
            case sinkChosen && cooktopChosen && towerChosen && tableChosen:
                setSinkPosition([-1.5, 0, 0]);
                setCooktopPosition([1.5, 0, 0]);
                setTowerPosition([0, 0, -1]);
                setTablePosition([0, 0, 0]);
                break;
            case sinkChosen && cooktopChosen && towerChosen:
                setSinkPosition([-1.5, 0, 0]);
                setCooktopPosition([1.5, 0, 0]);
                setTowerPosition([0, 0, -1]);
                break;
            case sinkChosen && cooktopChosen && tableChosen:
                setSinkPosition([-1.5, 0, 0]);
                setCooktopPosition([1.5, 0, 0]);
                setTablePosition([0, 0, 0]);
                break;
            case sinkChosen && towerChosen && tableChosen:
                setSinkPosition([-1.5, 0, 0]);
                setTowerPosition([0, 0, -1]);
                setTablePosition([0, 0, 0]);
                break;
            case cooktopChosen && towerChosen && tableChosen:
                setCooktopPosition([1.5, 0, 0]);
                setTowerPosition([0, 0, -1]);
                setTablePosition([0, 0, 0]);
                break;
            case sinkChosen && cooktopChosen:
                setSinkPosition([-1, 0, 0]);
                setCooktopPosition([1, 0, 0]);
                break;
            case sinkChosen && towerChosen:
                setSinkPosition([-1, 0, 0]);
                setTowerPosition([1, 0, 0]);
                break;
            case sinkChosen && tableChosen:
                setSinkPosition([-1, 0, 0]);
                setTablePosition([0, 0, 0]);
                break;
            case cooktopChosen && towerChosen:
                setCooktopPosition([-1, 0, 0]);
                setTowerPosition([1, 0, 0]);
                break;
            case cooktopChosen && tableChosen:
                setCooktopPosition([1.5, 0, 0]);
                setTablePosition([0, 0, 0]);
                break;
            case towerChosen && tableChosen:
                setTowerPosition([-1, 0, -1]);
                setTablePosition([0, 0, 0]);
                break;
            case sinkChosen:
                setSinkPosition([0, 0, 0]);
                break;
            case cooktopChosen:
                setCooktopPosition([0, 0, 0]);
                break;
            case towerChosen:
                setTowerPosition([0, 0, 0]);
                break;
            case tableChosen:
                setTablePosition([0, 0, 0]);
                break;
        }

    }



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
                    className={`landings-page__module ${tableChosen ? 'landings-page__module--chosen' : ''}`}
                    onClick={() => {
                        setTableChosen(!tableChosen);
                    }
                    }
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
                    setPositions();
                }
                }
            >
                Start configuring
            </h5>

        </div>
    </>
}