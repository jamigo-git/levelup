import { MapConfig } from '../commonTypes'
import { Enemy } from './Enemy'
import { PlacementTile } from './PlacementTile'
import { Building } from './Building'

export type SetStatistic = ({ coins, kill, waves }: { coins: number; kill: number; waves: number }) => void

export interface GameConfigConstructor {
  canvas: HTMLCanvasElement
  map: MapConfig
  setStatistic: SetStatistic
}

export class GameConfig {
  canvas: HTMLCanvasElement

  ctx: CanvasRenderingContext2D | null = null

  map: MapConfig

  enemies: Enemy[] = []

  buildings: Building[] = []

  coins: number = 100

  waveCount: number = 1

  killCount: number = 0

  placementsTileData2d: number[][] = []

  placementsTiles: PlacementTile[] = []

  activeTile: PlacementTile | null = null

  image: HTMLImageElement | null = null

  setStatistic: SetStatistic

  constructor({ canvas, map, setStatistic }: GameConfigConstructor) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.map = map
    this.enemies = []
    this.buildings = []
    this.waveCount = 1
    this.placementsTileData2d = []
    this.placementsTiles = []
    this.activeTile = null
    this.setStatistic = setStatistic
  }

  gameSetup() {
    if (!this.ctx) return
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    const map = new Image()
    map.src = this.map.src
    map.onload = () => {
      if (!this.ctx) return
      this.ctx.drawImage(map, 0, 0)
    }
    this.image = map
    this.preparePlacementsData()
    this.preparePlacementsTiles()
  }

  preparePlacementsData = () => {
    for (let i = 0; i < this.map.placementsTileData.length; i += this.map.mapTileWidth) {
      this.placementsTileData2d.push(this.map.placementsTileData.slice(i, i + this.map.mapTileWidth))
    }
  }

  preparePlacementsTiles = () => {
    this.placementsTileData2d.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === this.map.placementsSymbol) {
          if (!this.ctx) return
          this.placementsTiles.push(
            new PlacementTile({
              ctx: this.ctx,
              position: { x: x * this.map.tileWidth, y: y * this.map.tileHeight },
              sizes: { width: this.map.tileWidth, height: this.map.tileHeight },
            })
          )
        }
      })
    })
  }

  spawnEnemies = (waveCount: number) => {
    const spaceBetweenEnemy = 150
    const baseEnemyCount = 3
    for (let i = 1; i <= baseEnemyCount * waveCount; i++) {
      if (!this.ctx) return
      this.enemies.push(
        new Enemy({
          ctx: this.ctx,
          position: { x: this.map.waypoints[0].x - spaceBetweenEnemy * i, y: 0 },
          waypoints: this.map.waypoints,
          sizes: { width: this.map.tileWidth, height: this.map.tileHeight },
        })
      )
    }
  }

  buildTower = () => {
    if (this.activeTile && !this.activeTile.isOccupied) {
      if (this.coins >= Building.cost) {
        this.coins -= Building.cost
        if (!this.ctx) return
        this.buildings.push(
          new Building({
            ctx: this.ctx,
            sizes: { width: this.map.tileWidth, height: this.map.tileHeight },
            position: this.activeTile.getPosition,
          })
        )
        this.activeTile.isOccupied = true
      }
    }
  }

  buildingShootLoop = () => {
    this.buildings.forEach(building => {
      building.update()
      building.setTarget(null)
      const validEnemies = this.enemies.filter(enemy => {
        const xDifference = enemy.getCenter.x - building.center.x
        const yDifference = enemy.getCenter.y - building.center.y
        const distance = Math.hypot(xDifference, yDifference)
        return distance < enemy.getRadius + building.radius
      })
      building.setTarget(validEnemies.length < 1 ? null : validEnemies[0])

      for (let i = building.projectiles.length - 1; i >= 0; i--) {
        const projectile = building.projectiles[i]
        projectile.update()
        const xDifference = projectile.enemy.getCenter.x - projectile.position.x
        const yDifference = projectile.enemy.getCenter.y - projectile.position.y
        const distance = Math.hypot(xDifference, yDifference)

        if (distance < projectile.enemy.getRadius + projectile.getRadius) {
          projectile.enemy.subtractHealth(20)
          if (projectile.enemy.health <= 0) {
            this.coins += 25
            this.killCount++
            const enemyIndex = this.enemies.findIndex(enemy => {
              return projectile.enemy === enemy
            })
            if (enemyIndex > -1) {
              this.enemies.splice(enemyIndex, 1)
            }
          }

          building.projectiles.splice(i, 1)
        }
      }
    })
  }

  setActiveTile = (mousePosition: { x: number; y: number }) => {
    this.activeTile = null
    for (let i = 0; i < this.placementsTiles.length; i++) {
      const tile = this.placementsTiles[i]
      if (
        mousePosition.x >= tile.getPosition.x &&
        mousePosition.x <= tile.getPosition.x + tile.getSize.width &&
        mousePosition.y >= tile.getPosition.y &&
        mousePosition.y <= tile.getPosition.y + tile.getSize.height
      ) {
        this.activeTile = tile
        break
      }
    }
  }

  enemySpawnLoop = () => {
    if (this.enemies.length === 0) {
      this.spawnEnemies(this.waveCount)
      this.waveCount++
    }
  }

  loseCondition = (requestId: number, setGameIsRunning: (gameState: boolean) => void) => {
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i]
      enemy.update()
      if (enemy.getPosition.x > this.canvas.width) {
        this.enemies.splice(i, 1)
        cancelAnimationFrame(requestId)
        setGameIsRunning(false)
      }
    }
  }

  animate(mousePosition: { x: number; y: number }) {
    if (!this.ctx) return
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    if (this.image) {
      this.ctx.drawImage(this.image, 0, 0)
    }
    this.placementsTiles.forEach(tile => tile.update(mousePosition))
    this.enemySpawnLoop()
    this.buildingShootLoop()
    this.setActiveTile(mousePosition)
    this.setStatistic({ coins: this.coins, kill: this.killCount, waves: this.waveCount })
  }
}
