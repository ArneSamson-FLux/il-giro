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
import UiPage4 from './ui/pages/UiPage4.jsx';
import UiPage5 from './ui/pages/UiPage5.jsx';

export default function ConfigUi() {

    const {
        allMaterials,
        allCategories,

        mainMaterial,
        setMainMaterial,

        accentMaterial,
        setAccentMaterial,

        setTableTopMaterial,

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
            {/* {landingPageVisible &&
                <LandingsPage />
            } */}

            <ToolTip />

            <ExtraButtons />

            <div className='config-wrapper'>

                {!loaded && <p>Loading UI...</p>}

                {loaded && <div
                    className='config-ui'
                >

                    <ConfigNav />

                    {currentPage === 0 && <>
                    </>}

                    {currentPage === 1 && <>
                        <UiPage1 />
                    </>}

                    {currentPage === 2 && <>
                        <UiPage2 />
                    </>}

                    {currentPage === 3 && <>
                        <UiPage3 />
                    </>}

                    {currentPage === 4 && <>
                        <UiPage4 />
                    </>}

                    {currentPage === 5 && <>
                        <UiPage5 />
                    </>}

                </div>
                }

            </div>
        </>
    );
};