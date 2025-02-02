import './index.css'
import Card from '../Card/Card'

function Game({score, addScore, resetScore}) {
    return (
        <div
        className="game"
        // style={{width: "300px", height: "300px", backgroundColor: "black"}}
        >
            <Card name="India" url="https://files.yappe.in/place/small/vaishno-devi-126733.webp"/>
            <Card name="United States of America" url="https://judiciariesworldwide.fjc.gov/sites/default/files/styles/max_325x325/public/2022-03/india-flag-round-icon-256.png"/>
            <Card name="India" url="https://judiciariesworldwide.fjc.gov/sites/default/files/styles/max_325x325/public/2022-03/india-flag-round-icon-256.png"/>
            <Card name="India" url="https://judiciariesworldwide.fjc.gov/sites/default/files/styles/max_325x325/public/2022-03/india-flag-round-icon-256.png"/>
            <Card name="India" url="https://judiciariesworldwide.fjc.gov/sites/default/files/styles/max_325x325/public/2022-03/india-flag-round-icon-256.png"/>
            <Card name="India" url="https://judiciariesworldwide.fjc.gov/sites/default/files/styles/max_325x325/public/2022-03/india-flag-round-icon-256.png"/>
        </div>
    )
}

export default Game