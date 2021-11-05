import React, {FC} from 'react';
import QueryResultBar, {GeneralQueryResultData} from './QueryResultBar/QueryResultBar';
import {StyledPosition} from '../../../Styled/StyledPosition';


type Props = {
    data: GeneralQueryResultData[]
}

const QueryResults: FC<Props> = ({data}) => {


    return (

        data.length !== 0 ?

            <StyledPosition position={'absolute'} width={'100%'}>
                {data.map((el, i) => {
                    return <QueryResultBar key={el.id} data={el} first={i === 0}/>
                })}
            </StyledPosition>
            :
            <div>По вашему запросу ничего не найдено</div>
    );
};

export default React.memo(QueryResults);