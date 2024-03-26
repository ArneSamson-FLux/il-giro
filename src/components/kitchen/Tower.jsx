import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three'
import { useGLTF, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { useDrag } from "@use-gesture/react";

import WineStand from './accessoires/WineStand.jsx';

import { BakePlane } from '../lighting&shadows/ShadowPlanes.jsx'

import { useTexture } from '../../helper/useTexture.tsx';
import Indicator from '../indicator/Indicator.jsx';

import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfigStore.jsx';
import useUIStore from '../../store/useUIStore.jsx';

export default function Tower({ props }) {

    const {
        mainMaterial,

        towerPosition,

        applianceType,
        doorOpeningRotation,

        allBevelled,

        dragMode,
        isDraggingTower,
        setIsDraggingTower,
        setIsDragging
    } = useConfig();

    const { setCurrentPage } = useUIStore();

    const [albedoTexture, normalTexture, roughnessTexture, metallnessTexture] = useTexture([
        mainMaterial + "albedo.jpg",
        mainMaterial + "normal.jpg",
        mainMaterial + "roughness.jpg",
        mainMaterial + "metallic.jpg"
    ]);

    albedoTexture.anisotropy = 16;
    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnessTexture,
        metalness: 1,
        roughness: 1,
    });

    const { nodes, materials } = useGLTF("./models/base-island-high.glb");


    const { setCameraFocus, isFocussedOnIsland, setIsFocussedOnIsland } = useScene();

    const [hovered, setHover] = useState(null);

    const [needPointer, setNeedPointer] = useState(false);

    useCursor(needPointer, "pointer")

    const towerRef = useRef();

    const cabinetRef = useRef();
    const doorRef = useRef();
    const coolerRef = useRef();
    const shelvesRef = useRef();

    useEffect(() => {

        if (cabinetRef.current && doorRef.current) {

            const cabinetGeometry = cabinetRef.current.geometry;
            const doorGeometry = doorRef.current.geometry;

            const uvAttributeName = allBevelled ? "uv1" : "uv2";

            const uvAttributeCabinet = cabinetGeometry.getAttribute(uvAttributeName);
            const uvAttributeDoor = doorGeometry.getAttribute(uvAttributeName);

            if (uvAttributeCabinet && uvAttributeDoor) {
                const uvBufferAttribute = new THREE.BufferAttribute(uvAttributeCabinet.array, uvAttributeCabinet.itemSize);
                const uvBufferAttributeDoor = new THREE.BufferAttribute(uvAttributeDoor.array, uvAttributeDoor.itemSize);

                cabinetGeometry.setAttribute('uv', uvBufferAttribute);
                doorGeometry.setAttribute('uv', uvBufferAttributeDoor);
            }

        }
    }, [nodes, allBevelled]);

    //animate tower and dragging_____________________________________________________________________________________
    const springProps = useSpring({
        position: hovered ? [towerPosition[0], 0.1, towerPosition[2]] : [towerPosition[0], 0, towerPosition[2]],
        scale: isDraggingTower ? [1.1, 1.1, 1.1] : [1, 1, 1],
        config: {
            tension: 250,
            friction: 50,
        }
    });

    const planeIntersectPoint = new THREE.Vector3();
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    const dragPos = useDrag(
        ({ active, event }) => {
            setIsDraggingTower(active);
            setIsDragging(active);

            if (active) {
                event.ray.intersectPlane(floorPlane, planeIntersectPoint);
                let newPosition = ([planeIntersectPoint.x, 0, planeIntersectPoint.z]);

                newPosition[0] = THREE.MathUtils.clamp(newPosition[0], -4.5, 4.5);
                newPosition[2] = THREE.MathUtils.clamp(newPosition[2], -4.5, 4.5);

                setPosition(newPosition);
            }

            event.stopPropagation();

            return;
        }
    );
    //_____________________________________________________________________________________________________________
    function lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }
    useFrame((state, delta) => {
        if (doorRef.current && coolerRef.current) {
            doorRef.current.rotation.y = lerp(doorRef.current.rotation.y, doorOpeningRotation, delta * 2);
            coolerRef.current.rotation.y = lerp(coolerRef.current.rotation.y, -doorOpeningRotation, delta * 2);
        }

        if (shelvesRef.current) {
            if (doorOpeningRotation === 0) {

                doorRef.current.rotation.y = lerp(doorRef.current.rotation.y, doorOpeningRotation, delta * 2);

                shelvesRef.current.children[0].position.z = lerp(shelvesRef.current.children[0].position.z, 0.059, delta * 2);
                shelvesRef.current.children[1].position.z = lerp(shelvesRef.current.children[1].position.z, 0.059, delta * 2);
                shelvesRef.current.children[2].position.z = lerp(shelvesRef.current.children[2].position.z, 0.059, delta * 2);

            } else if (doorOpeningRotation === 1.5) {

                doorRef.current.rotation.y = lerp(doorRef.current.rotation.y, doorOpeningRotation, delta * 2);

                const bottomShelfZ = doorOpeningRotation / 3.5;
                const middleShelfZ = doorOpeningRotation / 3.5 - 0.1; // Adjust as needed
                const topShelfZ = doorOpeningRotation / 3.5 - 0.2; // Adjust as needed

                shelvesRef.current.children[0].position.z = lerp(shelvesRef.current.children[0].position.z, bottomShelfZ, delta * 2);
                shelvesRef.current.children[1].position.z = lerp(shelvesRef.current.children[1].position.z, middleShelfZ, delta * 2);
                shelvesRef.current.children[2].position.z = lerp(shelvesRef.current.children[2].position.z, topShelfZ, delta * 2);

            }
        }

    });

    const indicatorPosition = [towerPosition[0], 0.1, towerPosition[2]];


    return <>

        {isFocussedOnIsland.tower && <Indicator position={indicatorPosition} />}

        <a.group
            name='tower-group'
            ref={towerRef}
            {...props}
            position={towerPosition}
            dispose={null}
            {...springProps}
        >
            <group
                name='tower-hovers-group'
                onPointerOver={
                    (e) => {
                        setNeedPointer(true);
                        if (dragMode) return;
                        setHover(true);
                        e.stopPropagation();
                    }
                }
                onPointerOut={
                    (e) => {
                        setNeedPointer(false);
                        setHover(false);
                        e.stopPropagation();
                    }
                }
                onClick={
                    (e) => {
                        if (dragMode) return;
                        setCurrentPage(5);
                        setCameraFocus([towerPosition[0], towerPosition[1] + 1, towerPosition[2]]);
                        setIsFocussedOnIsland(false, false, true);
                        e.stopPropagation();
                    }
                }
                onPointerMissed={
                    (e) => {
                        if (dragMode) return;
                        setIsFocussedOnIsland(false, false, false);
                        e.stopPropagation();
                    }
                }
                {...(dragMode ? dragPos() : {})}
            >
                <mesh name='cabinet'
                    ref={cabinetRef}
                    castShadow
                    receiveShadow
                    geometry={nodes.tower.geometry}
                    material={material}
                >

                    <mesh name='tower-bevel'
                        visible={allBevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes['tower-bevel'].geometry}
                        material={material}
                    />
                    <mesh name='tower-sraight'
                        visible={!allBevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes['tower-sraight'].geometry}
                        material={material}
                    />

                    <mesh name='door'
                        ref={doorRef}
                        castShadow
                        receiveShadow
                        geometry={nodes.door.geometry}
                        material={material}
                        position={[0.425, 1.185, 0.339]}
                    >
                        <mesh name='door-bevel'
                            visible={allBevelled}
                            castShadow
                            receiveShadow
                            geometry={nodes['door-bevel'].geometry}
                            material={material}
                            rotation={[Math.PI, -0.646, Math.PI]}
                        />
                        <mesh name='door-straight'
                            visible={!allBevelled}
                            castShadow
                            receiveShadow
                            geometry={nodes['door-straight'].geometry}
                            material={material}
                            rotation={[Math.PI, -0.646, Math.PI]}
                        />
                    </mesh>

                    {applianceType === 'fridge' && <>
                        <mesh name='cooler'
                            castShadow
                            receiveShadow
                            geometry={nodes['inside-cooler'].geometry}
                            material={material}>

                            <mesh name='cooler-bevel'
                                visible={allBevelled}
                                castShadow
                                receiveShadow
                                geometry={nodes['cooler-bevel'].geometry}
                                material={material}
                            />
                            <mesh name='cooler-straight'
                                visible={!allBevelled}
                                castShadow
                                receiveShadow
                                geometry={nodes['cooler-straight'].geometry}
                                material={material}
                            />

                            <mesh
                                name='grill'
                                castShadow
                                receiveShadow
                                geometry={nodes.grill002.geometry}
                                material={materials['[Metal_Aluminum_Anodized]']}
                                position={[-0.304, 0.055, 0.291]}
                            />
                            <group
                                name='cooler-door'
                                position={[-0.053, 0.01, -0.026]}
                                rotation={[0, -1.571, 0]}
                                scale={[1, 1.008, 1]}
                            >
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes['C-865mm_1-Door-cabinet'].geometry}
                                    material={materials.Steel_med}
                                />
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes['C-865mm_1-Door-cabinet_1'].geometry}
                                    material={materials[' Steel_light']}
                                />
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes['C-865mm_1-Door-cabinet_2'].geometry}
                                    material={materials['[0136_Charcoal]']}
                                />
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes['C-865mm_1-Door-cabinet_3'].geometry}
                                    material={materials.Material}
                                />
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes['C-865mm_1-Door-cabinet_4'].geometry}
                                    material={materials['[0133_Gray]']}
                                />
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes['C-865mm_1-Door-cabinet_5'].geometry}
                                    material={materials['[0129_WhiteSmoke]']}
                                />
                                <group
                                    ref={coolerRef}
                                    position={[0.313, 0.894, 0.233]}
                                    scale={[1, 0.992, 1]}
                                >
                                    <mesh
                                        castShadow
                                        receiveShadow
                                        geometry={nodes['G-Object070'].geometry}
                                        material={materials.Material}
                                    />
                                    <mesh
                                        castShadow
                                        receiveShadow
                                        geometry={nodes['G-Object070_1'].geometry}
                                        material={materials['[Translucent_Glass_Gray]']}
                                    />
                                    <mesh
                                        castShadow
                                        receiveShadow
                                        geometry={nodes['G-Object070_2'].geometry}
                                        material={materials[' Steel_light']}
                                    />
                                </group>
                            </group>
                        </mesh>
                    </>
                    }

                    {applianceType === 'shelves' && <>
                        <mesh name='shelves'
                            castShadow
                            receiveShadow
                            geometry={nodes['inside-shelf'].geometry}
                            material={material}
                            position={[0, -0.048, 0]}
                        >
                            <mesh name='shelf-bevel'
                                visible={allBevelled}
                                castShadow
                                receiveShadow
                                geometry={nodes['shelf-bevel'].geometry}
                                material={material}
                            />
                            <mesh name='shelf-straight'
                                visible={!allBevelled}
                                castShadow
                                receiveShadow
                                geometry={nodes['shelf-straight'].geometry}
                                material={material}
                            />
                            <group name='shelves-group'
                                ref={shelvesRef}
                            >
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes['shelf-bottom'].geometry}
                                    material={nodes['inside-shelf'].material}
                                    position={[0, 0.301, 0.059]}
                                    rotation={[0, -1.571, 0]}
                                />
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes['shelf-middle'].geometry}
                                    material={nodes['inside-shelf'].material}
                                    position={[0, 0.544, shelvesRef.current ? shelvesRef.current.position.z : 0.059]}
                                    rotation={[0, -1.571, 0]}
                                />
                                <mesh
                                    castShadow
                                    receiveShadow
                                    geometry={nodes['shelf-top'].geometry}
                                    material={nodes['inside-shelf'].material}
                                    position={[0, 0.788, shelvesRef.current ? shelvesRef.current.position.z : 0.059]}
                                    rotation={[0, -1.571, 0]}
                                />
                            </group>
                        </mesh>
                    </>
                    }

                </mesh>

                <WineStand
                    props={{
                        position: [0, 0, 0],
                        rotation: [0, 0, 0],
                        scale: [1, 1, 1],
                    }}
                />

            </group>

            <BakePlane
                props={
                    {
                        position: [0, 0, 0],
                    }
                }

            />

        </a.group>



    </>
}

useGLTF.preload('./models/base-island-high.glb')