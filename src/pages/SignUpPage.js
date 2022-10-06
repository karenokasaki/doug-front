import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

function SignUpPage() {

  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/users/sign-up", { ...signUp });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          value={signUp.email}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          name="password"
          value={signUp.password}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUpPage;
