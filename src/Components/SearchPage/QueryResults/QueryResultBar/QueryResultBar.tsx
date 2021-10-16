import React, {FC} from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

type StyledProps = {
    first:boolean
}

const StyledBar = styled.div<StyledProps>`
  background-color: #fff;
  &>a{
  color:rgb(37,37,37);
  }
  &:hover{
    cursor: pointer;
    background-color: rgb(245,245,245);
  }
  border-top: ${p=>{
      if (p.first) return 'solid 1 px rgb(227,227,227)'
}};
  border-bottom: solid 1px rgb(227,227,227);
  border-left: solid 1px rgb(227,227,227);
  border-right: solid 1px rgb(227,227,227);
`

export type GeneralQueryResultData = {
    title:string
    type: 'tv' | 'movie' | 'person'
    id:number
    date:string | null
    imageUrl:string | null
    overview:string | null
    knownFor:string | null
    redirectUrl:string
}

type Props = {
    data:GeneralQueryResultData
    first:boolean
}

const QueryResultBar:FC<Props> = ({data,first}) => {

    let url

    switch (data.type) {
        case 'movie':
            url = `/movie_details/movie/${data.id}`
            break
        case 'tv':
            url = `/tv_details/tv/${data.id}`
            break
        case 'person':
            url = `/person/${data.id}`
            break
    }

    return (
        <StyledBar first={first}>
          <NavLink to={url}> {data.type} {data.title}</NavLink>
        </StyledBar>
    );
};

export default React.memo(QueryResultBar);