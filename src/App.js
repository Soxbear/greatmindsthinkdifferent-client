import InputBox from './components/InputBox'
import JoinScreen from './components/JoinScreen';
import LookUp from './components/LookUp';
import Placement from './components/Placement';
import VoteBox from './components/VoteBox';
import WaitForStart from './components/WaitForStart';
import Waiting from './components/Waiting';
import FailJoin from './components/FailJoin';
import Connecting from './components/Connecting';
import End from './components/End';


import { Route, Routes, useNavigate } from 'react-router-dom';
import { wait } from '@testing-library/user-event/dist/utils';


if (window.location.href == "https://http://gmtd.herokuapp.com/")
  window.location.href = "http://http://gmtd.herokuapp.com/";


const ws = new WebSocket("ws://gmtd-websocket.herokuapp.com:80");

var Answer;

export function SetAnswer(Txt) {
  Answer = Txt;
}
export function GetAnswer() {
  return Answer;
}

ws.addEventListener("open", () => {
  console.log("connected");
  ws.send('client');
  setInterval(function () {
    ws.send(JsonMessage('Ping', 0))
  }, 15000)
})

ws.addEventListener("close", (event) => {
  console.log("Closing Websocket Connection: " + event.reason);
})
ws.addEventListener("error", () => {
  console.log("Websocket Error");
})


export function JoinGame(Name, GameId) {
  console.log('Player "' + Name + '" is joining game ' + GameId);
  ws.send(JsonMessage('GameId', {Id: GameId, Name: Name}));
}

export function SendResponse(Response) {
  ws.send(JSON.stringify({type: 'Response', messageData: Response}));
}

export function SendVote(Choice) {
  console.log("Sent vote: " + Choice);
  ws.send(JsonMessage('Vote', {num: Choice}));
}

function JsonMessage(Type, Data) {
  return JSON.stringify({type: Type, messageData: JSON.stringify(Data)});
}


var VoteChoices;
var Prompt;
var Place;
var Score;

export default () => {  
  const Navigate = useNavigate();

  ws.addEventListener("message", ({ data }) => {
    var Message = JSON.parse(data);

    console.log(Message)
  
    switch (Message.type) {
      case "Start" :
        Navigate("/Look");
        break;
      
      case "Vote" :
        VoteChoices = JSON.parse(Message.messageData).list;
        Navigate("/Vote");
        break;

      case "Answer" :
        var Info = JSON.parse(Message.messageData);
        Prompt = Info.Prompt;
        Navigate("/Input");
        break;

      case "Result" :
        var MessDat = JSON.parse(Message.messageData);
        Place = MessDat.Place;
        Score = MessDat.Score;
        break;

      case "Place" :
        var MessDat = JSON.parse(Message.messageData);
        Place = MessDat.Place;
        Score = MessDat.Score;
        Navigate("/Placement");
        break;
      
      case "Look" :
        Navigate("/Look");
        break;

      case "Handshake" :
        var Success = JSON.parse(Message.messageData);
        if (Success)
          Navigate("/Start");
        else 
          Navigate("/FailJoin");
        break;

      case "End" :
        var MessDat = JSON.parse(Message.messageData);
        Place = MessDat.Place;
        Score = MessDat.Score;
        Navigate("/End");
        ws.close();
        break;

    }

  })

  return (
    <div className='MainDiv'>
      <div className='title'><h2>Great Minds Think Different</h2></div>
      <Routes>
        <Route path='/' element={<JoinScreen/>}/>
        <Route path='/FailJoin' element={<FailJoin/>}/>
        <Route path='/End' element={<End score = {Score} place = {Place}/>}/>
        <Route path='/Connecting' element={<Connecting/>}/>
        <Route path='/Start' element={<WaitForStart/>}/>
        <Route path='/Look' element={<LookUp/>}/>
        <Route path='/Input' element={<InputBox Question = { Prompt }/>}/>
        <Route path='/Wait' element={<Waiting/>}/>
        <Route path='/Vote' element={<VoteBox Choices = {VoteChoices}/>}/>
        <Route path='/Placement' element={<Placement score = {Score} place = {Place}/>}/>
      </Routes>
    </div>
  );
}
