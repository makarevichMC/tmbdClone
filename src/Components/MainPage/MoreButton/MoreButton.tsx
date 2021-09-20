import React, {FC, useState} from 'react';
import {ReactComponent as MoreBtn} from '../../../images/More.svg';
import styles from './MoreButton.module.css';
import MoreBtnMenu from "../../Common/MenuVariants/MoreBtnMenu";

interface MoreButtonProps {
    id:number
}

const MoreButton:FC<MoreButtonProps> = ( {id}) => {
    const [highlighted,setHighlighted] = useState(false);
    const [openMenu,setOpenMenu] = useState(false);
    const openMenuToggle = () => {
        setOpenMenu(p=>!p);
    }
    const highlightToggle = ()=> {
        setHighlighted(p=>!p)
    }

    const btnStyle = highlighted ? styles.highlighted_btn : styles.btn;
    return (
        <div
            onMouseLeave={highlightToggle}
            onMouseEnter={highlightToggle}
            className={btnStyle}
            onClick={openMenuToggle}>
        <MoreBtn height={20}/>
            {openMenu&&<MoreBtnMenu/>}
        </div>
    );
};

export default MoreButton;