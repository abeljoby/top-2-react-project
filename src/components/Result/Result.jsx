import React, { useState, useEffect  } from 'react';
import './index.css';

function Result({result, over}) {
    const [resultOpen, setResultOpen] = useState(false);

    useEffect(() => {
        if(over) {
            const timer = setTimeout(() => {
                setResultOpen(true);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [over]);

    return (
        <div className={`info ${resultOpen ? 'info-open' : ''}`} id="instructions">
            <div className="info-header" id="instructions-header">
                {result ? <h1>You win!</h1> : <h1>Nice try!</h1>}
                <a href="#" className="close" id="close-instructions" title="Close instructions tab" onClick={() => setResultOpen(false)}></a>
            </div>
            <div className="info-content" id="instructions-content">
                <p>Click on a card to score a point, but be careful not to pick the same one twice.</p>
                <b>Enjoy!</b>
            </div>
        </div>
    );
}

export default Result