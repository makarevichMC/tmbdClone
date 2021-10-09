import React, {FC, useState} from 'react';
import {NavLink} from 'react-router-dom';
// @ts-ignore
import styles from './RecomendationCard.module.css';


type RecomendationCardProps = {
    title?: string
    rating: number
    date?: string
    imgUrl: string | null
    id: number
    tv: boolean
}

const RecomendationCard: FC<RecomendationCardProps> = ({title, rating, date, imgUrl, id, tv}) => {
    const redirectURL = tv ? `tv_details/tv/${id}` : `/movie_details/movie/${id}`;

    const [isActive, setIsActive] = useState(false);
    const [showTitle, setShowTitle] = useState(false);
    const [coords, setCoords] = useState<number[]>([]);

    const imageURL = imgUrl ? imgUrl : '';

    let shortTitle;

    if (title) {
        if (title?.length > 12) {
            shortTitle = title.slice(0, 13) + ' ...';
        } else {
            shortTitle = title;
        }
    }


    let x = 0;
    let y = 0;
    let target: EventTarget & Element;
    let coordsTracker: any = [];
    let timeout: any;


    const mouseMoveHandler = (e: React.MouseEvent) => {
        const currenTarget = e.currentTarget;
        target = currenTarget;
        if (target.className !== styles.wrapper) return

        let x = e.pageX + 20;
        let y = e.pageY + 20;

        coordsTracker.push({x, y});

        timeout = setTimeout(() => {

            let lastCoords = coordsTracker[coordsTracker.length - 1]

            if (lastCoords.x === x && lastCoords.y === y) {
                setCoords([x, y]);
                setShowTitle(true);
            }
        }, 1000);


    }

    return (
        <div className={styles.wrapper}
             onMouseMove={mouseMoveHandler}
             onMouseOver={() => {
                 setIsActive(true);
             }}
             onMouseLeave={() => {
                 setIsActive(false);
                 setShowTitle(false);
                 clearTimeout(timeout);
             }}
        >
            <NavLink to={redirectURL}>

                <div className={styles.img_container}>
                    <img src={imageURL} alt=""/>
                    {
                        isActive && <div className={styles.date}>{date}</div>
                    }
                </div>

                <div className={styles.text}>
                    <span>{shortTitle}</span>
                    <span>{Math.ceil(rating)}%</span>
                </div>
            </NavLink>
            {
                showTitle &&
                <div className={styles.popup}
                     style={{
                         left: `${coords[0]}px`,
                         top: `${coords[1]}px`,
                         zIndex: 20
                     }}
                >{title}</div>
            }
        </div>

    );
};

export default RecomendationCard;