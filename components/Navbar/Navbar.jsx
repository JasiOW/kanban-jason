import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
export default function Navbar(props) {
  const nav = useNavigate();
  return (
    
    <div className="navbar">
      <h2 onClick={() => nav("/")}>Kanban Board</h2>
      <div>
        <input
          type="checkbox"
          className="checkbox"
          id="checkbox"
          style={{ transition: "all 200ms" }}
          onChange={props.switchTheme}
        />
        <label htmlFor="checkbox" className="label">
          <i className="fas fa-moon fa-sm"></i>
          <i className="fas fa-sun fa-sm"></i>
          <div className="ball" />
        </label>
      </div>
      {/* <button>Switch theme</button> */}
    </div>
  );
}