import React, {CSSProperties, FC, useEffect, useRef} from 'react';

interface PercentageProps {
    rating: number
    size: number
}

const PercentageBar: FC<PercentageProps> = ({rating, size}) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const supSignStyles: CSSProperties = {
        position: 'absolute',
        fontSize: `${size * 0.2}px`,
        left: `${size * 0.4}px`,
        color: '#fff',
        top: 0,
        fontFamily: 'Source Sans Pro',

    }

    const wrapperStyles: CSSProperties = {
        position: 'relative',
        width: size
    }


    const spanStyles: CSSProperties = {
        position: 'absolute',
        fontSize: `${size * 0.4}px`,
        left: `${size * 0.25}px`,
        color: '#fff',
        top: `${size * 0.25}px`,
        fontFamily: 'Source Sans Pro',
    }

    useEffect(() => {

        if (!canvasRef.current) return;

        let primaryColor;
        let secondaryColor;

        if (rating > 69) {
            primaryColor = '#14cf15';
            secondaryColor = '#598c51';
        } else if (rating < 40) {
            primaryColor = '#f00f39';
            secondaryColor = '#8f5a66';
        } else {
            primaryColor = '#e7d018';
            secondaryColor = '#aea55f';
        }



        let cx = canvasRef.current.getContext('2d');

        const width = size;
        const height = size;
        const canvasRad = width / 2;
        const pi = Math.PI;
        const goalPoint = -pi / 2 + 2 * pi * rating / 100;


        cx?.beginPath();
        cx!.lineWidth = canvasRad * 0.2;
        cx?.arc(width / 2, height / 2, canvasRad * 0.9, 0, 2 * pi);
        cx?.closePath();
        cx!.strokeStyle = '#081c22';
        cx!.fillStyle = '#081c22';
        cx?.stroke();
        cx?.fill();


        cx?.beginPath();
        cx!.lineWidth = canvasRad * 0.15;
        cx!.strokeStyle = primaryColor;
        cx?.arc(width / 2, height / 2, canvasRad * 0.80, -pi / 2, goalPoint);
        cx?.stroke();

        if (rating === 100) return

        cx?.beginPath();
        cx!.lineWidth = canvasRad * 0.15;
        cx!.strokeStyle = secondaryColor;
        cx?.arc(width / 2, height / 2, canvasRad * 0.8, goalPoint, -pi / 2);
        if (rating === 0) {

            cx?.arc(width / 2, height / 2, canvasRad * 0.8, -pi / 2, 3 / 2 * pi);
        }
        cx?.stroke();


    }, [canvasRef, rating, size])


    return (
        <div style={wrapperStyles}>
            <canvas height={size} width={size} ref={canvasRef}></canvas>
            <span style={spanStyles}>
                {rating}
                <sup style={supSignStyles}>%</sup>
            </span>
        </div>
    );
};

export default PercentageBar;