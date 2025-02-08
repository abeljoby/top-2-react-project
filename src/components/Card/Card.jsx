import './index.css'

function Card({name,url,pickCard}) {
    return (
        <div
        className="card"
        onClick={() => pickCard(name)}
        >
            <div className="image">
                <img src={url} alt={"A picture of "+ name}/>
            </div>
            <span className='playtime-large'>{name}</span>
        </div>
    )
}

export default Card