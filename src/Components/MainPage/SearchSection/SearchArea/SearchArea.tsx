import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import {StyledPosition} from '../../../../Styled/StyledPosition';
import {StyledButton} from '../../../../Styled/StyledButton';
import {StyledSearchBar} from '../../../../Styled/StyledSearchBar';

type Props = {
    marginLeft?:string
    marginTop?:string
}

const SearchArea: FC<Props> = ({marginLeft,marginTop}) => {
    return (
        <StyledPosition position={'absolute'} width={'100%'} marginLeft={marginLeft}>

            <StyledSearchBar height={'50px'} width={'100%'} type={'text'}
                             placeholder={'Найти фильм, сериал, персону...'}
            />

            <StyledPosition position={'absolute'} right={'0'} top={'0'}>
                <NavLink to={'/search'}>
                    <StyledButton height={'50px'}>Найти</StyledButton>
                </NavLink>
            </StyledPosition>


        </StyledPosition>
    )
}

export default SearchArea;