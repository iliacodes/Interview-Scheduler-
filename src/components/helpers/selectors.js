// uses filter to create new array and passes first element to populate array with interviewers objects for the day.
export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(selected => selected.name === day);
  if (!filteredDay.length) {
    return [];
  }
  const interviewers = filteredDay[0].interviewers.map(interviewerId => state.interviewers[interviewerId]);
  return interviewers;
}

//gets appointments for day using same method as above. 
export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(selected => selected.name === day);
  if (!filteredDay.length) {
    return [];
  }
  const appointments = filteredDay[0].appointments.map(appointmentId => state.appointments[appointmentId]);
  return appointments;
}


// checks if object is valid, then uses spread operator to copy object and adds new data to it.
export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
    const data = state.interviewers[interview.interviewer]
    return { ...interview, interviewer: data };
}

//on functions below, using map method to allow for data manipulation as needed.

//uses spread operator to copy day object, then modifys spots property by subtracting 1
export function decreaseSpots(state) {
  return state.days.map(day => {
    if (day.name === state.day) {
      return {...day, spots: day.spots - 1}
    } else {
      return day;
    }
  });
}

//uses spread operator to copy day object, then modifys spots property by adding 1
export function increaseSpots(state) {
  return state.days.map(day => {
    if (day.name === state.day) {
      return {...day, spots: day.spots + 1};
    } else {
      return day;
    }
  });
}

