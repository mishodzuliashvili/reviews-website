import { Loader2 } from "lucide-react";

const MainLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen z-50 fixed left-0 top-0 w-full bg-[#f7fafd] dark:bg-[#0a0a0a]">
      <h2 className="text-center text-2xl">
        <Loader2 className="mr-2 h-14 w-14 animate-spin opacity-80" />
      </h2>
    </div>
  );
};

export default MainLoader;
