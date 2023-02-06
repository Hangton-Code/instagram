let token: string = "";

async function getDBToken() {
  if (token) return token;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/admins/auth-with-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identity: process.env.DB_EMAIL,
        password: process.env.DB_PASSWORD,
      }),
    }
  ).then((res) => res.json());
  token = res.token as string;
  return token;
}

async function fetchDB(url: string, options?: RequestInit) {
  return await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/api${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: await getDBToken(),
    },
  });
}

export default fetchDB;
