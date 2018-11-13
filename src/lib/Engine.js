/* global Event, EventTarget */

import * as twgl from 'twgl.js'

export default class Engine extends EventTarget {
  constructor (canvas) {
    super()
    this.gl = canvas.getContext('webgl')
    this.items = {}
    this.render = this.render.bind(this)
    window.addEventListener('resize', e => {
      twgl.resizeCanvasToDisplaySize(this.gl.canvas)
      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)
    })
    window.requestAnimationFrame(this.render)
  }

  add (item) {
    item.id = Date.now()
    item.gl = this.gl
    item.engine = this
    item.init(this)
    this.items[item.id] = item
  }

  remove (item) {
    delete this.items[item.id]
  }

  clear () {
    this.items = {}
  }

  render (time) {
    const ev = new Event('render')
    ev.time = time
    this.dispatchEvent(ev)
    Object.values(this.items).forEach(i => {
      if (i.render) {
        i.render.bind(i)(time)
      }
    })
    window.requestAnimationFrame(this.render)
  }
}
