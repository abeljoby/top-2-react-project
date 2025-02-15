import './index.css'
import Card from '../Card/Card'
import { useState, useEffect, useCallback } from 'react';
import Instructions from '../Instructions/Instructions';
import Result from '../Result/Result';
import preImage from '/worldIcon.jpg';

function Game() {
    const imageBufferSize = 15;
    const winScore = imageBufferSize - 5;

    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [winState, setWinState] = useState(false);
    const [overState, setOverState] = useState(false);

    const [infoOpen, setInfoOpen] = useState(false);

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
            let id = c["id"];
            countries[name] = {"url":url,"id":id,"chosen":false};
        }
        setCountries(countries);
    }

    useEffect(() => {
        const fetchImages = async () => {
          const url =
            `https://api.unsplash.com/photos/random?client_id=8Py3PO26wYjDoQh5PDcMOrwMXgLbo-AKnL6egWtrO9g&collections=C1O1XujdT7w&count=${imageBufferSize}`;
          try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const data = await response.json();
            loadCountries(data);
          } catch (err) {
            // console.log(err);
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
        <div className="bar">
            <div className="score"><span>High score: {highScore.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span><span>Current score: {score.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span></div>
            <button className="tip" aria-label="Open instructions tab" onClick={()=> setInfoOpen(true)}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                    <path fill="#000000" d="M0 0 C165 0 330 0 500 0 C500 165 500 330 500 500 C335 500 170 500 0 500 C0 335 0 170 0 0 Z " transform="translate(0,0)"/>
                    <path fill="#FFFFFF" d="M0 0 C17.82 0 35.64 0 54 0 C49.13371898 25.95349879 43.85874782 51.78191653 38.0859375 77.546875 C36.1931978 85.99536449 34.31912475 94.44785104 32.46142578 102.90411377 C32.02746574 104.87524522 31.59002215 106.84560882 31.15234375 108.81591797 C25.80413826 128.38337795 25.80413826 128.38337795 28.33984375 147.77734375 C30.6817242 150.9127084 33.29889484 152.0955946 37 153 C48.2703996 154.55062545 57.99127109 149.31916637 67 143 C70.90272799 139.93268023 74.63147895 136.66032644 78.37304688 133.40039062 C81.80285272 130.4482048 85.33866261 127.62477244 88.85546875 124.77734375 C91.03470231 123.02744291 91.03470231 123.02744291 93 121 C96.0390625 120.8046875 96.0390625 120.8046875 99.625 120.875 C100.81351563 120.89304687 102.00203125 120.91109375 103.2265625 120.9296875 C104.14179688 120.95289063 105.05703125 120.97609375 106 121 C102.82273508 124.81271791 99.600001 128.45516471 96.0625 131.9375 C93.46249847 134.49818204 90.99651376 137.10172391 88.625 139.875 C82.6961506 146.74922402 76.21612441 153.14681376 69.3046875 159.03125 C67.47551192 160.59379999 65.67582009 162.17793897 63.8828125 163.78125 C47.31644236 178.47373467 30.90024227 188.92350628 8.1328125 188.13623047 C-2.86754748 187.43359759 -13.2092661 182.7907339 -21 175 C-22.97131683 172.12446091 -24.52449983 169.15505888 -26 166 C-26.32226562 165.35675781 -26.64453125 164.71351563 -26.9765625 164.05078125 C-29.09825517 159.00432533 -29.30711609 153.91620751 -29.375 148.5 C-29.38893799 147.81945557 -29.40287598 147.13891113 -29.41723633 146.43774414 C-29.34524239 138.17901098 -27.54843856 130.08233938 -26 122 C-25.87069092 121.31911316 -25.74138184 120.63822632 -25.6081543 119.93670654 C-24.70254091 115.18165684 -23.76391578 110.43357593 -22.8125 105.6875 C-22.66482178 104.94832336 -22.51714355 104.20914673 -22.36499023 103.4475708 C-19.74943544 90.38608339 -16.91282433 77.37987487 -13.99047852 64.3840332 C-11.37984487 52.76938224 -8.87806393 41.13459417 -6.43359375 29.48388672 C-4.36399725 19.63673637 -2.18333422 9.825004 0 0 Z " transform="translate(210,200)"/>
                    <path fill="#FFFFFF"d="M0 0 C7.61753585 4.32600802 11.87106157 10.23542211 15.52734375 18.0703125 C17.45215995 26.99446035 16.63040116 35.53416629 11.92578125 43.41796875 C6.69799118 50.8962246 0.18736053 55.39748207 -8.78515625 57.2578125 C-17.52900168 58.30758604 -24.6678179 56.64243804 -32.01171875 51.78515625 C-38.23501857 46.8554637 -42.26634552 40.08198899 -43.78515625 32.2578125 C-44.64919536 22.63706937 -42.66454901 14.69799523 -36.59375 7.11328125 C-26.6474932 -3.09076191 -13.07910077 -6.06259776 0 0 Z " transform="translate(260,120)"/>
                </svg>
            </button>
        </div>
        <div className="game">
            {shuffleArray(Object.keys(countries)).slice(0,6).map((country) => (
                <Card key={country} name={country} url={countries[country]["url"]} pickCard={pickCard}/>
            ))}
            <Instructions infoOpen={infoOpen} setInfoOpen={setInfoOpen}/>
            <Result result={winState} over={overState}/>
        </div>
        </>
    )
}

export default Game