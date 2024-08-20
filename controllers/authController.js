const passport = require('passport');
const jwt = require('jsonwebtoken');

// GET /auth/google
exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// GET /auth/google/callback
exports.googleAuthCallback = (req, res) => {
    passport.authenticate('google', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.redirect('http://localhost:3000/login?error=authentication_failed');
        }

        // Generate a JWT with the user's information
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                name: user.name,
            },
            process.env.JWT_SECRET, // Make sure you have a secret key in your environment variables
            { expiresIn: '1h' } // Token will expire in 1 hour
        );

        // Redirect to React app with the token
        res.redirect(`http://localhost:3000/login?token=${token}`);
    })(req, res);
};

// GET /auth/logout
exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
};
