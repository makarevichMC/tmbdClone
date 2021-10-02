import React, {FC, useState} from 'react'
import styles from './DropdownFilterArea.module.css'
import {ReactComponent as Arrow} from '../../../images/filter-arrow.svg'

type DropdownFilterAreaProps = {
    label: string
    childrenLabel?:string
    backgroundColor?:string
}

const DropdownFilterArea: FC<DropdownFilterAreaProps> = ({label, children,childrenLabel,backgroundColor}) => {
    const [open, setOpen] = useState(false)

    const style = open ?
        `${styles.filter_toggle} ${styles.active}` :
        `${styles.filter_toggle}`

    return (
        <div>
            <div className={style}>
                <div style={{
                    backgroundColor: backgroundColor
                }}
                    className={styles.main_content}
                    onClick={() => {
                        setOpen(p => !p)
                    }}>
                    {label}
                    <Arrow/>
                </div>
                {open &&
                <div className={styles.children}>
                    <span>{childrenLabel}</span>
                    {children}
                </div>}
            </div>

        </div>
    )
};

export default DropdownFilterArea

