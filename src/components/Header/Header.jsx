import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth?.status);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-800">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-md text-white hover:bg-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          {/* Navigation Items */}
          <ul
            className={`flex flex-col lg:flex-row lg:ml-auto lg:space-x-4 ${
              isMobileMenuOpen ? "block" : "hidden"
            } lg:block`}
          >
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className="mt-2 lg:mt-0">
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setIsMobileMenuOpen(false); // Close menu on navigation
                      }}
                      className="block lg:inline-block px-6 py-2 text-white duration-200 hover:bg-gray-900 rounded-full"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li className="mt-2 lg:mt-0">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
