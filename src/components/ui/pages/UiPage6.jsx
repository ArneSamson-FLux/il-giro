import React from "react";

import useConfigStore from "../../../store/useConfigStore";

import DetailWithButtons from "../components/DetailWithButtons";
import DoorRotationToggle from "../components/toggle/DoorRotationToggle";

export default function UiPage5() {

    const {

    } = useConfigStore();

    return <>
        <div
            className='config-ui__title'
        >
            <span><h2>Overview</h2></span>
        </div>

        <div
            className='config-ui__options'
        >


        </div>
    </>
}