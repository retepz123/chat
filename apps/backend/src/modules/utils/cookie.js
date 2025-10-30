export const setTokenCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // allow to cross-origin in localhost
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};
