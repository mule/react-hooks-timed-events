import React, {useState, useEffect} from 'react';
import { getJSDocDeprecatedTag } from 'typescript';
import useInterval from './useInterval'
import './App.css';

export interface Notification {
  Created : Date,
  Content : string
}


function App() {

  const [currentInput, setCurrentInput] = useState('');
  const [notifications , setNotifications] = useState<Notification[]>([]);

  useInterval(() => {
    var now = new Date();
    var newNotifications = notifications.filter(notification => (now.getTime() - notification.Created.getTime()) < 10000);
    setNotifications(newNotifications);
  }, 1000);  

  const onKeyUp = (e : React.KeyboardEvent<HTMLInputElement>) => {
    console.log('Key pressed:' + e.key)
    if (e.key === "Enter") {
      var newNotification : Notification = {Created: new Date(), Content: currentInput};
      var newNotifications = notifications.concat(newNotification);
      setNotifications(newNotifications);
      setCurrentInput('');
    }
  }

  const renderNotification = (notification : Notification) => {
    return(

      <article className="notification">
        <div>{notification.Created.toLocaleString()}</div>
        <div>
          {notification.Content}
        </div>
      </article>

    );

  }

  return (
    <div className="App container"> 
      <h1 className="title">React kata: timed events</h1>
      <div className="columns">
        <div className="column">
          <input onChange={e => setCurrentInput(e.target.value)} onKeyPress={e  =>  onKeyUp(e)} value={currentInput} className="input" type="text" placeholder="add notification"></input>
        </div>
        <div className="column">
          <ul>
            {notifications.map( (notification, i)  => <li key={'notification' +i} className="my-1">{renderNotification(notification)}</li>  ) }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
