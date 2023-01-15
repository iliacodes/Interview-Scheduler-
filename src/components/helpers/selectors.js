export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(selected => selected.name === day);
  if (!filteredDay.length) {
    return [];
  }
  const appointments = filteredDay[0].appointments.map(appointmentId => state.appointments[appointmentId]);
  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
    const data = state.interviewers[interview.interviewer]
    return { ...interview, interviewer: data };
}