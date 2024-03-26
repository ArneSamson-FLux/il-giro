import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

import useConfig from '../store/useConfigStore.jsx';
import useUIStore from '../store/useUIStore.jsx';

import ConfigNav from './ui/components/nav/ConfigNav.jsx';
import ExtraButtons from './ui/components/buttons/ExtraButtons.jsx';
import ToolTip from './ui/components/buttons/ToolTip.jsx';

import LandingsPage from './ui/pages/LandingsPage.jsx';
import UiPage1 from './ui/pages/UiPage1.jsx';
import UiPage2 from './ui/pages/UiPage2.jsx';
import UiPage3 from './ui/pages/UiPage3.jsx';

export default function ConfigUi() {

    const {
        allMaterials,
        allCategories,

        mainMaterial,
        setMainMaterial,

        accentMaterial,
        setAccentMaterial,

        setTableTopMaterial,

        tapType,
        setTapType,

        stoveType,
        setStoveType,

        applianceType,
        setApplianceType,
        wineStandSize,
        setWineStandSize,

        doorOpeningRotation,
        setDoorOpeningRotation,

    } = useConfig();

    const {
        currentPage,
        landingPageVisible,
    } = useUIStore();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const lastMaterial = allMaterials[allMaterials.length - 1];

        if (lastMaterial) {
            setLoaded(true);

            if (loaded) return;

            setMainMaterial(allMaterials[0].url);
            setAccentMaterial(allCategories['metal'][0].url);
            setTableTopMaterial(allCategories['metal'][0].url);

        }
    }, [allMaterials,

        mainMaterial,
        setMainMaterial,

        accentMaterial,
        setAccentMaterial
    ]);



    return (
        <>
            {landingPageVisible &&
                <LandingsPage />
            }

            <ToolTip />

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
                        <UiPage3 />
                    </>}

                    {currentPage === 3 && <>

                        <div
                            className='config-ui__title'
                        >
                            <span><h2>4. The Sink</h2></span>
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