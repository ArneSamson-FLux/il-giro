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

            <div>
                <p>Cooktop Material: {cooktopMaterial}</p>
                <select onChange={(e) => setCooktopMaterial(e.target.value)}>
                    {materialUrls.map((url, index) => <option key={index} value={url}>{url}</option>)}
                </select>
            </div>

            <div>
                <p>Tower Material: {towerMaterial}</p>
                <select onChange={(e) => setTowerMaterial(e.target.value)}>
                    {materialUrls.map((url, index) => <option key={index} value={url}>{url}</option>)}
                </select>
            </div>

            <div>
                <p>Sink Bevelled: {sinkBevelled}</p>
                <input type="checkbox" onChange={(e) => setSinkBevelled(e.target.checked)} />
            </div>

            <div>
                <p>Cooktop Bevelled: {cooktopBevelled}</p>
                <input type="checkbox" onChange={(e) => setCooktopBevelled(e.target.checked)} />
            </div>

            <div>
                <p>Tower Bevelled: {towerBevelled}</p>
                <input type="checkbox" onChange={(e) => setTowerBevelled(e.target.checked)} />
            </div>
            
            <div>
                <p>Tap Material: {tapMaterial}</p>
                <select onChange={(e) => setTapMaterial(e.target.value)}>
                    {materialUrls.map((url, index) => <option key={index} value={url}>{url}</option>)}
                </select>
            </div>

            <div>
                <p>Tap Type: {tapType}</p>
                <select onChange={(e) => setTapType(e.target.value)}>
                    <option value="tap1">Tap 1</option>
                    <option value="tap2">Tap 2</option>
                </select>
            </div>

            <div>
                <p>Sink Bowl Material: {sinkBowlMaterial}</p>
                <select onChange={(e) => setSinkBowlMaterial(e.target.value)}>
                    {materialUrls.map((url, index) => <option key={index} value={url}>{url}</option>)}
                </select>
            </div>

            <div>
                <p>Stove Type: {stoveType}</p>
                <select onChange={(e) => setStoveType(e.target.value)}>
                    <option value="gas">Gas</option>
                    <option value="electric">Electric</option>
                </select>
            </div>

            <div>
                <p>Appliance Type: {applianceType}</p>
                <select onChange={(e) => setApplianceType(e.target.value)}>
                    <option value="oven">Oven</option>
                    <option value="microwave">Microwave</option>
                </select>
            </div>

            <div>
                <p>Tower Accessory Material: {towerAccessoryMaterial}</p>
                <select onChange={(e) => setTowerAccessoryMaterial(e.target.value)}>
                    {materialUrls.map((url, index) => <option key={index} value={url}>{url}</option>)}
                </select>
            </div>


        </Html>
    );
}