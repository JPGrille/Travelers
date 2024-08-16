import React, { useState } from "react";
import { registerUser } from "../../service/index.service";

function Register() {
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
    const submit = await registerUser(user);
    console.log(submit.message);
    setSuccess(submit.message);
  };

  return (
    <div className="main-container mt-5">
      <h1>Register</h1>

      <div className="row justify-content-md-center">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">User Name</label>
                  <input type="name" className="form-control" name="username" onChange={handleChange} value={user.username} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" name="email" onChange={handleChange} value={user.email} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" name="password" onChange={handleChange} value={user.password} />
                </div>
                <button type="submit" className="btn btn-dark">Register</button>
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
                    Sign Up with Google
              </a>
            </div>
          </div>
        </div>
      </div>
        
    </div>
  );
}

export default Register;
