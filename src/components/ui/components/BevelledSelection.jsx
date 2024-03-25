import React from "react";

import useConfig from "../../../store/useConfig.jsx";

export default function BevelledSelection() {

    const {
        allBevelled,
        setAllBevelled,
    } = useConfig();


    return <>
        <div
            className='landings-page__bevel-option'
        >
            <div
                className="landings-page__bevel-option__images"
            >
                <div
                    // className="landings-page__bevel-option__images__image--selected"
                    className={!allBevelled ? "landings-page__bevel-option__images__image--selected" : "landings-page__bevel-option__images__image"}
                >
                    <img src="/images/UI/straight.webp" alt="render of straight module" />
                </div>
                <div
                    className={allBevelled ? "landings-page__bevel-option__images__image--selected" : "landings-page__bevel-option__images__image"}
                >
                    <img src="/images/UI/bevel.webp" alt="render of bevelled module" />
                </div>
            </div>
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

        </div>
    </>
}