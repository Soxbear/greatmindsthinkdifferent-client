import { JoinGame } from "../App";
import { useNavigate } from 'react-router-dom';


export default () => {
    const Navigate = useNavigate();

    var GmId;
    var PlyNm;
    const Join = () => {
        JoinGame(PlyNm, GmId);
    }
    return (<div>
        <h2 className="TextCenter">Failed to join</h2>
        <div className="JoinCenter">
            <div className="JoinTitle">
                <p className="JoinText">Name</p>
                <p className="JoinText2">Game Id</p>
            </div>
            <div className="JoinBox">
                <input className="JoinButton" type='text' onChange={event => {PlyNm = event.target.value}}/>
                <p><input className="JoinButton" type='number' onChange={event => {GmId = event.target.value}}/></p>
            </div>   
        </div>          
        <div className="JoinCenter"><button onClick={ () => (Navigate('/Connecting'), Join()) } >Play</button></div>
    </div>);
}