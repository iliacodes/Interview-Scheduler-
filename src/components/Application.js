import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "./helpers/selectors";

export default function Application(props) {
  const port = "http://localhost:8001"
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = (day) => {setState(prev => ({ ...prev, day }))};
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const bookInterview = async function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    try {
      await axios.put(`${port}/api/appointments/${id}`, { interview });
      setState({
        ...state,
        appointments
      });
    } catch (error) {
      return console.log(error);
    }
  }

  const cancelInterview = async function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
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
  }


  // const appointments = getAppointmentsForDay(state, state.day)


  
  
  
  useEffect(() => {
    Promise.all([
      axios
      .get(`${port}/api/days`),
      axios
      .get(`${port}/api/appointments`),
      axios
      .get(`${port}/api/interviewers`)
    ]) 
    .then(([days, appointments, interviewers]) => {
      setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }));
    })
  }, []);
  
  
  const schedule = dailyAppointments.map((appointment) => {

    const interview = getInterview(state, appointment.interview);
    
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}

      />
    );
  });


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu" >
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* {Object.values(dailyAppointments).map((appointment) => {
          return <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={appointment.interview} */}
          {/* />;
        })} */}
        { schedule }
      </section>
    </main>
  );
}
