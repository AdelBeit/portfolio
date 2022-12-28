<script>
  export let title = "title";
  export let content = "content";
  const buttons = ["linkedin", "github", "resume", "email"];
  let height = 900;
</script>

<div class="container" style:width="100%" style:height="100%">
  <div class="svg_container absolute" style:height="100%" style:width="100%">
    <svg
      width="379"
      height="720"
      preserveAspectRatio="xMidYMin"
      viewBox="0 0 379 720"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
  </div>
  <div class="title absolute">
    <p>{title}</p>
  </div>
  <div class="content absolute">
    <p>{content}</p>
  </div>
</div>

<style>
  .container {
    position: relative;
  }
  .absolute {
    position: absolute;
  }
  svg {
    position: relative;
    max-height: 100%;
  }

  .title {
  }
</style>
