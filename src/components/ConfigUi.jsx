import React,{useState, useEffect} from 'react';
import useConfig from '../store/useConfig';
import useScene from '../store/useScene';

export default function ConfigUi() {

    const {
        cameraCoords,
        setCameraCoords,
        cameraFocus,
        setCameraFocus,
        isFocussedOnIsland,
        setIsFocussedOnIsland,
    } = useScene();

    const {
        allMaterials,
        allCategories,

        sinkAmount,
        setSinkAmount,
        cooktopAmount,
        setCooktopAmount,
        towerAmount,
        setTowerAmount,

        sinkMaterial,
        setSinkMaterial,
        cooktopMaterial,
        setCooktopMaterial,
        towerMaterial,
        setTowerMaterial,

        sinkBevelled,
        setSinkBevelled,
        cooktopBevelled,
        setCooktopBevelled,
        towerBevelled,
        setTowerBevelled,

        tapMaterial,
        setTapMaterial,
        tapType,
        setTapType,

        sinkBowlMaterial,
        setSinkBowlMaterial,

        stoveType,
        setStoveType,

        applianceType,
        setApplianceType,

        towerAccessoryMaterial,
        setTowerAccessoryMaterial,

        doorOpeningRotation,
        setDoorOpeningRotation,

        currentPage,
        setCurrentPage,

        dragMode,
        setDragMode,
    } = useConfig();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if(allMaterials[0]){
            setLoaded(true);

            if(loaded) return;

            setSinkMaterial(allMaterials[5].url);
            setCooktopMaterial(allMaterials[5].url);
            setTowerMaterial(allMaterials[5].url);
            setTapMaterial(allMaterials[7].url);
            setSinkBowlMaterial(allMaterials[8].url);
            setTowerAccessoryMaterial(allMaterials[8].url);

        }
    }, [allMaterials,
        sinkMaterial,
        setSinkMaterial,
        cooktopMaterial,
        setCooktopMaterial,
        towerMaterial,
        setTowerMaterial,
        tapMaterial,
        setTapMaterial,
        sinkBowlMaterial, 
        setSinkBowlMaterial,
        towerAccessoryMaterial,
        setTowerAccessoryMaterial]);

    useEffect(() => {
        checkPage(currentPage);
    }, [currentPage, setCurrentPage]);

    const handleNext = () => {
        if(currentPage === 3) return;
        checkPage(currentPage + 1);
        setCurrentPage(currentPage + 1);
    }

    const handleBack = () => {
        if(currentPage === 0) return;
        checkPage(currentPage - 1);
        setCurrentPage(currentPage - 1);
    }

    const handleZoom = () => {
        if(currentPage === 0) return;
        checkPage(0);
    }

    const handleDragMode = () => {
        setDragMode(!dragMode);
    }

    const [ materialCategory, setMaterialCategory ] = useState('metal');


    const checkPage = (e) => {
        switch(e){
            case 0:
                setCurrentPage(0);
                setCameraFocus([0, 1, 0]);
                setIsFocussedOnIsland(false);
            break;  
            case 1:
                setCurrentPage(1);
                // setCameraFocus([-1.5, 0.5, 0]);
            break;
            case 2:
                setCurrentPage(2);
                // setCameraFocus([1.5, 0.5, 0]);
            break;
            case 3:
                setCurrentPage(3);
                // setCameraFocus([0, 1, -1.5]);
            break;
        }
    }

    return (
        <>
        <div
            className='config-ui__extra-buttons'
        >
            <div
                className='config-ui__zoom-out'
            >
                <button
                    onClick={handleZoom}                        
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='zoom-out__image'>
                        <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19 19L14.65 14.65" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 9H12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

            <div
                className={dragMode ? 'config-ui__move--active' : 'config-ui__move'}
            >
                <button
                    onClick={handleDragMode}
                >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={dragMode ? 'move__image--active' : 'move__image'}>
                        <path d="M4 8L1 11L4 14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 4L11 1L14 4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 18L11 21L8 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18 8L21 11L18 14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 11H21" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11 1V21" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>

        <div className='config-wrapper'>



            {!loaded && <p>Loading UI...</p>}

            
            {loaded &&    <div
                    className='config-ui'
                >

                    <div
                        className='config-ui__nav'
                    >

                        <button
                            style={currentPage === 0 ? {opacity: 0.4} : {opacity: 1}}
                            className={currentPage === 0 ? 'config-ui__nav__button--disabled' : ''}
                            onClick={handleBack}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 8H1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 15L1 8L8 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
  
                        <button
                            style={currentPage === 3 ? {opacity: 0.4} : {opacity: 1}}
                            className={currentPage === 3 ? 'config-ui__nav__button--disabled' : ''}
                            onClick={handleNext}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 1L15 8L8 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                        </button>
                    </div>

                    {currentPage === 0 &&

                        <div
                            className='config-ui__title-and-options'
                        >
                            <h2
                                className='config-ui__title'
                            >
                                <span>Overview</span>
                            </h2>

                            <div
                                className='config-ui__scroll-container'
                            >
                                <details
                                    open
                                    className='config-ui__details'
                                >
                                    <summary>Algemeen Materiaal:
                                        <span>
                                            {/* {' ' + sinkMaterial.split('/').slice(-2, -1)[0]} */}
                                            {' ' + materialCategory}
                                        </span>
                                    </summary>

                                    <div className="config-ui__material-options material-selection material-category-details">
                                        {Object.entries(allCategories).map(([category, materials]) => (
                                            <div
                                                className='material-options__category-wrapper'
                                                key={category}
                                            >
                                                {/* <p>{category}</p> */}
                                                <div className="config-ui__material-options__category">
                                                    <div
                                                        className={`config-ui__material-options__option ${materialCategory === category ? 'selected-material-n-category' : ""}`}
                                                        onClick={() => {
                                                            setMaterialCategory(category)
                                                        }}
                                                        style={{
                                                            backgroundImage: `url(${materials[0].url}albedo.jpg)`, 
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </details>

                                <details
                                    open
                                    className='config-ui__details'
                                >
                                    <summary>Keuzes in categorie
                                        <span> {materialCategory}</span>
                                    </summary>

                                    <div className="config-ui__material-options material-selection">
                                        <div className="config-ui__material-options__category">
                                            {allCategories[materialCategory].map((material, index) => (
                                                <div
                                                    key={index}
                                                    className={`config-ui__material-options__option ${sinkMaterial === material.url ? 'selected-material-n-category' : ""}`}
                                                    onClick={() => {
                                                        setSinkMaterial(material.url)
                                                        setCooktopMaterial(material.url)
                                                        setTowerMaterial(material.url)
                                                    }}
                                                    style={{
                                                        backgroundImage: `url(${material.url}albedo.jpg)`, 
                                                    }}
                                                ></div>
                                                ))}
                                            </div>
                                            </div>
                                </details>
                            </div>

                        </div>
                    }

                    {currentPage === 1 &&
                        <div
                           className='config-ui__title-and-options'
                        >
                            <h1
                                className='config-ui__title'
                            >
                                <span>The</span>
                                <span>Sink</span>
                            </h1>

                            <div
                                className='config-ui__scroll-container'

                            >

                                <details
                                    open
                                    className='config-ui__details'
                                >
                                    <summary>Module Materiaal Categorie: 
                                        <span>
                                            {/* {' ' + sinkMaterial.split('/').slice(-2, -1)[0]} */}
                                            {' ' + materialCategory}
                                        </span>
                                    </summary>

                                    <div className="config-ui__material-options material-selection material-category-details">
                                        {Object.entries(allCategories).map(([category, materials]) => (
                                            <div
                                                className='material-options__category-wrapper'
                                                key={category}
                                            >
                                                <div className="config-ui__material-options__category">
                                                    <div
                                                        className={`config-ui__material-options__option ${materialCategory === category ? 'selected-material-n-category' : ""}`}
                                                        onClick={() => {
                                                            setMaterialCategory(category)
                                                        }}
                                                        style={{
                                                            backgroundImage: `url(${materials[0].url}albedo.jpg)`, 
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </details>

                                <details
                                    open
                                    className='config-ui__details'                                    
                                >
                                    <summary>
                                        Keuzes in categorie
                                        <span> {materialCategory}</span>
                                    </summary>

                                    <div className="config-ui__material-options material-selection">
                                        <div className="config-ui__material-options__category">
                                            {allCategories[materialCategory].map((material, index) => (
                                                <div
                                                    key={index}
                                                    className={`config-ui__material-options__option ${sinkMaterial === material.url ? 'selected-material-n-category' : ""}`}
                                                    onClick={() => setSinkMaterial(material.url)}
                                                    style={{
                                                        backgroundImage: `url(${material.url}albedo.jpg)`, 
                                                    }}
                                                ></div>
                                                ))}
                                        </div>
                                    </div>
                                </details>
                                

                                <details
                                    open
                                    className='config-ui__details'
                                >
                                    <summary>Afgerond: 
                                        <span>
                                            {sinkBevelled ? ' ja' : ' neen'}
                                        </span>
                                    </summary>
                                    <input 
                                        type="checkbox" 
                                        checked={sinkBevelled}
                                        onChange={(e) => setSinkBevelled(e.target.checked)} 
                                    />
                                </details>

                                <details
                                    open
                                    className='config-ui__details'
                                >
                                    <summary>Kraan Materiaal:
                                        <span>
                                            {' ' + tapMaterial.split('/').slice(-2, -1)[0]}
                                        </span>
                                    </summary>

                                    <div className="config-ui__material-options material-selection">
                                        <div className="config-ui__material-options__category">
                                            {allCategories.metal.map((material, index) => (
                                                <div
                                                    key={index}
                                                    className="config-ui__material-options__option"
                                                    style={{
                                                        backgroundImage: `url(${material.url}albedo.jpg)`, 
                                                    }}
                                                    onClick={() => setTapMaterial(material.url)}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>

                                </details>

                                <details
                                    open
                                    className='config-ui__details'
                                >
                                    <summary>Kraan Type:
                                        <span>
                                            {tapType === 'tap1' ? ' standaard' : ' Quooker®'}
                                        </span>
                                    </summary>
                                    <div
                                        className='config-ui__selection-buttons'
                                    >
                                        <button
                                            className={tapType === 'tap1' ? 'active-selection-button' : ''}
                                            onClick={() => setTapType('tap1')}
                                        >
                                            Standard tap
                                        </button>
                                        <button
                                            className={tapType === 'tap2' ? 'active-selection-button' : ''}
                                            onClick={() => setTapType('tap2')}
                                        >
                                            Quooker tap
                                        </button>
                                    </div>
                                </details>

                                <details
                                    open
                                    className='config-ui__details'
                                >
                                    <summary>Wasbak Materiaal:
                                        <span>
                                            {' ' + sinkBowlMaterial.split('/').slice(-2, -1)[0]}
                                        </span>
                                    </summary>

                                    <div className="config-ui__material-options material-selection">
                                        <div className="config-ui__material-options__category">
                                            {allCategories.metal.map((material, index) => (
                                                <div
                                                    key={index}
                                                    className="config-ui__material-options__option"
                                                    style={{
                                                        backgroundImage: `url(${material.url}albedo.jpg)`, 
                                                    }}
                                                    onClick={() => setSinkBowlMaterial(material.url)}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </details>

                            </div>

                        </div>
                    }

                    {currentPage === 2 &&
                        <div
                            className='config-ui__title-and-options'
                        >

                            <h1
                                className='config-ui__title'
                            >
                                <span>The</span>
                                <span>Cooktop</span>
                            </h1>

                            <div
                                className='config-ui__scroll-container'
                            >

                                <details
                                    open
                                    className='config-ui__details'
                                >
                                    <summary>Module Materiaal Categorie:
                                        <span>
                                            {/* {' ' + cooktopMaterial.split('/').slice(-2, -1)[0]} */}
                                            {' ' + materialCategory}
                                        </span>
                                    </summary>

                                    <div className="config-ui__material-options material-selection material-category-details">
                                        {Object.entries(allCategories).map(([category, materials]) => (
                                            <div
                                                className='material-options__category-wrapper'
                                                key={category}
                                            >
                                                <div className="config-ui__material-options__category">
                                                    <div
                                                        className={`config-ui__material-options__option ${materialCategory === category ? 'selected-material-n-category' : ""}`}
                                                        onClick={() => {
                                                            setMaterialCategory(category)
                                                        }}
                                                        style={{
                                                            backgroundImage: `url(${materials[0].url}albedo.jpg)`, 
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </details>

                                <details
                                    open
                                    className='config-ui__details'
                                >
                                    <summary>Keuzes in categorie
                                        <span> {materialCategory}</span>
                                    </summary>

                                    <div className="config-ui__material-options material-selection">
                                        <div className="config-ui__material-options__category">
                                            {allCategories[materialCategory].map((material, index) => (
                                                <div
                                                    key={index}
                                                    className={`config-ui__material-options__option ${cooktopMaterial === material.url ? 'selected-material-n-category' : ""}`}
                                                    onClick={() => setCooktopMaterial(material.url)}
                                                    style={{
                                                        backgroundImage: `url(${material.url}albedo.jpg)`, 
                                                    }}
                                                ></div>
                                                ))}
                                        </div>
                                    </div>
                                </details>

                                <details
                                    open
                                    className='config-ui__details'
                                >
                                    <summary>Afgerond: 
                                        <span>
                                            {cooktopBevelled ? ' ja' : ' neen'}
                                        </span>
                                    </summary>

                                    <input 
                                        type="checkbox" 
                                        checked={cooktopBevelled}
                                        onChange={(e) => setCooktopBevelled(e.target.checked)} 
                                    />
                                </details>

                                    
                                <details
                                    open
                                    className='config-ui__details'
                                >
                                    <summary>Stove Type:
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
                        </div>
                    }

                    {currentPage === 3 &&
                        <div
                            className='config-ui__title-and-options'
                        >

                            <h1
                                className='config-ui__title'
                            >
                                <span>The</span>
                                <span>Tower</span>
                            </h1>

                            <div
                                className='config-ui__scroll-container'
                            >

                                <details
                                    open
                                    className='config-ui__details'
                                >

                                    <summary>Module Materiaal Categorie:
                                        <span>
                                            {/* {' ' + towerMaterial.split('/').slice(-2, -1)[0]} */}
                                            {' ' + materialCategory}
                                        </span>
                                    </summary>

                                    <div className="config-ui__material-options material-selection material-category-details">
                                        {Object.entries(allCategories).map(([category, materials]) => (
                                            <div
                                                className='material-options__category-wrapper'
                                                key={category}
                                            >
                                                <div className="config-ui__material-options__category">
                                                    <div
                                                        className={`config-ui__material-options__option ${materialCategory === category ? 'selected-material-n-category' : ""}`}
                                                        onClick={() => {
                                                            setMaterialCategory(category)
                                                        }}
                                                        style={{
                                                            backgroundImage: `url(${materials[0].url}albedo.jpg)`, 
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </details>

                                <details
                                    open
                                    className='config-ui__details'
                                >
                                    <summary>Keuzes in categorie
                                        <span> {materialCategory}</span>
                                    </summary>

                                    <div className="config-ui__material-options material-selection">
                                        <div className="config-ui__material-options__category">
                                            {allCategories[materialCategory].map((material, index) => (
                                                <div
                                                    key={index}
                                                    className={`config-ui__material-options__option ${towerMaterial === material.url ? 'selected-material-n-category' : ""}`}
                                                    onClick={() => setTowerMaterial(material.url)}
                                                    style={{
                                                        backgroundImage: `url(${material.url}albedo.jpg)`, 
                                                    }}
                                                ></div>
                                                ))}
                                        </div>
                                    </div>
                                </details>

                                <details
                                    open
                                    className='config-ui__details'
                                >
                                    <summary>Afgerond: 
                                        <span>
                                            {towerBevelled ? ' ja' : ' neen'}
                                        </span>
                                    </summary>

                                    <input 
                                        type="checkbox" 
                                        checked={towerBevelled}
                                        onChange={(e) => setTowerBevelled(e.target.checked)} 
                                    />
                                </details>

                                <details
                                    open
                                    className='config-ui__details'
                                >
                                    <summary>Appliance Type:
                                        <span>
                                            {applianceType === 'oven' ? ' oven' : ' fridge'}
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
                                            Fridge
                                        </button>
                                    </div>
                                </details>

                                <details
                                    open
                                    className='config-ui__details'
                                >
                                    <summary>Appliance Material:
                                        <span>
                                            {' ' + towerAccessoryMaterial.split('/').slice(-2, -1)[0]}
                                        </span>
                                    </summary>

                                    <div className="config-ui__material-options material-selection">
                                        <div className="config-ui__material-options__category">
                                            {allCategories.metal.map((material, index) => (
                                                <div
                                                    key={index}
                                                    className="config-ui__material-options__option"
                                                    style={{
                                                        backgroundImage: `url(${material.url}albedo.jpg)`, 
                                                    }}
                                                    onClick={() => setTowerAccessoryMaterial(material.url)}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </details>
                        
                            </div>


                        </div>
                    }

                    <div
                        className='config-ui__slider'
                    >
                        <p>Open doors and shelves:</p>
                        <input
                            type="range"
                            min="0"
                            max="2"
                            step={0.01}
                            value={doorOpeningRotation}
                            onChange={(e) => setDoorOpeningRotation(e.target.value)}
                        />

                    </div>

                </div>
            }
            
        </div>
        </>
    );
};