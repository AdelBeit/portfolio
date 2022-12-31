<!-- about svg -->
<script>
  let name = "About.svg";
  let width0 = 379;
  let height0 = 720;
  export let width;
  export let height;
</script>

<div
  class="card_container relative highlight"
  style:width="{width}px"
  style:height="{height}px"
>
  <div
    class="svg_container z-10 absolute"
    style:height="100%"
    style:width="100%"
  >
    <svg class="relative" {width} {height} viewBox="0 0 {width0} {height0}">
      <path
        d="M362 38H16.001L16 701.5L26 719.5L329.813 719.769L362 694.5V38Z"
        fill="#33FF00"
      />
      <path
        d="M366.583 2L377 11.9692V49L368.492 57.5078L2 58V12.0312L12.4255 2H366.583Z"
        fill="#282828"
        stroke="#33FF00"
        stroke-width="4"
      />
      <path
        d="M339 686.5L339 69H2V705.5L9.74713 717.5H302.847L339 686.5Z"
        fill="#282828"
        stroke="#33FF00"
        stroke-width="4"
      />
      <path
        d="M216 3.99997L190 3.99997L185.58 12.84L164 56H190L196.24 43.52L216 3.99997Z"
        fill="#33FF00"
      />
      <path
        d="M257 3.99997L231 3.99997L226.58 12.84L205 56H231L237.24 43.52L257 3.99997Z"
        fill="#33FF00"
      />
      <path
        d="M298 3.99997L272 3.99997L267.58 12.84L246 56H272L278.24 43.52L298 3.99997Z"
        fill="#33FF00"
      />
      <path
        d="M339 3.99997L313 3.99997L308.58 12.84L287 56H313L319.24 43.52L339 3.99997Z"
        fill="#33FF00"
      />
    </svg>
  </div>
  <!-- <div class="text absolute" style="left: {titleLeft}px; top: {titleTop}px">
    <p>
      {title}, slider: {widthSlider}, scaling: {scalingFactor}, top: {titleTop}
    </p>
  </div>
  <div class="text absolute" style="left: {titleLeft}px; top: {titleTop}px">
    <p>{content}</p>
  </div> -->
</div>
