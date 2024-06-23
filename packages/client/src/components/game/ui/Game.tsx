import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useCanvas } from '@/hooks/useCanvas'
import { MapConfig } from '../commonTypes'
import { PlacementTile } from '../model/PlacementTile'
import { maps } from '../maps'
import { Enemy } from '../model/Enemy'
import { Building } from '../model/Building'

export interface GameInterface {}

export const Game: FC<GameInterface> = () => {
  const [mapName] = useState('DesertOrks')
  const mousePosition = useRef({ x: 0, y: 0 })

  const mapConfig = useMemo(() => {
    const index = maps.findIndex((map: MapConfig) => map.name === mapName)
    if (index < 0) return undefined
    return maps[index]
  }, [mapName])

  const canvasRef = useCanvas(([canvas, ctx]) => {
    if (!mapConfig) return
    const { waypoints, placementsTileData, src, tileWidth, tileHeight, placementsSymbol, mapTileWidth } = mapConfig

    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const map = new Image()
    map.src = src

    const enemies: Enemy[] = []

    const spawnEnemy = (waveCount: number) => {
      for (let i = 1; i < 3 * waveCount; i++) {
        enemies.push(
          new Enemy({
            ctx,
            position: { x: waypoints[0].x - 150 * i, y: 0 },
            waypoints,
            sizes: { width: tileWidth, height: tileHeight },
          })
        )
      }
    }
    let spanCount = 1
    spawnEnemy(spanCount)

    const placementsTileData2d: number[][] = []
    for (let i = 0; i < placementsTileData.length; i += mapTileWidth) {
      placementsTileData2d.push(placementsTileData.slice(i, i + mapTileWidth))
    }
    const placementsTiles: PlacementTile[] = []
    placementsTileData2d.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === placementsSymbol) {
          placementsTiles.push(
            new PlacementTile({
              ctx,
              position: { x: x * tileWidth, y: y * tileHeight },
              sizes: { width: tileWidth, height: tileHeight },
            })
          )
        }
      })
    })
    let coins = 100
    const buildings: Building[] = []
    let activeTile: PlacementTile | null = null

    canvas.addEventListener('click', () => {
      if (activeTile && !activeTile.isOccupied) {
        if (coins >= 50) {
          coins -= 50
          buildings.push(
            new Building({
              ctx,
              sizes: { width: tileWidth, height: tileHeight },
              position: activeTile.getPosition,
            })
          )
          activeTile.isOccupied = true
        }
      }
    })

    function animate() {
      console.log(coins)
      const requestId = requestAnimationFrame(animate)

      ctx.drawImage(map, 0, 0)

      for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i]
        enemy.update()
        if (enemy.getPosition.x > canvas.width) {
          enemies.splice(i, 1)
          cancelAnimationFrame(requestId)
        }
      }

      if (enemies.length === 0) {
        spanCount++
        spawnEnemy(spanCount)
      }

      placementsTiles.forEach(tile => tile.update(mousePosition.current))

      buildings.forEach(building => {
        building.update()
        building.setTarget(null)
        const validEnemies = enemies.filter(enemy => {
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
              coins += 25
              const enemyIndex = enemies.findIndex(enemy => {
                return projectile.enemy === enemy
              })
              if (enemyIndex > -1) {
                enemies.splice(enemyIndex, 1)
              }
            }

            building.projectiles.splice(i, 1)
          }
        }
      })

      activeTile = null
      for (let i = 0; i < placementsTiles.length; i++) {
        const tile = placementsTiles[i]
        if (
          mousePosition.current.x >= tile.getPosition.x &&
          mousePosition.current.x <= tile.getPosition.x + tile.getSize.width &&
          mousePosition.current.y >= tile.getPosition.y &&
          mousePosition.current.y <= tile.getPosition.y + tile.getSize.height
        ) {
          activeTile = tile
          break
        }
      }
    }

    map.onload = () => {
      animate()
    }
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      mousePosition.current = { x, y }
    }
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!mapConfig) return <>ERROR</>

  return (
    <canvas
      height={mapConfig.mapPixelHeight}
      width={mapConfig.mapPixelWidth}
      style={{ background: 'rgba(0, 0, 0, 0)' }}
      ref={canvasRef}
    />
  )
}
