import React, {FC, useEffect} from 'react';
import {RootState} from '../../redux/store';
import {connect, ConnectedProps} from 'react-redux';
import SearchPage from './SearchPage';
import {
    SetCurrentPageNumberAC,
    SetCurrentResultsAC,
    SetCurrentTypeAC,
    SetQueryAC,
    setQueryResultsThunk
} from '../../redux/reducers/searchPageReducer';
import {
    getCurrentPage,
    getCurrentResults,
    getCurrentType,
    getLabelsWithCount,
    getMovieResultsReselect,
    getPagesCount,
    getPersonResultsReselect,
    getQueryString,
    getTvResultsReselect
} from '../../Selectors/Selectors';

const SearchPageContainer: FC<reduxProps> = (props) => {


    useEffect(() => {

        const page = props.currentPageNumber ? props.currentPageNumber : 1

        props.setQueryResultsThunk(props.query, page)


    }, [props.currentType, props.currentPageNumber])

    let res = props.currentResults ? props.currentResults : []

    return (
        <SearchPage setQueries={props.setQueryResultsThunk}
                    queryString={props.query} data={res} labelsWithCount={props.labelsWithCount}
                    setCurrentPage={props.SetCurrentResultsAC} movies={props.movieResults}
                    tvs={props.tvResults} people={props.personResults} pagesCount={props.pagesCount}
                    currentPageNumber={props.currentPageNumber} setCurrentPageNumber={props.SetCurrentPageNumberAC}
                    setCurrentType={props.SetCurrentTypeAC} setQueryString={props.SetQueryAC}
                    currentType={props.currentType}
        />
    );
};

const mapStateToProps = (state: RootState) => {

    return {
        query: getQueryString(state),
        tvResults: getTvResultsReselect(state),
        movieResults: getMovieResultsReselect(state),
        personResults: getPersonResultsReselect(state),
        labelsWithCount: getLabelsWithCount(state),
        currentResults: getCurrentResults(state),
        pagesCount: getPagesCount(state),
        currentPageNumber: getCurrentPage(state),
        currentType: getCurrentType(state)
    }
}

const connector = connect(mapStateToProps,
    {
        setQueryResultsThunk,
        SetCurrentResultsAC,
        SetCurrentPageNumberAC,
        SetCurrentTypeAC,
        SetQueryAC
    })

type reduxProps = ConnectedProps<typeof connector>

export default React.memo(connector(SearchPageContainer));