import React, { useEffect, useRef, useState } from "react";
import css from "./DecorationTab.module.css";

function DecorationTab({ containerRef, animationTrigger = 0 }) {
  const tabRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [velocity, setVelocity] = useState({ dx: 0, dy: 0 });
  const initialVelocityRef = useRef({ dx: 0, dy: 0 }); // Зберігаємо початкову швидкість
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const [startBalance, setStartBalance] = useState(0);
  const [targetBalance, setTargetBalance] = useState(0);
  const [balance, setBalance] = useState(0);

  const config = {
    baseSpeed: 1.8,
    damping: 0.92,
    mouseAvoidRadius: 150,
    mouseAvoidForce: 0.8,
    randomFactor: 0.05,
    minSpeed: 0.3,
  };

  useEffect(() => {
    const start = Math.floor(Math.random() * (1000 - 300 + 1)) + 250;
    const target = Math.floor(Math.random() * (20000 - 3000 + 1)) + 1000;

    setStartBalance(start);
    setTargetBalance(target);
    setBalance(start);
  }, [animationTrigger]);

  useEffect(() => {
    if (balance >= targetBalance) return;

    const duration = 600000; // Зроблено повільніше
    const frameRate = 1000 / 60;
    const steps = duration / frameRate;
    const increment = (targetBalance - startBalance) / steps;

    let current = startBalance;
    const interval = setInterval(() => {
      current += increment;
      if (current >= targetBalance) {
        current = targetBalance;
        clearInterval(interval);
      }
      setBalance(current);
    }, frameRate);
    return () => clearInterval(interval);
  }, [startBalance, targetBalance]);

  const balanceComputedPercent = ((balance - startBalance) / startBalance) * 50;

  useEffect(() => {
    if (!containerRef.current || !tabRef.current) return;

    const container = containerRef.current;
    const tab = tabRef.current;

    const maxLeft = container.clientWidth - tab.offsetWidth;
    const maxTop = container.clientHeight - tab.offsetHeight;

    setPosition({
      left: Math.random() * maxLeft,
      top: Math.random() * maxTop,
    });

    const angle = Math.random() * Math.PI * 2;
    const speed = config.baseSpeed * (0.8 + Math.random() * 0.4);

    const initialVelocity = {
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
    };

    initialVelocityRef.current = initialVelocity; // Зберігаємо початкову швидкість
    setVelocity(initialVelocity);

    previousTimeRef.current = null;
  }, [containerRef, animationTrigger]);

  const animate = (time) => {
    if (!previousTimeRef.current) previousTimeRef.current = time;
    const deltaTime = Math.min(time - previousTimeRef.current, 50);
    previousTimeRef.current = time;

    if (!containerRef.current || !tabRef.current) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    const container = containerRef.current;
    const tab = tabRef.current;
    const maxLeft = container.clientWidth - tab.offsetWidth;
    const maxTop = container.clientHeight - tab.offsetHeight;

    setPosition((prevPos) => {
      const speedFactor = deltaTime / 16.67;
      let newLeft = prevPos.left + velocity.dx * speedFactor;
      let newTop = prevPos.top + velocity.dy * speedFactor;

      let newDx = velocity.dx;
      let newDy = velocity.dy;
      let bounced = false;

      if (newLeft < 0) {
        newLeft = 0;
        newDx = -velocity.dx * config.damping;
        bounced = true;
      } else if (newLeft > maxLeft) {
        newLeft = maxLeft;
        newDx = -velocity.dx * config.damping;
        bounced = true;
      }

      if (newTop < 0) {
        newTop = 0;
        newDy = -velocity.dy * config.damping;
        bounced = true;
      } else if (newTop > maxTop) {
        newTop = maxTop;
        newDy = -velocity.dy * config.damping;
        bounced = true;
      }

      if (bounced) {
        newDx += (Math.random() - 0.5) * config.randomFactor;
        newDy += (Math.random() - 0.5) * config.randomFactor;
      }

      const currentSpeed = Math.sqrt(newDx * newDx + newDy * newDy);
      if (currentSpeed < config.minSpeed) {
        const ratio = config.minSpeed / currentSpeed;
        newDx *= ratio;
        newDy *= ratio;
      }

      if (newDx !== velocity.dx || newDy !== velocity.dy) {
        setVelocity({ dx: newDx, dy: newDy });
      }

      return { left: newLeft, top: newTop };
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [velocity]);

  // Немає обробки миші, елемент не реагує на курсор, рух постійний

  return (
    <div
      ref={tabRef}
      className={css.decorationTab}
      style={{
        position: "absolute",
        left: `${position.left}px`,
        top: `${position.top}px`,
        willChange: "transform",
      }}
    >
      <div className={css.iconBg}>
        <svg
          className={css.tabIcon}
          width="15"
          height="17"
          viewBox="0 0 15 17"
          fill="none"
        >
          <path
            d="M12.7618 0.856683C12.6826 0.310102 12.1753 -0.0688157 11.6288 0.0103471L2.7217 1.30039C2.17512 1.37955 1.7962 1.88681 1.87536 2.4334C1.95453 2.97998 2.46179 3.3589 3.00837 3.27973L10.9258 2.13303L12.0725 10.0504C12.1516 10.597 12.6589 10.9759 13.2055 10.8968C13.7521 10.8176 14.131 10.3103 14.0518 9.76375L12.7618 0.856683ZM1.80116 16.0193L12.5733 1.59847L10.9709 0.401571L0.19884 14.8224L1.80116 16.0193Z"
            fill="#0C0D0D"
          />
        </svg>
      </div>
      <div className={css.balanceCard}>
        <p className={css.balanceTitle}>Your balance</p>
        <p className={css.balanceSum}>${balance.toFixed(2)}</p>
      </div>
      <p className={css.balancePercent}>
        {balanceComputedPercent >= 0 ? (
          <>+{balanceComputedPercent.toFixed(2)}%</>
        ) : (
          <>{balanceComputedPercent.toFixed(2)}%</>
        )}
      </p>
    </div>
  );
}

export default React.memo(DecorationTab);

//* Попередній код нижче *//

// import React, { useEffect, useRef, useState } from "react";
// import { throttle } from "lodash";
// import css from "./DecorationTab.module.css";

// function DecorationTab({ containerRef, animationTrigger = 0 }) {
//   const tabRef = useRef(null);
//   const [position, setPosition] = useState({ top: 0, left: 0 });
//   const [velocity, setVelocity] = useState({ dx: 0, dy: 0 });
//   const requestRef = useRef();
//   const previousTimeRef = useRef();
//   const mousePosition = useRef({ x: 0, y: 0 });
//   const [startBalance, setStartBalance] = useState(0);
//   const [targetBalance, setTargetBalance] = useState(0);
//   const [balance, setBalance] = useState(0);

//   const config = {
//     baseSpeed: 1.8,
//     damping: 0.92,
//     mouseAvoidRadius: 150,
//     mouseAvoidForce: 0.8,
//     randomFactor: 0.05,
//     minSpeed: 0.3,
//   };

//   useEffect(() => {
//     const start = Math.floor(Math.random() * (1000 - 300 + 1)) + 250;
//     const target = Math.floor(Math.random() * (20000 - 3000 + 1)) + 1000;

//     setStartBalance(start);
//     setTargetBalance(target);
//     setBalance(start);
//   }, [animationTrigger]);

//   useEffect(() => {
//     if (balance >= targetBalance) return;

//     const duration = 3000;
//     const frameRate = 60 / 60;
//     const steps = duration / frameRate;
//     const increment = (targetBalance - startBalance) / steps;

//     let current = startBalance;
//     const interval = setInterval(() => {
//       current += increment;
//       if (current >= targetBalance) {
//         current = targetBalance;
//         clearInterval(interval);
//       }
//       setBalance(current);
//     }, frameRate);
//     return () => clearInterval(interval);
//   }, [startBalance, targetBalance]);

//   const balanceComputedPercent = ((balance - startBalance) / startBalance) * 50;
//   useEffect(() => {
//     if (!containerRef.current || !tabRef.current) return;

//     const container = containerRef.current;
//     const tab = tabRef.current;

//     const maxLeft = container.clientWidth - tab.offsetWidth;
//     const maxTop = container.clientHeight - tab.offsetHeight;

//     setPosition({
//       left: Math.random() * maxLeft,
//       top: Math.random() * maxTop,
//     });

//     const angle = Math.random() * Math.PI * 2;
//     const speed = config.baseSpeed * (0.8 + Math.random() * 0.4);

//     setVelocity({
//       dx: Math.cos(angle) * speed,
//       dy: Math.sin(angle) * speed,
//     });

//     previousTimeRef.current = null;
//   }, [containerRef, animationTrigger]);

//   const animate = (time) => {
//     if (!previousTimeRef.current) previousTimeRef.current = time;
//     const deltaTime = Math.min(time - previousTimeRef.current, 50);
//     previousTimeRef.current = time;

//     if (!containerRef.current || !tabRef.current) {
//       requestRef.current = requestAnimationFrame(animate);
//       return;
//     }

//     const container = containerRef.current;
//     const tab = tabRef.current;
//     const maxLeft = container.clientWidth - tab.offsetWidth;
//     const maxTop = container.clientHeight - tab.offsetHeight;

//     setPosition((prevPos) => {
//       const speedFactor = deltaTime / 16.67;
//       let newLeft = prevPos.left + velocity.dx * speedFactor;
//       let newTop = prevPos.top + velocity.dy * speedFactor;

//       let newDx = velocity.dx;
//       let newDy = velocity.dy;
//       let bounced = false;

//       if (newLeft < 0) {
//         newLeft = 0;
//         newDx = -velocity.dx * config.damping;
//         bounced = true;
//       } else if (newLeft > maxLeft) {
//         newLeft = maxLeft;
//         newDx = -velocity.dx * config.damping;
//         bounced = true;
//       }

//       if (newTop < 0) {
//         newTop = 0;
//         newDy = -velocity.dy * config.damping;
//         bounced = true;
//       } else if (newTop > maxTop) {
//         newTop = maxTop;
//         newDy = -velocity.dy * config.damping;
//         bounced = true;
//       }

//       if (bounced) {
//         newDx += (Math.random() - 0.5) * config.randomFactor;
//         newDy += (Math.random() - 0.5) * config.randomFactor;
//       }

//       const tabCenter = {
//         x: newLeft + tab.offsetWidth / 2,
//         y: newTop + tab.offsetHeight / 2,
//       };

//       const dx = mousePosition.current.x - tabCenter.x;
//       const dy = mousePosition.current.y - tabCenter.y;
//       const distance = Math.sqrt(dx * dx + dy * dy);

//       if (distance < config.mouseAvoidRadius) {
//         const force =
//           config.mouseAvoidForce * (1 - distance / config.mouseAvoidRadius);
//         const angle = Math.atan2(dy, dx);

//         newDx -= Math.cos(angle) * force * speedFactor;
//         newDy -= Math.sin(angle) * force * speedFactor;
//       }

//       const currentSpeed = Math.sqrt(newDx * newDx + newDy * newDy);
//       if (currentSpeed < config.minSpeed) {
//         const ratio = config.minSpeed / currentSpeed;
//         newDx *= ratio;
//         newDy *= ratio;
//       }

//       if (newDx !== velocity.dx || newDy !== velocity.dy) {
//         setVelocity({ dx: newDx, dy: newDy });
//       }

//       return { left: newLeft, top: newTop };
//     });

//     requestRef.current = requestAnimationFrame(animate);
//   };

//   useEffect(() => {
//     requestRef.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(requestRef.current);
//   }, [velocity]);

//   useEffect(() => {
//     const handleMouseMove = throttle((e) => {
//       if (!containerRef.current) return;

//       const containerRect = containerRef.current.getBoundingClientRect();
//       mousePosition.current = {
//         x: e.clientX - containerRect.left,
//         y: e.clientY - containerRect.top,
//       };
//     }, 50);

//     const container = containerRef.current;
//     container.addEventListener("mousemove", handleMouseMove);
//     return () => {
//       container.removeEventListener("mousemove", handleMouseMove);
//       handleMouseMove.cancel();
//     };
//   }, [containerRef]);

//   return (
//     <div
//       ref={tabRef}
//       className={css.decorationTab}
//       style={{
//         position: "absolute",
//         left: `${position.left}px`,
//         top: `${position.top}px`,
//         willChange: "transform",
//       }}
//     >
//       <div className={css.iconBg}>
//         <svg
//           className={css.tabIcon}
//           width="15"
//           height="17"
//           viewBox="0 0 15 17"
//           fill="none"
//         >
//           <path
//             d="M12.7618 0.856683C12.6826 0.310102 12.1753 -0.0688157 11.6288 0.0103471L2.7217 1.30039C2.17512 1.37955 1.7962 1.88681 1.87536 2.4334C1.95453 2.97998 2.46179 3.3589 3.00837 3.27973L10.9258 2.13303L12.0725 10.0504C12.1516 10.597 12.6589 10.9759 13.2055 10.8968C13.7521 10.8176 14.131 10.3103 14.0518 9.76375L12.7618 0.856683ZM1.80116 16.0193L12.5733 1.59847L10.9709 0.401571L0.19884 14.8224L1.80116 16.0193Z"
//             fill="#0C0D0D"
//           />
//         </svg>
//       </div>
//       <div className={css.balanceCard}>
//         <p className={css.balanceTitle}>Your balance</p>
//         <p className={css.balanceSum}>${balance.toFixed(2)}</p>
//       </div>
//       <p className={css.balancePercent}>
//         {balanceComputedPercent >= 0 ? (
//           <>+{balanceComputedPercent.toFixed(2)}%</>
//         ) : (
//           <>{balanceComputedPercent.toFixed(2)}%</>
//         )}
//       </p>
//     </div>
//   );
// }

// export default React.memo(DecorationTab);
