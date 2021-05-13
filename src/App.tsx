import React, {useState} from 'react';
import { CSSTransition } from 'react-transition-group';
import useInterval from './useInterval'
import {Notification, INotificationProps} from './Notification'
import './App.css';
import { couldStartTrivia } from 'typescript';


function App() {

  const [currentInput, setCurrentInput] = useState('');
  const [notifications , setNotifications] = useState<INotificationProps[]>([]);

  useInterval(() => {

    console.log('tick');
  
    var newNotifications = notifications.map(setVisibility);
    setNotifications(newNotifications);

  }, 1000);
  
  
  const setVisibility = (notificationProps : INotificationProps) => {
    var now = new Date();
    var isVisible = (now.getTime() - notificationProps.Created.getTime() < notificationProps.VisibilityTime);
    notificationProps.Visible = isVisible;
    return notificationProps;
  }

  const onKeyUp = (e : React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      var newNotification : INotificationProps = {Created: new Date(), Content: currentInput, Visible: true, VisibilityTime: 10000};
      var newNotifications = notifications.concat(newNotification);
      setNotifications(newNotifications);
      setCurrentInput('');
    }
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
            {notifications.map( (notificationProps, i)  => <li key={'notification' +i} className="my-1">
              <Notification {...notificationProps} />
            </li>  ) }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
