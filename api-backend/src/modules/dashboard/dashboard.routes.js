import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { getDashboardStatsService } from './dashboard.service.js';

export const dashboardRoutes = Router();

dashboardRoutes.get('/', asyncHandler(async (req, res) => {
  const stats = await getDashboardStatsService();
  res.json(stats);
}));
