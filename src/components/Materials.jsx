import React, { useEffect, useState } from 'react';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

export function WoodMaterial() {

    const [textureUrl, setTexture] = useState();

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTexture(data.woodMaterial.textureUrl);
            })  
            .catch(error => console.error('Error fetching texture:', error));
    }, []);

    const texture = textureUrl ? useLoader(TextureLoader, textureUrl) : null;

    return <>
        <meshStandardMaterial
            map={texture}
            // color={0x8B4513}
        />
    </>
}