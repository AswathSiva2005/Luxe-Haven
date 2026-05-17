export async function loginAdmin(identifier, password) {
  const response = await fetch('/api/admin-login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifier, password }),
  })

  const result = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(result?.error || 'Admin login failed.')
  }

  return result.admin
}
