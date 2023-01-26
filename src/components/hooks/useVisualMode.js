import { useState } from 'react';

const useVisualMode = function(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //allows for transitioning to a new mode.
  const transition = function(newMode, replace = false) {
    !replace && setHistory(prev => [...prev, mode]);
    return setMode(newMode);

  };
  // goes to the previous mode using `pop` => removes last element of history
  const back = function() {
    return setMode(history.pop());
  };

  return { mode, transition, back };
};

export default useVisualMode;