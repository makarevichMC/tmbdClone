import React, {FC} from 'react';

type Props = {
    totalPages:number
    numbersToShow:number
    callback:(page:number)=>void
    currentPage:number
}

const PageNumbers:FC<Props> = ({totalPages,numbersToShow,callback,currentPage}) => {

    let pageButtons = []

    for (let i = currentPage; i<=totalPages; i++){
        pageButtons.push(
            <span key={i}>{i}</span>
        )
    }
    pageButtons = [...pageButtons.slice(currentPage-1,numbersToShow+1), '...',...pageButtons.slice(pageButtons.length-3,pageButtons.length-1)]
    return (
        <div>
            {pageButtons}
        </div>
    );
};

export default PageNumbers;