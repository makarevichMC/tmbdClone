import React, {FC, useEffect, useRef} from 'react';
//@ts-ignore
import styles from './SwitchBar.module.css'

interface SwitchBarProps {
    labels:string[]
    changeMovieData:(currentBar:string) => any
}

const SwitchBar: FC<SwitchBarProps> = ({labels,changeMovieData}) => {


    const ref = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if (ref.current) {

            const firstLabel = ref.current.firstElementChild;
            firstLabel!.classList.add(styles.active);
            const width = firstLabel!.clientWidth;
            const children = Array.from(ref.current.children);
            const height = ref.current.clientHeight;
            const slider =
                children.filter(el => el.classList.contains(styles.slider))[0] as unknown as HTMLElement;
            slider.style.width = `${width}px`;
            slider.style.height = `${height}px`
            slider.style.left = '-1px';
        }

    },[]);


    const clickHandler = (e: React.MouseEvent) => {
        const target = e.currentTarget as unknown as HTMLElement;
        const width = target.clientWidth;
        const left = target.offsetLeft;

        changeMovieData(target.innerText);

        if (e.currentTarget.parentElement) {
            let siblings = e.currentTarget.parentElement?.children;
            let siblingsArray = Array.from(siblings);
            siblingsArray.forEach((el) => {
                el.classList.remove(styles.active);
            })
            const slider =
                siblingsArray.filter(el => el.classList.contains(styles.slider))[0] as unknown as HTMLElement;
            slider.style.width = `${width+2}px`;
            slider.style.left = `${left-1}px`;
        }
        e.currentTarget.classList.add(styles.active);
    }

    return (
        <div ref={ref} className={styles.wrapper}>
            {labels.map((el,i) => {
                return <div
                    key={i}
                    className={styles.item}
                    onClick={clickHandler}>
                    {el}</div>
            })}
            <div className={styles.slider}></div>
        </div>
    );
};

export default SwitchBar;