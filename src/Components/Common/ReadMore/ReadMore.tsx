import React, {FC, useState} from 'react';
import styles from './ReadMore.module.css';

type ReadMoreProps = {
    text: string
    visibleLength: number
}

const ReadMore: FC<ReadMoreProps> = ({text, visibleLength}) => {

    const initialText = text.slice(0, visibleLength + 1);
    const showButtonText = 'Читать дальше...';
    const hideButtonText = 'Скрыть';
    const [visible, setVisible] = useState(false);
    const [visibleText, setVisibleText] = useState(initialText);
    const [buttonText, setButtonText] = useState(showButtonText);

    const clickHandler = () => {
        if (visible) {
            setVisible(false);
            setVisibleText(initialText)
            setButtonText(showButtonText);
        } else {
            setVisible(true);
            setVisibleText(text);
            setButtonText(hideButtonText);
        }
    }

    return (
        <div className={styles.wrapper}>
            {visibleLength < text.length ?
                <div>
                    <span className={styles.text}>
                       {visibleText}
                    </span>
                    <a href={'#'} className={styles.text_toggle} onClick={clickHandler}>{buttonText}</a>
                </div>
                :
                <div> {text} </div>
            }
        </div>
    );
};

export default ReadMore;