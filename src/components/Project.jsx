import React from 'react';
import classnames from 'classnames';

function Project(props) {
  const {
    name,
    image,
    bigImage,
    description
  } = props;

  return (
    <div class={classnames("project-card", bigImage ? 'project-card-big' : '')}>
      <a class="image-popup-no-margins" href={image}><img src={image} /></a>
      <p class="description"><b>{name}</b>&nbsp;&nbsp; {description} <a target="_blank" href="http://labs.ideo.com">IDEO Labs site</a>.</p>
    </div>
  )
}

export default Project;