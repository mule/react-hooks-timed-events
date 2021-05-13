import React, {useState} from 'react';
import {CSSTransition} from 'react-transition-group';


  export interface INotificationProps {
    Created : Date
    Content : string
    Visible : boolean
    VisibilityTime : number
  }

  export const Notification = (props : INotificationProps) => {
    console.log(props.Visible);

    return (
      <CSSTransition timeout={1000} in={props.Visible} unmountOnExit>
        <article className="notification">
          <div>{props
              .Created
              .toLocaleString()}</div>
          <div>
            {props.Content}
          </div>
        </article>
      </CSSTransition>
    );

  }
