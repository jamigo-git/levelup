import { Enemy } from './Enemy'
import { Projectile } from './Projectile'
import { Position, Sizes } from '../commonTypes'

export interface BuildingConstructor {
  ctx: CanvasRenderingContext2D
  position: Position
  sizes: Sizes
}

export class Building {
  ctx: CanvasRenderingContext2D

  position: Position

  sizes: Sizes

  projectiles: Projectile[]

  center: Position

  radius: number

  target: Enemy | null = null

  frames: number

  eachFrameShoot: number = 100

  radiusMultiplier: number = 3

  static cost: number = 50

  damage: number = 20

  constructor({ ctx, position, sizes }: BuildingConstructor) {
    this.ctx = ctx
    this.position = position
    this.sizes = sizes
    this.center = {
      x: this.position.x + this.sizes.width / 2,
      y: this.position.y + this.sizes.height / 2,
    }
    this.radius = this.sizes.width / 2 + this.sizes.width * this.radiusMultiplier
    this.frames = 0
    this.projectiles = []
  }

  setTarget = (target: Enemy | null) => {
    this.target = target
  }

  draw() {
    this.ctx.fillStyle = 'blue'
    this.ctx.fillRect(this.position.x, this.position.y, this.sizes.width, this.sizes.height)
  }

  shoot() {
    if (this.frames % this.eachFrameShoot === 0 && !!this.target) {
      this.projectiles.push(
        new Projectile({
          ctx: this.ctx,
          position: { x: this.center.x, y: this.center.y },
          enemy: this.target,
        })
      )
    }
  }

  update() {
    this.draw()
    this.shoot()
    this.frames++
  }
}
