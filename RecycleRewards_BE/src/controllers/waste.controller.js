import { createSubmission, submissions } from '../models/submission.model.js';

export function listMine(req, res) {
  const { studentId } = req.query;
  res.json(submissions.filter((item) => !studentId || item.studentId === studentId));
}

export function studentDashboard(req, res) {
  const items = submissions.filter((item) => item.studentId === req.params.studentId);
  const approved = items.filter((item) => item.status === 'approved');
  res.json({
    totalPoints: approved.reduce((total, item) => total + item.points, 0),
    totalSubmissions: items.length,
    approvedCount: approved.length,
    pendingCount: items.filter((item) => item.status === 'pending').length,
    recent: [...items].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)).slice(0, 4),
  });
}

export function submitWaste(req, res) {
  const { studentName, studentId, wasteType, confidence, imageDataUrl } = req.body;
  if (!studentName || !studentId || !wasteType) return res.status(400).json({ message: 'Thiếu thông tin vật phẩm.' });
  res.status(201).json(createSubmission({ studentName, studentId, wasteType, confidence: Number(confidence) || 88, imageDataUrl }));
}
