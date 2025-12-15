import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  const toggleResume = () => {
    const resumeUrl =
      "https://docs.google.com/document/d/1tZZN1nZQJm8iqCBtq3CQUeT3_z-C_UNji-mWtqlMhcM/edit?usp=sharing";
    window.open(resumeUrl);
  };

  useEffect(() => {
    if (toggle) {
      setActive("");
    }
  }, [toggle]);

  const renderNavLinks = (isSecondary) => (
    <ul
      className={`list-none ${
        isSecondary ? "flex sm:hidden" : "hidden sm:flex"
      } flex-row gap-6`}
    >
      {navLinks.map((link) => (
        <li
          key={link.id}
          className={`${
            active === link.title
              ? "text-white"
              : isSecondary
              ? "text-secondary"
              : "text-white"
          } hover:text-white text-[20px] font-medium cursor-pointer`}
          onClick={() => {
            setActive(link.title);
            if (isSecondary) {
              setToggle(false);
            }
          }}
        >
          <a href={`#${link.id}`}>{link.title}</a>
        </li>
      ))}
      <li
        className={`text-${
          isSecondary ? "secondary" : "white"
        } hover:text-white text-[20px] font-medium cursor-pointer`}
      >
        <button onClick={toggleResume}>Resume</button>
      </li>
    </ul>
  );

  return (
    <>
      <nav
        className={`${styles.paddingX} w-full flex items-center py-3 fixed top-0 z-20`}
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <img
              src={"https://juliosalvat.com/img/jslogo.png"}
              alt="logo"
              className="w-9 h-9 object-contain"
            />
            <p className="text-white text-[20px] font-bold cursor-pointer flex">
              JULIO&nbsp;
              <span className="sm:block hidden">SALVAT</span>
            </p>
          </Link>
          {renderNavLinks(false)}
          <div className="sm:hidden flex flex-1 justify-end items-center">
            <div
              className="w-[28px] h-[18px] cursor-pointer"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? (
                <svg className="w-full h-full" fill="white" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-full h-full" fill="white" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div
              className={`p-4 black-gradient absolute top-14 right-0 mx-2 my-2 min-w-[120px] z-10 rounded-xl foggy-glass ${
                toggle ? "flex" : "hidden"
              }`}
            >
              {renderNavLinks(true)}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
