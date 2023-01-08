import React from "react";

interface NavBagguetteProps {
  children: React.ReactNode;
}

export default function NavBagguette({ children }: NavBagguetteProps) {
  return (
    <div className="_container fixed outline">
      {children}
      <style jsx>{`
        ._container {
          height: 98vh;
          width: fit-content;
          top: 0;
          right: 0;
          left: 85%;
          margin: 10px auto;
        }
      `}</style>
    </div>
  );
}
