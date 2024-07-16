export type Position = { x: number; y: number }
export type Sizes = {
  width: number
  height: number
}
export type Velocity = { x: number; y: number }
export type MapConfig = {
  name: string
  tileWidth: number
  tileHeight: number
  mapTileWidth: number
  mapTileHeight: number
  mapPixelWidth: number
  mapPixelHeight: number
  src: string
  placementsSymbol: number
  placementsTileData: number[]
  waypoints: { x: number; y: number }[]
}
export type Frames = {
  max: number
  current: number
  hold: number
  elapsed: number
}
export type Offset = { x: number; y: number }
