import React, { useEffect, useState } from "react";

import useUIStore from "../../../../store/useUIStore.jsx";

export default function ToolTip() {

    const { toolTip, setToolTip } = useUIStore();

    if (!toolTip.target) {
        return;
    }

    const rect = toolTip.target.getBoundingClientRect();

    console.log(toolTip.content, rect)

    return <>
        <div
            className={`tooltip ${toolTip.active ? 'active' : ''}`}
            style={{
                top: rect.top + 12,
                left: rect.left + rect.width + 20,
            }}
        >
            {toolTip.content}
        </div>
    </>
}