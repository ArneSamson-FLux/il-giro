import React from "react";
import { useEffect, useState } from "react";

import useConfig from "../../../store/useConfigStore.jsx";
import useScene from "../../../store/useScene.jsx";
import useUIStore from "../../../store/useUIStore.jsx";

export default function MaterialSelection() {

    const {
        allCategories,
        mainMaterial,
        setMainMaterial,
        mainMaterialCategory,
    } = useConfig();

    const { isSecondDetailsOpen } = useUIStore();


    return <>
        <details
            open={isSecondDetailsOpen}
            className='config-ui__details'
        >
            <summary>Choices in
                <span> {mainMaterialCategory}</span>
            </summary>

            <div
                className="config-ui__material-options"
            >
                {allCategories[mainMaterialCategory].map((material, index) => (
                    <div
                        key={index}
                        className={`config-ui__material-options__option ${mainMaterial === material.url ? 'selected-material-n-category' : ""}`}
                        onClick={() => {
                            setMainMaterial(material.url)
                        }}
                        style={{
                            backgroundImage: `url(${material.url}albedo.jpg)`,
                        }}
                    ></div>
                ))}
            </div>
        </details>
    </>
}