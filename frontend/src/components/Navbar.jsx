import { Link, useNavigate } from "react-router";
import { PlusIcon, UserIcon, MenuIcon, XIcon } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, login, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/auth/login" : "/auth/register";

    try {
      const res = await axios.post(endpoint, form);
      login(res.data.token, res.data.user);
      toast.success(`${isLogin ? "Login" : "Register"} successful!`);
      document.getElementById("auth_modal").close();
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Authentication failed");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out!");
    setMobileMenuOpen(false);
  };

  const handleNewNoteClick = () => {
    if (!isAuthenticated) {
      toast("Please login first to create a note.");
      document.getElementById("auth_modal").showModal();
      return;
    }
    navigate("/create");
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo & Greeting */}
          <div>
            <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
              NoteVader
            </h1>
            {isAuthenticated && (
              <p className="text-sm font-medium text-base-content/80 mt-1">
                Hi, {user?.username} 👋
              </p>
            )}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden sm:flex gap-3 items-center">
            <button onClick={handleNewNoteClick} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </button>

            {isAuthenticated ? (
              <button
                className="btn btn-outline min-w-[8rem] flex items-center gap-2"
                onClick={handleLogout}
              >
                <UserIcon className="size-4" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                className="btn btn-outline"
                onClick={() => document.getElementById("auth_modal").showModal()}
              >
                Login / Signup
              </button>
            )}
          </div>

          {/* Hamburger Toggle */}
          <div className="sm:hidden">
            <button
              className="btn btn-ghost"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 space-y-2">
            <button
              onClick={handleNewNoteClick}
              className="btn btn-primary w-full flex items-center gap-2"
            >
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </button>

            {isAuthenticated ? (
              <button
                className="btn btn-outline w-full flex items-center gap-2"
                onClick={handleLogout}
              >
                <UserIcon className="size-4" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                className="btn btn-outline w-full"
                onClick={() => {
                  document.getElementById("auth_modal").showModal();
                  setMobileMenuOpen(false);
                }}
              >
                Login / Signup
              </button>
            )}
          </div>
        )}
      </div>

      {/* DaisyUI Modal for Auth */}
      <dialog id="auth_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {isLogin ? "Login to NoteVader" : "Register on NoteVader"}
          </h3>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered w-full"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button type="submit" className="btn btn-primary w-full">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <div className="mt-4 text-sm text-center">
            {isLogin ? (
              <p>
                Don&apos;t have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  Register here
                </span>
              </p>
            ) : (
              <p>
                Already registered?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setIsLogin(true)}
                >
                  Login instead
                </span>
              </p>
            )}
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </header>
  );
};

export default Navbar;
