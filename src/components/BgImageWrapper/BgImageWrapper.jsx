import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import css from './BgImageWrapper.module.css';
import DecorationTab from '../DecorationTab/DecorationTab';

const BgImageWrapper = ({ children, desktopOnly = false }) => {
  const containerRef = useRef(null);
  const location = useLocation();

  const [animationTrigger, setAnimationTrigger] = useState(0);
// чек тригерр
  useEffect(() => {
    setAnimationTrigger(prev => prev + 1);
  }, [location.pathname]);

  return (
    <div
      ref={containerRef}
      className={`${css.bgImageWrapper} ${desktopOnly ? css.desktopOnly : ''}`}
    >
      <DecorationTab containerRef={containerRef} animationTrigger={animationTrigger} />
      {children}
    </div>
  );
};

export default BgImageWrapper;