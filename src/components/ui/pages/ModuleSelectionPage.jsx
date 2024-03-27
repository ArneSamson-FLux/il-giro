import React, { useState } from "react";

import useConfigStore from "../../../store/useConfigStore.jsx";

import ModuleSelectionButtons from "../components/ModuleSelectionButtons.jsx";
import DoorRotationToggle from "../components/toggle/DoorRotationToggle.jsx";

export default function ModuleSelectionPage() {

    const {
        sinkChosen,
        cooktopChosen,
        towerChosen,
        tableChosen,

        setSinkChosen,
        setCooktopChosen,
        setTowerChosen,
        setTableChosen,
    } = useConfigStore();

    const moduleOptions = [
        { label: "Sink", value: "sink", chosen: sinkChosen, setChosen: setSinkChosen },
        { label: "Cooktop", value: "cooktop", chosen: cooktopChosen, setChosen: setCooktopChosen },
        { label: "Tower", value: "tower", chosen: towerChosen, setChosen: setTowerChosen },
        { label: "Table", value: "table", chosen: tableChosen, setChosen: setTableChosen },
    ];

    return <>

        <div
            className='config-ui__title'
        >
            <span><h2>Choose your modules</h2></span>
        </div>

        <div
            className='config-ui__options'
        >
            <ModuleSelectionButtons
                summary="Select module(s): "
                options={moduleOptions}
            />


        </div>
    </>
}