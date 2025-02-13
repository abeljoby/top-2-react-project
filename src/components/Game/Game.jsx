import './index.css'
import Card from '../Card/Card'
import { useState, useEffect } from 'react';
import Instructions from '../Instructions/Instructions';
import Result from '../Result/Result';

function Game() {
    const winScore = 12;

    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [winState, setWinState] = useState(false);
    const [overState, setOverState] = useState(false);

    function addScore() {
        if(score == (winScore - 1)) {
            setWinState(true);
            setOverState(true);
        }
        else {
            if(score === highScore) {
                setHighScore(score+1);
            }
            setScore(score+1);
        }
    }

    function resetScore() {
        setScore(0);
    }

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const countrySet = {
        "India":{
            "url":"https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id":"eU4pipU_8HA",
            "chosen":false
        },
        "United States of America":{
            "url":"https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2099&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id":"PeFk7fzxTdk",
            "chosen":false
        },
        "Japan":{
            "url":"https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id":"alY6_OpdwRQ",
            "chosen":false
        },
        "Brazil":{
            "url":"https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id":"CErddu-JwKw",
            "chosen":false
        },
        "Germany":{
            "url":"https://images.unsplash.com/photo-1554072675-66db59dba46f?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id":"mtfTz0FnwBw",
            "chosen":false
        },
        "Kenya":{
            "url":"https://images.unsplash.com/photo-1585523658894-cc78fc2c8f67?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id":"R2QCr4LX0a0",
            "chosen":false
        },
    }

    const [countries,setCountries] = useState(countrySet);

    function pickCard(name) {
        if(countries[name]["chosen"] == true) {
            resetScore();
            resetCountries();
            setOverState(true);
        }
        else {
            countries[name]["chosen"] = true;
            addScore();
            chooseCountry(name);
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

    function loadCountries(data) {
        const countries = {};
        for (let c of data) {
            let url = c["urls"]["regular"];
            let name = c["location"]["country"];
            console.log(name);
            let id = c["id"];
            countries[name] = {"url":url,"id":id,"chosen":false};
        }
        setCountries(countries);
    }

    useEffect(() => {
        const fetchImages = async () => {
          const url =
            `https://api.unsplash.com/photos/random?client_id=8Py3PO26wYjDoQh5PDcMOrwMXgLbo-AKnL6egWtrO9g&collections=C1O1XujdT7w&count=${winScore}`;
          try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const data = await response.json();
            loadCountries(data);
          } catch (err) {
            console.log(err);
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };

        fetchImages();
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
        <div className="score"><span>High score: {highScore.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span><span>Current score: {score.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span></div>
        <div className="game">
            {shuffleArray(Object.keys(countries)).slice(0,6).map((country) => (
                <Card key={country} name={country} url={countries[country]["url"]} pickCard={pickCard} />
            ))}
            <Instructions />
            <Result result={winState} over={overState}/>
        </div>
        </>
    )
}

export default Game