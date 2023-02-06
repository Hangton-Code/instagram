"use client";

function getDbFileUrlInClient(
  collection_name: string,
  record_id: string,
  filename: string,
  thumb?: string
) {
  return `${
    process.env.NEXT_PUBLIC_DB_URL
  }/api/files/${collection_name}/${record_id}/${filename}${
    thumb ? `?thumb=${thumb}` : ""
  }`;
}

export default getDbFileUrlInClient;
