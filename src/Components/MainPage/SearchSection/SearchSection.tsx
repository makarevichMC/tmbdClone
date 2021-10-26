import React, {FC} from 'react';
import {pickRandomFromArray} from '../../../Utils/Utils';
import {StyledSearchDiv} from '../../../Styled/StyledSearchWrapper';
import {StyledPosition} from '../../../Styled/StyledPosition';
import SearchArea from './SearchArea/SearchArea';
import {StyledH1} from '../../../Styled/StyledH1';


type Props = {
    urls: string[]
    setQuery: (query: string) => any
}

const SearchSection: FC<Props> = ({urls, setQuery}) => {


    const backgroundUrl = pickRandomFromArray(urls)

    const baseUrl = 'https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/'

    const url = baseUrl + backgroundUrl


    return (
        <StyledSearchDiv url={url}>
            <StyledH1 fontSize={'80px'} color={'white'} marginLeft={'10%'} position={'absolute'} marginTop={'5%'}>
                Добро пожаловать
            </StyledH1>
            <br/>
            <StyledH1 fontSize={'40px'} color={'white'} marginLeft={'10%'} position={'absolute'} marginTop={'12%'}>
                Миллионы фильмов, сериалов и людей. Исследуйте сейчас.
            </StyledH1>
            <StyledPosition position={'absolute'} width={'85%'} top={'75%'} center>
                <SearchArea setQuery={setQuery}/>
            </StyledPosition>

        </StyledSearchDiv>
    );
};

export default React.memo(SearchSection);



