import React, {FC, useEffect} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {useLocation, useParams} from 'react-router-dom'
import {RootState} from '../redux/store'
import {initialSorting, setSortedMoviesThunk} from '../redux/reducers/SortedMoviesPageReducer'
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
        props.setSortedMoviesThunk(mediaType, params.option)
    }, [params.option])


    return (
        <SortedMoviesPage baseUrl={props.baseUrl} data={props.initialData}/>
    );
};


const mapStateToProps = (state: RootState) => {
    console.log('mapStateToProps')
    return {
        initialData: state.sortedPage.pageData,
        lastPage: state.sortedPage.lastPage,
        baseUrl: state.config.images.base_url + state.config.images.poster_sizes[2]
    }
}

const connector = connect(mapStateToProps, {setSortedMoviesThunk})

type ReduxProps = ConnectedProps<typeof connector>

export default connector(SortedMoviesPageContainer)
