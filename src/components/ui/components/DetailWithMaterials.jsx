import React from "react";

export default function DetailWithMaterials({
    header,
    materials,
    selectedMaterial,
    setMaterial,
}) {
    return (
        <details
            className="config-ui__details"
        >
            <summary>
                {header}
                <span>{selectedMaterial.split("/").slice(-2, -1)[0]}</span>
            </summary>
            <div className="config-ui__material-options">
                {materials.map((material, index) => (
                    <div
                        key={index}
                        className={`config-ui__material-options__option ${selectedMaterial === material.url ? "selected-material-n-category" : ""
                            }`}
                        onClick={() => setMaterial(material.url)}
                        style={{ backgroundImage: `url(${material.url}albedo.jpg)` }}
                    ></div>
                ))}
            </div>
        </details>
    );
}
