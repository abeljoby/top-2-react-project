import './index.css'
import Card from '../Card/Card'
import { useState, useEffect, useCallback } from 'react';
import Instructions from '../Instructions/Instructions';
import Result from '../Result/Result';

function Game() {
    
    const imageBufferSize = 15;

    const countrySet = {
        "India":{
            "url":"./src/assets/images/indiaMemoryPic.jpg",
            "id":"eU4pipU_8HA",
            "chosen":false
        },
        "United States":{
            "url":"./src/assets/images/usaMemoryPic.jpg",
            "id":"PeFk7fzxTdk",
            "chosen":false
        },
        "Japan":{
            "url":"./src/assets/images/japanMemoryPic.jpg",
            "id":"alY6_OpdwRQ",
            "chosen":false
        },
        "Brazil":{
            "url":"./src/assets/images/brazilMemoryPic.jpg",
            "id":"CErddu-JwKw",
            "chosen":false
        },
        "Germany":{
            "url":"./src/assets/images/germanyMemoryPic.jpg",
            "id":"mtfTz0FnwBw",
            "chosen":false
        },
        "Kenya":{
            "url":"./src/assets/images/kenyaMemoryPic.jpg",
            "id":"R2QCr4LX0a0",
            "chosen":false
        },
    }

    const [score, setScore] = useState(0);
    const [winScore, setWinScore] = useState(Object.keys(countrySet).length);
    const [highScore, setHighScore] = useState(0);
    const [winState, setWinState] = useState(false);
    const [overState, setOverState] = useState(false);

    function addScore() {
        if(score === highScore) {
            setHighScore(score+1);
        }
        setScore(score+1);
        if(score == (winScore - 1)) {
            setWinState(true);
            setOverState(true);
        }
    }

    function resetScore() {
        setScore(0);
    }

    function restartGame() {
        resetScore();
        resetCountries();
        setOverState(false);
        setWinState(false);
    }

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [countries,setCountries] = useState(countrySet);

    function pickCard(name) {
        console.log(winScore);
        if(!overState) {
            if(countries[name]["chosen"] == true) {
                setOverState(true);
            }
            else {
                countries[name]["chosen"] = true;
                addScore();
                chooseCountry(name);
            }
        }
    }

    function chooseCountry(name) {
        setCountries(prevCountries => ({
            ...prevCountries,
            [name]: {
                ...prevCountries[name],
                chosen: true
            }
        }));
    }

    function resetCountries() {
        setCountries(prevCountries => {
            const resetCountries = {};
            for (let country in prevCountries) {
                resetCountries[country] = {
                    ...prevCountries[country],
                    chosen: false
                };
            }
            return resetCountries;
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function shuffleCountries(countries) {
        let shuffledKeys = shuffleArray(Object.keys(countries));
        let firstSix = shuffledKeys.slice(0, 6);
        let remaining = shuffledKeys.slice(6);

        let allChosen = firstSix.every(country => countries[country].chosen);

        if (allChosen && remaining.length > 0) {
            let randomIndex = Math.floor(Math.random() * firstSix.length);
            let unchosenIndex = remaining.findIndex(country => !countries[country].chosen);

            if (unchosenIndex !== -1) {
                [firstSix[randomIndex], remaining[unchosenIndex]] = [remaining[unchosenIndex], firstSix[randomIndex]];
            }
        }

        return firstSix;
    }

    function loadCountries(data) {
        const countries = {};
        for (let c of data) {
            let url = c["urls"]["regular"];
            let name = c["location"]["country"];
            let id = c["id"];
            countries[name] = {"url":url,"id":id,"chosen":false};
        }
        console.log(Object.keys(countries).length);
        setWinScore(Object.keys(countries).length);
        setCountries(countries);
    }

    useEffect(() => {

        fetch(`https://api.unsplash.com/photos/random?client_id=8Py3PO26wYjDoQh5PDcMOrwMXgLbo-AKnL6egWtrO9g&collections=C1O1XujdT7w&count=${imageBufferSize}`,
            {
                mode: "cors",
            }
        )
        .then((response) => response.json())
        .then((data) => loadCountries(data))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));

        // const fetchImages = async () => {
        //     const url =
        //         `https://api.unsplash.com/photos/random?client_id=8Py3PO26wYjDoQh5PDcMOrwMXgLbo-AKnL6egWtrO9g&collections=C1O1XujdT7w&count=${imageBufferSize}`;
        //     try {
        //         const response = await fetch(url);
        //         if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        //         const data = await response.json();
        //         loadCountries(data);
        //     } catch (err) {
        //         // console.log(err);
        //         setError(err.message);
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        // fetchImages();
    }, []);

    if (loading) return <h1>Loading...</h1>;
    if (error) {
        setTimeout(() => {
            setError(null);
        }, 2000);
        return <p>Error: Couldn't fetch images from Unsplash API.<br />Fetching presaved images instead...</p>;
    }
    return (
        <>
        <div className="bar">
            <div className="score"><span>High score: {highScore.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span><span>Current score: {score.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span></div>
            <Instructions over={overState} restart={restartGame}/>
        </div>
        <div className="game">
            {shuffleCountries(countries).map((country) => (
                <Card key={country} name={country} url={countries[country]["url"]} pickCard={pickCard}/>
            ))}
            <Result result={winState} over={overState}/>
        </div>
        </>
    )
}

export default Game