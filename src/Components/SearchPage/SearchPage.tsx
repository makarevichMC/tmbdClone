import React, {FC, useEffect, useState} from 'react';
import QueryResults from './QueryResults/QueryResults';
import {GeneralQueryResultData} from './QueryResults/QueryResultBar/QueryResultBar';
import SearchLogo from '../../images/search.png'
import {StyledSearchBar} from '../../Styled/StyledSearchBar';
import styled from 'styled-components';
import ResultCards from './ResultCards/ResultCards';
import SearchResultsTable from './SearchResultsTable/SearchResultsTable';
import {StyledPosition} from '../../Styled/StyledPosition';
import PageNumbers from './PageNumbers/PageNumbers';


type Props = {
    data: GeneralQueryResultData[]
    queryString: string
    setQueries: (query: string) => any
    labelsWithCount: Array<{ label: string, count: number }>
    setCurrentPage: (results: GeneralQueryResultData[]) => {}
    movies: GeneralQueryResultData[]
    tvs: GeneralQueryResultData[]
    people: GeneralQueryResultData[]
    pagesCount: number | null
    currentPageNumber:number | null
}

type StyledSearchDiv = {
    url: any
}

const StyledSearchDiv = styled.div<StyledSearchDiv>`
align-items: center;
  img{
    height:16px ;
    
  }
  display: flex;
`


const StyledSearchContainer = styled.div`
 display: grid;
 grid-template-columns: 20% 80%;
 grid-column-gap: 30px;
 margin-top: 30px;
`


const SearchPage: FC<Props> = (props) => {

    const [visible, setVisible] = useState(false)

    const [inputValue, setInputValue] = useState(props.queryString)

    const callbacks = [
        () => props.setCurrentPage(props.movies), () => props.setCurrentPage(props.tvs), () => props.setCurrentPage(props.people)
    ]


    let timeout: any
    useEffect(() => {
        return () => {
            if (timeout) clearTimeout(timeout)
        }
    })

    return (
        <StyledPosition position={'relative'}>
            <StyledSearchDiv url={SearchLogo}>

                <img src={SearchLogo} alt=""/>

                <StyledSearchBar
                    paddingLeft={'10px'} width={'100%'} height={'40px'} placeholder={''}

                    onFocus={() => {
                        setVisible(true)
                    }}

                    onBlur={() => {
                        timeout = setTimeout(() => {
                            setVisible(false)
                        }, 200)

                    }}

                    value={inputValue}

                    onChange={(e) => {
                        setInputValue(e.target.value)
                        props.setQueries(e.target.value)
                    }}
                    color={'rgb(195,195,195)'}
                />

            </StyledSearchDiv>

            {visible && <QueryResults data={props.data}/>}


            <StyledSearchContainer>
                <SearchResultsTable callbacks={callbacks} labels={props.labelsWithCount}/>
                <ResultCards data={props.data}/>
            </StyledSearchContainer>

            {(props.pagesCount && props.currentPageNumber) &&
            <PageNumbers currentPage={props.currentPageNumber} totalPages={props.pagesCount} numbersToShow={6} callback={(n:number)=>{}}/>}

        </StyledPosition>
    );
};

export default React.memo(SearchPage);