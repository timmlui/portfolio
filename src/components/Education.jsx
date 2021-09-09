/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

function Education(props) {
  const {
    school,
    duration,
    iconSrc,
    link,
    location,
    degree,
    courses = [],
    tag
  } = props;

  const { skills = [], techs = [] } = tag;

  return (
    <div class="education-card">
      <a target="_blank" href={link}>
        <img class="icon" src={require(`../assets/${iconSrc}`)} />
      </a>
      <b>{school}</b>
      <span class="right"><i>{duration}</i></span>
      <br/>
      <b>{degree}</b>
      <span class="right"><i>{location}</i></span>
      <br/><br/>
      Relevant Coursework:
      <br/>
      {courses && courses.length && (
        <ul>
          {courses.map(course => (
            <li>{course}</li>
          ))}
        </ul>
      )}
      {skills.map(skill => (
        <span class="skill">{skill}</span>  
      ))}
      {techs.map(tech => (
        <span class="skill tech">{tech}</span>  
      ))}
      <br/>
    </div>
  )
}

export default Education;