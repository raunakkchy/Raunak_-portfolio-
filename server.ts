import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.ADMIN_AUTH_SECRET || 'raunak_portfolio_super_secret_jwt_key_2026';
const ADMIN_USER = process.env.ADMIN_USERNAME || 'raunakkchy@gmail.com';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'Raunak@477';

const DATA_FILE = path.join(__dirname, 'data', 'cms-data.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

// Authentication middleware
const authenticateToken = (req: Request, res: Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access denied. No authentication token provided.' });
    return;
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    (req as any).user = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token.' });
    return;
  }
};

// API Routes

// 1. Admin Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Accept configured ADMIN_USER/PASS or raunakkchy@gmail.com / Raunak@477 or admin / admin123
  const isUserValid =
    (username === ADMIN_USER && password === ADMIN_PASS) ||
    (username === 'raunakkchy@gmail.com' && password === 'Raunak@477') ||
    (username === 'admin' && password === 'admin123');

  if (isUserValid) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, message: 'Authentication successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials. Please check username and password.' });
  }
});

// 2. Get CMS Data (Public)
app.get('/api/cms/data', (req: Request, res: Response) => {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const fileData = fs.readFileSync(DATA_FILE, 'utf-8');
      res.json(JSON.parse(fileData));
      return;
    } catch (e) {
      console.error('Error reading cms-data.json:', e);
    }
  }
  res.status(404).json({ message: 'Data file not initialized yet' });
});

// 3. Save CMS Data (Protected)
app.post('/api/cms/data', authenticateToken, (req: Request, res: Response) => {
  try {
    const cmsData = req.body;
    fs.writeFileSync(DATA_FILE, JSON.stringify(cmsData, null, 2), 'utf-8');
    res.json({ success: true, message: 'CMS data updated successfully' });
  } catch (e: any) {
    res.status(500).json({ success: false, message: 'Failed to write CMS data', error: e.message });
  }
});

// Mount Vite in development or serve static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
