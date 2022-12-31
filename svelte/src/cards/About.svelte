<script>
  export let title = "title";
  export let content = "content";
  const buttons = ["linkedin", "github", "resume", "email"];
  export let initialWidth = 379;
  export let initialHeight = 720;

  let widthSlider = initialWidth;
  let initialTitleTop = 1;
  let initialTitleLeft = 9;
  $: scalingFactor = widthSlider / initialWidth;
  $: scaledHeight = initialHeight * scalingFactor;
  $: titleTop =
    initialTitleTop * 3 * Math.pow(3, scalingFactor) - initialTitleTop * 8;
  $: titleLeft = initialTitleLeft * Math.pow(2, scalingFactor);
</script>

<div style:width="1000px" style:height="800px" class="section">
  <input
    class="block"
    id="width"
    type="range"
    min="379"
    max="1000"
    bind:value={widthSlider}
  />
  <p>
    aspect ratio: {widthSlider / scaledHeight}, {widthSlider}, {scaledHeight}
  </p>

  <div
    class="_card relative highlight"
    style:width="{widthSlider}px"
    style:height="{scaledHeight}px"
  >
    <svg
      class="absolute"
      width={widthSlider}
      height={scaledHeight}
      viewBox="0 0 {initialWidth} {initialHeight}"
    >
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
    <div class="text absolute" style="left: {titleLeft}px; top: {titleTop}px">
      <p>
        {title}, slider: {widthSlider}, scaling: {scalingFactor}, top: {titleTop}
      </p>
    </div>
    <div class="text absolute" style="left: {titleLeft}px; top: {titleTop}px">
      <p>{content}</p>
    </div>
  </div>
</div>

<style>
  .boxContainer {
    display: flex;
    flex-direction: row;
  }
  .text {
    z-index: 10;
  }
  .svg_container {
    z-index: -10;
  }
</style>
