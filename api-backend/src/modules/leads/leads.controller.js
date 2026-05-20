import { asyncHandler } from '../../utils/async-handler.js';
import { streamCsv } from '../../utils/csv.js';
import {
  createLeadService,
  listLeadsService,
  exportLeadsService,
  getLeadSourcesService,
} from './leads.service.js';

export const createLead = asyncHandler(async (req, res) => {
  await createLeadService(req.body, req);
  res.status(201).json({ message: 'Thank you for contacting us. We will be in touch soon.' });
});

export const listLeads = asyncHandler(async (req, res) => {
  const result = await listLeadsService(req.query);
  res.json(result);
});

export const exportLeads = asyncHandler(async (req, res) => {
  const rows = await exportLeadsService(req.query);
  streamCsv(res, rows, `leads-${new Date().toISOString().split('T')[0]}.csv`);
});

export const getLeadSources = asyncHandler(async (req, res) => {
  const sources = await getLeadSourcesService();
  res.json(sources);
});
