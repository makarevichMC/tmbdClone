import React, {FC} from 'react';
import QueryResultBar, {GeneralQueryResultData} from './QueryResultBar/QueryResultBar';
import {StyledPosition} from '../../../Styled/StyledPosition';


type Props = {
    data:GeneralQueryResultData[]
}

const QueryResults:FC<Props> = ({data}) => {


    return (
        <StyledPosition position={'absolute'} width={'100%'}>
                {data.map((el,i)=>{
                    return <QueryResultBar key={el.id} data={el} first={i === 0}/>
                })}
        </StyledPosition>
    );
};

export default React.memo(QueryResults);