import { k } from "./main"
import { TILE, SCALE } from "./constants"

export default function playerInit(x = 100, y = 150) {
    const player = k.add([
        k.rect(TILE * SCALE, TILE * SCALE),
        k.pos(x, y),
        k.color(200, 20, 0),
        k.body(),
        k.area(),
        "player",
    ])

    const SPEED = 200

    k.onKeyDown("w", () => player.move(0, -SPEED))
    k.onKeyDown("s", () => player.move(0, SPEED))
    k.onKeyDown("a", () => player.move(-SPEED, 0))
    k.onKeyDown("d", () => player.move(SPEED, 0))

    player.onUpdate(() => {
        const halfW = 768 / 2
        const halfH = 576 / 2

        const mapW = 12 * TILE * SCALE
        const mapH = 9 * TILE * SCALE

        const camX = Math.max(halfW, Math.min(player.pos.x, mapW - halfW))
        const camY = Math.max(halfH, Math.min(player.pos.y, mapH - halfH))

        k.setCamPos(camX, camY)
    })

    return player
}