const githubPagesPattern = /^https:\/\/[a-z0-9-]+\.github\.io$/i;
const allowedOrigins = [process.env.FRONTEND_ORIGIN, 'http://localhost:3000'].filter(Boolean);

const corsOptions = {
  // Allow GitHub Pages by default; tighten further via FRONTEND_ORIGIN.
  origin(origin, callback) {
    if (!origin) return callback(null, true); // non-browser or same-origin requests

    if (githubPagesPattern.test(origin)) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);

    // In non-production, stay permissive to avoid blocking local tooling.
    if (process.env.NODE_ENV !== 'production') return callback(null, true);

    return callback(new Error('CORS: Origin not allowed'));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 204
};

module.exports = corsOptions;
