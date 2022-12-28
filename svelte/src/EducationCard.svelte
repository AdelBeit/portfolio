<script type="ts">
  let height = 100;
  let width = 200;

  function handleResize() {
    width = this.offsetWidth;
    height = this.offsetHeight;
  }
</script>

<input type="range" min="100" max="300" bind:value={height} />
<div on:resize={handleResize}>
  <svg
    width="175"
    height="52"
    viewBox="0 0 175 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M52 -3.05176e-05L26 -3.05176e-05L21.58 8.83997L1.90735e-06 52H26L32.24 39.52L52 -3.05176e-05Z"
      fill="#33FF00"
    />
    <path
      d="M93 -3.05176e-05L67 -3.05176e-05L62.58 8.83997L41 52H67L73.24 39.52L93 -3.05176e-05Z"
      fill="#33FF00"
    />
    <path
      d="M134 -3.05176e-05L108 -3.05176e-05L103.58 8.83997L82 52H108L114.24 39.52L134 -3.05176e-05Z"
      fill="#33FF00"
    />
    <path
      d="M175 -3.05176e-05L149 -3.05176e-05L144.58 8.83997L123 52H149L155.24 39.52L175 -3.05176e-05Z"
      fill="#33FF00"
    />
  </svg>
</div>
