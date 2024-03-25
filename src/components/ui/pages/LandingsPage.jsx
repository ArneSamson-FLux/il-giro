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
        setSinkRotation,
        setCooktopPosition,
        setCooktopRotation,
        setTowerPosition,
        setTablePosition,

        setLandingPageVisible,
    } = useConfig();

    const {
        setCameraFocus,
    } = useScene();

    useEffect(() => {
        setPositions();
    }, [sinkChosen, cooktopChosen, towerChosen, tableChosen, setSinkPosition, setCooktopPosition, setTowerPosition, setTablePosition]);


    function setPositions() {
        switch (true) {
            case sinkChosen && cooktopChosen && towerChosen && tableChosen:
                setSinkPosition([-1.5, 0, 0]);
                setSinkRotation([0, 0.5, 0]);
                setCooktopPosition([1.5, 0, 0]);
                setCooktopRotation([0, -0.5, 0]);
                setTowerPosition([0, 0, -1]);
                setTablePosition([0, 0, 0]);
                break;
            case sinkChosen && cooktopChosen && towerChosen:
                setSinkPosition([-1.5, 0, 0]);
                setSinkRotation([0, 0.5, 0]);
                setCooktopPosition([1.5, 0, 0]);
                setCooktopRotation([0, -0.5, 0]);
                setTowerPosition([0, 0, -1]);
                break;
            case sinkChosen && cooktopChosen && tableChosen:
                setSinkPosition([-1.5, 0, 0]);
                setSinkRotation([0, 0.5, 0]);
                setCooktopPosition([1.5, 0, 0]);
                setCooktopRotation([0, -0.5, 0]);
                setTablePosition([0, 0, 0]);
                break;
            case sinkChosen && towerChosen && tableChosen:
                setSinkPosition([-1.5, 0, 0]);
                setSinkRotation([0, 0.5, 0]);
                setTowerPosition([0, 0, -1]);
                setTablePosition([0, 0, 0]);
                break;
            case cooktopChosen && towerChosen && tableChosen:
                setCooktopPosition([1.5, 0, 0]);
                setCooktopRotation([0, -0.5, 0]);
                setTowerPosition([0, 0, -1]);
                setTablePosition([0, 0, 0]);
                break;
            case sinkChosen && cooktopChosen:
                setSinkPosition([-1, 0, 0]);
                setSinkRotation([0, 0.5, 0]);
                setCooktopPosition([1, 0, 0]);
                setCooktopRotation([0, -0.5, 0]);
                break;
            case sinkChosen && towerChosen:
                setSinkPosition([-1, 0, 0]);
                setSinkRotation([0, 0.5, 0]);
                setTowerPosition([1, 0, 0]);
                break;
            case sinkChosen && tableChosen:
                setSinkPosition([-1, 0, 0]);
                setSinkRotation([0, 0.5, 0]);
                setTablePosition([0, 0, 0]);
                break;
            case cooktopChosen && towerChosen:
                setCooktopPosition([-1, 0, 0]);
                setCooktopRotation([0, -0.5, 0]);
                setTowerPosition([1, 0, 0]);
                setCooktopRotation([0, 0.5, 0]);
                break;
            case cooktopChosen && tableChosen:
                setCooktopPosition([1.5, 0, 0]);
                setCooktopRotation([0, -0.5, 0]);
                setTablePosition([0, 0, 0]);
                break;
            case towerChosen && tableChosen:
                setTowerPosition([-1, 0, -1]);
                setTablePosition([0, 0, 0]);
                break;
            case sinkChosen:
                setSinkPosition([0, 0, 0]);
                setSinkRotation([0, 0, 0]);
                break;
            case cooktopChosen:
                setCooktopPosition([0, 0, 0]);
                setCooktopRotation([0, 0, 0]);
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
                    <h2>The Sink</h2>
                    <img src="/images/UI/sink.webp" alt="sink render" />
                </div>
                <div
                    className={`landings-page__module ${cooktopChosen ? 'landings-page__module--chosen' : ''}`}
                    onClick={() => {
                        setCooktopChosen(!cooktopChosen);
                    }
                    }
                >
                    <h2>The Cooktop</h2>
                    <img src="/images/UI/cooktop.webp" alt="cooktop render" />
                </div>
                <div
                    className={`landings-page__module ${towerChosen ? 'landings-page__module--chosen' : ''}`}
                    onClick={() => {
                        setTowerChosen(!towerChosen);
                    }
                    }
                >
                    <h2>The Tower</h2>
                    <img src="/images/UI/tower.webp" alt="tower render" />
                </div>
                <div
                    className={`landings-page__module ${tableChosen ? 'landings-page__module--chosen' : ''}`}
                    onClick={() => {
                        setTableChosen(!tableChosen);
                    }
                    }
                >
                    <h2>The Island</h2>
                </div>
            </div>

            <p>*select at least one</p>

            <BevelledSelection />

            <button
                className="landings-page__start"
            >
                <h5
                    onClick={() => {
                        setLandingPageVisible(false);
                        setCameraFocus([0, 1, 0]);
                        setPositions();
                    }
                    }
                >
                    Start configuring
                </h5>
            </button>


        </div>
    </>
}