import React from 'react';


interface ListProps<T> {
    items:T[],
    renderComponent:(component:T,i:number)=>React.ReactNode
}

function List<T>(props:ListProps<T>){
    return <div >
        {props.items.map(props.renderComponent)}
    </div>
}

export default List;