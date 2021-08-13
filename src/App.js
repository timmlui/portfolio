import React, { useEffect, useState } from 'react';

import About from './components/About';
import Education from './components/Education';
import WorkExperience from './components/WorkExperience';

import './App.css';
import bg from './assets/img/computer-typing.gif';

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
        {_educations}
      </React.Fragment>
    )
  }

  function renderWorkExperience() {
    const { workExperiences = [] } = data;

    const _workExperiences = workExperiences.map((workExperience) => (
      <WorkExperience {...workExperience} />
    ));

    return (
      <React.Fragment>
        {_workExperiences}
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
        <div id="illustration"><center><img src={bg} alt="MISSING BG"/></center></div>
        
        {renderAbout()}

        <div id="resume">
          <div class="inner">
            <p class="tagline">Résumé</p>

            <p class="section-tagline" style={{ textAlign: 'left' }}>Work Experience</p>
            {renderWorkExperience()}

            <p class="section-tagline" style={{ textAlign: 'left' }}>Education</p>
            {renderEducation()}

          <br/><br/><br/><br/>
        </div></div>
        {/* <!-- Portfolio --> */}
        <div id="work"><div class="inner">
          <p class="tagline">Work + Fun</p>
      
          <div class="portfolio-thumb portfolio-big">
            <a class="image-popup-no-margins" href="img/portfolio/happen.png"><img src="img/portfolio/happen.png" /></a>
            <p>something i deleted</p>
          </div>
          <div class="row">
            <div class="portfolio-thumb">
              <a class="image-popup-no-margins" href="img/portfolio/bike2.png"><img src="img/portfolio/bike2.png" /></a>
              <p class="description"><b>Illustrations</b>&nbsp;&nbsp; I like to draw things I like. My Schwinn ride pictured above.</p>
            </div>
            <div class="portfolio-thumb">
              <a class="image-popup-no-margins" href="img/portfolio/labs2.png"><img src="img/portfolio/labs2.png" /></a>
              <p class="description"><b>IDEO Labs</b>&nbsp;&nbsp; Worked on front-end development of a wordpress theme designed for the new <a target="_blank" href="http://labs.ideo.com">IDEO Labs site</a>.</p>
            </div>
          </div>						
          <div class="row">
            <div class="portfolio-thumb">
              <a class="image-popup-no-margins" href="img/portfolio/apollo2.png"><img src="img/portfolio/apollo2.png" /></a>
              <p class="description"><b>Apollo</b>&nbsp;&nbsp; An internal summer intern project at IDEO. Apollo is
              a searchable community of people tagged with rich psychographic data, curated to provide resolution and reach to companies looking
              for research candidates.
              </p>
            </div>
            <div class="portfolio-thumb">
              <a class="image-popup-no-margins" href="img/portfolio/xx_03.png"><img src="img/portfolio/xx_03.png" /></a>
              <p class="description"><b>Music Visualizer</b>&nbsp;&nbsp; Experimental summer
              project using WebGL and Three.js with a beat detection algorithm to make an interactive 3D music visualization of album artwork using orbit controls. Play <a target="_blank" href="visualizer/xx.html">here</a>.</p>
            </div>
          </div>
          <div class="row">
            <div class="portfolio-thumb">
              <a class="popup-vimeo" href="http://vimeo.com/41632558"><img src="img/portfolio/cube2.png"/></a>
              <p class="description"><b>LED Cube</b>&nbsp;&nbsp; Built with a friend as a final project for USC EE 201: Introduction to Digital Circuits. Constructed an 8x8x8 LED Cube three-dimensional display. Designed and wired the driver circuit board. Wrote application modules in Verilog to navigate the cube. </p>
            </div>
            <div class="portfolio-thumb">
              <a class="image-popup-no-margins" href="img/portfolio/homefit.png"><img src="img/portfolio/homefit.png"/></a>
              <p class="description"><b>Homefit</b>&nbsp;&nbsp; Working with Executive Director of Digital Innovation at USC Viterbi School of Engineering, Ashish Soni, to research, conceptualize, wireframe, and design a new online tool for people looking to buy a home. </p></div>
            </div>
          </div>
      </div></div>
      <div id="footer"><div class="inner">
        © 2013 Kalyn Nakano. 
        <span class="right">
          <a target="_blank" href="mailto:kalyn.nakano@gmail.com">Email</a>&nbsp;//&nbsp;
          <a target="_blank" href="http://www.linkedin.com/pub/kalyn-nakano/33/344/376/">LinkedIn</a>&nbsp;//&nbsp;
          <a target="_blank" href="http://www.twitter.com/kalynnakano">Twitter</a>
        </span>
      </div></div>
    </div>
  )
}

export default App;
