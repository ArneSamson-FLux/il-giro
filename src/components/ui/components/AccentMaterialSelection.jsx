import React from "react";
import { useEffect, useState } from "react";

import useConfig from "../../../store/useConfigStore.jsx";
import useScene from "../../../store/useScene.jsx";

export default function AccentMaterialSelection() {

    const {
        allCategories,
        accentMaterial,
        setAccentMaterial,
    } = useConfig();


    return <>
        <details
            className='config-ui__details'
        >
            <summary>Accent material:
                <span>
                    {' ' + accentMaterial.split('/').slice(-2, -1)[0]}
                </span>
            </summary>

            <div className="config-ui__material-options ">
                {allCategories.metal.map((material, index) => (
                    <div
                        key={index}
                        className={`config-ui__material-options__option ${accentMaterial === material.url ? 'selected-material-n-category' : ""}`}
                        style={{
                            backgroundImage: `url(${material.url}albedo.jpg)`,
                        }}
                        onClick={() => setAccentMaterial(material.url)}
                    ></div>
                ))}
            </div>
        </details>
    </>
}