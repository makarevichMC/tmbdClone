import React, {FC} from 'react';
import styles from './DropdownMenu.module.css';
import List from '../../List/List';
import MenuItem from './MenuItem/MenuItem';
import {useSpring,animated} from 'react-spring';

type MenuData = {
    text: string,
    url: string,
    ActionOnClick?: () => {}
}

interface DropdownMenuProps {
    data: MenuData[]
}

const DropdownMenu: FC<DropdownMenuProps> = ({data}) => {

    const animatedMenu = useSpring({
        to:{
            transform:'scale(1)'
        },
        from:{
            transform:`scale(0)`,
        }
    });

    return (
        <animated.div className={styles.dropdown_menu} style={animatedMenu}>
                <List
                    items={data}
                    renderComponent={(el, i) => {
                        return <MenuItem key={i} url={el.url} text={el.text}/>
                    }}/>
        </animated.div>
    );
};

export default DropdownMenu;