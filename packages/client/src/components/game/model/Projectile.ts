import { Enemy } from './Enemy'
import { Position, Velocity } from '../commonTypes'

export interface ProjectileConstructor {
  ctx: CanvasRenderingContext2D
  position: Position
  enemy: Enemy
}

export class Projectile {
  ctx: CanvasRenderingContext2D

  position: Position

  velocity: Velocity

  enemy: Enemy

  radius: number

  baseSpeedMultiplier: number = 5

  constructor({ ctx, position, enemy }: ProjectileConstructor) {
    this.ctx = ctx
    this.position = position
    this.velocity = {
      x: 0,
      y: 0,
    }
    this.enemy = enemy
    this.radius = 8
  }

  get getRadius() {
    return this.radius
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    this.ctx.fillStyle = 'orange'
    this.ctx.fill()
  }

  fly() {
    const angle = Math.atan2(this.enemy.getCenter.y - this.position.y, this.enemy.getCenter.x - this.position.x)

    this.velocity.x = Math.cos(angle) * this.baseSpeedMultiplier
    this.velocity.y = Math.sin(angle) * this.baseSpeedMultiplier

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  update() {
    this.draw()
    this.fly()
  }
}
