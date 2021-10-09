import styled from 'styled-components';

type StyledSearchDivProps = {
    url:string
}
export const StyledSearchDiv = styled.div<StyledSearchDivProps>`
    background:url(${props=>`'${props.url}'`}) center;
    height: 50vh;
    position:relative;
    margin-top: -5vh;
`
