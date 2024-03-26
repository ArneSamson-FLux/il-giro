import React from "react";

import useConfigStore from "../../../store/useConfigStore.jsx";

import MaterialCategorySelection from "../components/MaterialCategorySelection.jsx";
import MaterialSelection from "../components/MaterialSelection.jsx";
import AccentMaterialSelection from "../components/AccentMaterialSelection.jsx";
import TableTopMaterialSelection from "../components/TableTopMaterialSelection.jsx";

import DetailWithButtons from "../components/DetailWithButtons.jsx";

export default function UiPage1() {

    const {
        applianceType,
        setApplianceType,
        wineStandSize,
        setWineStandSize,
        edgeFinish,
        setEdgeFinish
    } = useConfigStore();

    const applianceTypeOptions = [
        { label: "Oven", value: "oven" },
        { label: "Wine Cooler", value: "fridge" },
        { label: "Shelves", value: "shelves" }
    ];

    const edgeFinishOptions = [
        { label: "Square", value: "rect" },
        { label: "Curved", value: "curved" }
    ];

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