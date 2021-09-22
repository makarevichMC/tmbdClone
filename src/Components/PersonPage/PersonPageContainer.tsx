import React, {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {RootState} from '../../redux/store';
import {connect, ConnectedProps} from 'react-redux';
import {setPersonPageThunk} from '../../redux/reducers/personPageReducer';
import PersonPage from "./PersonPage";

type personPageParams = {
    id: string
}

const PersonPageContainer: FC<ReduxProps> = (props) => {

    const params = useParams<personPageParams>();

    useEffect(() => {
        props.setPersonPageThunk(params.id)
    }, [params.id])

    return (
        <PersonPage
            movieBarBaseUrl={props.movieBarBaseUrl} photoBaseUrl={props.photoBaseUrl}
            isLoading={props.isLoading} personInfo={props.info} personCredits={props.credits}/>
    );
};

const mapStateToProps = (state: RootState) => {
    const photoBaseUrl =
        state.config.images.base_url +
        state.config.images.profile_sizes[2]
    const movieBarBaseUrl =
        state.config.images.base_url +
        state.config.images.poster_sizes[2]

    return {
        info: state.personPage?.personDetails,
        credits: state.personPage?.personCredits,
        isLoading: state.personPage.isLoading,
        photoBaseUrl,
        movieBarBaseUrl
    }
}

const connector = connect(mapStateToProps, {setPersonPageThunk});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(PersonPageContainer);


