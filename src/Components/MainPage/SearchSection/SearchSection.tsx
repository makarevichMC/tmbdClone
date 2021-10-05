import React, {FC} from 'react';
import styled from 'styled-components';
import {divideStyleSizeBy} from '../../../Utils/Utils';

type styledProps = {
    height: string
    width: string
}

const StyledSearchBar = styled.input<styledProps>`
    display:block;
    width: ${props => props.width};
    margin: 0 auto;
    height: ${props => props.height};
    border-radius:${props => divideStyleSizeBy(props.height,2)};
    border-style:solid;
    padding-left:${props => divideStyleSizeBy(props.width,20)};
    font-size:20px;
    &:focus::placeholder { 
    color: transparent;
    }
`

const SearchSection: FC = () => {
    return (
        <div>
            <StyledSearchBar height={'40px'} width={'85%'} type={'text'} placeholder={'Найти фильм, сериал, персону...'}/>
        </div>
    );
};

export default SearchSection;