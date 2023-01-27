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
    if (history.length > 1) {
      const newHis = [...history]
      const lastMode = newHis.pop()
      setHistory(newHis)
      return setMode(lastMode);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;