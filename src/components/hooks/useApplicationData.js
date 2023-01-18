import axios from 'axios'
import { useState } from "react";

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

    return axios.put(`${port}/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments
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
    try {
      await axios.delete(`${port}/api/appointments/${id}`);
      setState({
        ...state,
        appointments
      });
    } catch (error) {
      return console.log(error);
    }
  };

  return {state, setState, setDay, bookInterview, cancelInterview }
}