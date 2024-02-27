import React from 'react';
import useConfig from '../store/useConfig';
import { Html } from '@react-three/drei';

export default function ConfigUi() {

    const {materialUrls} = useConfig();

    const { sinkAmount, setSinkAmount, cookopAmount, setCookopAmount, towerAmout, setTowerAmount } = useConfig();
    
    const { sinkMaterial, setSinkMaterial, cooktopMaterial, setCooktopMaterial, towerMaterial, setTowerMaterial } = useConfig();

    const { sinkBevelled, setSinkBevelled, cooktopBevelled, setCooktopBevelled, towerBevelled, setTowerBevelled } = useConfig();

    const { tapMaterial, setTapMaterial, tapType, setTapType } = useConfig();

    const { sinkBowlMaterial, setSinkBowlMaterial } = useConfig();

    const { stoveType, setStoveType, applianceType, setApplianceType, towerAccessoryMaterial, setTowerAccessoryMaterial } = useConfig();

    return (
        <Html>
            {/* <div>
                <p>Sink Amount: {sinkAmount}</p>
                <button onClick={() => setSinkAmount(sinkAmount + 1)}>Increase Sink Amount</button>
            </div> */}


            <div>
                <p>Sink Material: {sinkMaterial}</p>
                <select onChange={(e) => setSinkMaterial(e.target.value)}>
                    {materialUrls.map((url, index) => <option key={index} value={url}>{url}</option>)}
                </select>
            </div>
            
        </Html>
    );
}