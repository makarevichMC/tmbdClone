import React, {FC, useState} from 'react'
import styles from './DropdownFilterArea.module.css'
import {ReactComponent as Arrow} from '../../../images/filter-arrow.svg'

type DropdownFilterAreaProps = {
    label: string
    childrenLabel?: string
    additionalStyles?: object
    borderStyles?: object
    childrenStyles?: object
}

const DropdownFilterArea: FC<DropdownFilterAreaProps> =
    ({
         label, children, childrenLabel,
         additionalStyles, borderStyles,
         childrenStyles
     }) => {
        const [open, setOpen] = useState(false)


        const style = open ?
            `${styles.filter_toggle} ${styles.active}` :
            `${styles.filter_toggle}`

        return (
            <div>
                <div className={style} style={{...borderStyles}}>
                    <div style={{
                        ...additionalStyles
                    }}
                         className={styles.main_content}
                         onClick={() => {
                             setOpen(p => !p)
                         }}>
                        {label}
                        <Arrow/>
                    </div>
                    {open &&
                    <div className={styles.children} style={{...childrenStyles}}>
                        <span>{childrenLabel}</span>
                        {children}
                    </div>}
                </div>

            </div>
        )
    };

export default DropdownFilterArea

