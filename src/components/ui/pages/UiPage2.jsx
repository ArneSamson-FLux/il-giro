import React from "react";

import useConfig from "../../../store/useConfig.jsx";

import MaterialCategorySelection from "../components/MaterialCategorySelection.jsx";
import MaterialSelection from "../components/MaterialSelection.jsx";
import AccentMaterialSelection from "../components/AccentMaterialSelection.jsx";
import TableTopMaterialSelection from "../components/TableTopMaterialSelection.jsx";

export default function UiPage1() {

    return <>

        <div
            className='config-ui__title'
        >
            <span><h2>1. Materials</h2></span>
        </div>

        <div
            className='config-ui__options'
        >

            <MaterialCategorySelection

            />

            <MaterialSelection

            />

            <AccentMaterialSelection

            />

            <TableTopMaterialSelection

            />

        </div>
    </>
}