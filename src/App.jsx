import './style.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

import * as THREE from 'three'
import {Canvas} from '@react-three/fiber'
import Experience from './Experience.jsx'


const root = ReactDOM.createRoot(document.querySelector('#root'))

const camSettings = {
  fov: 75,
  zoom: 1,
  near: 0.1,
  far: 200,
  position: [0, 5, 2],
}

root.render(
  <Canvas
    camera={camSettings}
    gl = {{
      antialias: true,
      toneMapping: THREE.ACESFilmicToneMapping,
      outoutColorSpace: THREE.sRGBEncoding,
    }}
  >
    <Experience/>
  </Canvas>
)