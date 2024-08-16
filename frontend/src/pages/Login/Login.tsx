import React, { useState } from "react";
import { loginUser } from "../../service/index.service";

function Login() {
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });
  
  function handleChange(event: { target: { name: any; value: any; }; }) {
    const { name, value } = event.target;
    setUser((user: any) => {
      return {
        ...user,
        [name]: value,
      };
    });
  }
  
  const handleSubmit = async () => {
    // Handle form submission
    const submit = await loginUser(user);
    console.log(submit.message);
    setSuccess(submit.message);
  };

  return (
    <div className="main-container">
      <h1>Login</h1>

      <div className="row justify-content-md-center">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" name="email" onChange={handleChange} value={user.email} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" name="password" onChange={handleChange} value={user.password} />
                </div>
                <button type="submit" className="btn btn-dark">Login</button>
              </form>

            </div>
          </div>
        </div>

      </div>

      <div className="row justify-content-md-center">
        <div className="col-sm-4">
          <div className="card google-sign-in">
            <div className="card-body">
              <a className="btn btn-block" href="/auth/google" role="button">
                <i className="fab fa-google"></i>
              Sign In with Google
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card google-sign-in">
            <div className="card-body">
              <a className="btn btn-block" href="/register" role="button">Register</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;
