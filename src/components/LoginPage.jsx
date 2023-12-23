import { useState } from "react";
import { PiHandWavingFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("userData", JSON.stringify(data));
        return navigate("/profile");
      })
      .catch((res) => {
        res.json().then((error) => {
          switch (res.status) {
            case 400:
              setErrorMsg(error.message);
              break;
            default:
              setErrorMsg("Unknown Error Occured");
          }
        });
      });
  };

  return (
    <main>
      <form
        className="w-[85%] max-w-[450px] mx-auto mt-[4em] bg-white p-[1.5em]"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center">
          <p className="pr-[1px] text-[#757575] text-sm">Welcome back!</p>
          <PiHandWavingFill className="text-yellow-400" />
        </div>
        <h1 className="text-lg font-extrabold mb-[1.3em] md:text-2xl">
          Sign in to your account
        </h1>
        <div className="login-form-feild">
          <p className="text-sm font-medium">Your username</p>
          <input
            className="border-[1px] w-[100%] p-[0.4em] mt-[0.6em] mb-[0.9em] rounded border-[#DEDEDE]"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorMsg(null);
            }}
          />
        </div>
        <div className="login-form-feild">
          <p className="text-sm font-medium">Password</p>
          <input
            type="password"
            className="border-[1px] w-[100%] p-[0.4em] mt-[0.6em] mb-[0.9em] rounded border-[#DEDEDE]"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMsg(null);
            }}
          />
        </div>
        <div>
          <button
            className="w-[100%] py-[0.5em] mt-[0.8em] text-white font-black rounded text-center bg-[#625bf7]"
            type="submit"
          >
            CONTINUE
          </button>
        </div>
        <p className="text-sm text-[#625bf7] cursor-pointer font-bold text-center mt-[0.6em]">
          Forget your password?
        </p>
        {errorMsg && (
          <p className="w-[100%] py-[0.5em] my-[1em] text-white font-bold rounded text-center bg-red-400">
            {errorMsg}
          </p>
        )}
      </form>
      <p className="text-sm text-center mt-[3em]">
        Don't have an account?{" "}
        <span className="cursor-pointer text-[#625bf7]">Sign up</span>
      </p>
    </main>
  );
}
