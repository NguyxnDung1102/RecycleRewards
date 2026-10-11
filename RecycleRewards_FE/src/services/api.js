const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function request(path, { method = 'GET', body, role } = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(role ? { 'x-demo-role': role } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Không thể kết nối máy chủ.');
  return data;
}
