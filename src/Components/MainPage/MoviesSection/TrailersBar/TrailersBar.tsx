import React, {FC} from 'react';
import {videoListResultObject} from "../../../../Types/Types";
import styles from './TrailersBar.module.css';
import YoutubeEmbed from "../../../Common/Youtube/Youtube";


type trailersBarProps = {
    data:videoListResultObject[]
    title:string
}

const TrailersBar:FC<trailersBarProps> = ({data,title}) => {

    const trailers = data.map(trailer=>{
        let url;
        if (trailer.site === "YouTube") {
            url = `https://www.youtube.com/embed/${trailer.key}?modestbranding=1&playsinline=0&showinfo=0&enablejsapi=1&origin=http://localhost:3000&widgetid=1`
        }
        else {
            url = `http://vimeo.com/${trailer.key}`
        }

        return <YoutubeEmbed key={trailer.id} url={url}/>


    })
// Тут должно быть много карточек с картинками и один плеер
    return (
        <div>
            <div>
                <h2>{title}</h2>
            </div>
            <div className={styles.trailers_wrapper}>
                {trailers}
            </div>
        </div>
    );
};

export default TrailersBar;