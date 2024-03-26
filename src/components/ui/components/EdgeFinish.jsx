import React from "react";
import { useEffect, useState } from "react";

import useConfig from "../../../store/useConfigStore.jsx";

export default function EdgeFinish() {

    const {
        edgeFinish,
        setEdgeFinish,
    } = useConfig();


    return <>
        <details
            open
            className='config-ui__details'
        >
            <summary>Edge finish:
                <span>
                    {edgeFinish === 'rect' ? ' square' : ' curved'}
                </span>
            </summary>
            <div
                className='config-ui__selection-buttons'
            >
                <button
                    className={edgeFinish === 'rect' ? 'active-selection-button' : ''}
                    onClick={() => setEdgeFinish('rect')}
                >
                    Square
                </button>
                <button
                    className={edgeFinish === 'curved' ? 'active-selection-button' : ''}
                    onClick={() => setEdgeFinish('curved')}
                >
                    Curved
                </button>
            </div>
        </details>
    </>
}