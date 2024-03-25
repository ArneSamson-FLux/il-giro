import React from "react";

import EdgeFinish from "../components/EdgeFinish";

export default function UiPage1() {

    return <>

        <div
            className='config-ui__title'
        >
            <span><h2>2. Tabletop</h2></span>
        </div>

        <div
            className='config-ui__options'
        >

            <EdgeFinish />

        </div>
    </>
}