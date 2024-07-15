import { Enemy } from './Enemy'
import { Projectile } from './Projectile'
import { Position, Sizes } from '../commonTypes'
import { Sprite } from './Sprite'
import towerSprite from '../assets/tower.png'

export interface BuildingConstructor {
  ctx: CanvasRenderingContext2D
  position: Position
  sizes: Sizes
}

export class Building extends Sprite {
  ctx: CanvasRenderingContext2D

  sizes: Sizes

  projectiles: Projectile[]

  center: Position

  radius: number

  target: Enemy | null = null

  eachFrameShoot: number = 100

  radiusMultiplier: number = 3

  static cost: number = 50

  damage: number = 20

  constructor({ ctx, position, sizes }: BuildingConstructor) {
    super({
      ctx,
      position,
      imageSrc: towerSprite,
      maxFrames: 19,
    })
    this.ctx = ctx
    this.sizes = sizes
    this.center = {
      x: this.position.x + this.sizes.width / 2,
      y: this.position.y + this.sizes.height / 2,
    }
    this.radius = this.sizes.width / 2 + this.sizes.width * this.radiusMultiplier
    this.projectiles = []
  }

  setTarget = (target: Enemy | null) => {
    this.target = target
  }

  draw() {
    super.draw()
  }

  shoot() {
    this.projectiles.push(
      new Projectile({
        ctx: this.ctx,
        position: { x: this.center.x - 6, y: this.center.y - 24 },
        enemy: this.target as Enemy,
      })
    )
  }

  update() {
    this.draw()
    if (this.target || (!this.target && this.frames.current !== 0)) super.update()
    if (this.target && this.frames.current === 6 && this.frames.elapsed % this.frames.hold === 0) {
      this.shoot()
    }
  }
}
