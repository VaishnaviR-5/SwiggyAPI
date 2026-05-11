import { useEffect, useState } from "react";
import { LOGO_URL } from "../../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlineStatus";

export const Header = () => {
  const [btnNameReact, setbtnNameReact] = useState("Login");
  console.log("Header Rendered");

  const onlineStatus = useOnlineStatus();


//If no dependency array => useEffect is called on every render
//If dependency array is empty = [] => useEffect is called on initial render(Just once)
//If dependency array is [btnnameReact] => called every time btnNameReact is updated
  useEffect(() => {
    console.log("useEffect called");
  }, [btnNameReact]);
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            Online Status: {onlineStatus ? "✅" : "🔴"}
          </li>
          <li>
            <Link to = "/" className="nav-link"> Home </Link>
            </li>
          <li>
            <Link to = "about"  className="nav-link"> About Us </Link>
            </li>
          <li>
            <Link to = "contact"  className="nav-link"> Contact Us </Link> 
            </li>
          <li>Cart</li>
          <button
            className="login"
            onClick={() => {
              btnNameReact === "Login"
                ? setbtnNameReact("Logout")
                : setbtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
