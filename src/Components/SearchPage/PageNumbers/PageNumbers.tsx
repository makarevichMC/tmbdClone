import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';

type StyledPageButtonProps = {
    isActive?:boolean
}

 const StyledPageButton = styled.span<StyledPageButtonProps>`
  font-weight: bold;
  padding: 5px;
  border: ${p=>{
      if (p.isActive){
          return `1px solid black`
      }
 }};
  cursor: pointer;
`



type Props = {
    totalPages:number
    numbersToShow:number
    callback:(page:number)=>void
    currentPage:number
}

const PageNumbers:FC<Props> = ({totalPages,numbersToShow,callback,currentPage}) => {


    const [pagesBtns,setPagesBtns] = useState<any[]>([])

    useEffect(()=>{
        setPagesBtns(createPageButtons())
    },[totalPages,currentPage])

    const createPageButtons = () => {
        let pageButtons = []
        for (let i = 1; i<=totalPages; i++){

            if (i===currentPage) {
                pageButtons.push(
                    <StyledPageButton onClick={()=>{
                        callback(i)
                    }} isActive key={i}>{i}</StyledPageButton>
                )
                continue
            }
            pageButtons.push(
                <StyledPageButton onClick={()=>{
                    callback(i)
                }}
                                  key={i}>{i}</StyledPageButton>
            )
        }

        if (totalPages<=numbersToShow+3) return pageButtons

        let firstPart:any = []
        let secondPart:any = []
        let middlePart:any = []

        if (currentPage + 2 < numbersToShow ){
            firstPart = [...pageButtons.slice(0,numbersToShow)]
            secondPart = ['...',...pageButtons.slice(pageButtons.length-2,pageButtons.length)]
        }

        if (currentPage + 2 >= numbersToShow && currentPage + 3 <= numbersToShow + 3 ){
            firstPart = [...pageButtons.slice(0,currentPage+3)]
            secondPart = ['...',...pageButtons.slice(pageButtons.length-2,pageButtons.length)]
        }

        if (currentPage + 3 > numbersToShow + 3 && currentPage < totalPages - numbersToShow){
            firstPart = [...pageButtons.slice(0,2),'...']
            middlePart = [...pageButtons.slice(currentPage-3,currentPage+3)]
            secondPart = [...pageButtons.slice(pageButtons.length-2,pageButtons.length)]
        }

        if (currentPage + 3 > numbersToShow + 3 && currentPage >= totalPages - numbersToShow){

            firstPart = [...pageButtons.slice(0,2),]
            secondPart = ['...',...pageButtons.slice(pageButtons.length-numbersToShow - 3)]
        }

        pageButtons = [...firstPart,...middlePart,...secondPart]


        if (currentPage > 1) pageButtons.unshift(
            <StyledPageButton key={totalPages+1}
                              onClick={()=>{
                                  callback(currentPage-1)
                              }}
            >Предыдущий</StyledPageButton>
        )

        if (currentPage < totalPages) pageButtons.push(
            <StyledPageButton key={totalPages+2}
                              onClick={()=>{
                                  callback(currentPage+1)
                              }}
            >Следующий</StyledPageButton>
        )

        return pageButtons
    }

    return (
        <div>
            {pagesBtns}
        </div>
    );
};

export default PageNumbers;