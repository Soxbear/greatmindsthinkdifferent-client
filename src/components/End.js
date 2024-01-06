export default (props) => {
    return (<div>
        <h2 className="TextCenter">The game has ended</h2>
        <h2/>
        <h2 className="TextCenter">{"You finished #" + props.place}</h2>
        <h3 className="TextCenter">{"Score: " + props.score}</h3>
        <button onClick={() => window.location.replace('/')}>Join a different game</button>
    </div>)    
}