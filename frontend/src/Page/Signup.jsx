import { useState } from "react";
import Api from "../Services/Api";

export default function Signup({ switchToLogin }) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errs = {};

    if (!form.email) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Invalid email format";
    }

    if (!form.password) {
      errs.password = "Password is required";
    } else if (!passwordRegex.test(form.password)) {
      errs.password =
        "Password must contain uppercase, lowercase, number & special character (min 8 chars)";
    }

    if (!form.firstname) {
      errs.firstname = "First name is required";
    }

    if (!form.lastname) {
      errs.lastname = "Last name is required";
    }

    if (!form.role) {
      errs.role = "Please select a role";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await Api.post("/register", form);
      switchToLogin();
    } catch (err) {
      setErrors({
        api: err.response?.data.message || "Server error"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.api && <div className="alert alert-danger">{errors.api}</div>}

      <div className="row">
        <div className="col-12 col-sm-6 mb-3">
          <input className="form-control border-dark shadow-none" name="email" placeholder="Email*" value={form.email || ""} onChange={handleChange} />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        <div className="col-12 col-sm-6 mb-3">
          <input type="password" className="form-control border-dark shadow-none" name="password" placeholder="Password*" value={form.password || ""} onChange={handleChange}/>
          {errors.password && <small className="text-danger">{errors.password}</small>}
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-sm-6 mb-3">
          <input className="form-control border-dark shadow-none" name="firstname" placeholder="First Name*" value={form.firstname || ""} onChange={handleChange}/>
          {errors.firstname && <small className="text-danger">{errors.firstname}</small>}
        </div>
        <div className="col-12 col-sm-6 mb-3">
          <input className="form-control border-dark shadow-none" name="lastname" placeholder="Last Name*" value={form.lastname || ""} onChange={handleChange}/>
          {errors.lastname && <small className="text-danger">{errors.lastname}</small>}
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-sm-6 mb-3">
          <select className="form-select border-dark shadow-none" name="role" value={form.role || ""} onChange={handleChange}>
            <option value="">Select Type</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {errors.role && <small className="text-danger">{errors.role}</small>}
        </div>
      </div>

      <button className="btn btn-dark w-100">Register</button>

      <p className="text-center mt-3">
        Already have an account?
        <span className="fw-semibold ms-1" style={{ cursor: "pointer" }} onClick={switchToLogin}>Login</span>
      </p>
    </form>
  );
}
