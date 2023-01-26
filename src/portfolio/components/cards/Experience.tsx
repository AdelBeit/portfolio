import React from "react";
import { scale } from "../../utils/scale";

interface Props {
  companyName: string;
  role: string;
  date: string;
  duties: string[];
  width: number;
}

export default function Experience({
  companyName,
  duties,
  date,
  role,
  width = 0,
}: Props) {
  const _name = "experience";
  const initialWidth = 352;
  const initialHeight = 518;
  const height = scale(initialHeight, initialWidth, width);

  const scalingFactor = width / initialWidth;

  return (
    <div className="_card relative" style={{ width: width, height: height }}>
      <svg className="_svg absolute" xmlns="https://www.w3.org/2000/svg">
        <use
          href={`./svg stores/cards.svg#${_name}`}
          xlinkHref={`./svg stores/cards.svg#${_name}`}
          x="0"
          y="0"
        ></use>
      </svg>
      <div className="_contentBox company_name absolute">
        <p>{companyName}</p>
      </div>
      <div className="_contentBox date absolute">
        <p>{date}</p>
      </div>
      <div className="_contentBox role absolute">
        <p>{role}</p>
      </div>
      <div className="_contentBox duties absolute">
        <ul>
          {duties.map((duty, _index) => (
            <li key={_index}>{duty}</li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        ._card {
          width: ${width}px;
          height: ${height}px;
        }

        ._contentBox {
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        ._contentBox.company_name {
          width: 97%;
          height: ${scalingFactor * 48}px;
          margin-top: ${scalingFactor * 5}px;
          margin-left: ${scalingFactor * 5}px;
          justify-content: flex-start;
          padding: 5px 15px;
        }

        ._contentBox.date {
          width: 28%;
          height: ${scalingFactor * 18}px;
          margin-top: ${scalingFactor * 59}px;
          margin-left: ${scalingFactor * 5}px;
          padding: 0;
          justify-content: center;
        }

        ._contentBox.role {
          width: 62%;
          height: ${scalingFactor * 43}px;
          right: 0;
          margin-top: ${scalingFactor * 60}px;
          margin-right: ${scalingFactor * 5}px;
          padding: 0;
          padding-right: 15px;
          color: var(--black);
          justify-content: flex-end;
        }

        ._contentBox.duties {
          width: 93%;
          height: ${scalingFactor * 380}px;
          margin-top: ${scalingFactor * 104}px;
          margin-left: ${scalingFactor * 5}px;
          align-items: flex-start;
          justify-content: flex-start;
        }

        ul {
          padding: 0;
          padding-left: 30px;
          max-width: 100%;
        }
        li {
          padding-right: 10px;
          word-wrap: break-word;
        }
        li:not(:last-child) {
          margin-bottom: 7px;
        }
      `}</style>
    </div>
  );
}
