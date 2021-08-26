import React from 'react';
import '../../styles/header.css';

export default function Header () {

  return (
    <header>
      <div class="navbars">
        <span class="app-name"><b>PeePoopDog</b></span>
        <div class="navbar-nav">
            {/* <% if (user) { %>
              <div class="navbar-navee">
              <form class="form-inline" action="/logout" method="POST">
                <span style="margin-right: 1em">Hello <%= user.name %>!</span>
                <button type="submit">Logout</button>
              </form>
              </div>
              <% } else { %>
              <div class="navbar-navee">
                <a href="/login">Login</a>
              </div>
            <% } %> */}
        </div>
      </div>
    </header>
  );
}
