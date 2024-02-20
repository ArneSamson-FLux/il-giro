import React, { useEffect, useState, useRef } from 'react';
import { SRGBColorSpace, TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export function WoodMaterial() {

    const material = useRef();

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {

                const textureloader = new TextureLoader();
                textureloader.load(data.woodMaterial.textureUrl, (t) => {
                    t.colorSpace = SRGBColorSpace;
                    t.needsUpdate = true;
                    material.current.map = t;
                    material.current.needsUpdate = true;
                });

            })  
            .catch(error => console.error('Error fetching texture:', error));
    }, []);


    return <>
        <meshBasicMaterial
            ref={material}   
            roughness={0.5}
            metalness={0.5}
            wrapS="ClampToEdgeWrapping"
            wrapT="ClampToEdgeWrapping"
            magFilter="LinearFilter"
        />
    </>
}