import React from 'react';
import Cell from '../Cell/Cell';
import './Row.scss';

const Row = ({ y, size, liveCells}) => {
    const cells = [];

    for (let x = 0; x < size; x++) {
        let isLive = false;

        if (liveCells.includes(x)) {
            isLive = true;
        }
        
        cells.push(<Cell key={x} x={x} y={y} isLive={isLive} />)
    }
    
    return (
        <div className={`Row`}>
            {cells}
        </div>
    );
};

export default Row;