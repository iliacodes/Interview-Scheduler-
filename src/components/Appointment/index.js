import React from "react";

import "components/Appointment/styles.scss";

import Empty from './Empty';
import Form from './Form';
import Header from './Header';
import Show from './Show';
import useVisualMode from '../hooks/useVisualMode';

export default function Appointment(props) {

    const CREATE = "CREATE";
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";

    const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );

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
          interviewer={props.interview.interviewer}/>
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={""}
          onCancel={() => back()}/>
      )}
    </article>
  );
};