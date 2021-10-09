import styled from 'styled-components';

type StyledButtonProps = {
    height:string
}

export const StyledButton = styled.button<StyledButtonProps>`
    transition: background-color 0.2s;
    padding: 6px 19px 6px 19px;
    color:white;
    font-size: 20px;
    font-weight: 600;
     background: -webkit-linear-gradient(right,rgba(30,213,169,1)0%, rgba(1,180,228,1)100%);
    border-radius: 50px;
    border-style: none;
    height: ${props=>props.height};
    &:hover{
      color:  #0d253f;
      cursor: pointer;
    }
`