import { Frames, Offset, Position } from '../commonTypes'

export interface SpriteConstructor {
  ctx: CanvasRenderingContext2D
  position: Position
  imageSrc: string
  maxFrames?: number
  offset?: Offset
  speedAnimation?: number
}

export class Sprite {
  ctx: CanvasRenderingContext2D

  image: HTMLImageElement

  position: Position

  frames: Frames

  offset: Offset

  constructor({
    ctx,
    position,
    imageSrc,
    maxFrames = 1,
    speedAnimation = 2,
    offset = {
      x: 0,
      y: 0,
    },
  }: SpriteConstructor) {
    this.ctx = ctx
    this.position = position

    this.image = new Image()
    this.image.src = imageSrc

    this.frames = {
      max: maxFrames,
      current: 0,
      hold: speedAnimation,
      elapsed: 0,
    }

    this.offset = offset
  }

  draw() {
    const cropWidth = this.image.width / this.frames.max
    const crop = {
      position: {
        x: cropWidth * this.frames.current,
        y: 0,
      },
      width: cropWidth,
      height: this.image.height,
    }

    this.ctx.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      this.position.x + this.offset.x,
      this.position.y + this.offset.y,
      crop.width,
      crop.height
    )
  }

  update() {
    this.frames.elapsed++
    if (this.frames.elapsed % this.frames.hold === 0) {
      this.frames.current++
      if (this.frames.current >= this.frames.max) {
        this.frames.current = 0
      }
    }
  }

  updateSprite(sprite: string) {
    this.image.src = sprite
  }
}
