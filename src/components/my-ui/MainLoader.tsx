import { Loader2 } from "lucide-react";

const MainLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h2 className="text-center text-2xl">
        <Loader2 className="mr-2 h-14 w-14 animate-spin opacity-80" />
      </h2>
    </div>
  );
};

export default MainLoader;
