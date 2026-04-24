import kaplay from "kaplay";
import { TILE, SCALE, ATLAS_DATA } from "./constants";
import playerInit from "./playerInit"

export const k = kaplay({
  width: 768,
  height: 576,
  canvas: document.querySelector('canvas'),
  debugKey: 'r'
});

k.loadSpriteAtlas('/winter_inside_game.png', ATLAS_DATA)

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
        k.body({ isStatic: true }),
        "arc"
      ],
      '}': () => [
        k.sprite('top_right_arc'),
        k.area(),
        k.scale(SCALE),
        k.body({ isStatic: true }),
        "arc"
      ],
      '[': () => [
        k.sprite('bottom_left_arc'),
        k.area({ shape: new k.Rect(k.vec2(0, TILE - (TILE / 4)), TILE, TILE / 4) }),
        k.scale(SCALE),
        "arc"
      ],
      ']': () => [
        k.sprite('bottom_right_arc'),
        k.area({ shape: new k.Rect(k.vec2(0, TILE - (TILE / 4)), TILE, TILE / 4) }),
        k.scale(SCALE),
        "arc"
      ],
      '_': () => [
        k.sprite('snow_floor_1'),
        k.scale(SCALE),
      ],
      '1': () => [
        k.sprite('snow_floor_2'),
        k.scale(SCALE),
      ],
    }
  })

  k.addLevel([
    "            ",
    "t  l  l    t",
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
        k.body({ isStatic: true }),
        "snowman"
      ],
      "l": () => [
        k.sprite("torch"),
        k.scale(SCALE),
      ]
    }
  })

  const player = playerInit()

  let nearSnowman = false

  player.onCollide("stairs_mini", () => k.go("underground_level"))
  player.onCollide("arc", () => k.go("level_home"))

  player.onCollideUpdate("snowman", () => nearSnowman = true)
  player.onCollideEnd("snowman", () => nearSnowman = false)

  player.onKeyPress("e", () => {
    if (nearSnowman) k.debug.log("Этого снеговика слепили недавно.")
  })
})

k.scene("level_home", () => {
  k.addLevel([
    "_1_1__1__1__",
    "_____1___1__",
    "___1____1___",
    "_1_______1__",
    "___1__1____1",
    "_1___1___1__",
    "_1___1__1___",
    "__1___1__1__",
    "___1___1111_",
  ], {
    tileHeight: TILE * SCALE,
    tileWidth: TILE * SCALE,
    tiles: {
      "_": () => [
        k.sprite("snow_floor_1"),
        k.scale(SCALE)
      ],
      "1": () => [
        k.sprite("snow_floor_2"),
        k.scale(SCALE)
      ]
    }
  })

  k.addLevel([
    "tttttttttttt",
    "t__________t",
    "t__________t",
    "t__________t",
    "t__________t",
    "t__________t",
    "t__________t",
    "t__________t",
    "ttttttvvtttt",
  ], {
    tileHeight: TILE * SCALE,
    tileWidth: TILE * SCALE,
    tiles: {
      "t": () => [
        k.sprite("tree"),
        k.scale(SCALE),
        k.body({ isStatic: true }),
        k.area()
      ],
      "v": () => [
        k.sprite("snow_floor_1"),
        k.scale(SCALE),
        k.area({ shape: new k.Rect(k.vec2(0, TILE - (TILE / 4)), TILE, TILE / 4) }),
        "to_level_1"
      ]
    }
  })

  const player = playerInit(410, 480)

  player.onCollide('to_level_1', () => k.go("level_1", { x: 280, y: 137 }))
})

k.go('level_1')

k.scene("underground_level", () => {
  k.addLevel([
    "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
    "zffffffffffffffffffffffffffffffffffffffffffz",
    "zffffffffffffffffffffffffffffffffffffffffffz",
    "zffffffffffffffffffffffffffffffffffffffffffz",
    "zffffffffffffffffffffffffffffffffffffffffffz",
    "zffffffffffffffffffffffffffffffffffffffffffz",
    "zffffffffffffffffffffffffffffffffffffffffffz",
    "zffffffffffffffffffffffffffffffffffffffffffz",
    "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"
  ], {
    tileHeight: TILE * SCALE,
    tileWidth: TILE * SCALE,
    tiles: {
      "f": () => [
        k.sprite("snow_floor_1"),
        k.scale(SCALE)
      ],
      "z": () => [
        k.sprite("snow_floor_1"),
        k.scale(SCALE)
      ],
    }
  })

  const player = playerInit()
})