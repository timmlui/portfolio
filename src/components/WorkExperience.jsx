import React from 'react';

function WorkExperience(props) {
  const {
    companyName,
    duration,
    iconSrc,
    link,
    location,
    title,
    description,
    tag
  } = props;

  const { skills = [], techs = [] } = tag;

  return (
    <div class="workExperienceCard">
      <a target="_blank" href={link}>
        <img class="icon" src={iconSrc} />
      </a>
      <b>{companyName}</b>
      <span class="right"><i>{duration}</i></span><br/>
      <b>{title}</b>
      <span class="right"><i>{location}</i></span><br/><br/>
      {description}<br/><br/>
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

export default WorkExperience;