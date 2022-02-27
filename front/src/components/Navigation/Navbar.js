import React from "react";
import { NavLink } from "react-router-dom";
import TopLogoForm from "../Log/TopLogoForm";

const Navbar = () => {
  return (
    <>
      <div className="logo-signup">
        <img
          src="./img/logo/icon-left-font-monochrome-white.svg"
          alt="logo de groupomania"
        />
        <nav>
          <ul>
            <li>
              <NavLink end to="/">
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink end to="/trendings">
                Populaires
              </NavLink>
            </li>
            <li>
              <NavLink end to="/profil">
                Profil
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="round-svg">
          <svg
            className="arrondis-theme black-arrondis"
            version="1.1"
            id="Calque_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 1440 48"
            style={{ enableBackground: 'new 0 0 1440 48"' }}
            xmlSpace="preserve"
          >
            <path d="M1440,48H0V0c0,0,205,47,720,47s720-46.9,720-46.9V48z"></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Navbar;