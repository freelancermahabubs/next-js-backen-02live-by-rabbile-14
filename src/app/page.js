"use client";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useState} from "react";
export default function Home() {
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    email: "a@gmail.com",
    password: "123",
  });

  const inputChange = (name, value) => {
    setFormValue((formValue) => ({
      ...formValue,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (formValue.email.length === 0) {
      alert("Email Required");
    } else if (formValue.password.length === 0) {
      alert("password Required");
    } else {
      const callbackUrl = "/dashboard";
      const res = await signIn("credentials", {
        redirect: false,
        email: formValue.email,
        password: formValue.password,
        callbackUrl,
      });
      if (!res.error) {
        router.replace(callbackUrl);
      }
    }
  };
  return (
    <div className="w-50 mt-4 mx-auto">
      <form onSubmit={submit}>
        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <input
            onChange={(e) => inputChange("email", e.target.value)}
            value={formValue.email}
            type="email"
            id="form2Example1"
            className="form-control"
          />
          <label className="form-label" for="form2Example1">
            Email address
          </label>
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <input
            onChange={(e) => inputChange("password", e.target.value)}
            type="password"
            value={formValue.password}
            id="form2Example2"
            className="form-control"
          />
          <label className="form-label" for="form2Example2">
            Password
          </label>
        </div>

        {/* <!-- 2 column grid layout for inline styling --> */}
        <div className="row mb-4">
          <div className="col">
            {/* <!-- Simple link --> */}
            <a href="#!">Forgot password?</a>
          </div>
        </div>
        {/* 
  <!-- Submit button --> */}
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>
      </form>
      {/* <!-- Register buttons --> */}
      <div className="text-center">
        <p>
          Not a member? <a href="#!">Register</a>
        </p>
        <p>or sign up with:</p>
        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fab fa-facebook-f">Facebook</i>
        </button>

        <button
          onClick={() => signIn("google")}
          type="button"
          className="btn btn-link btn-floating mx-1">
          <i className="fab fa-google">Google</i>
        </button>

        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fab fa-twitter">Twitter</i>
        </button>
        <button
          onClick={() => signIn("github")}
          type="button"
          className="btn btn-link btn-floating mx-1">
          <i className="fab fa-github">GitHub</i>
        </button>
      </div>
    </div>
  );
}
