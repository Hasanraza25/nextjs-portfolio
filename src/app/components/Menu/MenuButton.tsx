// MenuButton.tsx
import React from "react";

const MenuButton = ({ children, isActive }: { children: React.ReactNode; isActive: boolean }) => {
  return (
    <div
      className={`${
        isActive ? "group relative cursor-pointer overflow-hidden uppercase" : ""
      }`}
    >
      {isActive ? (
        <>
          <span className="inline-block transition duration-500 ease-out group-hover:-translate-y-[120%]">
            {children}
          </span>
          <span className="absolute left-0 inline-block translate-y-[120%] transition duration-500 ease-out group-hover:translate-y-0 group-hover:rotate-0">
            {children}
          </span>
        </>
      ) : (
        <span>{children}</span>
      )}
    </div>
  );
};

export default MenuButton;
