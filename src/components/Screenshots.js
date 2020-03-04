import React from "react";
import img1 from "../img/screenshots/scr1.png";
import img2 from "../img/screenshots/scr2.png";
import img3 from "../img/screenshots/scr3.png";
import img4 from "../img/screenshots/scr4.png";
import img5 from ".././img/screenshots/scr5.png";

export const ScreenShots = () => {
  return (
    <div className="screenshots__container">
      <h1>Project screenshots</h1>
      <ul className="screenshots__list">
        <li className="screenshots__element">
          <h3>Form page</h3>
          <img src={img2} alt="img1" />
        </li>
        <li className="screenshots__element">
          <h3>Login page</h3>
          <p>
            Authorizes whitelist users only. Otherwise logs out and asks to log
            in again.
          </p>
          <img src={img3} alt="img2" />
        </li>

        <li className="screenshots__element">
          <p>
            <h3>List of users</h3>A list of users that have filled in the form.
            If authorized, one can click on the name to access user page.
          </p>
          <img src={img5} alt="img2" />
        </li>
        <li className="screenshots__element">
          <h3>User profile page</h3>
          <img width={500} src={img4} alt="img2" />
        </li>
        <li className="screenshots__element">
          <img src={img1} alt="img2" />
        </li>
      </ul>
    </div>
  );
};
