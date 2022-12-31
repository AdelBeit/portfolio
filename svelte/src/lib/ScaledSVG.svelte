<script>
  import About from "../svgs/About.svelte";

  export let width0;
  export let height0;
  let width = width0;
  let height = height0;

  function getInitialDimensions(width, height) {
    width0 = width;
    height0 = height;
  }

  function scale(width0, width) {
    let scalingFactor = width / width0;
    let height = height0 * scalingFactor;
    return height;
  }

  $: width = width0;
  $: height = scale(width0, width);
</script>

<div style:width="1000px" style:height="800px" class="">
  <input
    class="block"
    id="width"
    type="range"
    min="379"
    max="1000"
    bind:value={width}
  />
  <p>
    aspect ratio: {width / height}, w0: {width0}, h0: {height0}, w: {width}, h: {height}
  </p>
  <About {width} {height} />
</div>

<style>
  .boxContainer {
    display: flex;
    flex-direction: row;
  }
</style>
