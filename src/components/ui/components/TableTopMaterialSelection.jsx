import React from "react";
import { useEffect, useState } from "react";

import useConfig from "../../../store/useConfig.jsx";
import useScene from "../../../store/useScene.jsx";

export default function AccentMaterialSelection() {

    const {
        allCategories,
        tableTopMaterial,
        setTableTopMaterial,
        mainMaterialCategory
    } = useConfig();


    return <>
        <details
            className='config-ui__details'
        >
            <summary>Tabletop material:
                <span>
                    {' ' + tableTopMaterial.split('/').slice(-2, -1)[0]}
                </span>
            </summary>

            {mainMaterialCategory !== 'micro topping' && <>
                <div className="config-ui__material-options ">
                    {allCategories['micro topping'].map((material, index) => (
                        <div
                            key={index}
                            className={`config-ui__material-options__option ${tableTopMaterial === material.url ? 'selected-material-n-category' : ""}`}
                            onClick={() => {
                                setTableTopMaterial(material.url)
                            }}
                            style={{
                                backgroundImage: `url(${material.url}albedo.jpg)`,
                            }}
                        ></div>
                    ))}
                </div>
            </>}

            {mainMaterialCategory !== 'wood' && <>
                <div className="config-ui__material-options ">
                    {allCategories['wood'].map((material, index) => (
                        <div
                            key={index}
                            className={`config-ui__material-options__option ${tableTopMaterial === material.url ? 'selected-material-n-category' : ""}`}
                            onClick={() => {
                                setTableTopMaterial(material.url)
                            }}
                            style={{
                                backgroundImage: `url(${material.url}albedo.jpg)`,
                            }}
                        ></div>
                    ))}
                </div>
            </>}

            {mainMaterialCategory !== 'metal' && <>

                <div className="config-ui__material-options ">
                    {allCategories['metal'].map((material, index) => (
                        material.url.includes('inox') &&
                        <div
                            key={index}
                            className={`config-ui__material-options__option ${tableTopMaterial === material.url ? 'selected-material-n-category' : ""}`}
                            onClick={() => {
                                setTableTopMaterial(material.url)
                            }}
                            style={{
                                backgroundImage: `url(${material.url}albedo.jpg)`,
                            }}
                        ></div>
                    ))}
                </div>
            </>}



        </details>
    </>
}