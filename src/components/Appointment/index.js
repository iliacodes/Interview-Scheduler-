import React from 'react';
import "components/Appointment/styles.scss";

import Empty from './Empty';
import Form from './Form';
import Header from './Header';
import Show from './Show';
import useVisualMode from '../hooks/useVisualMode';
import Status from "./Status";
import Confirm from "./Confirm"

export default function Appointment(props) {

    const CREATE = "CREATE";
    const EMPTY = "EMPTY";
    const SAVING = "SAVING";
    const CONFIRM = "CONFIRM";
    const DELETING = "DELETING";
    const SHOW = "SHOW";

    const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );

    const save = function(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      
      transition(SAVING)
      props.bookInterview(props.id, interview)
        .then(() => {
          transition(SHOW)
        })
        .catch((error) => console.log(error))
    };

    const confirm = () => transition(CONFIRM);

    const deleteAppointment = function () {
      transition(DELETING)
      props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
      .catch((error) => console.log(error))
    };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => transition(CREATE)}/>
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}/>
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}/>
      )}
      {mode === SAVING && (
        <Status
          message={"Saving"}
        />
      )}
      {mode === DELETING && (
        <Status
          message={"Deleting"}
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
          message={"Please confirm you would like to delete this appointment."}
          onCancel={() => back()}
          onConfirm={deleteAppointment}
        />
      )}
    </article>
  );
};