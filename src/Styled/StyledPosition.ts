import styled from 'styled-components';

type StyledPositionProps = {
    position: 'absolute' | 'relative' | 'fixed'
    top?: string
    left?: string
    width?: string
    background?: string
    height?: string
    right?: string
    marginLeft?: string
    center?:boolean
    zIndex?:number
}

export const StyledPosition = styled.div<StyledPositionProps>`
  position: ${props => props.position};
  top:${props => props.top};
  left:${props => {
      if (props.center) {
          return '50%'
      }
    return  props.left
}};
  right:${props => props.right};
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.background};
  margin-left: ${props => props.marginLeft}; 
  transform: ${p=>{
      if (p.center) return 'translate(-50%, 0)'
}};
  z-index: ${p => p.zIndex};
`