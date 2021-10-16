import React, {FC} from 'react';
import {GeneralQueryResultData} from '../QueryResults/QueryResultBar/QueryResultBar';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

type ResultCard = {
    data: GeneralQueryResultData
}

const StyledResultCard = styled.div`
height: 140px;
display: grid;
grid-template-columns: 120px 1fr;
margin-bottom:20px;
border-radius: 10px;
border: solid 1px rgb(227, 227, 227);
overflow: hidden;
box-shadow: 0 0 5px 5px rgba(0,0,0,0.1);
  img{
    height:140px;
  }
  h4{
  margin-top: 10px;
   color:rgb(47,47,47)
  }
  span{
  display: block;
  color:rgb(197,197,197);
  margin-top: 10px;
  }
  p{
    margin-top: 30px;
  }
`

const ResultCard: FC<ResultCard> = ({data}) => {

    return (
            <StyledResultCard >
                <NavLink to={data.redirectUrl}>
                    {data.imageUrl && <img src={data.imageUrl} alt=""/>}
                </NavLink>
                <div>
                    <NavLink to={data.redirectUrl}>
                        <h4>{data.title}</h4>
                    </NavLink>
                    <span>{data.date}</span>
                    <p>{data.overview}</p>
                </div>
            </StyledResultCard>
    );
}


type ResultCardsProps = {
    data: GeneralQueryResultData[]
}

const ResultCards: FC<ResultCardsProps> = ({data}) => {
    return (
        <div>
            {data.map(el => {
                return <ResultCard key={el.id} data={el}/>
            })}
        </div>
    );
};

export default ResultCards;