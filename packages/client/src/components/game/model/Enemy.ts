import { Position, Sizes, Velocity } from '../commonTypes'
import { Sprite } from './Sprite'
import orcRightMovementSprite from '../assets/orcRightMovement.png'
import orcLeftMovementSprite from '../assets/orcLeftMovement.png'

export interface EnemyConstructor {
  ctx: CanvasRenderingContext2D
  position: Position
  waypoints: Position[]
  sizes: Sizes
}

export class Enemy extends Sprite {
  readonly position: Position

  private readonly waypoints: Position[]

  private center: Position

  private sizes: Sizes

  private isMovingLeft = false

  private waypointsIndex = 0

  radius: number

  ctx: CanvasRenderingContext2D

  health: number

  velocity: Velocity

  baseSpeedMultiplier: number = 3

  goldCost = 25

  constructor({ ctx, position, waypoints, sizes }: EnemyConstructor) {
    super({
      ctx,
      position,
      imageSrc: orcRightMovementSprite,
      maxFrames: 7,
    })
    this.position = position
    this.sizes = sizes
    this.center = {
      x: this.position.x + this.sizes.width / 2,
      y: this.position.y + this.sizes.height / 2,
    }
    this.waypoints = waypoints
    this.ctx = ctx
    this.radius = this.sizes.width / 2
    this.health = 100
    this.velocity = { x: 0, y: 0 }
  }

  subtractHealth = (damage: number) => {
    this.health -= damage
  }

  get getRadius() {
    return this.radius
  }

  get getPosition() {
    return this.position
  }

  get getCenter() {
    return this.center
  }

  draw() {
    if (!this.ctx) return
    super.draw()

    this.ctx.fillStyle = 'red'
    this.ctx.fillRect(this.position.x, this.position.y - 12, this.sizes.width, 10)

    this.ctx.fillStyle = 'green'
    this.ctx.fillRect(this.position.x, this.position.y - 12, (this.sizes.width * this.health) / 100, 10)
  }

  walk() {
    const waypoint = this.waypoints[this.waypointsIndex]

    const yDistance = waypoint.y - this.center.y
    const xDistance = waypoint.x - this.center.x
    const angle = Math.atan2(yDistance, xDistance)

    this.velocity.x = Math.cos(angle) * this.baseSpeedMultiplier
    this.velocity.y = Math.sin(angle) * this.baseSpeedMultiplier

    if (this.velocity.x < 0 && this.isMovingLeft === false) {
      super.updateSprite(orcLeftMovementSprite)
      this.isMovingLeft = true
    }
    if (this.velocity.x > 0 && this.isMovingLeft === true) {
      super.updateSprite(orcRightMovementSprite)
      this.isMovingLeft = false
    }

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    this.center = {
      x: this.position.x + this.sizes.width / 2,
      y: this.position.y + this.sizes.height / 2,
    }

    if (
      Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) &&
      Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < Math.abs(this.velocity.y) &&
      this.waypointsIndex < this.waypoints.length - 1
    ) {
      this.waypointsIndex++
    }
  }

  update() {
    this.draw()
    super.update()
    this.walk()
  }
}
