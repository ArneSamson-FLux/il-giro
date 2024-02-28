import React,{useState, useEffect} from 'react';
import useConfig from '../store/useConfig';
import useScene from '../store/useScene';

export default function ConfigUi() {

    const {
        cameraCoords,
        setCameraCoords,
        cameraFocus,
        setCameraFocus
    } = useScene();

    const {
        allMaterials,

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
        setCurrentPage
    } = useConfig();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if(allMaterials[0]){
            setLoaded(true);

            //switch case to set the default material for each component

            switch(true){
                case !sinkMaterial:
                    setSinkMaterial(allMaterials[1].url);
                    break;
                case !cooktopMaterial:
                    setCooktopMaterial(allMaterials[1].url);
                    break;
                case !towerMaterial:
                    setTowerMaterial(allMaterials[1].url);
                    break;
                case !tapMaterial:
                    setTapMaterial(allMaterials[7].url);
                    break;
                case !sinkBowlMaterial:
                    setSinkBowlMaterial(allMaterials[8].url);
                    break;
                case !towerAccessoryMaterial:
                    setTowerAccessoryMaterial(allMaterials[8].url);
                    break;
                default:
            }


        }
    }, [allMaterials, sinkMaterial, setSinkMaterial, cooktopMaterial, setCooktopMaterial, towerMaterial, setTowerMaterial, tapMaterial, setTapMaterial, sinkBowlMaterial, setSinkBowlMaterial, towerAccessoryMaterial, setTowerAccessoryMaterial]);

    useEffect(() => {
        // console.log('currentPage:', currentPage);
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

    const checkPage = (e) => {
        switch(e){
            case 0:
                setCurrentPage(0);
                setCameraFocus([0, 1, 0]);
            break;  
            case 1:
                setCurrentPage(1);
                setCameraFocus([-1.5, 0, 0]);
            break;
            case 2:
                setCurrentPage(2);
                setCameraFocus([1.5, 0, 0]);
            break;
            case 3:
                setCurrentPage(3);
                setCameraFocus([0, 1, -1.5]);
            break;
        }
    }

    return (
        <>
            {!loaded && <p>Loading UI...</p>}
            
            {loaded &&    <div
                    className='config-ui'
                >

                    <div
                        className='no-select config-ui__nav'
                    >

                        <button
                            onClick={handleBack}
                        >
                            <a>Back</a>
                        </button>
  
                        <button
                            onClick={handleNext}
                        >
                            <a>Next</a>
                        </button>
                    </div>

                    {currentPage === 0 &&
                        <div
                            className='config-ui__amounts ui-page'
                        >   
                            <h2>Amounts</h2>
                            
                            <p>Select the number of islands you want.</p>
                            
                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Amount of sinks:</p>
                                <input
                                    type="number"
                                    value={sinkAmount}
                                    max={3}
                                    min={0}
                                    //if value is lower than 10, set the value to the input value
                                    onChange={(e) => setSinkAmount(e.target.value < 3 ? e.target.value : 3)}
        
                                />
                            </div>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Amount of cooktops: </p>
                                <input
                                    type="number"
                                    value={cooktopAmount}
                                    max={3}
                                    min={0}
                                    //if value is lower than 10, set the value to the input value
                                    onChange={(e) => setCooktopAmount(e.target.value < 3 ? e.target.value : 3)}
                                />
                            </div>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Amount of towers: </p>
                                <input
                                    type="number"
                                    value={towerAmount}
                                    max={3}
                                    min={0}
                                    onChange={(e) => setTowerAmount(e.target.value < 3 ? e.target.value : 3)}
                                />
                            </div>

                        </div>
                    }

                    {currentPage === 1 &&
                        <div
                            className='config-ui__materials ui-page config-ui__sink'
                        >
                            <h2>The Sink</h2>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Sink Island Material:</p>
                                <select
                                    onChange={(e) => setSinkMaterial(e.target.value)}
                                    value={sinkMaterial}
                                >                            
                                    {allMaterials.map((material, index) => <option key={index} value={material.url}>{material.name}</option>)}
                                </select>
                            </div>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Sink Bevelled:</p>
                                <input 
                                    type="checkbox" 
                                    checked={sinkBevelled}
                                    onChange={(e) => setSinkBevelled(e.target.checked)} 
                                />
                            </div>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Tap Material:</p>
                                <select 
                                    value={tapMaterial}    
                                    onChange={(e) => setTapMaterial(e.target.value)}
                                >
                                    {
                                        allMaterials
                                        .filter(material => ['metal', 'innox', 'gold', 'bronze', 'copper'].includes(material.name))
                                        .map((material, index) => (
                                            <option key={index} value={material.url}>{material.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Tap Type:</p>
                                <select onChange={(e) => setTapType(e.target.value)}>
                                    <option value="tap1">Standard tap</option>
                                    <option value="tap2">Quooker tap</option>
                                </select>
                            </div>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Sink Material:</p>
                                <select 
                                    value={sinkBowlMaterial}
                                    onChange={(e) => setSinkBowlMaterial(e.target.value)}
                                >
                                    {
                                        allMaterials
                                        .filter(material => ['metal', 'innox', 'gold', 'bronze', 'copper'].includes(material.name))
                                        .map((material, index) => (
                                            <option key={index} value={material.url}>{material.name}</option>
                                    ))}
                                </select>
                            </div>

                        </div>
                    }

                    {currentPage === 2 &&
                        <div
                            className='config-ui__materials ui-page config-ui__cooktop'
                        >

                            <h2>The Cooktop</h2>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Cooktop Material:</p>
                                <select 
                                    value={cooktopMaterial}
                                    onChange={(e) => setCooktopMaterial(e.target.value)}
                                >
                                    {allMaterials.map((material, index) => <option key={index} value={material.url}>{material.name}</option>)}
                                </select>
                            </div>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Cooktop Bevelled:</p>
                                <input 
                                    type="checkbox" 
                                    checked={cooktopBevelled}
                                    onChange={(e) => setCooktopBevelled(e.target.checked)} 
                                />
                            </div>

                                
                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Stove Type:</p>
                                <select onChange={(e) => setStoveType(e.target.value)}>
                                    <option value="gas">Gas</option>
                                    <option value="electric">Electric</option>
                                </select>
                            </div>
                        
                        </div>
                    }

                    {currentPage === 3 &&
                        <div
                            className='config-ui__materials ui-page config-ui__tower'
                        >

                            <h2>The Tower</h2>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Tower Material:</p>
                                <select 
                                    value={towerMaterial}
                                    onChange={(e) => setTowerMaterial(e.target.value)}
                                >
                                    {allMaterials.map((material, index) => <option key={index} value={material.url}>{material.name}</option>)}
                                </select>
                            </div>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Tower Bevelled:</p>
                                <input
                                    type="checkbox"
                                    checked={towerBevelled}
                                    onChange={(e) => setTowerBevelled(e.target.checked)}
                                />
                            </div>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Appliance Type:</p>
                                <select onChange={(e) => setApplianceType(e.target.value)}>
                                    <option value="oven">Oven</option>
                                    <option value="fridge">Fridge</option>
                                </select>
                            </div>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Tower Accessory Material:</p>
                                <select
                                    value={towerAccessoryMaterial}    
                                    onChange={(e) => setTowerAccessoryMaterial(e.target.value)}
                                >
                                    {
                                        allMaterials
                                        .filter(material => ['metal', 'innox', 'gold', 'bronze', 'copper'].includes(material.name))
                                        .map((material, index) => (
                                            <option key={index} value={material.url}>{material.name}</option>
                                    ))}
                                </select>
                            </div>

                        </div>
                    }

                    <div>
                        <h5>Open doors and shelves:</h5>
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
        </>
    );
}