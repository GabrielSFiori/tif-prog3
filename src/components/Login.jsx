import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { AuthContext } from "../contexts/AuthContext";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerFetch, setTriggerFetch] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [{ data, isError, isLoading }, doFetch] = useFetch(
    "https://sandbox.academiadevelopers.com/api-auth/"
  );

  function handleSubmit(event) {
    event.preventDefault();
    setTriggerFetch(true);
    doFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  }

  useEffect(() => {
    if (data && data.token) {
      login(username, data.token);
      navigate("/");
    }
  }, [data, navigate, login, username]);

  return (
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-4">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="username">Username:</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label htmlFor="password">Password:</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button
                  type="submit"
                  className="button is-primary is-fullwidth"
                >
                  Submit
                </button>
                {isLoading && triggerFetch && <p>Loading...</p>}
                {isError && <p>Error loading data.</p>}
                {data && <p>{`Token obtained: ${data.token}`}</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
