import { FaHeartbeat } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <FaHeartbeat className="text-blue-600 text-3xl" />
        <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          MedSafe AI
        </h1>
      </div>
      <ThemeToggle />
    </nav>
  );
}

export default Navbar;