import React from "react";

import useConfigStore from "../../../store/useConfigStore";

export default function BevelledSelection() {

    const {
        allBevelled,
        setAllBevelled,
    } = useConfigStore();


    return <>
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
    </>
}