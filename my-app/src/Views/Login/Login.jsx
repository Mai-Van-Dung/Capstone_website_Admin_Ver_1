import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      navigate("/homepage");
    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-200 p-6">
      <div
        className="flex rounded-2xl bg-gradient-to-b from-pink-500 via-pink-400 to-orange-400 shadow-lg max-w-4xl w-full p-6 sm:p-10"
        style={{ borderRadius: '1rem' }}
      >
        <div
          className="relative flex-shrink-0 rounded-2xl overflow-hidden max-w-[280px] w-full"
          style={{ borderRadius: '1rem' }}
        >
          <img
            alt="3D person floating with laptop and geometric shapes on pink to orange gradient background"
            className="w-full h-full object-cover"
            height="480"
            src="https://storage.googleapis.com/a1aa/image/6d0ce27c-31ce-4e45-deba-502285baba3e.jpg"
            width="280"
          />
        </div>

        <div className="flex flex-col flex-grow ml-8 justify-center max-w-lg w-full">
          <h2 className="text-3xl text-black font-bold mb-6">
            Welcome back to
            <br />
            <span className="text-4xl text-cyan-400 ml-35">Dashboard</span>
          </h2>

          <div className="grid grid-cols-2 gap-4 justify-center items-center mb-4 max-w-md w-full">
          </div>


          <form className="space-y-4 max-w-md w-full" onSubmit={handleLogin}>
            <div className="relative">
              <input
                className="w-full rounded-lg border-2 border-black bg-pink-200 px-4 py-3 text-sm tracking-widest placeholder-black focus:outline-none shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
                placeholder="E m a i l"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i
                aria-hidden="true"
                className="fas fa-envelope absolute right-4 top-1/2 -translate-y-1/2 text-black text-lg pointer-events-none"
              />
            </div>

            <div className="relative">
              <input
                className="w-full rounded-lg border-2 border-black bg-pink-200 px-4 py-3 text-sm tracking-widest placeholder-black focus:outline-none shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
                placeholder="P a s s w o r d"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                aria-hidden="true"
                className="fas fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-black text-lg pointer-events-none"
              />
            </div>

            <p className="text-xs text-black">
              Don't have account sign up ,
              <a className="text-sm text-pink-600 hover:underline" href="/signup"> Here</a>
            </p>

            <div className="flex justify-end">
              <button
                className="mt-4 max-w-[160px] rounded-lg border-2 border-black bg-pink-200 px-6 py-3 text-sm tracking-widest shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:bg-pink-100"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;