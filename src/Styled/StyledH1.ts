import styled from 'styled-components';

type Props = {
    color?:string
    fontSize?:string
    marginTop?:string
    marginBot?:string
    marginLeft?:string
    marginRight?:string
    position?:'relative' | 'fixed' | 'absolute'
}

export const StyledH1 = styled.h1<Props>`
  color:${props=>props.color};
  font-size:${props=>props.fontSize} ;
  margin-bottom:${props=>props.marginBot} ;
  margin-top: ${props=>props.marginTop};
  margin-left:${props=>props.marginLeft} ;
  margin-right:${props=>props.marginRight} ;
  position: ${props=>props.position};
`