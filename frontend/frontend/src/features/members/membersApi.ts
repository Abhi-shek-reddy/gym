// --------------------------------------------------
// membersApi.ts 🔌
// --------------------------------------------------

export async function getMembers(token: string) {
  return fetch("http://127.0.0.1:8000/members", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.json());
}

export async function addMember(token: string, data: any) {
  return fetch("http://127.0.0.1:8000/members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
}
