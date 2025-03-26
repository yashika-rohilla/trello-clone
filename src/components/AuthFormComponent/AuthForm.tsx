import "./AuthForm.css";
import { useNavigate } from "react-router-dom";
import trelloLogo from "../../assets/images/trelloLogo.png";
import { useState } from "react";

interface AuthFormProps {
  type: "login" | "register";
}

interface FormData {
  username?: string;
  email: string;
  password: string;
}

const AuthForm = ({ type }: AuthFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (property: keyof FormData, value: string) => {
    setFormData({ ...formData, [property]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [property]: "" }));
  };

  const validateForm = (): boolean => {
    let newErrors: Partial<FormData> = {};
    if (type === "register" && !formData.username?.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Must include uppercase, lowercase, digit & special character";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if (type === "register") {
      if (users.some((user: FormData) => user.username === formData.username)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "Username already exists",
        }));
        return;
      }
      if (users.some((user: FormData) => user.email === formData.email)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email already exists",
        }));
        return;
      }
      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.removeItem("lastActive");
      alert("Registration Successful! Please login.");
      navigate("/login");
    } else {
      const user = users.find((u: FormData) => u.email === formData.email);
      if (!user || user.password !== formData.password) {
        setErrors({
          email: "",
          password: "Invalid credentials",
        });
        return;
      }

      // ✅ Store logged-in user details in localStorage
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ email: user.email, password: user.password })
      );

      alert("Login Successful!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={trelloLogo} alt="Trello Logo" className="logo" />
        <h2 className="headingh2">
          {type === "login" ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="subline">
          {type === "login" ? "Sign in to continue" : "Register to continue"}
        </p>

        <form onSubmit={handleSubmit}>
          {type === "register" && (
            <div className="input-group">
              <input
                className="inputfields"
                type="text"
                placeholder="Enter username"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
              />
              {errors.username && (
                <p className="error-msg">{errors.username}</p>
              )}
            </div>
          )}

          <div className="input-group">
            <input
              className="inputfields"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>

          <div className="input-group">
            <input
              className="inputfields"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {errors.password && <p className="error-msg">{errors.password}</p>}
          </div>

          <button className="btn" type="submit">
            {type === "login" ? "Login" : "Register"}
          </button>

          <p className="auth-link mt-2">
            {type === "login" ? "New User? " : "Already have an account? "}
            <span
              onClick={() =>
                navigate(type === "login" ? "/register" : "/login")
              }
              className="link">
              {type === "login" ? "Click here to register" : "Login here"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
