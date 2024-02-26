import './style.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

import * as THREE from 'three'
import {Canvas} from '@react-three/fiber'
import { EffectComposer, N8AO } from "@react-three/postprocessing";

import Experience from './Experience.jsx'
import Effects from './Effects/Effects.jsx'


const root = ReactDOM.createRoot(document.querySelector('#root'))

const camSettings = {
  fov: 75,
  zoom: 1,
  near: 0.1,
  far: 200,
  position: [0, 4, 3]
}


root.render(
  <Canvas
    camera={camSettings}
    gl = {{
      antialias: true,
      toneMapping: THREE.ACESFilmicToneMapping,
      outoutColorSpace: THREE.SRGBColorSpace,
    }}
    shadows={true}
  >
    <Effects/>

    <Experience/>
  </Canvas>
)