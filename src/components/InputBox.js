import { useNavigate } from "react-router-dom";
import App, { SendResponse, SetAnswer } from "../App";

export default (props) => {
    var Response;
    const Navigate = useNavigate();

    return (
        <div>
            <h2 className="TextCenter">{props.Question}</h2>
            <div className="JoinCenter"><input className="AnswerInput" type='text' onChange={event => {Response = event.target.value}}/></div>
            <div className="JoinCenter"><p><button className="AnswerButton" onClick= {() => (SendResponse(Response), Navigate("/Wait"), SetAnswer(Response))}>Submit</button></p></div>
        </div>        
    )
}