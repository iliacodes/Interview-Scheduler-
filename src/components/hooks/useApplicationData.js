import axios from 'axios'
import { useState } from "react";
import { increaseSpots, decreaseSpots } from "../helpers/selectors";

export default function useApplicationData () {
  const port = "http://localhost:8001";
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

    console.log(state)
    const decrease = decreaseSpots(state);

    return axios.put(`${port}/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          decrease
        });
      },     console.log(state));
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


    console.log(state)
    const increase = increaseSpots(state);

    try {
      await axios.delete(`${port}/api/appointments/${id}`);
      setState({
        ...state,
        appointments,
        increase,
      }, console.log(state));
    } catch (error) {
      return console.log(error);
    }
  };

  return {state, setState, setDay, bookInterview, cancelInterview }
}