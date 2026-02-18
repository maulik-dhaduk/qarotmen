import { useEffect, useState } from "react";
import Api from "../Services/Api";
import { useNavigate } from "react-router-dom";

export default function Signin({ switchToRegister }) {

  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};

    if (!form.email) errors.email = "Email is required";
    if (!form.password) errors.password = "Password is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await Api.post("/login", form);
      localStorage.setItem("token", res.data.token);

      document.getElementById("authModal").classList.remove("show", "d-block");
      document.querySelectorAll(".modal-backdrop").forEach(el => el.classList.remove("modal-backdrop"));

      navigate("/", { state: { loginSuccess: true } });


    } catch (err) {
      setErrors({ api: err.response?.data.message || "Server error" });
    }
  };

  useEffect(() => {
    const modal = document.getElementById("authModal");
    const handleClose = () => {
      setForm({ email: "", password: "" });
      setErrors({});
    };

    modal.addEventListener("hidden.bs.modal", handleClose);

    return () => {
      modal.removeEventListener("hidden.bs.modal", handleClose);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {errors.api && <div className="alert alert-danger">{errors.api}</div>}

      <div className="mb-3">
        <label className="form-label fs-5">Email</label>
        <input type="email" className="form-control border-dark shadow-none" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} />
        {errors.email && <small className="text-danger">{errors.email}</small>}
      </div>

      <div className="mb-3">
        <label className="form-label fs-5">Password</label>
        <input type="password" className="form-control border-dark shadow-none" name="password" placeholder="Enter your password" value={form.password} onChange={handleChange} />
        {errors.password && <small className="text-danger">{errors.password}</small>}
      </div>

      <button type="submit" className="btn btn-dark w-100">Login</button>

      <p className="text-center mt-3">
        Don’t have an account?
        <span className="fw-semibold ms-1" style={{ cursor: "pointer" }} onClick={switchToRegister}>
          Register
        </span>
      </p>
    </form>
  );
}