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
    setQueries: (query: string, page: number) => any
    labelsWithCount: Array<{ label: string, count: number }>
    setCurrentPage: (currentResults: GeneralQueryResultData[] | null) => {}
    movies: GeneralQueryResultData[]
    tvs: GeneralQueryResultData[]
    people: GeneralQueryResultData[]
    pagesCount: {
        movies: number,
        tvs: number,
        people: number
    }
    currentPageNumber: number | null
    setCurrentPageNumber: (page: number) => void
    setCurrentType: (type: null | 'tv' | 'movie' | 'person') => void
    setQueryString: (query: string) => {}
    currentType: null | 'tv' | 'movie' | 'person'
}

type StyledSearchDivType = {
    url: any
}

const StyledSearchDiv = styled.div<StyledSearchDivType>`
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

    const [currentPagesCount, setCurrentPagesCount] = useState(props.pagesCount.movies)


    useEffect(() => {
        switch (props.currentType) {
            case null:
            case 'movie':
                setCurrentPagesCount(props.pagesCount.movies)
                break
            case 'tv':
                setCurrentPagesCount(props.pagesCount.tvs)
                break
            case 'person':
                setCurrentPagesCount(props.pagesCount.people)
                break
        }
    }, [props.pagesCount,props.currentType])

    const [visible, setVisible] = useState(false)

    const [inputValue, setInputValue] = useState(props.queryString)

    const callbacks = [
        () => {
            props.setCurrentPageNumber(1)
            props.setCurrentType('movie')
            setCurrentPagesCount(props.pagesCount.movies)

        },
        () => {
            props.setCurrentPageNumber(1)
            props.setCurrentType('tv')
            setCurrentPagesCount(props.pagesCount.tvs)


        },
        () => {
            props.setCurrentPageNumber(1)
            props.setCurrentType('person')
            setCurrentPagesCount(props.pagesCount.people)

        }
    ]


    let timeout: any

    useEffect(() => {

        return () => {
            if (timeout) clearTimeout(timeout)
        }
    }, [props.currentPageNumber])

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
                        let pageNumber = props.currentPageNumber ? props.currentPageNumber : 1
                        setInputValue(e.target.value)
                        props.setQueries(e.target.value, pageNumber)
                        props.setQueryString(e.target.value)
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

            <PageNumbers
                currentPage={props.currentPageNumber}
                totalPages={currentPagesCount}
                numbersToShow={7}
                callback={(pageNumber) => {
                    props.setQueries(
                        inputValue,
                        pageNumber
                    )
                }}/>}

        </StyledPosition>
    );
};

export default React.memo(SearchPage);