

function Placement(props) {
    return (<div className="TextCenter">
        <h2>{"You are currently #" + props.place}</h2>
        <h3>{"Score: " + props.score}</h3>
    </div>)
}

export default Placement;