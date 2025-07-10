// /backend/utils/setCookies.js

const isProduction = process.env.NODE_ENV === "production";

export const setCookies = (res, accessToken, refreshToken) => {
  console.log("Setting cookies", { accessToken, refreshToken, env: process.env.NODE_ENV });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction, // 🔁 false in dev
    sameSite: isProduction ? "None" : "Lax", // 🔁 Lax in dev
    maxAge: 1000 * 60 * 15,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};


