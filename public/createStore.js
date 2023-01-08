const fs = require("fs");
const path = require("path");

// format the file name for naming the symbols in the icon store so that you can later reference them
const formatFileName = (name) => {
  // edit the name as needed
  return name.replace(/icon-/g, "").replace(/\s/g, "_").replace(/.svg/g, "");
};

// Replace the 'svg' tag with a 'symbol' tag and modify the attributes
const replaceSvgWithSymbol = (svgString, fileName) => {
  // Remove the 'xmlns' attribute
  svgString = svgString.replace(/ xmlns=".+?"/g, "");

  // Add an 'id' attribute with the name of the file, and replace spaces with underscores
  fileName = formatFileName(fileName);
  svgString = svgString.replace(/<svg/, `<symbol id="${fileName}"`);

  // Remove 'width' and 'height' from <symbol> elements but no other element
  svgString = svgString.replace(
    /<symbol(.+?)(width=".+?")(.+?)(height=".+?")(.+?)>/g,
    "<symbol$1$3$5>"
  );
  // get rid of extra white space
  svgString = svgString.replace(/ +/g, " ");

  // get rid of fill and stroke
  // svgString = svgString.replace(/ fill=".+?"/g, "");
  // svgString = svgString.replace(/ stroke=".+?"/g, "");

  return svgString.replace(/<\/svg>/g, "</symbol>");
};

const createStore = (storeName, folderPath, includeViwer = false) => {
  // Read all the SVG files in the specified folder
  let svgFiles = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".svg"));

  // Create a new SVG file with all the symbols
  let symbolsSvg = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">\n`;
  svgFiles.forEach((svgFile) => {
    const svgString = fs.readFileSync(path.join(folderPath, svgFile), "utf8");
    symbolsSvg += replaceSvgWithSymbol(svgString, svgFile) + "\n";
  });
  symbolsSvg += "</svg>";

  // Write the new SVG file
  fs.writeFileSync(path.join("./svg stores", storeName), symbolsSvg);

  if (includeViwer) {
    createViewer(
      storeName.replace(/.svg/g, "") + "_viewer.html",
      svgFiles.slice(0, 2)
    );
  }
};

function createViewer(storeName, svgFiles) {
  // Create a new HTML file with all the symbols being used for demonstration purposes
  let symbolViewer = `<style>
.shell {
  width: 300px;
  height: 300px;
  position: relative;
  margin: 20px;
  border: 2px solid red;
}

.icon {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
}

.frame {
  display: block;
  position: relative;
  top: 49.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}
</style>
<body>
<p>make sure there are at least 2 svg files in your icon store folder to view them here</p>
<div class="container">
  <div class="shell">
    <svg class="frame" xmlns="http://www.w3.org/2000/svg">
      <use
        href="/symbols.svg#${
          svgFiles.length > 1
            ? formatFileName(svgFiles[0])
            : "icon store is empty"
        }"
        xlink:href="/symbols.svg#${
          svgFiles.length > 1
            ? formatFileName(svgFiles[0])
            : "icon store is empty"
        }"
        x="0"
        y="0"
        style="fill: black; stroke: yellow"
      ></use>
    </svg>
    <svg class="icon" xmlns="http://www.w3.org/2000/svg">
      <use
        href="/symbols.svg#${
          svgFiles.length > 1
            ? formatFileName(svgFiles[1])
            : "not enough icons in store"
        }"
        xlink:href="/symbols.svg#${
          svgFiles.length > 1
            ? formatFileName(svgFiles[1])
            : "not enough icons in store"
        }"
        x="0"
        y="0"
        style="fill: yellow"
      ></use>
    </svg>
  </div>
  <div class="shell">
    <svg class="frame" xmlns="http://www.w3.org/2000/svg">
      <use
        href="/symbols.svg#${
          svgFiles.length > 1
            ? formatFileName(svgFiles[0])
            : "icon store is empty"
        }"
       xlink:href="/symbols.svg#${
         svgFiles.length > 1
           ? formatFileName(svgFiles[0])
           : "icon store is empty"
       }"
        x="0"
        y="0"
        style="fill: yellow; stroke: yellow"
      ></use>
    </svg>
    <svg class="icon" xmlns="http://www.w3.org/2000/svg">
      <use
        href="/symbols.svg#${
          svgFiles.length > 1
            ? formatFileName(svgFiles[1])
            : "not enough icons in store"
        }"
        xlink:href="/symbols.svg#${
          svgFiles.length > 1
            ? formatFileName(svgFiles[1])
            : "not enough icons in store"
        }"
        x="0"
        y="0"
        style="fill: black"
      ></use>
    </svg>
  </div>
</div>
</body>`;

  fs.writeFileSync(path.join("./svg stores", storeName), symbolViewer);
}

createStore("icons.svg", "./icon store");
