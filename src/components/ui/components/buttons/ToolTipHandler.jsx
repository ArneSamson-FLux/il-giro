import React, { useEffect, useState } from "react";

export default function ToolTipHandler({ children, tooltipText }) {

    const [showTooltip, setShowTooltip] = useState(false);

    return <>
        <div
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {children}
            <span className={`tooltip ${showTooltip ? 'show' : ''}`}>{tooltipText}</span>
        </div>
    </>
}

