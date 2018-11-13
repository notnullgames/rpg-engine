import Engine from './lib/Engine'
import DemoScreen from './lib/DemoScreen'

// import iMap from './assets/map.png'
// import iTiles from './assets/tiles.png'

const engine = new Engine(document.getElementById('cnv'))
engine.add(new DemoScreen())
