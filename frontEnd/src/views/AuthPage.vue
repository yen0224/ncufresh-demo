<template>
  <div class="container">
    <div class="bluebg">
      <div class="box signin">
        <h2>Already have an Account?</h2>
        <button class="signinbtn btn" @click="ClickSignIn">Sign In</button>
      </div>
      <div class="box signup">
        <h2>Don't have an Account?</h2>
        <button class="signupbtn btn" @click="ClickSignUp">Sign Up</button>
      </div>
    </div>
    <div
      class="formBx absolute t-0 left-0 w-1/2 h-full bg-gray-200 z-50 flex justify-center items-center"
    >
      <div class="form signinform">
        <form>
          <div>
            <label for="username">Your Username:</label>
            <div class="col-sm-10">
              <input
                type="username"
                name="username"
                id="logInusername"
                required
              />
            </div>
          </div>
          <div>
            <label for="password">Your Password:</label>
            <div class="col-sm-10">
              <input
                type="password"
                name="password"
                id="logInpassword"
                required
              />
            </div>
          </div>
          <br />
          <p class="text-red-600">
            <!-- <% if (messages.error){%>
                                <%=messages.error%>
                                    <%}%> -->
          </p>
          <button class="btn" type="button" @click="login">Login</button>
        </form>
      </div>
      <div class="form signupform">
        <form>
          <div>
            <label for="name">Your Name:</label>
            <div class="col-sm-10">
              <input type="text" name="name" id="signUsername" required />
            </div>
          </div>
          <div>
            <label for="email">Your Password:</label>
            <div class="col-sm-10">
              <input type="password" name="password" id="password1" required />
            </div>
          </div>
          <div>
            <label for="password">Verify Your Password:</label>
            <div class="col-sm-10">
              <input type="password" name="password" id="password2" required />
            </div>
          </div>

          <br />
          <button class="btn mt-10 mb-10" type="button" @click="register">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import md5 from "md5";
import Cookies from "js-cookie";
export default {
  name: "AuthPage",
  setup() {
    const ClickSignUp = () => {
      const formBx = document.querySelector(".formBx");
      const body = document.querySelector("body");
      formBx.classList.add("active");
      body.classList.add("active");
    };
    const ClickSignIn = () => {
      const formBx = document.querySelector(".formBx");
      const body = document.querySelector("body");
      formBx.classList.remove("active");
      body.classList.remove("active");
    };
    const login = () => {
      const username = document.getElementById("logInusername").value;
      const password = document.getElementById("logInpassword").value;
      const data = { username, password };
      if (!username || !password) {
        alert("Please enter username and password!");
        return;
      }
      //post data with axios, if response is 200, pop up a message then redirect to home page, else pop up a message
      axios
        .post("http://localhost:3000/login", data, {
          //Allow cookies to be saved
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            alert("Login successfully!");
            Cookies.set("jwt", res.data.token, { expires: 1 });
            Cookies.set("username", username, { expires: 1 });
            window.location.href = "/";
            //window.location.href = "/";
          }
        })
        .catch((err) => {
          alert("Login failed!");
          console.log(err);
        });
    };
    const register = () => {
      let username = document.getElementById("signUsername").value;
      let password1 = document.getElementById("password1").value;
      let password2 = document.getElementById("password2").value;
      if (!username || !password1 || !password2) {
        alert("Please enter username and password!");
        return;
      }
      if (password1 !== password2) {
        alert("Passwords do not match!");
        return;
      }
      //encrypt password with md5
      const password = md5(password1);
      const data = { username, password };
      axios
        .post("http://localhost:3000/user/create", data)
        .then((res) => {
          if (res.status === 200) {
            alert("Register successfully! Please log in again.");
            window.location.href = "/";
          }
          //if get a response with 201, pop up a message with "username already exists"
          if (res.status === 201) {
            alert("Username already exists!");
          }
        })
        .catch((err) => {
          alert("Register failed!");
          console.log(err);
        });
    }
    return { ClickSignUp, ClickSignIn, login, register };
  },
};
</script>
<style>
body {
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  min-height: 100vh;
}
</style>
