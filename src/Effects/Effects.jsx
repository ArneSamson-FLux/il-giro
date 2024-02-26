import React from 'react'
import { EffectComposer, N8AO } from "@react-three/postprocessing";


export default function Effects() {
    return (
        <EffectComposer
            disableNormalPass
            multisampling={8}
        >
            <N8AO
                quality='Ultra'
                aoRadius={50}
                distanceFalloff={0.2}
                intensity={8}
                screenSpaceRadius
                halfRes={true}
            />
        </EffectComposer>
    )
}