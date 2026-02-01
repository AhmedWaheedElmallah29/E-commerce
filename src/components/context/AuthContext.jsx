import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  async function login(emailOrUsername, password) {
    try {
      // 1. التفتيش الذاتي: هل اليوزر ده متسجل عندنا محلياً؟
      const savedUser = JSON.parse(localStorage.getItem("user"));

      // لو اليوزر محفوظ، والاسم أو الإيميل متطابق مع اللي مكتوب
      if (
        savedUser &&
        (savedUser.email === emailOrUsername ||
          savedUser.firstName === emailOrUsername)
      ) {
        // هنا بنعمل "محاكاة" إن اللوجين نجح، لأننا عارفين اليوزر ده
        console.log("Local Login Successful");
        setUser(savedUser);
        setToken(savedUser.token);
        return { success: true };
      }

      // 2. لو مش محفوظ عندنا، روح كلم السيرفر (لليوزرز الأصليين زي emilys)
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username: emailOrUsername,
        password: password,
      });

      const userData = res.data;
      setUser(userData);
      setToken(userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);
      return { success: true };
    } catch (err) {
      console.error("login Error ", err);
      throw new Error(err.response?.data?.message || "Invalid credentials");
    }
  }

  async function signup(fullName, email, password) {
    try {
      const res = await axios.post("https://dummyjson.com/users/add", {
        firstName: fullName,
        email: email,
        password: password,
      });
      const fakeUser = {
        id: Date.now(),
        firstName: fullName,
        email: email,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
        token: "fake-jwt-token-for-demo",
      };
      setUser(fakeUser);
      setToken(fakeUser.token);

      localStorage.setItem("user", JSON.stringify(fakeUser));
      localStorage.setItem("token", fakeUser.token);

      return { success: true };
    } catch (error) {
      console.error("Signup Error:", error);
      throw new Error("Failed to create account");
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
