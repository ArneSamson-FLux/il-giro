import React,{useState, useEffect} from 'react';
import useConfig from '../store/useConfig';

export default function ConfigUi() {

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
        setTowerAccessoryMaterial
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


    return (
        <>
            {!loaded && <p>Loading UI...</p>}
            
            {loaded &&    <div
                    className='config-ui'
                >
                    <div>
                        <p>Sink Amount: {sinkAmount}</p>
                        <input
                            type="number"
                            value={sinkAmount}
                            max={3}
                            min={0}
                            //if value is lower than 10, set the value to the input value
                            onChange={(e) => setSinkAmount(e.target.value < 3 ? e.target.value : 3)}
  
                        />
                    </div>

                    <div>
                        <p>Cooktop Amount: {cooktopAmount}</p>
                        <input
                            type="number"
                            value={cooktopAmount}
                            max={3}
                            min={0}
                            //if value is lower than 10, set the value to the input value
                            onChange={(e) => setCooktopAmount(e.target.value < 3 ? e.target.value : 3)}
                        />
                    </div>

                    <div>
                        <p>Tower Amount: {towerAmount}</p>
                        <input
                            type="number"
                            value={towerAmount}
                            max={3}
                            min={0}
                            //if value is lower than 10, set the value to the input value
                            onChange={(e) => setTowerAmount(e.target.value < 3 ? e.target.value : 3)}
                        />
                    </div>


                    <div>
                        <p>Sink Material:</p>
                        <select
                            onChange={(e) => setSinkMaterial(e.target.value)}
                            value={sinkMaterial}
                        >                            
                            {allMaterials.map((material, index) => <option key={index} value={material.url}>{material.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <p>Cooktop Material:</p>
                        <select 
                            value={cooktopMaterial}
                            onChange={(e) => setCooktopMaterial(e.target.value)}
                        >
                            {allMaterials.map((material, index) => <option key={index} value={material.url}>{material.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <p>Tower Material:</p>
                        <select 
                            value={towerMaterial}
                            onChange={(e) => setTowerMaterial(e.target.value)}
                        >
                            {allMaterials.map((material, index) => <option key={index} value={material.url}>{material.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <p>Sink Bevelled:</p>
                        <input 
                            type="checkbox" 
                            checked={sinkBevelled}
                            onChange={(e) => setSinkBevelled(e.target.checked)} 
                        />
                    </div>

                    <div>
                        <p>Cooktop Bevelled:</p>
                        <input 
                            type="checkbox" 
                            checked={cooktopBevelled}
                            onChange={(e) => setCooktopBevelled(e.target.checked)} 
                        />
                    </div>

                    <div>
                        <p>Tower Bevelled:</p>
                        <input
                            type="checkbox"
                            checked={towerBevelled}
                            onChange={(e) => setTowerBevelled(e.target.checked)}
                        />
                    </div>
                    
                    <div>
                        <p>Tap Material:</p>
                        <select 
                            value={tapMaterial}    
                            onChange={(e) => setTapMaterial(e.target.value)}
                        >
                            {allMaterials.map((material, index) => <option key={index} value={material.url}>{material.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <p>Tap Type:</p>
                        <select onChange={(e) => setTapType(e.target.value)}>
                            <option value="tap1">Standard tap</option>
                            <option value="tap2">Quooker tap</option>
                        </select>
                    </div>

                    <div>
                        <p>Sink Bowl Material:</p>
                        <select 
                            value={sinkBowlMaterial}
                            onChange={(e) => setSinkBowlMaterial(e.target.value)}
                        >
                            {allMaterials.map((material, index) => <option key={index} value={material.url}>{material.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <p>Stove Type:</p>
                        <select onChange={(e) => setStoveType(e.target.value)}>
                            <option value="gas">Gas</option>
                            <option value="electric">Electric</option>
                        </select>
                    </div>

                    <div>
                        <p>Appliance Type:</p>
                        <select onChange={(e) => setApplianceType(e.target.value)}>
                            <option value="oven">Oven</option>
                            <option value="fridge">Fridge</option>
                        </select>
                    </div>

                    <div>
                        <p>Tower Accessory Material:</p>
                        <select
                            value={towerAccessoryMaterial}    
                            onChange={(e) => setTowerAccessoryMaterial(e.target.value)}
                        >
                            {allMaterials.map((material, index) => <option key={index} value={material.url}>{material.name}</option>)}
                        </select>
                    </div>
                </div>
            }
        </>
    );
}