import kaplay from "kaplay";
import { TILE, SCALE, ATLAS_DATA } from "./constants";

export const k = kaplay({
  width: 768,
  height: 576,
  canvas: document.querySelector('canvas')
});

k.loadSpriteAtlas('https://pub-c6c043fab84f4b73a183f59fb6b061f0.r2.dev/winter_inside_game.png', ATLAS_DATA)


k.scene("level_1", () => {
  k.addLevel([
    "wwww{}wwwwww",
    "wwww[]wwwwww",
    "1_1_1_______",
    "_1_____1____",
    "______1_1___",
    "________1__1",
    "______11____",
    "_1_____1_1__",
    "____________",
  ], {
    tileWidth: TILE * SCALE,
    tileHeight: TILE * SCALE,
    tiles: {
      'w': () => [
        k.sprite('wall'),
        k.area(),
        k.scale(SCALE),
        k.body({ isStatic: true }),
        'wall'
      ],
      '{': () => [
        k.sprite('top_left_arc'),
        k.area(),
        k.scale(SCALE),
        "arc"
      ],
      '}': () => [
        k.sprite('top_right_arc'),
        k.area(),
        k.scale(SCALE),
        "arc"
      ],
      '[': () => [
        k.sprite('bottom_left_arc'),
        k.area(),
        k.scale(SCALE),
        "arc"
      ],
      ']': () => [
        k.sprite('bottom_right_arc'),
        k.area(),
        k.scale(SCALE),
        "arc"
      ],
      '_': () => [
        k.sprite('snow_floor_1'),
        k.area(),
        k.scale(SCALE),
      ],
      '1': () => [
        k.sprite('snow_floor_2'),
        k.area(),
        k.scale(SCALE),
      ],
    }
  })

  k.addLevel([
    "            ",
    "t          t",
    "t         st",
    "t          t",
    "t          t",
    "t          t",
    "t          t",
    "t         mt",
    "tttttttttttt",
  ], {
    tileHeight: TILE * SCALE,
    tileWidth: TILE * SCALE,
    tiles: {
      "t": () => [
        k.sprite("tree"),
        k.area(),
        k.scale(SCALE),
        k.body({ isStatic: true }),
        "tree"
      ],
      "m": () => [
        k.sprite("stairs_mini"),
        k.scale(SCALE),
        k.area(),
        "stairs_mini"
      ],
      "s": () => [
        k.sprite("snowman"),
        k.scale(SCALE),
        k.area(),
        k.body({ isStatic: true })
      ]
    }
  })

  const player = k.add([
    k.rect(TILE * SCALE, TILE * SCALE),
    k.pos(100, 150),
    k.color([200, 0, 0])
  ])

  player.onKeyDown('w', () => {
    player.move(0, -10)
  })

  player.onKeyDown('s', () => {
    player.move(0, 10)
  })

  player.onKeyDown('a', () => {
    player.move(-10, 0)
  })

  player.onKeyDown('d', () => {
    player.move(10, 0)
  })
})

k.go('level_1')

// Теги "wall", "tree" не дают пройти игроку