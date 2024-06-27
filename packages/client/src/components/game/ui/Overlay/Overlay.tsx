import { FC, PropsWithChildren } from 'react'
import style from './overlay.module.scss'

export const Overlay: FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.overlay}>{children}</div>
}
