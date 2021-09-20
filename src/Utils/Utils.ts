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

export const deepEqual =  (x:any, y:any) => {
    if (x === y) {
        return true;
    }
    else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
        if (Object.keys(x).length != Object.keys(y).length)
            return false;

        for (let prop in x) {
            if (y.hasOwnProperty(prop))
            {
                if (! deepEqual(x[prop], y[prop]))
                    return false;
            }
            else
                return false;
        }

        return true;
    }
    else
        return false;
}