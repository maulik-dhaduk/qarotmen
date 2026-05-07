import { useEffect, useState } from "react";
import Api from "../Services/Api";
import { useNavigate } from "react-router-dom";

export default function Signin({ switchToRegister, onLoginSuccess }) {

  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [view, setView] = useState("login");
  const [resetData, setResetData] = useState({ email: "", otp: "", newPassword: "" });
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  const handleResetChange = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!resetData.email) return setErrors({ email: "Email is required" });
    setIsSubmitting(true);
    try {
      await Api.post("/send-otp", { email: resetData.email });
      setView("otp");
      setErrors({});
    } catch (err) {
      setErrors({ api: err.response?.data?.message || "Failed to send OTP" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!resetData.otp) return setErrors({ otp: "OTP is required" });
    setIsSubmitting(true);
    try {
      await Api.post("/verify-otp", { email: resetData.email, otp: resetData.otp });
      setView("reset");
      setErrors({});
    } catch (err) {
      setErrors({ api: err.response?.data?.message || "Invalid or expired OTP" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resetData.newPassword) {
      return setErrors({ newPassword: "Password is required" });
    } else if (!passwordRegex.test(resetData.newPassword)) {
      return setErrors({ newPassword: "Password must contain uppercase, lowercase, number & special character (min 8 chars)" });
    }
    setIsSubmitting(true);
    try {
      await Api.post("/reset-password", { email: resetData.email, otp: resetData.otp, newPassword: resetData.newPassword });
      setView("login");
      setResetData({ email: "", otp: "", newPassword: "" });
      setErrors({ api: "Password reset successfully. You can now login." });
    } catch (err) {
      setErrors({ api: err.response?.data?.message || "Failed to reset password" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeAuthModal = () => {
    const closeBtn = document.querySelector("#authModal .btn-close");
    if (closeBtn) {
      closeBtn.click();
    } else {
      const modal = document.getElementById("authModal");
      if (!modal) return;
      modal.classList.remove("show", "d-block");
      document.body.classList.remove("modal-open");
      document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
    }
  };

  const openAuthModal = () => {
    const modal = document.getElementById("authModal");
    if (!modal) return;
    modal.classList.add("show", "d-block");
    document.body.classList.add("modal-open");

    const existingBackdrop = document.querySelector(".modal-backdrop");
    if (!existingBackdrop) {
      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop fade show";
      document.body.appendChild(backdrop);
    }
  };

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
    if (isSubmitting) return;
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const res = await Api.post("/login", form);
      localStorage.setItem("token", res.data.token);
      if (onLoginSuccess) onLoginSuccess();
      closeAuthModal();
      navigate("/", { state: { loginSuccess: true } });
    } catch (err) {
      setErrors({ api: err.response?.data.message || "Server error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const modal = document.getElementById("authModal");
    const handleClose = () => {
      setForm({ email: "", password: "" });
      setResetData({ email: "", otp: "", newPassword: "" });
      setErrors({});
      setView("login");
    };

    modal.addEventListener("hidden.bs.modal", handleClose);

    return () => {
      modal.removeEventListener("hidden.bs.modal", handleClose);
    };
  }, []);

  if (view === "email") {
    return (
      <form onSubmit={handleSendOtp}>
        {errors.api && <div className="alert alert-danger">{errors.api}</div>}
        {errors.api === "Password reset successfully. You can now login." && <div className="alert alert-success">{errors.api}</div>}
        <div className="mb-3">
          <label className="form-label fs-5">Email</label>
          <input type="email" className="form-control border-dark shadow-none" name="email" placeholder="Enter your email" value={resetData.email} onChange={handleResetChange} />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>
        <button type="submit" className="btn btn-dark w-100" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send OTP"}
        </button>
        <p className="text-center mt-3">
          <span className="fw-semibold" style={{ cursor: "pointer" }} onClick={() => { setView("login"); setErrors({}); }}>Back to Login</span>
        </p>
      </form>
    );
  }

  if (view === "otp") {
    return (
      <form onSubmit={handleVerifyOtp}>
        {errors.api && <div className="alert alert-danger">{errors.api}</div>}
        <div className="mb-3">
          <label className="form-label fs-5">Enter OTP</label>
          <input type="text" className="form-control border-dark shadow-none" name="otp" placeholder="Enter OTP" value={resetData.otp} onChange={handleResetChange} />
          {errors.otp && <small className="text-danger">{errors.otp}</small>}
        </div>
        <button type="submit" className="btn btn-dark w-100" disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    );
  }

  if (view === "reset") {
    return (
      <form onSubmit={handleResetPassword}>
        {errors.api && <div className="alert alert-danger">{errors.api}</div>}
        <div className="mb-3">
          <label className="form-label fs-5">New Password</label>
          <input type="password" className="form-control border-dark shadow-none" name="newPassword" placeholder="Enter new password" value={resetData.newPassword} onChange={handleResetChange} />
          {errors.newPassword && <small className="text-danger">{errors.newPassword}</small>}
        </div>
        <button type="submit" className="btn btn-dark w-100" disabled={isSubmitting}>
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {errors.api && errors.api !== "Password reset successfully. You can now login." && <div className="alert alert-danger">{errors.api}</div>}
      {errors.api === "Password reset successfully. You can now login." && <div className="alert alert-success">{errors.api}</div>}

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
      
      <div className="mb-3 d-flex justify-content-end">
        <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => { setView("email"); setErrors({}); }}>Forgot Password?</span>
      </div>

      <button type="submit" className="btn btn-dark w-100" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      <p className="text-center mt-3">
        Don’t have an account?
        <span className="fw-semibold ms-1" style={{ cursor: "pointer" }} onClick={switchToRegister}>
          Register
        </span>
      </p>
    </form>
  );
}
