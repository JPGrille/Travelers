import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectAuthError, selectAuthStatus } from "../../features/auth/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  // Fetch authentication state and errors from Redux store
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  
  function handleChange(event: { target: { name: any; value: any; }; }) {
    const { name, value } = event.target;
    setUser((user: any) => {
      return {
        ...user,
        [name]: value,
      };
    });
  }

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

  useEffect(() => {
    if (authStatus === "succeeded") {
      navigate("/");
    }
  }, [authStatus, navigate]);

  return (
    <div>
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
              <a className="btn btn-block" href="/register" role="button">Register</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;
