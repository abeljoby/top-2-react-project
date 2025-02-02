import './index.css'

function Card({name,url}) {
    return (
        <div
        className="card"
        // style={{width: "300px", height: "300px", backgroundColor: "black"}}
        >
            <div className="image">
                <img src={url} alt={"A picture of "+ name} srcset="" />
            </div>
            <span className="permanent-marker-regular">{name}</span>
        </div>
    )
}

export default Card