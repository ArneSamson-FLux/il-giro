import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

import useConfig from '../store/useConfig.jsx';

import ConfigNav from './ui/components/ConfigNav.jsx';
import ExtraButtons from './ui/components/ExtraButtons.jsx';

import UiPage1 from './ui/pages/UiPage1.jsx';
import UiPage2 from './ui/pages/UiPage2.jsx';

import MaterialCategorySelection from './ui/components/MaterialCategorySelection.jsx';
import MaterialSelection from './ui/components/MaterialSelection.jsx';
import AccentMaterialSelection from './ui/components/AccentMaterialSelection.jsx';
import TableTopMaterialSelection from './ui/components/TableTopMaterialSelection.jsx';

export default function ConfigUi() {

    const {
        allMaterials,
        allCategories,

        mainMaterial,
        setMainMaterial,

        mainMaterialCategory,

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

                        <UiPage1 />

                    </>}

                    {currentPage === 1 && <>
                        <UiPage2 />
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