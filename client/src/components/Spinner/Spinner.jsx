import React from 'react';
import './Spinner.css';

const Spinner = () => {
    return (
        <div className="spin">
            <div className="load-msg">資料載入中，請稍候...</div>
            <div className="loader"></div>
        </div>
    )
}

export default Spinner;
