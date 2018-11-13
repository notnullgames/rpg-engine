import * as twgl from 'twgl.js'

import Item from './Item'

const vs = `
attribute vec4 position;

void main() {
  gl_Position = position;
}
`

const fs = `
precision mediump float;

uniform vec2 resolution;
uniform float time;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  float color = 0.0;
  
  // lifted from glslsandbox.com
  color += sin( uv.x * cos( time / 3.0 ) * 60.0 ) + cos( uv.y * cos( time / 2.80 ) * 10.0 );
  color += sin( uv.y * sin( time / 2.0 ) * 40.0 ) + cos( uv.x * sin( time / 1.70 ) * 40.0 );
  color += sin( uv.x * sin( time / 1.0 ) * 10.0 ) + sin( uv.y * sin( time / 3.50 ) * 80.0 );
  color *= sin( time / 10.0 ) * 0.5;

  gl_FragColor = vec4( vec3( color * 0.5, sin( color + time / 2.5 ) * 0.75, color ), 1.0 );
}
`

export default class DemoScreen extends Item {
  init () {
    this.programInfo = twgl.createProgramInfo(this.gl, [vs, fs])
    const arrays = {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]
    }
    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays)
  }

  render (time) {
    const uniforms = {
      time: time * 0.001,
      resolution: [this.gl.canvas.width, this.gl.canvas.height]
    }
    this.gl.useProgram(this.programInfo.program)
    twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo)
    twgl.setUniforms(this.programInfo, uniforms)
    twgl.drawBufferInfo(this.gl, this.bufferInfo)
  }
}
