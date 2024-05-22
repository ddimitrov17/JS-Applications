import { login } from "../data/users.js";
import { html, render,page } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const loginTemplate =(onLogin) => html`
<section id="form-login" class="view-section">
        <form @submit=${onLogin}
          id="login-form"
          class="text-center border border-light p-5"
        >
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="loginemail"
              type="email"
              class="form-control"
              placeholder="Email"
              name="email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="loginpassword"
              type="password"
              class="form-control"
              placeholder="Password"
              name="password"
            />
          </div>

          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </section>`

export function showLogin(ctx) {
    render(loginTemplate(createSubmitHandler(onLogin)));
}

async function onLogin({email,password,repeatPassword}) {
    await login(email,password);
    page.redirect('/');
}