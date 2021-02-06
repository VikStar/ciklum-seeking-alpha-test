import React from 'react';
import './Cell.scss';

const Cell = ({ isLive = false, x, y }) => {
    return (
        <div className={`Cell ${isLive ? 'is-live' : ''}`} title={`row ${y + 1}, column ${x + 1}`}></div>
    );
};

export default Cell;