export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(selected => selected.name === day);
  if (!filteredDay.length) {
    return [];
  }
  const appointments = filteredDay[0].appointments.map(appointmentId => state.appointments[appointmentId]);
  return appointments;
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(selected => selected.name === day);
  if (!filteredDay.length) {
    return [];
  }
  const interviewers = filteredDay[0].interviewers.map(interviewerId => state.interviewers[interviewerId]);
  return interviewers;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
    const data = state.interviewers[interview.interviewer]
    return { ...interview, interviewer: data };
}

export function decreaseSpots(state) {
  return state.days.map(day => {
    if (day.name === state.day) {
      return {...day, spots: day.spots - 1}
    } else {
      return day;
    }
  });
}

export function increaseSpots(state) {
  return state.days.map(day => {
    if (day.name === state.day) {
      return {...day, spots: day.spots + 1};
    } else {
      return day;
    }
  });
}

