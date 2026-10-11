import { adminProfile, studentProfile } from '../models/user.model.js';

export function login(req, res) {
  const { role = 'student', studentId } = req.body;
  if (!['student', 'admin'].includes(role)) return res.status(400).json({ message: 'Vai trò không hợp lệ.' });
  const base = role === 'admin' ? adminProfile : studentProfile;
  const user = { ...base, studentId: String(studentId || base.studentId).trim() || base.studentId };
  res.json({ token: `mock-${role}-token`, user });
}
