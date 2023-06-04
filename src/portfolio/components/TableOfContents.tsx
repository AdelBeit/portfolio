import {useState} from "react";

export default function TableOfContent() {
  const [headings, setHeadings] = useState([]);

  return (
    <nav>
      <ul>
        <li>
          <a href="#">A heading</a>
        </li>
      </ul>
      <style jsx>
        {`
          nav {
            width: 220px;
            min-width: 220px;
            padding: 16px;
            align-self: flex-start;
            position: -webkit-sticky;
            position: sticky;
            top: 48px;
            max-height: calc(100vh - 70px);
            overflow: auto;
            margin-top: 150px;
          }

          nav ul li {
            margin-bottom: 15px;
          }
        `}
      </style>
    </nav>
  );
}
