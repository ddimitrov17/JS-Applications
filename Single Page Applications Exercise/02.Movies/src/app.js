import { showHome } from "./views/home.js";
import { page } from "./lib.js";
import { showDetails } from "./views/details.js";
import { showRegister } from "./views/register.js";
import { showLogin } from "./views/login.js";

page('/', showHome);
page('/catalog/:id',showDetails);
page('/register',showRegister);
page('/login',showLogin)

page.start();