import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-code"></i> Careers
        </Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a href="!#">Developers</a>
          </li>
          <li className="nav-item">
            <a href="/register">Register</a>
          </li>
          <li className="nav-item">
            <a href="/login">Login</a>
          </li>
        </ul>
      </div>
    </nav>
    //   <nav className="navbar navbar-expand-sm navbar-dark">
    //   <div className="container">
    //     <Link className="navbar-brand" to="/">
    //       Careers
    //     </Link>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-toggle="collapse"
    //       data-target="#mobile-nav"
    //       aria-controls="navbarTogglerDemo01"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon" />
    //     </button>

    //     <div className="collapse navbar-collapse" id="mobile-nav">
    //       <ul className="navbar-nav mr-auto">
    //         {this.props.auth.isAuthenticated ? (
    //           <Fragment>
    //             <li className="nav-item">
    //               <Link className="nav-link" to="/profiles">
    //                 {" "}
    //                 Graduates
    //               </Link>
    //             </li>
    //             <li className="nav-item">
    //               <Link className="nav-link" to="/feed">
    //                 {" "}
    //                 Post Feed
    //               </Link>
    //             </li>
    //             <li className="nav-item">
    //               <Link className="nav-link" to="/chat">
    //                 {" "}
    //                 Chat
    //               </Link>
    //             </li>
    //           </Fragment>
    //         ) : (
    //           <li className="nav-item">
    //             <Link className="nav-link" to="/profiles">
    //               {" "}
    //               Graduates
    //             </Link>
    //           </li>
    //         )}
    //       </ul>

    //       <ul className="navbar-nav ml-auto">
    //         {this.props.auth.isAuthenticated ? (
    //           <Fragment>
    //             <li className="nav-item">
    //               <Link className="nav-link" to="/dashboard">
    //                 <img
    //                   className="rounded-circle d-none d-md-block"
    //                   src={auth.user.avatar}
    //                   alt="avatar"
    //                 />
    //               </Link>
    //             </li>
    //             <li className="nav-item">
    //               <a
    //                 href="_target"
    //                 rel="noopener noreferrer"
    //                 className="nav-link mt-half"
    //                 onClick={this.onLogout}
    //               >
    //                 Logout
    //               </a>
    //             </li>
    //             <li className="nav-item">
    //               <Link className="nav-link" to="/settings">
    //                 <i className="fas fa-cog mt-half" />
    //               </Link>
    //             </li>
    //           </Fragment>
    //         ) : (
    //           <Fragment>
    //             <li className="nav-item">
    //               <Link className="nav-link" to="/register">
    //                 Sign Up
    //               </Link>
    //             </li>
    //             <li className="nav-item">
    //               <Link className="nav-link" to="/login">
    //                 Login
    //               </Link>
    //             </li>
    //           </Fragment>
    //         )}
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navbar;
