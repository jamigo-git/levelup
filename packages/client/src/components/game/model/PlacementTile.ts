import { Position, Sizes } from '../commonTypes'

export interface PlacementTileConstructor {
  ctx: CanvasRenderingContext2D
  position: Position
  sizes: Sizes
  color?: string
}

export class PlacementTile {
  private readonly position: Position

  private readonly sizes: Sizes

  private color: string

  ctx: CanvasRenderingContext2D

  isOccupied: boolean = false

  constructor({ ctx, position, sizes, color }: PlacementTileConstructor) {
    this.position = position
    this.sizes = sizes
    this.ctx = ctx
    this.color = color || 'rgba(255, 255,255,0.8)'
  }

  get getPosition() {
    return this.position
  }

  get getSize() {
    return this.sizes
  }

  draw() {
    if (!this.ctx) return
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(this.position.x, this.position.y, this.sizes.width, this.sizes.height)
  }

  update(mouse: { x: number; y: number }) {
    this.draw()
    if (!this.ctx) return
    if (
      mouse.x > this.position.x &&
      mouse.x < this.position.x + this.sizes.width &&
      mouse.y > this.position.y &&
      mouse.y < this.position.y + this.sizes.height
    ) {
      this.color = 'rgba(0, 0, 0, 0.15)'
    } else {
      this.color = 'rgba(255, 255, 255, 0.15)'
    }
  }
}
