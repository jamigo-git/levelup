import { Position, Sizes, Velocity } from '../commonTypes'

export interface EnemyConstructor {
  ctx: CanvasRenderingContext2D
  position: Position
  waypoints: Position[]
  sizes: Sizes
}

export class Enemy {
  private readonly position: Position

  private readonly waypoints: Position[]

  private center: Position

  private sizes: Sizes

  private waypointsIndex = 0

  private radius: number

  private ctx = null

  health: number

  velocity: Velocity

  constructor({ ctx, position, waypoints, sizes }: EnemyConstructor) {
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
    this.ctx.fillStyle = 'red'
    // this.ctx.fillRect(this.position.x, this.position.y, this.sizes.width, this.sizes.height)
    this.ctx.beginPath()
    this.ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
    this.ctx.fill()

    this.ctx.fillStyle = 'red'
    this.ctx.fillRect(this.position.x, this.position.y - 12, this.sizes.width, 10)

    this.ctx.fillStyle = 'green'
    this.ctx.fillRect(this.position.x, this.position.y - 12, (this.sizes.width * this.health) / 100, 10)
  }

  update() {
    this.draw()
    const waypoint = this.waypoints[this.waypointsIndex]

    const yDistance = waypoint.y - this.center.y
    const xDistance = waypoint.x - this.center.x
    const angle = Math.atan2(yDistance, xDistance)

    const speedMultiplier = 1
    this.velocity.x = Math.cos(angle) * speedMultiplier
    this.velocity.y = Math.sin(angle) * speedMultiplier

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
}
