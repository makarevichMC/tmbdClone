import React, {FC, useEffect, useState} from 'react';
import PercentageBar from "../../Common/PercentageBar/PercentageBar";
import styles from './BackgroundSection.module.css'
import {hexToRGB} from "../../../Utils/Utils";

type BackdroundSectionProps = {
    posterUrl: string
    backgorundURL: string
    rating: number
    title?: string
    release_date?: string
    genres?: string[]
    overview?: string | null
    director: string
    writer: string
    tagline?: string | null
    runtime?: string
    backgroundColor:Array<string>
}

const BackgroundSection: FC<BackdroundSectionProps> = (props) => {

    let color;

    if (props.backgroundColor){
        color = hexToRGB(props.backgroundColor,0.9)
    }

    const formatedDate = props.release_date?.split('-').reverse().join('/')

        let genres;
    if (props.genres) {
        genres = props.genres.map((genre,i)=><span key={i} className={styles.genre_item}>{genre}</span>)
    }

    return (
        <div className={styles.wrapper}
             style={{
                 background:`url(${props.backgorundURL}) center`,
             }}>
            <div className={styles.background}
            style={{
                backgroundColor:color
            }}
            >
            </div>
            <div className={styles.content_wrapper}>
                <div className={styles.image}>
                    <img src={props.posterUrl} alt=""/>
                </div>
                <div className={styles.content}>
                    <h1>{props.title} <span>{`(${props.release_date?.slice(0,4)})`}</span></h1>
                    <ul>
                        <li>{formatedDate}</li>
                        <li>{genres ? genres :''}</li>
                        <li>{props.runtime}</li>
                    </ul>
                    <div className={styles.percentage_and_buttons}>
                        <div className = { styles.percentage} >
                            <PercentageBar rating={props.rating*10} size={60}/>
                        </div>
                        <span>Пользовательский <br/> счёт</span>
                        <div className={styles.buttons}>
                            кнопки
                        </div>
                    </div>
                    <span className={styles.tagline}>{props.tagline}</span>
                    <h4>Обзор</h4>
                    <div className={styles.overview}>
                        {props.overview}
                    </div>
                    <div className={styles.creators}>
                        <div className={styles.creators_item}>
                            <span>{props.director}</span><br/>
                           Director
                        </div>
                        <div className={styles.creators_item}>
                            <span>{props.writer}</span><br/>
                           Writer
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BackgroundSection;