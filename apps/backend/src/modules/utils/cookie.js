export const setTokenCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('token', token, {
    httpOnly: true,
    secure: isProduction, // only true in production
    sameSite: isProduction ? 'none' : 'lax', // allow cookies to be sent from frontend
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};