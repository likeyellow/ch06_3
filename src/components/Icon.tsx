// import type {FC, CSSProperties} from 'react'

// export type IconProps = {
//   name: string
//   style?: CSSProperties
// }

// export const Icon: FC<IconProps> = props => {
//   return <span className="material-icons" />
// }

// export const Icon: FC<IconProps> = ({name, style}) => {
//   return (
//     <span className="material-icons" style={style}>
//       {name}
//     </span>
//   )
// }

// export const Icon: FC<IconProps> = ({name, ...props}) => {
//   return (
//     <span {...props} className="material-icons">
//       {name}
//     </span>
//   )
// }

import type {FC, DetailedHTMLProps, HTMLAttributes, CSSProperties} from 'react'

type ReactSnapProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

export type IconProps = ReactSnapProps & {
  name: string
  //style?: CSSProperties
}

// prettier-ignore
export const Icon: FC<IconProps> = ({name, className: _className, ...props}) => {
  const className = ['material-icons', _className].join(' ')
  return <span {...props} className={className}>{name}</span>
}
