import { useState, useRef, useEffect } from "react";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaPhoneAlt,
  FaBriefcase,
  FaStar,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import type { AppDispatch } from "../app/store";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: any) => state.auth);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref para el dropdown

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Cierra el dropdown al hacer clic en un enlace
  };

  // Manejo de clics fuera del dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Cierra el dropdown si el clic fue fuera
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-800 text-white p-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo">
          <Link to="/" className="text-2xl font-bold text-white">
            Portafolio
          </Link>
        </div>
        <ul className="flex space-x-4">
          {user ? (
            <>
              <li className="relative">
                <button
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none"
                  onClick={toggleDropdown}
                >
                  <FaBars /> Administrar
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 p-2 bg-white text-black rounded shadow-lg">
                    <Link
                      to="/experience"
                      className="flex items-center  gap-2 space-x-2"
                      onClick={handleLinkClick} // Cierra el dropdown al hacer clic
                    >
                      <FaBriefcase /> Experiencia
                    </Link>
                    <Link
                      to="/about"
                      className="flex items-center gap-2 space-x-2"
                      onClick={handleLinkClick} // Cierra el dropdown al hacer clic
                    >
                      <FaStar />
                      Perfil
                    </Link>
                    <Link
                      to="/contact"
                      className="flex items-center gap-2 space-x-2"
                      onClick={handleLinkClick} // Cierra el dropdown al hacer clic
                    >
                      <FaPhoneAlt /> Contacto
                    </Link>
                  </div>
                )}
              </li>
              <li>
                <button
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none"
                  onClick={onLogout}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none"
                >
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none"
                >
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
