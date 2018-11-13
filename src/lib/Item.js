/* global EventTarget */
// Simple BaseClass for things that exist in engine

export default class Item extends EventTarget {
  /**
   * Setup your Item
   *
   */
  init () {}

  /**
   * Render your item, handled once per frame
   *
   * @param  {Number} time   time of render
   */
  render (time) {}
}
