import './style.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

import * as THREE from 'three'
import {Canvas} from '@react-three/fiber'
import { Loader } from '@react-three/drei'

import { Leva } from 'leva'

import Experience from './Experience.jsx'
import Effects from './Effects/Effects.jsx'
import ConfigUi from './components/ConfigUi.jsx'


const root = ReactDOM.createRoot(document.querySelector('#root'))

const camSettings = {
  fov: 75,
  zoom: 1,
  near: 0.1,
  far: 200,
  position: [0, 2, 4],
}

const containerStyles = {
    zIndex: 4,
    backgroundColor: '#fafafa'
}
const barStyles = {
    backgroundColor: '#000000',
}
const dataStyles = {
    color: '#272727',
    fontSize: '16px',
    lineHeight: '30px',
    fontWeight: 400,
}
const innerStyles = {
    width: '200px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '20px',
}


root.render(
    <>

        <div
            className='root-container'
        >
            <Canvas
                className="canvas"
                camera={camSettings}
                gl = {{
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                outoutColorSpace: THREE.SRGBColorSpace,
                }}
                shadows={true}
                dpr={window.devicePixelRatio}
                // style={{
                //     height: '80vh',
                // }}
            >
                <Effects/>

                <Experience/>
            </Canvas>

            <Loader
                containerStyles={containerStyles}
                barStyles={barStyles}
                dataStyles={dataStyles}
                innerStyles={innerStyles}
                dataInterpolation={(p) => `Loading kitchen: ${p.toFixed(2)}%`}
            />

            <ConfigUi/>


            <Leva
                collapsed
                hidden
            />
        </div>
    </>

)