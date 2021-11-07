/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from 'react';

import Particles from 'react-particles-js';
import NamePlateSVG from './components/NamePlateSVG';
import Slide from './components/Slide';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import registerIcons from "./__helpers__/FontAwesome";
import { sortColors } from './__helpers__/sortColors';
import './App.scss';

registerIcons();

function App() {
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
    const svgs = require('./__data__/tech-stack-svg-info.json');
    setSvgs(svgs);

    // Event Listeners - mouse movement.
    document.addEventListener('mousemove', _mouseTrack);
    document.addEventListener('scroll', _showSpotlight);

    // Reset to top of the page upon reload.
    window.addEventListener('beforeunload', () => {
      window.scrollTo(0,0);
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
    const duplicated = Array(5).fill(slides);

    return (
      <React.Fragment>
        {duplicated}
      </React.Fragment>
    )
  }

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

  const particlesOptions = {
    "particles": {
      "number": {
        "value": 160,
        "density": {
            "enable": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
            "speed": 4,
            "size_min": 0.3
        }
      },
      "line_linked": {
        "enable": false
      },
      "move": {
        "random": true,
        "speed": 1,
        "direction": "top",
        "out_mode": "out"
      }
    },
    "interactivity": {
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "repulse"
        }
      },
      "modes": {
        "bubble": {
          "distance": 250,
          "duration": 2,
          "size": 0,
          "opacity": 0
        },
        "repulse": {
          "distance": 400,
          "duration": 4
        }
      }
    }
  };

  return (
    <div class="container">
      <div class="name-plate-container">
        <NamePlateSVG />
      </div>
      <Particles className="particles-wrapper" params={particlesOptions} />
      <div class="technicals">
        <span class="technicals_title">
          Tech Stack
        </span>
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
            <div class="find-me_details" ref={findMeDetails}>
              <div className="button">
                <a className="github-cta" href="https://github.com/timmlui" target="_self" rel="noopener noreferrer">
                  <FontAwesomeIcon className="icon" icon={["fab", "github"]} size="3x" />
                  <span className="icon_title">Github</span>
                </a>
              </div>
              <div className="button">
                <a className="linkedin-cta" href="https://www.linkedin.com/in/timothy-lui-1b8638170" target="_self" rel="noopener noreferrer">
                  <FontAwesomeIcon className="icon" icon={["fab", "linkedin"]} size="3x" />
                  <span className="icon_title">LinkedIn</span>
                </a>
              </div>
              <div className="button">
                <a className="resume-cta" href="/resume" target="_self" rel="noopener noreferrer">
                  <FontAwesomeIcon className="icon" icon={["fas", "file-alt"]} size="3x" />
                  <span className="icon_title">Resume</span>
                </a>
              </div>
              <div className="button">
                <a className="email-cta" href="mailto:lui.timm@gmail.com" target="_self" rel="noopener noreferrer">
                  <FontAwesomeIcon className="icon" icon={["fas", "paper-plane"]} size="3x" />
                  <span className="icon_title">Email Me</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        Timothy Lui 2021.
      </footer>
    </div>
  )
}

export default App;
