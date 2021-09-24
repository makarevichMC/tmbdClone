import React, {FC} from 'react';
import { useParams } from 'react-router-dom';
import {RootState} from '../redux/store';

type SortedPageParams = {
    option: string
}

const SortedMoviesPageContainer:FC = () => {
    const params = useParams<SortedPageParams>();

    console.log(params.option);

    return (
        <div>
            {params.option}
        </div>
    );
};

export default SortedMoviesPageContainer;