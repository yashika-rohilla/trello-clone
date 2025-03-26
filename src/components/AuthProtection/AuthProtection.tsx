import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SESSION_TIMEOUT = 60000;

const AuthProtection = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [lastActive, setLastActive] = useState(Date.now());

  const resetTimer = () => {
    setLastActive(Date.now());
    localStorage.setItem("lastActive", Date.now().toString());
  };

  const checkTimeout = () => {
    const lastActiveTime = parseInt(
      localStorage.getItem("lastActive") || "0",
      10
    );
    if (Date.now() - lastActiveTime > SESSION_TIMEOUT) {
      localStorage.removeItem("loggedInUser");
      navigate("/login");
    }
  };

  const validateUser = () => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser") || "null"
    );
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    const isValidUser = users.some(
      (user: { email: string; password: string }) =>
        user.email === loggedInUser.email &&
        user.password === loggedInUser.password
    );

    if (!isValidUser) {
      localStorage.removeItem("loggedInUser");
      navigate("/login");
    }
  };

  useEffect(() => {
    validateUser();
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(checkTimeout, 1000);

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [lastActive]);

  return <>{children}</>;
};

export default AuthProtection;
