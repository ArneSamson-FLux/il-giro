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

    // useEffect(() => {
    //     setPositions();
    // }, [sinkChosen, cooktopChosen, towerChosen, tableChosen, setSinkPosition, setCooktopPosition, setTowerPosition, setTablePosition]);


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
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '50px',
                }}
            >
                <div>

                    <div
                        className='landings-page__modules'
                    >
                        <div
                            className={`landings-page__module ${sinkChosen ? 'landings-page__module--chosen' : ''}`}
                            onClick={() => {
                                setSinkChosen(!sinkChosen);
                            }}
                        >

                            <h4>The<br />Sink</h4>
                            <img src="/svg/sink-icon.svg" alt="render of sink module" />
                        </div>
                        <div
                            className={`landings-page__module ${cooktopChosen ? 'landings-page__module--chosen' : ''}`}
                            onClick={() => {
                                setCooktopChosen(!cooktopChosen);
                            }
                            }
                        >
                            <h4>The<br />Cooktop</h4>
                            <img src="/svg/cooktop-icon.svg" alt="render of cooktop module" />
                        </div>
                        <div
                            className={`landings-page__module ${towerChosen ? 'landings-page__module--chosen' : ''}`}
                            onClick={() => {
                                setTowerChosen(!towerChosen);
                            }
                            }
                        >
                            <h4>The<br />Tower</h4>
                            <img src="/svg/tower-icon.svg" alt="render of tower module" />
                        </div>
                        <div
                            className={`landings-page__module ${tableChosen ? 'landings-page__module--chosen' : ''}`}
                            onClick={() => {
                                setTableChosen(!tableChosen);
                            }
                            }
                        >
                            <h4>The<br />Table</h4>
                            <img src="/svg/table-icon.svg" alt="render of table module" />
                        </div>
                    </div>

                    <p>*select at least one</p>
                </div>


                <BevelledSelection />

            </div>

            <button
                disabled={!(sinkChosen || cooktopChosen || towerChosen || tableChosen)}
                onClick={() => {
                    setLandingPageVisible(false);
                    setCameraFocus([0, 1, 0]);
                    setPositions();
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