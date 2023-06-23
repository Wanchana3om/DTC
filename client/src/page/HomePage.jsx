import "../App.css";
import { useState } from "react";
import { useAuth } from "../context/authContext";

function HomePage() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
//   const [isError, setIsError] = useState("false");
//   const [isSubmitted, setIsSubmitted] = useState(false);


const{login} = useAuth()

// const getUser  = () => {
//     login(username, password)
// }

// useEffect(() => {
//     getUser();
//   }, []);


const handleSubmit = async (event) => {
    event.preventDefault();
    // setIsError(false);
    // setIsSubmitted(true);
    try {
      login( 
      {
        username,
        password,
      });
    } catch (error) {
        // if (error.response && error.response.status === 401) {
        //     setIsError(true);
        //   }
    }
  };


  return (
    <>
      <section className="w-full h-screen flex font-nunito no-underline">
        <div className="w-[70%] h-full ">
          <img
            className="w-full h-full object-cover"
            src="/view-wallpaper.jpeg"
            alt="view"
          />
        </div>
        <form 
        onSubmit={handleSubmit}
        className="w-[30%] flex justify-center items-center">
          <div className="w-[90%] h-[300px] border-[1px] border-solid flex-col text-center border-gray-200 shadow-lg shadow-gray-500 rounded-lg">
            <div className="mx-auto mt-4 bg-orange-700 flex justify-center w-[30px] h-[30px] rounded-full">
              <img className="w-[60%]" src="/icons8-lock.svg" alt="" />
            </div>
            <div className="mt-4">
              <h1 className=" text-2xl font-semibold">Login</h1>
            </div>
            <input
              type="text"
              className="mt-4 text-sm w-[80%] border-[1px]  shadow-sm shadow-gray-500 rounded-sm py-2 px-3"
              placeholder="USERNAME"
              onChange={(e) => setUsername(e.target.value)}
            />
            <div>

            <input
              type="password"
              className="mt-4 text-sm w-[80%] border-[1px]  shadow-sm shadow-gray-500 rounded-sm py-2 px-3"
              placeholder="PASSWORD"
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            {/* <div
                  className={`error-message-container h-5 text-red-600 pt-2 ${isError && isSubmitted ? "opacity-100" : "opacity-0"
                    } pointer-events-none`}
                >
                  Invalid username/password
                </div> */}
            <button 
            type="submit"
            className="mt-4 bg-[#085ddc] w-[80%] text-white rounded-sm font-semibold py-2 px-3  active:bg-[#085ddc] duration-100 hover:bg-[#0644a1] transition-all">
              SUBMIT
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default HomePage;
