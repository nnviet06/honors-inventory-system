/**
 * Express Server Entry Point
 * Initializes Express application with CORS middleware and JSON parsing.
 * Mounts all API routes under /api prefix and starts server on port 5000.
 */

import express from 'express';
import cors from 'cors';
import equipmentRoutes from './routes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', equipmentRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Honors Inventory API is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});