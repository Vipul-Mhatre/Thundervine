import { Link } from "react-router-dom"


export function NavBar() {
  return (
    <nav className="container flex items-center justify-between py-4">
      <div className="text-2xl font-semibold text-white">
        THUNDERVINE
      </div>

      <div className="flex items-center gap-8">
        <div className="text-gray-200 hover:text-white cursor-pointer">
          Home
        </div>
        <div className="text-gray-200 hover:text-white cursor-pointer">
          Download App
        </div>
        <div className="text-gray-200 hover:text-white cursor-pointer">
          Contact us
        </div>
        <button className="bg-[#4A7A8C] text-white hover:bg-[#3D6573] px-4 py-2 rounded-lg">
          Sign up
        </button>
      </div>
    </nav>
  );
}


