import React, {FC, useEffect} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {useLocation, useParams} from 'react-router-dom'
import {RootState} from '../redux/store'
import {
    fetchMoreMoviesThunk,
    initialSorting,
    setAdditionalSortingAC,
    setSortedMoviesThunk, sortingType,
} from '../redux/reducers/SortedMoviesPageReducer'
import {mediaType} from '../Types/Types'
import SortedMoviesPage from './SortedMoviesPage';

type SortedPageParams = {
    option: initialSorting
}

const SortedMoviesPageContainer: FC<ReduxProps> = (props) => {

    const params = useParams<SortedPageParams>()
    const location = useLocation()

    let mediaType: mediaType

    if (location.pathname.split('/')[1] === 'tv') {
        mediaType = 'TV'
    } else mediaType = 'MOVIE'

    useEffect(() => {
        let additionalsorting:sortingType;

        switch (params.option) {
            case "top-rated":
                additionalsorting = "vote_average.desc"
                break
            case "popular":
                additionalsorting="popularity.desc"
                break
            case "on-the-air":
            case "upcoming":
            case "airing-today":
            case "now-playing":
                if(mediaType==='TV'){
                    additionalsorting = "popularity.desc"
                } else {
                    additionalsorting = "popularity.desc"
                }
                break
        }
        props.setAdditionalSortingAC(additionalsorting);

        props.setSortedMoviesThunk(mediaType, params.option);
    }, [mediaType, params.option])


    return (
        <SortedMoviesPage
            additionalSorting={props.additionalSorting}
            sortingType={props.sortingType}
            baseUrl={props.baseUrl} data={props.initialData}
            fetchMore={props.fetchMoreMoviesThunk} mediaType={mediaType}/>
    );
};


const mapStateToProps = (state: RootState) => {
    return {
        initialData: state.sortedPage.pageDataResponse.pageData,
        lastPage: state.sortedPage.lastPage,
        baseUrl: state.config.images.base_url + state.config.images.poster_sizes[2],
        currentPage: state.sortedPage.lastPage,
        sortingType: state.sortedPage.initialSorting,
        additionalSorting:state.sortedPage.additionalSorting
    }
}

const connector = connect(mapStateToProps,
    {
        fetchMoreMoviesThunk,
        setSortedMoviesThunk,
        setAdditionalSortingAC
    })

type ReduxProps = ConnectedProps<typeof connector>

export default connector(SortedMoviesPageContainer)
