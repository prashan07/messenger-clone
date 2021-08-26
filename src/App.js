import './App.css';
import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './Message'
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(()=> {
    // run once when the component loads
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message:doc.data()})))
    })
  }, [])

  // useEffect runs if there is any change in its dependency
  // [] doesn't change so it runs only once
  useEffect(()=>{
    setUsername(prompt("Hey, what's your name?"));
  }, []);



  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() 
    })

    // setMessages([...messag es, { username: username, text: input}]);
    setInput("");
  }

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=80&h=80"/>
      <h1>Welcome to Messenger, {username}!</h1>
      <form className="app_form">
        <FormControl className="app_formControl">
          <Input className="app_input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)}/>
          <IconButton 
            className="app__iconButton"
            disabled={!input} 
            type="submit" 
            variant="contained" 
            color="primary" 
            onClick={sendMessage}>
              <SendIcon/>
          </IconButton>

          {/* <Button disabled={!input} type="submit" variant="contained" color="primary" onClick={sendMessage}>Send Message</Button> */}
        </FormControl>
      </form>

      <FlipMove>
        { 
          messages.map(({id, message}) => (
            <Message key={id} username={username} message={message}/>
          ))
        }
      </FlipMove>
     
    </div>
  );
}

export default App;
