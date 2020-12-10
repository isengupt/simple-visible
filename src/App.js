import React, { useState, useRef } from "react";
import {
  useTrail,
  a,
  animated,
  useSprings,
  interpolate,
  useSpring,
  useChain,
} from "react-spring";
import "./styles.css";

const colors = ["red", "green", "blue", "orange", "purple", "yellow"];

function Chain({ open, ...props }) {
  /*   const [expanded, setExpanded] = useState(false);

  const springRef = useRef();
  const springConfig = {
    from: { transform: `translateX(80px)` },
    to: { transform: `translateX(0px)` },
    ref: springRef,

    reverse: expanded,
  };
  const spring = useSpring(springConfig);

  const trailRef = useRef();
  const trailConfig = {
    from: { transform: `translateY(80px)` },
    to: { transform: `translateY(0px)` },
    /*   from: { height: "100px" },
    to: { height: "50px" }, 
    ref: trailRef,
    config: { mass: 3, tension: 500, friction: 40 },
    reverse: !expanded,
  };
  const trailSprings = useTrail(colors.length, trailConfig);

  useChain(expanded ? [springRef, trailRef] : [trailRef, springRef]); */

  const numOfBoxes = 5;

  const trail = useTrail(numOfBoxes, {
    config: { mass: 3, tension: 500, friction: 50 },
    opacity: open ? 1 : 0,
    x: open ? 200 : 0,

    from: { opacity: 0, x: 0 },
  });

  return (
    <div className="wrapper" {...props}>
      {trail.map(({ x, height, ...rest }, index) => (
        <a.div
          className="bounce__numbers"
          key={index}
          style={{
            ...rest,

            transform: x.interpolate(
              (x) => `translate3d(0,${x + index * 2}px,${x}px)`
            ),
          }}
        >
          <a.div>{index}</a.div>
        </a.div>
      ))}

      {/* <animated.div
        style={{
          ...spring,
          height: "100px",
          display: "inline-flex",
          alignItems: "flex-end",
          marginBottom: "15px",
        }}
      >
        {trailSprings.map((trailSpring, index) => (
          <animated.div
            key={colors[index]}
            style={{
              ...trailSpring,
              width: "20px",
              marginRight: "10px",
              transformOrigin: "bottom",
              backgroundColor: "transparent",
              color: '#fff'
            }}
          >
            {index}
          </animated.div>
        ))}
      </animated.div> */}
    </div>
  );
}
function Trail({ open, children, ...props }) {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,

    height: open ? 130 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div className="trails-main" {...props}>
      <div>
        {trail.map(({ x, height, ...rest }, index) => (
          <a.div
            key={items[index]}
            className="trails-text"
            style={{
              ...rest,

              transform: x.interpolate((x) => `translate3d(0,${x}px,0)`),
            }}
          >
            <a.div style={{ height }}>{items[index]}</a.div>
          </a.div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [open, set] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const toggleRef = useRef();
  const springConfig = {
    from: { x: 100, opacity: 0, rotate: 0 },
    /*     to: { transform: `translateX(0px)`, opacity: '1' }, */
    rotate: open ? 45 : 0,
    opacity: open ? 1 : 0,
    x: open ? 0 : 100,
    boxShadow: open
      ? "0 0 60px 30px #fff, 0 0 120px 60px #f0f, 0 0 120px 90px #0ff"
      : "0 0 0px 0px #fff, 0 0 0px 0px #f0f, 0 0 0px 0px #0ff",
    reverse: expanded,
  };
  const { x, opacity, rotate, boxShadow } = useSpring(springConfig);

  function toggleItems() {
    set((state) => !state);
    setExpanded((prevState) => !prevState);
  }

  useChain(open ? [toggleRef] : [toggleRef]);

  return (
    <main className="demo-2">
      <div className="message"></div>
      <div className="frame">
        <div className="frame__title-wrap">
          <animated.div
            className="logo__wrapper"
            style={{
              opacity: opacity,
              transform: x.interpolate((x) => `translate3d(${-x}px,0,0)`),
            }}
            onClick={() => console.log("hello")}
          >
            m.
          </animated.div>

          <animated.h1
            className="frame__title"
            style={{
              opacity: opacity,
              transform: x.interpolate((x) => `translate3d(${x}px,0,0)`),
            }}
          >
            Front-end Experimentation
          </animated.h1>
        </div>
        <div class="frame__links">
          <animated.div
            href="#"
            class="menu-trigger"
            id="menu01"
            style={{
              opacity: opacity,
              transform: x.interpolate((x) => `translate3d(${x}px, 0,0)`),
            }}
          >
            <span></span>

            <span></span>
          </animated.div>
        </div>
        <div class="frame__demos">
          <div className="frame__demo">
            <animated.div
              className="line"
              style={{
                opacity: opacity,
                transform: rotate.interpolate(
                  (rotate) => `rotate(${rotate * 0}deg)`
                ),
              }}
            ></animated.div>
            <animated.div
              className="line2"
              style={{
                opacity: opacity,
                transform: rotate.interpolate(
                  (rotate) => `rotate(${rotate * 1}deg)`
                ),
              }}
            ></animated.div>
            <animated.div
              className="line3"
              style={{
                opacity: opacity,
                transform: rotate.interpolate(
                  (rotate) => `rotate(${rotate * 1.5}deg)`
                ),
              }}
            ></animated.div>
            <animated.div
              className="line4"
              style={{
                opacity: opacity,
                transform: rotate.interpolate(
                  (rotate) => `rotate(${rotate * 2}deg)`
                ),
              }}
            ></animated.div>
          </div>
          

          <animated.div 
          className="subscribe__button"
           style={{
              opacity: opacity,
              transform: x.interpolate((x) => `translate3d(${x}px, 0,0)`),
            }}
          >
          <a
            href="https://isengupt.github.io/shoe-parallax/"
            activeClassName="frame__demo--current"
            className="link__demo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
            >
              <path
                fill-rule="evenodd"
                d="M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z"
              ></path>
            </svg>
          </a>
          <a
            href="https://github.com/isengupt/simple-visible"
            activeClassName="link__demo--current"
            className="link__demo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
            >
              <path
                fill-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
          </a>
          <a
        href='#'
            activeClassName="link__demo--current"
            className="link__demo"

           
                     
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
            >
              <path
                fill-rule="evenodd"
                d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z"
              ></path>
            </svg>
          </a>
        </animated.div>
        </div>
      </div>
      <div className="content">
        <animated.div
          className="glow__line"
          style={{
            opacity: opacity,
            boxShadow: boxShadow,
          }}
        ></animated.div>
        <div className="container">
          <Trail open={open} onClick={toggleItems}>
            <span>The New</span>
            <span>Collective Series</span>
            <span>of Stories</span>
          </Trail>
          <Chain open={open} />
          {/*  <button onClick={moveLetters}>Move</button>
        <div className="number-bounce__container">
          {springs.map(({ opacity, y }, i) => (
            <animated.div
              className="number-bounce__item"
              key={i}
              style={{
                opacity: opacity,
                transform: interpolate([y], (y) => `translate3d(0,${y}px,0) `),
              }}
            >
              {i}
            </animated.div>
          ))}
        </div> */}
        </div>
      </div>
    </main>
  );
}

export default App;
