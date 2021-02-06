import React from 'react';
import './Grid.scss';
import Row from './Row';
import Message from './Message';

const Grid = ({ size, coordinates, showMessage }) => {
    const rows = [];

    Math.random()
    
    for (let y = 0; y < size; y++) {
        const liveCells = [];

        if (coordinates[y]) {
            liveCells.push(...coordinates[y]);
        }
        
        rows.push(<Row size={size} key={y} y={y} liveCells={liveCells} />);
    }
    
    return (
        <div className={`Grid`}>
            {showMessage ? <Message /> : null}
            {rows}
        </div>
    );
};

export default Grid;