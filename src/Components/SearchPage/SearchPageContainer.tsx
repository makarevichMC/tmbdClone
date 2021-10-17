import React, {FC, useEffect} from 'react';
import {RootState} from '../../redux/store';
import {connect, ConnectedProps} from 'react-redux';
import SearchPage from './SearchPage';
import {
    SetCurrentPageNumberAC,
    SetCurrentResultsAC,
    setQueryResultsThunk
} from '../../redux/reducers/searchPageReducer';
import {
    getCurrentPage,
    getCurrentResults,
    getLabelsWithCount,
    getMovieResultsReselect, getPagesCount,
    getPersonResultsReselect,
    getQueryString,
    getTvResultsReselect
} from '../../Selectors/Selectors';

const SearchPageContainer:FC<reduxProps> = (props) => {

    useEffect(()=>{
        props.setQueryResultsThunk(props.query,1)
        props.SetCurrentResultsAC(props.movieResults)
    },[props.movieResults])

        let res = props.currentResults ? props.currentResults : []

    return (
        <SearchPage setQueries={(query:string,pageNumber:number)=>{props.setQueryResultsThunk(query,pageNumber)}}
                    queryString={props.query} data={res} labelsWithCount={props.labelsWithCount}
                    setCurrentPage = {props.SetCurrentResultsAC} movies={props.movieResults}
                    tvs={props.tvResults} people={props.personResults} pagesCount={props.pagesCount}
                    currentPageNumber = {props.currentPageNumber} setCurrentPageNumber={props.SetCurrentPageNumberAC}

        />
    );
};

const mapStateToProps = (state:RootState)=>{

    return {
        query: getQueryString(state),
        tvResults:getTvResultsReselect(state),
        movieResults:getMovieResultsReselect(state),
        personResults:getPersonResultsReselect(state),
        labelsWithCount:getLabelsWithCount(state),
        currentResults:getCurrentResults(state),
        pagesCount:getPagesCount(state),
        currentPageNumber:getCurrentPage(state)
    }
}

const connector = connect(mapStateToProps,
    {
        setQueryResultsThunk,
        SetCurrentResultsAC,
        SetCurrentPageNumberAC,
    })

type reduxProps = ConnectedProps<typeof connector>

export default React.memo(connector(SearchPageContainer)) ;