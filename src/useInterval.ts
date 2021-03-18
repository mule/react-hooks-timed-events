import React, { useState, useEffect, useRef } from 'react';



export default function useInterval(callback : CallableFunction, delay : number) {
  const savedCallback = useRef<CallableFunction>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if(savedCallback.current instanceof Function)
        savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}