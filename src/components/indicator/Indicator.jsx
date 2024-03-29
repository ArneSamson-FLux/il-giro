import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';


export default function Indicator({ position }) {
    const indicatorRef = useRef();

    const indicatorMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.5
    });
    const indicatorGeometry = new THREE.RingGeometry(0.6, 0.7, 64);
    indicatorGeometry.rotateX(-Math.PI / 2);

    useEffect(() => {
        indicatorRef.current.position.set(position[0], 0.01, position[2]);
    }, [position]);

    return <>
        <mesh ref={indicatorRef} geometry={indicatorGeometry} material={indicatorMaterial} />
    </>
}