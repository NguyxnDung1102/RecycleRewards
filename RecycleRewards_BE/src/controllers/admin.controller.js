import { submissions, updateSubmission } from '../models/submission.model.js';

export function listSubmissions(req, res) {
  const { status } = req.query;
  res.json([...submissions].filter((item) => !status || item.status === status).sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)));
}

export function reviewSubmission(req, res) {
  const { status, feedback } = req.body;
  if (!['approved', 'rejected'].includes(status)) return res.status(400).json({ message: 'Trạng thái duyệt không hợp lệ.' });
  if (status === 'rejected' && !String(feedback || '').trim()) return res.status(400).json({ message: 'Cần nhập lý do từ chối.' });
  const item = updateSubmission(req.params.id, { status, feedback: status === 'rejected' ? String(feedback).trim() : undefined, points: status === 'approved' ? 5 : 0 });
  if (!item) return res.status(404).json({ message: 'Không tìm thấy bài nộp.' });
  res.json(item);
}
