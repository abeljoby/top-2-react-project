import React, { useState, useEffect  } from 'react';
import './index.css';

function Instructions() {
    const [infoOpen, setInfoOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setInfoOpen(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`info ${infoOpen ? 'info-open' : ''}`} id="instructions">
            <div className="info-header" id="instructions-header">
                <h1>Instructions</h1>
                <a href="#" className="close" id="close-instructions" title="Close instructions tab" onClick={() => setInfoOpen(false)}></a>
            </div>
            <div className="info-content" id="instructions-content">
                <p>Click on a card to score a point, but be careful not to pick the same one twice.</p>
                <b>Enjoy!</b>
            </div>
        </div>
    );
}

export default Instructions