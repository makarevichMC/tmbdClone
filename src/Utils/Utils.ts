import {mediaType} from '../Types/Types';
import {getSortedMediaArg} from '../API/api';
import {initialSorting} from '../redux/reducers/SortedMoviesPageReducer';


export   const hexToRGB = (hex: Array<string>, alpha: number) => {

    if (hex.some(el=>el===undefined)) return
    else {
        let length = hex.length;
        let redSumm = 0, greenSumm = 0, blueSumm = 0;
        for (let el of hex){
            redSumm += parseInt(el.slice(1,3),16);
            greenSumm += parseInt(el.slice(3,5),16);
            blueSumm += parseInt(el.slice(5,7),16);
        }
        return `rgba(${redSumm/length}, ${greenSumm/length}, ${blueSumm/length}, ${alpha})`;
    }
}

export const deepEqual = (x:any,y:any) => {
    if (x===y)  return true

    if (typeof x !== 'object' || typeof y !== 'object' || x===null||y ===null) return false

    for (let prop in x){
        if (x[prop]===y[prop]) continue
        if (typeof x !== 'object' || typeof y !== 'object' || x===null||y ===null) return false
        else if (deepEqual(x[prop],y[prop])) continue
        else return false
    }
    return true
}

export const convertMediaType = (type:mediaType,dataType:initialSorting):getSortedMediaArg => {

    switch (type) {
        case 'TV':
            let tvSorting = dataType as  'popular' | 'top-rated' | 'airing-today' | 'on-the-air'
            return {
                mediaType:type,
                initialSorting:tvSorting
            }

        case 'MOVIE':
            let movieSorting = dataType as  'popular' | 'top-rated' | 'now-playing' | 'upcoming'
            return {
                mediaType:type,
                initialSorting:movieSorting
            }
    }
}