import React from "react";
import { useEffect, useState } from "react";

import useConfig from "../../../store/useConfigStore.jsx";
import useScene from "../../../store/useScene.jsx";

export default function MaterialCategorySelection() {

    const {
        allCategories,
        setMainMaterial,
        setTableTopMaterial,
        mainMaterialCategory,
        setMainMaterialCategory,
        setIsSecondDetailsOpen
    } = useConfig();



    return <>
        <details
            open
            className='config-ui__details'
        >
            <summary>Base material:
                <span>
                    {' ' + mainMaterialCategory}
                </span>
            </summary>

            <div
                className="config-ui__material-options"
            >
                {Object.entries(allCategories).map(([category, materials]) => (
                    <div
                        key={category}
                        className={`config-ui__material-options__option ${mainMaterialCategory === category ? 'selected-material-n-category' : ""}`}
                        onClick={() => {
                            setMainMaterialCategory(category)
                            setIsSecondDetailsOpen(true)
                            setMainMaterial(materials[0].url)

                            switch (category) {
                                case 'metal':
                                    setTableTopMaterial(allCategories['micro topping'][0].url)
                                    break;
                                case 'micro topping':
                                    setTableTopMaterial(allCategories['wood'][0].url)
                                    break;
                                case 'wood':
                                    setTableTopMaterial(allCategories['metal'][0].url)
                                    break;
                            }
                        }}
                        style={{
                            backgroundImage: `url(${materials[0].url}albedo.jpg)`,
                        }}
                    ></div>
                ))}
            </div>
        </details>
    </>
}