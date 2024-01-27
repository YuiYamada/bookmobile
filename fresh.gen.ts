// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_app from "./routes/_app.tsx";
import * as $api_healthCheck from "./routes/api/healthCheck.ts";
import * as $api_logIn from "./routes/api/logIn.ts";
import * as $api_signUp from "./routes/api/signUp.ts";
import * as $index from "./routes/index.tsx";
import * as $loginPage from "./routes/loginPage.tsx";
import * as $mainPage from "./routes/mainPage.tsx";
import * as $signUpPage from "./routes/signUpPage.tsx";
import * as $Login from "./islands/Login.tsx";
import * as $Main from "./islands/Main.tsx";
import * as $RegisterBook from "./islands/RegisterBook.tsx";
import * as $SignUp from "./islands/SignUp.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_app.tsx": $_app,
    "./routes/api/healthCheck.ts": $api_healthCheck,
    "./routes/api/logIn.ts": $api_logIn,
    "./routes/api/signUp.ts": $api_signUp,
    "./routes/index.tsx": $index,
    "./routes/loginPage.tsx": $loginPage,
    "./routes/mainPage.tsx": $mainPage,
    "./routes/signUpPage.tsx": $signUpPage,
  },
  islands: {
    "./islands/Login.tsx": $Login,
    "./islands/Main.tsx": $Main,
    "./islands/RegisterBook.tsx": $RegisterBook,
    "./islands/SignUp.tsx": $SignUp,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
