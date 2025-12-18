import React, { useState } from "react";
import Rolecard from "./components/Rolecard";
import RoleCard from "./components/Rolecard";
import api from "../../api/axios";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const [errors, setErrors] = useState({});

  // Validation Logic
  function validate() {
    const err = {};
    if (!formData.name || formData.name.trim().length < 2)
      err.name = "Enter a valid name";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email))
      err.email = "Enter a valid email";
    if (!formData.password || formData.password.length < 8)
      err.password = "Password must be 8+ characters";
    if (!formData.role) errors.role = "Role is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("formdata",formData);

  if (!validate()) return;
  setIsLoading(true);
 console.log("verified");
  try {
    const endpoint = isSignUp ? "/auth/signup" : "/auth/signin";
    console.log(endpoint);
    const { data } = await api.post(endpoint, formData);
    localStorage.setItem("token", data.token);
    console.log("data",   data);

    alert(`${isSignUp ? "Sign Up" : "Sign In"} Successful!`);
    // const { res } = await api.get('/profile/me'); // cookie auto-sent; server reads it

    // console.log("user details", res);

    

  } catch (error) {
    console.error(error);

    if (error.response?.data?.message) {
      console.error(error);
      alert(error.response.data.message);
    } else {
      alert("Something went wrong.nnn");
    }

  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg p-4 ">
      {/* Main Container */}
      <div className="relative overflow-hidden w-full max-w-[768px] min-h-[600px] md:min-h-[480px] bg-primary rounded-[10px] shadow-2xl border-6 border-primary">
        {/* --- Sign Up Container --- */}
        <div
          className={`
    absolute top-0 left-0 h-full w-full md:w-1/2
    transition-all duration-[1400ms] ease-in-out transform
    ${
      isSignUp
        ? "md:translate-x-full translate-x-0 opacity-100 z-50 block md:block" /* ACTIVE: Moves to the right half (100% of its own width, which is the 50% marker) */
        : "translate-x-0 opacity-0 z-10 hidden md:block" /* INACTIVE: Starts on the left, but invisible/behind */
    }
  `}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center h-full px-12 text-center bg-card"
          >
            <h1 className="font-bold text-2xl text-white mb-0">
              Create Account
            </h1>
            <p className="text-secondaryText text-sm font-light my-5">
              How would you like to use our platform as?
            </p>

            {/* ROLE SELECTOR */}
            {/* --- Role selector --- */}
            <div className="w-full grid grid-cols-2 gap-3 mb-4">
              <Rolecard
                label="Candidate"
                value="candidate"
                selected={formData.role === "candidate"}
                onSelect={(value) =>
                  handleChange({ target: { name: "role", value } })
                }
              />
              <RoleCard
                label="Company"
                value="company"
                selected={formData.role === "company"}
                onSelect={(value) =>
                  handleChange({ target: { name: "role", value } })
                }
              />
            </div>
            <input
              className="bg-bg border border-border px-4 py-3 my-2 w-full text-white rounded focus:outline-none focus:border-primary placeholder-muted"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <span className="text-danger text-xs text-left w-full -mt-1 mb-2">
                {errors.name}
              </span>
            )}

            <input
              className="bg-bg border border-border px-4 py-3 my-2 w-full text-white rounded focus:outline-none focus:border-primary placeholder-muted"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="text-danger text-xs text-left w-full -mt-1 mb-2">
                {errors.email}
              </span>
            )}

            <input
              className="bg-bg border border-border px-4 py-3 my-2 w-full text-white rounded focus:outline-none focus:border-primary placeholder-muted"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-danger text-xs text-left w-full -mt-1 mb-2">
                {errors.password}
              </span>
            )}

            <button
              className="mt-4 rounded-full border border-primary bg-primary text-darkTextOnPrimary text-xs font-bold py-3 px-12 uppercase tracking-widest transition-transform active:scale-95 hover:bg-primaryHover disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "..." : "Sign Up"}
            </button>

            {/* Mobile Toggle Link */}
            <button
              type="button"
              className="md:hidden mt-6 text-primary underline text-sm bg-transparent border-none normal-case font-normal"
              onClick={() => setIsSignUp(false)}
            >
              Already have an account? Sign In
            </button>
          </form>
        </div>

        {/* --- Sign In Container --- */}
        <div
          className={`
    absolute top-0 left-0 h-full w-full md:w-1/2
    transition-all duration-[1400ms] ease-in-out transform
    ${
      isSignUp
        ? "translate-x-full opacity-100 z-10 hidden md:block" /* INACTIVE: Slides 100% right, becoming inactive/covered */
        : "translate-x-0 opacity-100 z-20 block md:block" /* ACTIVE SIGN IN: Remains on the left half */
    }
  `}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center h-full px-12 text-center bg-card"
          >
            <h1 className="font-bold text-2xl text-white">Sign in</h1>
            <p className="text-secondaryText text-sm font-light my-5">
              Welcome back! Please login.
            </p>
            {/* ROLE SELECTOR */}

            <input
              className="bg-bg border border-border px-4 py-3 my-2 w-full text-white rounded focus:outline-none focus:border-primary placeholder-muted"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="text-danger text-xs text-left w-full -mt-1 mb-2">
                {errors.email}
              </span>
            )}

            <input
              className="bg-bg border border-border px-4 py-3 my-2 w-full text-white rounded focus:outline-none focus:border-primary placeholder-muted"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-danger text-xs text-left w-full -mt-1 mb-2">
                {errors.password}
              </span>
            )}

            <button
              className="rounded-full border mt-4 border-primary bg-primary text-darkTextOnPrimary text-xs font-bold py-3 px-12 uppercase  transition-transform active:scale-95 hover:bg-primaryHover disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "..." : "Sign In"}
            </button>

            {/* Mobile Toggle Link */}
            <button
              type="button"
              className="md:hidden mt-6 text-primary underline text-sm bg-transparent border-none normal-case font-normal"
              onClick={() => setIsSignUp(true)}
            >
              Don't have an account? Sign Up
            </button>
          </form>
        </div>

        {/* --- Overlay Container (Desktop Only) --- */}
        <div
          className={`hidden md:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-1400 ease-in-out z-100
            ${isSignUp ? "-translate-x-full" : ""}
          `}
        >
          <div
            className={`bg-primary text-white relative -left-full h-full w-[200%] transform transition-transform duration-1400 ease-in-out
              ${isSignUp ? "translate-x-1/2" : "translate-x-0"}
            `}
          >
            {/* Overlay Left (Visible when isSignUp is true) */}
            <div
              className={`absolute top-0 flex flex-col items-center justify-center h-full w-1/2 px-10 text-center transition-transform duration-1400 ease-in-out
                ${isSignUp ? "translate-x-0" : "-translate-x-[20%]"}
              `}
            >
              <h1 className="font-bold text-2xl mb-0">Welcome Back!</h1>
              <p className="text-subtleText text-sm font-light my-5">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="bg-transparent border border-white text-white rounded-full text-xs font-bold py-3 px-12 uppercase tracking-widest transition-transform active:scale-95 focus:outline-none"
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
            </div>

            {/* Overlay Right (Visible when isSignUp is false) */}
            <div
              className={`absolute top-0 right-0 flex flex-col items-center justify-center h-full w-1/2 px-10 text-center transition-transform duration-1400 ease-in-out
                ${isSignUp ? "translate-x-[20%]" : "translate-x-0"}
              `}
            >
              <h1 className="font-bold text-2xl mb-0">Hello, Friend!</h1>
              <p className="text-subtleText text-sm font-light my-5">
                Enter your personal details and start your journey with us
              </p>
              <button
                className="bg-transparent border border-white text-white rounded-full text-xs font-bold py-3 px-12 uppercase tracking-widest transition-transform active:scale-95 focus:outline-none"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
