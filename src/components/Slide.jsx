import React from 'react';

function Slide(props) {
  const {
    name,
    fill,
    svg
  } = props;

  return (
    <div class="slide">
      <span style={{color: fill}}>{name}</span>
      <svg
        fill={fill}
        stroke-width="0"
        width="100px"
        height="100px"
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{name}</title>
        <path d={svg}/>
      </svg>
    </div>
  )
}

export default Slide;