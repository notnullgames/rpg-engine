// Eficient tile-map loader based on ideas from
// https://blog.tojicode.com/2012/08/more-gpu-tile-map-demos-zelda.html

import * as twgl from 'twgl.js'

import Item from './Item'

const vs = `
attribute vec2 position;
attribute vec2 texture;

varying vec2 pixelCoord;
varying vec2 texCoord;

uniform vec2 viewOffset;
uniform vec2 viewportSize;
uniform vec2 inverseTileTextureSize;
uniform float inverseTileSize;

void main(void) {
   pixelCoord = (texture * viewportSize) + viewOffset;
   texCoord = pixelCoord * inverseTileTextureSize * inverseTileSize;
   gl_Position = vec4(position, 0.0, 1.0);
}
`

const fs = `
precision highp float;

varying vec2 pixelCoord;
varying vec2 texCoord;

uniform sampler2D tiles;
uniform sampler2D sprites;
uniform vec2 inverseTileTextureSize;
uniform vec2 inverseSpriteTextureSize;
uniform float tileSize;
uniform int repeatTiles;

void main(void) {
  if (repeatTiles == 0 && (texCoord.x < 0.0 || texCoord.x > 1.0 || texCoord.y < 0.0 || texCoord.y > 1.0)) {
    discard;
  }
  vec4 tile = texture2D(tiles, texCoord);
  if (tile.x == 1.0 && tile.y == 1.0) {
    discard;
  }
  vec2 spriteOffset = floor(tile.xy * 256.0) * tileSize;
  vec2 spriteCoord = mod(pixelCoord, tileSize);
  gl_FragColor = texture2D(sprites, (spriteOffset + spriteCoord) * inverseSpriteTextureSize);
}
`

export default class TileMap extends Item {
  constructor (mapUrl, tileUrl) {
    super()
    this.mapUrl = mapUrl
    this.tileUrl = tileUrl
  }

  init () {
    this.programInfo = twgl.createProgramInfo(this.gl, [vs, fs])
    const arrays = {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
      texture: 
    }
    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays)
  }

  render (time) {
    const {
      tiles,
      sprites,
      inverseTileTextureSize,
      inverseSpriteTextureSize,
      tileSize,
      repeatTiles
    } = this
    this.gl.useProgram(this.programInfo.program)
    twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo)
    twgl.setUniforms(this.programInfo, 
      tiles,
      sprites,
      inverseTileTextureSize,
      inverseSpriteTextureSize,
      tileSize,
      repeatTiles
    })
    twgl.drawBufferInfo(this.gl, this.bufferInfo)
  }
}
