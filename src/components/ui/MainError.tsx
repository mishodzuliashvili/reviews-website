import React from "react";

const MainError = ({ error }: { error: Error }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h2 className="text-center text-2xl font-semibold">
        Error: {error.message}
      </h2>
    </div>
  );
};

export default MainError;
