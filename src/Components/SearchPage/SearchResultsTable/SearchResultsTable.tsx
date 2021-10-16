import React, {FC, useState} from 'react';
import styled from 'styled-components';


const StyledTitle = styled.div`
  color:white;
  background-color: #01b4e4;
  padding: 20px 20px 30px 10px;
`

type StyledInfoDivProps = {
    isActive: boolean
}

const StyledWrapper = styled.div`
  border:1px solid #EBEBEB;
  border-radius: 10px;
  height: max-content;
  overflow: hidden;
`

const StyledInfoDiv = styled.div<StyledInfoDivProps>`
display: flex;
justify-content: space-between;
padding: 15px;
cursor: pointer;
}
  background-color: ${p => {
    return p.isActive ? '#EBEBEB' : '#fff'
}
};
  &:hover{
   background: #EBEBEB;
  }
  & > span{
    padding: 5px;
    border: transparent;
    border-radius: 10px;
    background-color: ${p => {
    return p.isActive ? '#fff' : '#EBEBEB'
}
};
`

type LabelandCount = {
    label: string
    count: number
}

type Props = {
    labels: LabelandCount[]
    callbacks: Function []
}

const SearchResultsTable: FC<Props> = ({labels,callbacks}) => {

    const [activeLabels, setActiveLabels] = useState(new Array(labels.length).fill(false))

    return (
        <StyledWrapper>
            <StyledTitle>
                <h2>Результаты поиска</h2>
            </StyledTitle>

            {labels.map((label, i) => {
                return (
                    <StyledInfoDiv
                        key={i}
                        isActive={activeLabels[i]}
                        onClick={() => {
                            setActiveLabels(
                                activeLabels.map((_el, j) => i === j)
                            )
                            callbacks[i]()
                        }}
                    >
                        {label.label}
                        <span>
                            {label.count}
                        </span>
                    </StyledInfoDiv>)
            })}
        </StyledWrapper>
    );
};

export default React.memo(SearchResultsTable)