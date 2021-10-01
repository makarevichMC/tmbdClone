import React, {FC, useState} from 'react'
import styles from './DropdownFilterArea.module.css'
import {ReactComponent as Arrow} from '../../../images/filter-arrow.svg'

type DropdownFilterAreaProps = {
    label: string
}

const DropdownFilterArea: FC<DropdownFilterAreaProps> = ({label, children}) => {
    const [open, setOpen] = useState(false)

    const style = open ?
        `${styles.filter_toggle} ${styles.active}` :
        `${styles.filter_toggle}`

    return (
        <div>
            <div
                className={style}
                onClick={() => {
                    setOpen(p => !p)
                }}>
                {label}
                <Arrow/>
            </div>
            {open && <div>{children}</div>}
        </div>
    )
};

export default DropdownFilterArea

