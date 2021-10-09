import React, {FC, useEffect} from 'react';
import {RootState} from '../../redux/store';
import {connect, ConnectedProps} from 'react-redux';
import {setMoviePageThunk} from '../../redux/reducers/moviePageReducer';
import MoviesDetails from './MoviesDetails';
import {useParams} from 'react-router-dom';


type MoviesDetailsParams = {
    id: string
    mediaType:'movie'|'tv'
}


const MovieDetailsContainer: FC<ReduxProps> = (props) => {

    const params = useParams<MoviesDetailsParams>();

    useEffect(()=>{
        console.log(params.mediaType)
        if (!isNaN(Number(params.id))){
            switch (params.mediaType) {
                case "movie":
                    props.setMoviePageThunk(params.id);
                    break
                case "tv":
                    // console.log('TV_DETAILS')
                    props.setMoviePageThunk(params.id,true);
            }
        }

    },[params.id])

    return (
        <MoviesDetails mainImageUrl={props.mainImgUrl} movieDetails={props.movieDetails}
                       backDropUrl={props.movieDetails?.backdrop_path} baseBackdropUrl={props.baseBackdropUrl}
                       baseProfileUrl={props.baseProfileUrl} posterPath={props.posterPath}
                       actors={props.actors} crew={props.crew} recomendations={props.recomendations}

        />
    );
};

const mapStateToProps = (state: RootState) => {
    const baseURL = state.config.images.base_url;
    const backDropSizes = state.config.images.backdrop_sizes;
    const profileSizes = state.config.images.profile_sizes;


    let baseProfileUrl = baseURL + profileSizes[1];
    let baseBackdropUrl = baseURL + backDropSizes[3];
    let mainImgUrl = baseURL + backDropSizes[0];

    return {
        baseProfileUrl,
        baseBackdropUrl,
        backDropUrl: state.moviePage.movieDetails?.backdrop_path,
        movieDetails:state.moviePage.movieDetails,
        mainImgUrl,
        posterPath:state.moviePage.movieDetails?.poster_path,
        actors:state.moviePage.actors,
        crew:state.moviePage.crew,
        recomendations:state.moviePage.recomendations,
    }
}

const connector =  connect(mapStateToProps, {setMoviePageThunk});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(MovieDetailsContainer);