import kaplay from "kaplay";
import { TILE, SCALE, ATLAS_DATA } from "./constants";

export const k = kaplay({
  width: 800,
  height: 600,
  canvas: document.querySelector('canvas')
});

k.loadSpriteAtlas('https://pub-c6c043fab84f4b73a183f59fb6b061f0.r2.dev/winter_inside_game.png', ATLAS_DATA)


k.scene("level_1", () => {
  k.add([
    k.sprite("snow_floor_2"),
    k.scale(4),
    k.area()
  ])

  const t = k.add([
    k.text('Hi!'), 
    k.pos(12, 12),
    k.color('#df9628'),
    k.area()
  ])
})

k.go('level_1')

// Теги "wall", "tree" не дают пройти игроку