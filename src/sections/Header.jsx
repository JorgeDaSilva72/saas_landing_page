import { Link as LinkScroll } from "react-scroll";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { throttle } from "lodash";

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setHasScrolled(window.scrollY > 32);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // Gestion du défilement avec throttling
  useEffect(() => {
    const handleScroll = throttle(() => {
      setHasScrolled(window.scrollY > 32);
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Sous-composant NavLink
  const NavLink = ({ title }) => (
    <LinkScroll
      onClick={() => setIsOpen(false)}
      to={title}
      offset={-100}
      spy
      smooth
      activeClass="nav-active"
      className="uppercase transition-colors duration-500 cursor-pointer base-bold text-p4 hover:text-p1 max-lg:my-4 max-lg:h5"
    >
      {title}
    </LinkScroll>
  );

  // Sous-composant MobileMenu
  const MobileMenu = ({ isOpen, onClose }) => (
    <div
      className={clsx(
        "fixed top-0 left-0 w-full h-full bg-s2 transition-transform duration-500",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="relative flex flex-col min-h-screen p-6 overflow-hidden sidebar-before max-md:px-4">
        <nav className="my-auto">
          <ul className="flex flex-col space-y-4">
            <li className="nav-li">
              <NavLink title="features" onClick={onClose} />
              <NavLink title="pricing" onClick={onClose} />
            </li>
            <li className="nav-li">
              <NavLink title="faq" onClick={onClose} />
              <NavLink title="download" onClick={onClose} />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 z-50 w-full py-10 transition-all duration-500 max-lg:py-4",
        hasScrolled && "py-2 bg-black-100 backdrop-blur-[8px]"
      )}
    >
      <div className="container flex items-center h-14 max-lg:px-5">
        {/* Logo Mobile */}
        <a className="flex-1 cursor-pointer lg:hidden z-2">
          <img src="/images/xora.svg" width={115} height={55} alt="logo" />
        </a>

        {/* Menu Desktop */}
        <div
          className={clsx(
            "w-full max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:bg-s2 max-lg:opacity-0",
            isOpen ? "max-lg:opacity-100" : "max-lg:pointer-events-none"
          )}
        >
          <div className="max-lg:relative max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6 max-lg:overflow-hidden sidebar-before max-md:px-4">
            <nav className="max-lg:relative max-lg:z-2 max-lg:my-auto">
              <ul className="flex max-lg:block max-lg:px-12">
                <li className="nav-li">
                  <NavLink title="features" />
                  <div className="dot" />
                  <NavLink title="pricing" />
                </li>

                <li className="nav-logo">
                  <LinkScroll
                    to="hero"
                    offset={-250}
                    spy
                    smooth
                    className={clsx(
                      "max-lg:hidden transition-transform duration-500 cursor-pointer"
                    )}
                  >
                    <img
                      src="/images/xora.svg"
                      width={160}
                      height={55}
                      alt="logo"
                    />
                  </LinkScroll>
                </li>

                <li className="nav-li">
                  <NavLink title="faq" />
                  <div className="dot" />
                  <NavLink title="download" />
                </li>
              </ul>
            </nav>

            <div className="lg:hidden block absolute top-1/2 left-0 w-[960px] h-[380px] translate-x-[-290px] -translate-y-1/2 rotate-90">
              <img
                src="/images/bg-outlines.svg"
                width={960}
                height={380}
                alt="outline"
                className="relative z-2"
              />
              <img
                src="/images/bg-outlines-fill.png"
                width={960}
                height={380}
                alt="outline"
                className="absolute inset-0 mix-blend-soft-light opacity-5"
              />
            </div>
          </div>
        </div>

        <button
          className="flex items-center justify-center border-2 rounded-full lg:hidden z-2 size-10 border-s4/25"
          onClick={() => setIsOpen((prevState) => !prevState)}
          aria-label={isOpen ? "close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <img
            src={`/images/${isOpen ? "close" : "magic"}.svg`}
            alt=""
            aria-hidden="true"
            className="object-contain size-1/2"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
