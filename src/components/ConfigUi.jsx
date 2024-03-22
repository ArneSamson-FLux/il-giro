import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

import useConfig from '../store/useConfig.jsx';
import useScene from '../store/useScene.jsx';

import ConfigNav from './ui/ConfigNav.jsx';
import ExtraButtons from './ui/ExtraButtons.jsx';

export default function ConfigUi() {

    const {
        setCameraFocus,
        setIsFocussedOnIsland,
    } = useScene();

    const {
        allMaterials,
        allCategories,

        mainMaterial,
        setMainMaterial,

        accentMaterial,
        setAccentMaterial,

        tableTopMaterial,
        setTableTopMaterial,

        allBevelled,
        setAllBevelled,

        tapType,
        setTapType,

        stoveType,
        setStoveType,

        applianceType,
        setApplianceType,
        wineStandSize,
        setWineStandSize,

        edgeFinish,
        setEdgeFinish,

        doorOpeningRotation,
        setDoorOpeningRotation,

        currentPage,
    } = useConfig();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const lastMaterial = allMaterials[allMaterials.length - 1];

        if (lastMaterial) {
            setLoaded(true);

            if (loaded) return;

            setMainMaterial(allMaterials[5].url);
            setAccentMaterial(allMaterials[6].url);
            setTableTopMaterial(allCategories['micro topping'][0].url);

        }
    }, [allMaterials,

        mainMaterial,
        setMainMaterial,

        accentMaterial,
        setAccentMaterial
    ]);


    const [materialCategory, setMainMaterialCategory] = useState('metal');
    const [isSecondDetailsOpen, setIsSecondDetailsOpen] = useState(false);


    return (
        <>

            <ExtraButtons />

            <div className='config-wrapper'>

                {!loaded && <p>Loading UI...</p>}

                {loaded && <div
                    className='config-ui'
                >

                    <ConfigNav />

                    {currentPage === 0 && <>

                        <div
                            className='config-ui__title'
                        >
                            <span><h2>1. Materials</h2></span>
                        </div>

                        <div
                            className='config-ui__options'
                        >

                            <details
                                open
                                className='config-ui__details'
                            >
                                <summary>Base material:
                                    <span>
                                        {' ' + materialCategory}
                                    </span>
                                </summary>

                                <div
                                    className="config-ui__material-options"
                                >
                                    {Object.entries(allCategories).map(([category, materials]) => (
                                        <div
                                            key={category}
                                            className={`config-ui__material-options__option ${materialCategory === category ? 'selected-material-n-category' : ""}`}
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

                            <details
                                open={isSecondDetailsOpen}
                                className='config-ui__details'
                            >
                                <summary>Choices in
                                    <span> {materialCategory}</span>
                                </summary>

                                <div
                                    className="config-ui__material-options"
                                >
                                    {allCategories[materialCategory].map((material, index) => (
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

                            <details
                                className='config-ui__details'
                            >
                                <summary>Tabletop material:
                                    <span>
                                        {' ' + tableTopMaterial.split('/').slice(-2, -1)[0]}
                                    </span>
                                </summary>

                                {materialCategory !== 'micro topping' && <>
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

                                {materialCategory !== 'wood' && <>
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

                                {materialCategory !== 'metal' && <>

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

                        </div>
                    </>}

                    {currentPage === 1 && <>
                        <div
                            className='config-ui__title'
                        >
                            <span><h2>2. Tabletop</h2></span>
                        </div>

                        <div
                            className='config-ui__options'
                        >
                            <details
                                open
                                className='config-ui__details'
                            >
                                <summary>Edge finish:
                                    <span>
                                        {edgeFinish === 'rect' ? ' square' : ' curved'}
                                    </span>
                                </summary>
                                <div
                                    className='config-ui__selection-buttons'
                                >
                                    <button
                                        className={edgeFinish === 'rect' ? 'active-selection-button' : ''}
                                        onClick={() => setEdgeFinish('rect')}
                                    >
                                        Square
                                    </button>
                                    <button
                                        className={edgeFinish === 'curved' ? 'active-selection-button' : ''}
                                        onClick={() => setEdgeFinish('curved')}
                                    >
                                        Curved
                                    </button>
                                </div>
                            </details>
                        </div>
                    </>}

                    {currentPage === 2 && <>
                        <div
                            className='config-ui__title'
                        >
                            <span><h2>3. Extras</h2></span>
                        </div>

                        <div className='config-ui__options'>
                            <details open className='config-ui__details'>
                                <summary>
                                    curved:
                                    <span>{allBevelled ? ' yes' : ' no'}</span>
                                </summary>
                                <label className="config-ui__toggle">
                                    <input
                                        type="checkbox"
                                        checked={allBevelled}
                                        onChange={(e) => setAllBevelled(e.target.checked)}
                                    />
                                    <span className="config-ui__toggle-slider"></span>
                                </label>
                            </details>
                        </div>
                    </>}

                    {currentPage === 3 && <>

                        <div
                            className='config-ui__title'
                        >
                            <span><h2>4. The Sink</h2></span>
                            {/* <span><h1>The</h1></span>
                            <span><h1>Sink</h1></span> */}
                        </div>


                        <div
                            className='config-ui__options'
                        >

                            <details
                                open
                                className='config-ui__details'
                            >
                                <summary>Faucet type:
                                    <span>
                                        {tapType === '1' ? ' Brandwood 3' : ' Bridge'}
                                    </span>
                                </summary>
                                <div
                                    className='config-ui__selection-buttons'
                                >
                                    <button
                                        className={tapType === '1' ? 'active-selection-button' : ''}
                                        onClick={() => setTapType('1')}
                                    >
                                        Brandwood 3
                                    </button>
                                    <button
                                        className={tapType === '2' ? 'active-selection-button' : ''}
                                        onClick={() => setTapType('2')}
                                    >
                                        Bridge
                                    </button>
                                </div>
                            </details>

                        </div>
                    </>}

                    {currentPage === 4 && <>

                        <div
                            className='config-ui__title'
                        >
                            <span><h2>5. The Cooktop</h2></span>
                            {/* <span><h1>The</h1></span>
                            <span><h1>Cooktop</h1></span> */}
                        </div>

                        <div
                            className='config-ui__options'
                        >

                            <details
                                open
                                className='config-ui__details'
                            >
                                <summary>Cooking fire type:
                                    <span>
                                        {stoveType === 'gas' ? ' gas' : ' electric'}
                                    </span>
                                </summary>

                                <div
                                    className='config-ui__selection-buttons'
                                >
                                    <button
                                        className={stoveType === 'gas' ? 'active-selection-button' : ''}
                                        onClick={() => setStoveType('gas')}
                                    >
                                        Gas
                                    </button>
                                    <button
                                        className={stoveType === 'electric' ? 'active-selection-button' : ''}
                                        onClick={() => setStoveType('electric')}
                                    >
                                        Electric
                                    </button>
                                </div>
                            </details>
                        </div>

                    </>}

                    {currentPage === 5 && <>

                        <div
                            className='config-ui__title'
                        >
                            <span><h2>6. The Tower</h2></span>
                            {/* <span><h1>The</h1></span>
                            <span><h1>Tower</h1></span> */}
                        </div>

                        <div
                            className='config-ui__options'
                        >

                            <details
                                open
                                className='config-ui__details'
                            >
                                <summary>Appliance type:
                                    <span>
                                        {applianceType === 'oven' ? ' oven' : applianceType === 'fridge' ? ' wine cooler' : ' shelves'}
                                    </span>
                                </summary>

                                <div
                                    className='config-ui__selection-buttons'
                                >
                                    <button
                                        className={applianceType === 'oven' ? 'active-selection-button' : ''}
                                        onClick={() => setApplianceType('oven')}
                                    >
                                        Oven
                                    </button>
                                    <button
                                        className={applianceType === 'fridge' ? 'active-selection-button' : ''}
                                        onClick={() => setApplianceType('fridge')}
                                    >
                                        Wine cooler
                                    </button>
                                    <button
                                        className={applianceType === 'shelves' ? 'active-selection-button' : ''}
                                        onClick={() => setApplianceType('shelves')}
                                    >
                                        Shelves
                                    </button>
                                </div>
                            </details>

                            <details
                                open
                                className='config-ui__details'
                            >
                                <summary>Winestand size:
                                    <span>
                                        {wineStandSize === 'tall' ? ' tall' : wineStandSize === 'medium' ? ' medium' : ' small'}
                                    </span>
                                </summary>

                                <div
                                    className='config-ui__selection-buttons'
                                >
                                    <button
                                        className={wineStandSize === 'tall' ? 'active-selection-button' : ''}
                                        onClick={() => setWineStandSize('tall')}
                                    >
                                        Tall
                                    </button>
                                    <button
                                        className={wineStandSize === 'medium' ? 'active-selection-button' : ''}
                                        onClick={() => setWineStandSize('medium')}
                                    >
                                        Medium
                                    </button>
                                    <button
                                        className={wineStandSize === 'small' ? 'active-selection-button' : ''}
                                        onClick={() => setWineStandSize('small')}
                                    >
                                        Small
                                    </button>
                                </div>
                            </details>

                        </div>


                        <div
                            className='config-ui__slider'
                        >
                            <h5>Open doors and shelves:</h5>
                            {/* <input
                                type="range"
                                min="0"
                                max="2"
                                step={0.01}
                                value={doorOpeningRotation}
                                onChange={(e) => setDoorOpeningRotation(e.target.value)}
                            /> */}
                            <label className="config-ui__toggle">
                                <input
                                    type="checkbox"
                                    checked={doorOpeningRotation === 1.5}
                                    onChange={(e) => {
                                        setDoorOpeningRotation(e.target.checked ? 1.5 : 0);
                                    }}

                                />
                                <span className="config-ui__toggle-slider"></span>
                            </label>
                        </div>
                    </>}

                </div>
                }

            </div>
        </>
    );
};