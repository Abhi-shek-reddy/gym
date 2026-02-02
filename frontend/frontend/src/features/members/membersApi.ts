// --------------------------------------------------
// membersApi.ts 📞
// --------------------------------------------------
//
// STORY:
// This file is the COMMUNICATION LAYER
// between Frontend and Backend for MEMBERS.
//
// UI says:
// "Hey, I need members data"
//
// This file says:
// "Okay, I will call the backend and bring it"
//
// UI does NOT care about URLs, headers, tokens.
// All of that is handled here.
// --------------------------------------------------

const BASE_URL = "http://127.0.0.1:8000";

// GET MEMBERS
export async function getMembers(token: string) {
  return fetch(`${BASE_URL}/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.json());
}

// ADD MEMBER
export async function addMember(token: string, data: any) {
  return fetch(`${BASE_URL}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

// UPDATE MEMBER ✏️
export async function updateMember(
  token: string,
  memberId: number,
  data: any
) {
  return fetch(`${BASE_URL}/members/${memberId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

// DELETE MEMBER 🗑️
export async function deleteMember(token: string, memberId: number) {
  return fetch(`${BASE_URL}/members/${memberId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.json());
}
