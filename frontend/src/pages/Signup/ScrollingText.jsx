import React from 'react';
import './scrollingtext.css';

const ScrollingText = () => {
    return (
<>
  <div className="content">
    <div className="content__container">
      <p className="content__container__text">Hello</p>
      <ul className="content__container__list">
        <li className="content__container__list__item">world !</li>
        <li className="content__container__list__item">users !</li>
        <li className="content__container__list__item">everybody !</li>
        <li className="content__container__list__item">developers !</li>
      </ul>
    </div>
  </div>
</>
    );
}

export default ScrollingText;