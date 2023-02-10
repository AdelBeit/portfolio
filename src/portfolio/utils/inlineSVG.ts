export default `
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
   <symbol id="arrowup" viewBox="0 0 60 60" fill="none" stroke="currentColor">
      <symbol id="stroke_target" viewbox="0 15 60 27" fill="none" stroke-width="5" stroke-linecap="round">
         <line x1="15" y1="15" x2="30" y2="27" />
         <line x1="30" y1="27" x2="45" y2="15" />
      </symbol>
      <g transform="rotate(180 30 30)">
         <use href="#stroke_target" x="0" y="-1.51" width="60" height="55" />
         <use href="#stroke_target" x="0" y="13" width="60" height="55">
            <animate id="p0" dur="1.5s" attributeName="y" values="13;23;13;23;13" begin="0s;delay0.end" />
            <animate id="delay0" dur="3s" attributeName="y" values="13;13" begin="p0.end" />
         </use>
      </g>
   </symbol>
   
   <symbol id="arrowdown" viewBox="0 0 60 60" stroke="currentColor" fill="none">
      <symbol id="stroke_target" viewbox="0 15 60 27" fill="none" stroke-width="5">
         <line x1="15" y1="15" x2="30" y2="27" stroke-linecap="round" />
         <line x1="30" y1="27" x2="45" y2="15" stroke-linecap="round" />
      </symbol>
      <use href="#stroke_target" x="0" y="-1.51" width="60" height="55" />
      <use href="#stroke_target" x="0" y="13" width="60" height="55">
         <animate id="p0" dur="1.5s" attributeName="y" values="13;23;13;23;13" begin="0s;delay0.end" />
         <animate id="delay0" dur="3s" attributeName="y" values="13;13" begin="p0.end" />
      </use>
   </symbol>

   <symbol id="music_vis" viewBox="0 0 130 60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="7">
      <g id="stroke_target" transform="rotate(180 65 30)">
      <rect x='10' y='4' rx="0.5" width="7" height="10">
         <animate class="p0" attributeName="height" values="10;30;50;10" repeatCount="indefinite" begin="0s" dur="1s" />
      </rect>
      <rect x='30' y='4' rx="0.5" width="7" height="30">
         <animate class="p0" attributeName="height" values="30;10;20;30" repeatCount="indefinite" begin="0s" dur="1s" />
      </rect>
      <rect x='50' y='4' rx="0.5" width="7" height="13">
         <animate class="p0" attributeName="height" values="13;19;34;13" repeatCount="indefinite" begin="0s" dur="1s" />
      </rect>
      <rect x='70' y='4' rx="0.5" width="7" height="30">
         <animate class="p0" attributeName="height" values="30;10;50;30" repeatCount="indefinite" begin="0s" dur="1s" />
      </rect>
      <rect x='90' y='4' rx="0.5" width="7" height="20">
         <animate class="p0" attributeName="height" values="20;40;10;20" repeatCount="indefinite" begin="0s" dur="1s" />
      </rect>
      <rect x='110' y='4' rx="0.5" width="7" height="10">
         <animate class="p0" attributeName="height" values="10;50;20;10" repeatCount="indefinite" begin="0s" dur="1s" />
      </rect>
   </g>
   </symbol>
</svg>
`;
