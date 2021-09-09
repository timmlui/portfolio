/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';

import About from './components/About';
import Education from './components/Education';
import WorkExperience from './components/WorkExperience';
import Project from './components/Project';

import './App.css';
import illustration from './assets/img/computer-typing.gif';

function App() {
  const [data, setData] = useState({});
  
  useEffect(() => {
    const data = require('./data.json');
    setData(data);
  }, []);

  function renderAbout() {
    const { about = {}, workExperiences = [] } = data;

    return (
      <About 
        {...about}
        latestWorkExperience = {workExperiences.length && workExperiences[0]}
      />
    )
  }

  function renderEducation() {
    const { education = [] } = data;

    const _educations = education.map((education) => (
      <Education {...education} />
    ));

    return (
      <React.Fragment>
        <p class="section-tagline" style={{ textAlign: 'left' }}>Education</p>
        {_educations}
      </React.Fragment>
    )
  }

  function renderWorkExperiences() {
    const { workExperiences = [] } = data;

    const _workExperiences = workExperiences.map((workExperience) => (
      <WorkExperience {...workExperience} />
    ));

    return (
      <React.Fragment>
        <p class="section-tagline" style={{ textAlign: 'left' }}>Work Experience</p>
        {_workExperiences}
      </React.Fragment>
    )
  }

  function renderProjects() {
    const { projects = [] } = data;

    const _projects = projects.map((project) => (
      <Project {...project} />
    ));

    return (
      <React.Fragment>
        <p class="tagline">Work + Fun</p>
        {_projects}
      </React.Fragment>
    )
  }

  return (
    <div class="app-wrapper">
      <div id="toc-holder" class="toc-holder">
        <a href="#" class="toc-link" id="toc-link"><span class="">☰</span></a>
        <ul id="toc" class="toc toc-up" style={{ top: '-310px' }}>
          <li class="toc-h1"><a href="#about">About</a></li>
          <li class="toc-h1"><a href="#resume">Résumé</a></li>
          <li class="toc-h1"><a href="#work">Work</a></li>
        </ul>
      </div>

      <div id="page-wrapper">
        <div id="header">
          <div class="inner name"><a href="#illustration">Timothy Lui</a></div>
          <div class="nav">
          <ul class="mobile-nav">
          <li class="mobile-header"><a href="#about">About</a></li>
          <li class="mobile-header"><a href="#resume">Resumé</a></li>
          <li class="mobile-header"><a href="#work">Work</a></li></ul>
          </div>
        </div>
        <div id="illustration"><center><img src={illustration}/></center></div>
        
        {renderAbout()}

        <div id="resume">
          <div class="inner">
            <p class="tagline">Résumé</p>

            {renderWorkExperiences()}

            {renderEducation()}
          </div>
        </div>
        {/* <!-- Portfolio --> */}
        <div id="work">
          <div class="inner">
            {renderProjects()}
          </div>
        </div>
      </div>
      			
      <div id="footer"><div class="inner">
        © 2020 Timothy Lui. 
        <span class="right">
          <a target="_blank" href="https://github.com/timmlui">Github</a>&nbsp;//&nbsp;
          <a target="_blank" href="mailto:lui.timm@gmail.com">Email</a>&nbsp;//&nbsp;
          <a target="_blank" href="https://www.linkedin.com/in/timothy-lui-1b8638170/">LinkedIn</a>
        </span>
      </div></div>
    </div>
  )
}

export default App;
