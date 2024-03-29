import React from "react";
import { useEffect, useState } from "react";

import useConfig from "../../../store/useConfigStore.jsx";

export default function DetailWithButtons({ summary, options, selectedOption, setOption }) {

    return (
        <details open className='config-ui__details'>
            <summary>
                {summary}
                <span>{selectedOption}</span>
            </summary>
            <div className='config-ui__selection-buttons'>
                {options.map((option, index) => (
                    <button
                        key={index}
                        className={selectedOption === option.label ? 'active-selection-button' : ''}
                        onClick={() => {
                            setOption(option.value)
                        }}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </details>
    );
}