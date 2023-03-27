import React from "react";

function DownloadButton() {
  const handlePrint = () => window.print();

  return (
    <div>
      <button onClick={handlePrint}>Download/Print</button>
      <style jsx>{`
        div {
          display: var(--print-view) none;
        }
        div,
        button {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 60px;
          font-size: 20px;
          font-weight: bold;
        }
        button {
          background-color: #e21717;
          color: white;
          border: none;
          padding: 10px;
        }
      `}</style>
    </div>
  );
}

export default DownloadButton;
