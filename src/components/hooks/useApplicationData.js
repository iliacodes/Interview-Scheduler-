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
  


  // function to save the data to the API 
  const bookInterview = function(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //decreases amount of spots remaining from adding an appointment.
    // => components/helpers/selectors.js
    const decrease = decreaseSpots(state);

    //Put request to database to push bookInterview data. 
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          decrease
        });
      });
  };


  // function to delete the data from the API
  const cancelInterview = async function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // increases the amount of spots remaining from deleting an appointment.
    // => components/helpers/selectors.js
    const increase = increaseSpots(state);

    //Delete request to database to pop cancelinterview data.
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