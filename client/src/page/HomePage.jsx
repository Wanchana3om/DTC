import "../App.css";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import * as React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const changeTypeInput = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (username.length === 0 && password.length === 0) {
        alert('Please enter a username and password');
    } else if (username.length === 0) {
        alert('Please enter username');
    } else if (password.length === 0) {
        alert("Please enter Passwords");
    }else{
      login({
        username,
        password,
      });
    }
    } catch (error) {}
  };

  return (
    <>
      <section className="w-full h-screen flex font-nunito">
        <div className="w-[70%] h-full ">
          <img
            className="w-full h-full object-cover"
            src="/view-wallpaper.jpeg"
            alt="view"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-[30%] flex justify-center items-center"
        >
          <div className="w-[90%] py-12 border-[1px] border-solid flex-col text-center border-gray-200 shadow-lg shadow-gray-500 rounded-lg">
            <div className="w-[80%] mx-auto">
              <div className="mx-auto bg-orange-700 flex justify-center w-[30px] h-[30px] rounded-full">
                <img className="w-[60%]" src="/icons8-lock.svg" alt="" />
              </div>
              <div className="mt-4">
                <h1 className=" text-2xl font-semibold">Login</h1>
              </div>
              <input
                type="text"
                className="mt-4 text-sm w-full border-[1px]  shadow-sm shadow-gray-500 rounded-sm py-2 px-3"
                placeholder="USERNAME"
                onChange={(e) => setUsername(e.target.value)}
                style={{ outline: "none" }}
              />
              <div>
                <div className="flex justify-between mt-4 border-[1px]  shadow-sm shadow-gray-500 rounded-sm">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="text-sm w-[85%]  py-2 px-3"
                    placeholder="PASSWORD"
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ outline: "none" }}
                  />
                  <div className="w-[15%] flex justify-center items-center">
                    <img src="/eye.svg" onClick={changeTypeInput} alt="view" />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 bg-[#085ddc] w-full text-white rounded-md font-semibold py-2 px-3  active:bg-[#085ddc] duration-100 hover:bg-[#0644a1] transition-all "
              >
                SIGN IN
              </button>

              <Link
                to="/register"
                type="submit"
                className="mt-4 bg-[#085ddc] w-full text-white rounded-md font-semibold py-2 px-3  active:bg-[#085ddc] duration-100 hover:bg-[#0644a1] transition-all"
              >
                SIGN UP
              </Link>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default HomePage;
