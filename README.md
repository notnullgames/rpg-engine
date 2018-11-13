# rpg-engine

This is a simple and fast RPG engine.

The idea is to eventually be able to do everything RPG Maker can do, extremenly efficiently, in javascript. I'd like basic built-ins, whenever possible, and keep code small and efficient.

Here are the main sections we'd like to eventually support:

- [ ] Tile maps - load them efficiently using only [GLSL]((https://blog.tojicode.com/2012/08/more-gpu-tile-map-demos-zelda.html).
- [ ] Sprites - animation, also done entirely in GLSL, if possible
- [ ] Dialog - simple themable dialog UI
- [ ] save-system
- [ ] scriptable entities - hit, action-button, events (for on-variable change, time-triggered, etc)
- [ ] in-game util libs: path-finding, etc
- [ ] map editor - maybe just use [tiled](https://www.mapeditor.org/) with a code-block interface (hidden layer of map, tiles correspond to what that square contains)
- [ ] character-creator (creative commons, like RPG game-maker's)
- [ ] database-editor for events, enemies, troops, objects, etc
- [ ] creative-commons asset collection for making games
- [ ] make example-projects that use react-native & electron to target native