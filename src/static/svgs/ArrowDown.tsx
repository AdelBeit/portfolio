const ArrowDown = () => {
  return (
    <svg
      id="_inline_arrow_down"
      viewBox="0 0 60 60"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="7"
      xmlns="http://www.w3.org/2000/svg">
      <symbol
        id="arrow_down_stroke_target"
        viewBox="0 15 60 27"
        fill="none"
        stroke-width="5">
        <line x1="15" y1="15" x2="30" y2="27" stroke-linecap="round" />
        <line x1="30" y1="27" x2="45" y2="15" stroke-linecap="round" />
      </symbol>
      <use
        href="#arrow_down_stroke_target"
        x="0"
        y="-1.51"
        width="60"
        height="55"
      />
      <use href="#arrow_down_stroke_target" x="0" y="13" width="60" height="55">
        <animate
          id="p0"
          dur="1.5s"
          attributeName="y"
          values="13;23;13;23;13"
          begin="0s;delay0.end"
        />
        <animate
          id="delay0"
          dur="3s"
          attributeName="y"
          values="13;13"
          begin="p0.end"
        />
      </use>
    </svg>
  );
};
export {ArrowDown};
