import axios from 'axios'
import { useState } from "react";
import { increaseSpots, decreaseSpots } from "../helpers/selectors";

export default function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => { setState(prev => ({ ...prev, day })); };
  

  const bookInterview = function(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const decrease = decreaseSpots(state);

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          decrease
        });
      });
  };

  const cancelInterview = async function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const increase = increaseSpots(state);

    try {
      await axios.delete(`/api/appointments/${id}`);
      setState({
        ...state,
        appointments,
        increase,
      });
    } catch (error) {
      return console.log(error);
    }
  };

  return {state, setState, setDay, bookInterview, cancelInterview }
}