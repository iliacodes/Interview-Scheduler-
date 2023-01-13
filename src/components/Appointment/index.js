import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Appointment from "components/Appointment"


export default function Application (props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? (
        <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={props.onEdit}
        onDelete={props.onDelete}

         />
      ) : (
        <Empty onAdd={props.onAdd}/>
      )}
    </article>
  )
}