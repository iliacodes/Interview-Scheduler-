import React from 'react';
import "components/InterviewerList.scss";
import InterviewerListItem from 'components/InterviewerListItem';
import PropTypes from 'prop-types'; 

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  const interviewerList = interviewers.map((interviewer) => (

    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === value}
      setInterviewer={() => onChange(interviewer.id)}
    />

  ));
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};