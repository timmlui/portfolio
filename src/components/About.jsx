import React from 'react';

function About(props) {
  const {
    phrase,
    origin = [],
    education,
    major,
    resume,
    email,
    socialMedia = {},
    interests,
    latestWorkExperience
  } = props;

  const {
    instagram
  } = socialMedia;

  const {
    companyName,
    duration,
    title
  } = latestWorkExperience;

  return (
    <div id="about" class="about">
      <div class="inner">
        <p>{phrase}</p>
        <br/><br/><br/>
        <div id="code">
          <div id="console">
            {`~ $`} Timothy.origin<br/>
            <span class="answer">
              {`=> ["${origin[0]}", "${origin[1]}"]`}
              <br/><br/>
            </span>
            {`~ $`} Timothy.education<br/>
            <span class="answer">
              {`=> "${education}"`}
              <br/><br/>
            </span>
            {`~ $`} Timothy.major<br/>
            <span class="answer">
              {`=> "${major}"`}
              <br/><br/>
            </span>
            {`~ $`} Timothy.workExperience.latest<br/>
            <span class="answer">&nbsp;&nbsp;=&gt; Latest Work Experience<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; company: "Publicis Sapient"<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; role: "Associate Software Engineer"<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; startDate: "July 2019"<br/>
            <br/></span>
            {`~ $`} Timothy.resume<br/>
            <span class="answer">
              {`=>`} "<a target="_blank" href={resume}>{resume}</a>"
              <br/><br/>
            </span>
            {`~ $`} Timothy.email<br/>
            <span class="answer">
              {`=>`} "<a target="_blank" href={`mailto:${email}`}>{email}</a>"
              <br/><br/>
            </span>
            {`~ $`} Timothy.socialMedia<br/>
            <span class="answer">
              {`=> { Instagram:`} <a target="_blank" href={`http://www.instagram.com/${instagram}`}>{instagram}</a>{` }`}
              <br/><br/>
            </span>
            {`~ $`} Timothy.interests<br/>
            <span class="answer">
              {`=>`} ["Design", "Code", "matcha", "piano", "calisthenics", "brunch"]
              <br/><br/>
            </span>
          </div>
        </div>
      </div>
      <br/>
    </div>
  )
}

export default About;