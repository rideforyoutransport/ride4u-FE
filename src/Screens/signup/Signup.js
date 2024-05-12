import React from "react";

export default function Signup() {
  return (
    <div className="main-wrapper">
      <div className="page-wrapper full-page">
        <div className="page-content d-flex align-items-center justify-content-center">
          <div className="row w-100 mx-0 auth-page">
            <div className="col-md-8 col-xl-6 mx-auto">
              <div className="card">
                <div className="row">
                  <div className="col-md-4 pr-md-0">
                    <div className="auth-left-wrapper"></div>
                  </div>
                  <div className="col-md-8 pl-md-0">
                    <div className="auth-form-wrapper px-4 py-5">
                      <a href="#" className="noble-ui-logo d-block mb-2">
                        Noble<span>UI</span>
                      </a>
                      <h5 className="text-muted font-weight-normal mb-4">
                        Create a free account.
                      </h5>
                      <form className="forms-sample">
                        <div className="form-group">
                          <label>Username</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputUsername1"
                            autocomplete="Username"
                            placeholder="Username"
                          />
                        </div>
                        <div className="form-group">
                          <label>Email address</label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Email"
                          />
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            autocomplete="current-password"
                            placeholder="Password"
                          />
                        </div>
                        <div className="form-check form-check-flat form-check-primary">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                            Remember me
                          </label>
                        </div>
                        <div className="mt-3">
                          <a
                            href="../../dashboard-one.html"
                            className="btn btn-primary text-white mr-2 mb-2 mb-md-0"
                          >
                            Sing up
                          </a>
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"
                          >
                            <i
                              className="btn-icon-prepend"
                              data-feather="twitter"
                            ></i>
                            Sign up with twitter
                          </button>
                        </div>
                        <button
                          className="d-block mt-3 text-muted"
                          onClick={console.log("hi")}
                        >
                          Already a user? Sign in
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
