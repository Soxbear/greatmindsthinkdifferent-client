import { useNavigate } from "react-router-dom";
import { SendVote } from "../App";
import { GetAnswer } from "../App";


export default (props) => {
    var Choices = props.Choices;
    const Navigate = useNavigate();

    return(
        <div>
            <h1 className="TextCenter">Vote</h1>
            <div key = '0'>
            {Choices.map((Choice) => {
                if (GetAnswer() == Choice.text) {
                    return;
                }

                return <div className="JoinCenter" key = {Choice.Id}><p><button className="VoteButton" onClick={() => (SendVote(Choice.Id), Navigate("/Wait"))}>{Choice.text}</button></p></div>
            })}
            </div>
        </div>
        
    );
}