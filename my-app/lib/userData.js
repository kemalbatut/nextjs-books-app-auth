import { getToken } from "./authenticate";

async function request(url, method = "GET") {
  // Check if token exists before sending
  const token = getToken();
  if (!token) {
    console.error("NO TOKEN FOUND"); 
    return [];
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${url}`, {
    method: method,
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${token}` // <--- CHANGE THIS WORD TO "Bearer"
    },
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    console.error(`API Error: ${res.status}`);
    return [];
  }
}

export async function addToFavourites(id) {
  return await request(id, "PUT");
}

export async function removeFromFavourites(id) {
  return await request(id, "DELETE");
}

export async function getFavourites() {
  return await request(""); 
}