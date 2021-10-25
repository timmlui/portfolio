/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from 'react';

import Slide from './components/Slide';
import NamePlateSVG from './components/NamePlateSVG';

import { sortColors } from './sortColors';

import './App.scss';

import black from "./assets/img/black.jpeg";

function App() {
  const [data, setData] = useState({});
  const [svgs, setSvgs] = useState({});
  const [intersect, setIntersect] = useState(false);
  // const pathEl = useRef(null);
  const cursor = useRef(null);
  const findMe = useRef(null);
  const findMeTitle = useRef(null);
  const findMeDetails = useRef(null);
  

  /**
   * On Mount events to run. Pulling JSON data, eventlisteners, initial setups.
   */
  useEffect(() => {
    const data = require('./data.json');
    setData(data);
    const svgs = require('./svg.json');
    setSvgs(svgs);

    // Event Listeners - mouse movement.
    document.addEventListener('mousemove', _mouseTrack);
    document.addEventListener('scroll', _showSpotlight);

    // Reset to top of the page upon reload.
    window.addEventListener('beforeunload', () => {
      document.body.scrollTop = document.docuementElement.scrollTop = 0;
    });

    // _handleAnimation();
    const name = document.querySelectorAll('#name-svg path');
    name.forEach((letter, index) => {
      // console.log(index, letter.getTotalLength(), letter.style);
      letter.style.strokeDasharray = letter.getTotalLength();
      letter.style.strokeDashoffset = letter.getTotalLength();
    });

    _handleParallax();

    return () => {
      window.removeEventListener('beforeunload');
    }
  }, []);

  useEffect(() => {
    if (intersect) {
      // console.log('is intersectping')
      cursor.current.classList.remove('inverted-inactive');
      cursor.current.classList.add('inverted-active');
    } else {
      // console.log('NOT intersectping')
      if (cursor.current.classList.contains('inverted-active')) {
        cursor.current.classList.remove('inverted-active');
        cursor.current.classList.add('inverted-inactive');
      }
    }
  }, [intersect])

  /**
   * Sets the coordinates of the spotlight to match the cursor.
   * @param {*} e - event from mousemove
   */
  const _mouseTrack = (e) => {
    cursor.current.style.left = e.clientX - cursor.current.offsetWidth / 2 + "px";
    cursor.current.style.top = e.clientY - cursor.current.offsetHeight / 2 + "px";
    _showSpotlight();
  }

  /**
   * Determine if el1 and el2 are intersecting.
   * @param {*} el1 - first element
   * @param {*} el2 - second element
   */
  const _elementIntersect = (el1, el2) => {
    return !(el1.right < el2.left || 
      el1.left > el2.right || 
      el1.bottom < el2.top || 
      el1.top > el2.bottom);
  }

  /**
   * Event mousemove to track when cursor is in the "Find Me" section to show
   * the spotlight. Handles the mix-blend-mode of the spotlight when needed for 
   * the hidden content.
   */
  const _showSpotlight = () => {
    const el1 = findMe.current.getBoundingClientRect();
    const el2 = cursor.current.getBoundingClientRect();
    const el3 = findMeDetails.current.getBoundingClientRect();

    const isIntersectSection = _elementIntersect(el1, el2);
    const isIntersectDetails = _elementIntersect(el2, el3);

    // Handle when cursor is within section.
    if (isIntersectSection && !intersect) {
      setIntersect(true);
    } else if (!isIntersectSection && !intersect) {
      setIntersect(false);
    }

    // To handle the hidden content to show when spotlight hovers over.
    if (isIntersectDetails) {
      cursor.current.style.mixBlendMode = "normal";
      cursor.current.style.zIndex = 1;
    } else {
      cursor.current.style.mixBlendMode = "difference";
      cursor.current.style.zIndex = 9;
    }
  }

  const _renderSlides = () => {
    const { skills = [] } = svgs;

    // Sort the colors of the icons by HUE.
    if (skills.length > 0) {
      sortColors(skills);
    }

    const slides = skills.map((svg) => (
      <Slide {...svg} />
    ));

    // Needed for the illusion of an infinite scroll
    const duplicated = [...slides, ...slides, ...slides];

    return (
      <React.Fragment>
        {duplicated}
      </React.Fragment>
    )
  }

  /**
   * Initial idea to use a single svg path for cursive written text for name plate.
   */
  // const _handleAnimation = () => {
  //   const path = pathEl.current;
  //   const length = path.getTotalLength();

  //   // Clear any previous transition
  //   path.style.transition = path.style.WebkitTransition = 'none';
  //   // Set up the starting positions
  //   path.style.strokeDasharray = length + ' ' + length;
  //   path.style.strokeDashoffset = length;
  //   // Trigger a layout so styles are calculated & the browser
  //   // picks up the starting position before animating
  //   path.getBoundingClientRect();
  //   // Define our transition
  //   path.style.transition = path.style.WebkitTransition =
  //     'stroke-dashoffset 2s ease-in-out';
  //   // Go!
  //   path.style.strokeDashoffset = '0';
  // }

  /**
   * Parallax effect for when the Find-Me section is visible.
   * Slides the header up when visibility threshold reaches 80%.
   */
  const _handleParallax = () => {
    const options = {
      threshold: 0.8
    }

    const target = findMe.current;

    const intersectionCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // console.log('intersecting find-me')
          findMeTitle.current.classList.remove('hide');
          findMeTitle.current.classList.add('show');
          findMeDetails.current.classList.remove('hide')
          findMeDetails.current.classList.add('show')
        } else {
          // console.log('NOT intersecting find-me')
          if (findMeTitle.current.classList.contains('show')) {
            findMeTitle.current.classList.remove('show');
            findMeTitle.current.classList.add('hide');
          }
          findMeDetails.current.classList.remove('show')
          findMeDetails.current.classList.add('hide')
        }
      });
    }

    let observer = new IntersectionObserver(intersectionCallback, options);
    observer.observe(target);
  }

  return (
    <div class="container">
      {/* <div class="header-nav">
        <a class="logo" href="/#">TL.</a>
        <div class="resume-container">
          <div class="blob"></div>
          <a class="resume-link" href="/resume">Resume</a>
        </div>
      </div> */}
      <div class="name-plate-container">
        <NamePlateSVG />
      </div>
      <div class="technicals">
        <div class="technicals_title">
          <a class="resume-link" href="/resume">Resume</a>
        </div>
        <div class="slider-container">
          <div class="slider">
            <div class="slider-track">
              {_renderSlides()}
            </div>
          </div>
        </div>
      </div>
      <div class="cursor" ref={cursor}></div>
      <div class="find-me" ref={findMe}>
        <div class="find-me_inner">
          <span class="find-me_title" ref={findMeTitle}>
            FIND ME
          </span>
          <div class="find-me_details-container">
            <span class="find-me_details" ref={findMeDetails}>
              <a href="lui.timm@gmail.com">lui.timm@gmail.com</a>
              <a href="www.github.com">github link</a>
              <img src={black} width="100" height="100" alt="asdf" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
