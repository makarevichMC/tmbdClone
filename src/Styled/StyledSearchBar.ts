import styled from 'styled-components';
import {divideStyleSizeBy} from '../Utils/Utils';

type styledProps = {
    height: string
    width: string
    position?:string
    left?:string
    top?:string
}

export const StyledSearchBar = styled.input<styledProps>`
    display:block;
    width: ${props => props.width};
    margin: 0 auto;
    height: ${props => props.height};
    border-radius:${props => divideStyleSizeBy(props.height,2)};
    border-style:none;
    padding-left:${props => divideStyleSizeBy(props.width,20)};
    font-size:20px;
    &:focus::placeholder { 
    color: transparent;
    };
    &:focus{
    outline: none;
    }
`