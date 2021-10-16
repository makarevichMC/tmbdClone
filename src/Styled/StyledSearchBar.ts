import styled from 'styled-components';
import {divideStyleSizeBy} from '../Utils/Utils';

type styledProps = {
    height: string
    width: string
    position?:string
    left?:string
    top?:string
    paddingLeft?:string
    color?:string
}

export const StyledSearchBar = styled.input<styledProps>`
    display:block;
    width: ${props => props.width};
    margin: 0 auto;
    height: ${props => props.height};
    border-radius:${props => divideStyleSizeBy(props.height,2)};
    border-style:none;
    padding-left:${props => {
        if (props.paddingLeft) return props.paddingLeft
        return  divideStyleSizeBy(props.width, 20)
}}; 
    color:${props=>props.color};
    font-size:20px;
    &:focus::placeholder { 
    color: transparent;
    };
    &:focus{
    outline: none;
    }
`