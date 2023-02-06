import { IPost, ITag, IUser } from "@/type";
import fetchDB from "./fetchDB";
import generateRandomString from "./generateRandomString";

async function getUserByProviderId(provider_id: string) {
  const qs = new URLSearchParams({
    filter: `(provider_id = '${provider_id}')`,
  }).toString();

  const items = await fetchDB(`/collections/users/records?${qs}`).then(
    async (res) => (await res.json()).items as IUser[]
  );
  if (!items.length) return null;

  const user = items[0];
  return user;
}

async function signUp(provider_id: string, display_name: string) {
  const user_name = generateRandomString(12);
  const res = await fetchDB(`/collections/users/records`, {
    method: "POST",
    body: JSON.stringify({
      provider_id,
      display_name,
      user_name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status === 400) return null;

  const user = await res.json();
  return user;
}

// search
async function searchUsersByName(
  name: string,
  cache: RequestCache = "default"
) {
  const qs = new URLSearchParams({
    filter: `(user_name ~ '%${name}%' || display_name ~ '%${name}%')`,
  }).toString();

  const users = await fetchDB(`/collections/users/records?${qs}`, {
    cache,
  }).then(async (res) => (await res.json()).items as IUser[]);

  return users.map((user) => {
    return {
      ...user,
      provider_id: "",
      interested_tag_ids: [],
      updated: "",
    } as IUser;
  });
}

async function searchTagsByQuery(
  query: string,
  cache: RequestCache = "default"
) {
  const qs = new URLSearchParams({
    filter: `(name ~ '%${query}%' || description ~ '%${query}%')`,
  }).toString();

  const tags = await fetchDB(`/collections/tags/records?${qs}`, {
    cache,
  }).then(async (res) => (await res.json()).items as ITag[]);

  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];

    const postsSearchQs = new URLSearchParams({
      filter: `(tag_ids ?= '${tag.id}')`,
    }).toString();
    const postsNum = await fetchDB(
      `/collections/posts/records?${postsSearchQs}`,
      {
        cache,
      }
    ).then(async (res) => (await res.json()).items.length as number);

    tags[i].posts = postsNum;
  }

  return tags;
}

// file
function getDbFileUrl(
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

//profile
async function getProfileById(id: string, cache: RequestCache = "default") {
  const res = await fetchDB(`/collections/users/records/${id}`, {
    cache,
  });
  if (res.status === 404) return null;

  const user = await res.json();
  return {
    ...user,
    provider_id: "",
    updated: "",
    interested_tag_ids: [],
  } as IUser;
}

function getPostsByUserId(user_id: string, cache: RequestCache = "default") {
  const qs = new URLSearchParams({
    filter: `(sent = '${user_id}')`,
    sort: "-created",
  }).toString();

  return fetchDB(`/collections/posts/records?${qs}`, {
    cache,
  }).then(async (res) => (await res.json()).items as IPost[]);
}

async function getFollowersById(id: string, cache: RequestCache = "default") {
  const qs = new URLSearchParams({
    filter: `(following_ids ~ '%${id}%')`,
  }).toString();

  const followers = await fetchDB(`/collections/users/records?${qs}`, {
    cache,
  }).then(async (res) => (await res.json()).items as IUser[]);
  return followers.map((follower) => {
    return {
      ...follower,
      provider_id: "",
      interested_tag_ids: [],
      updated: "",
    } as IUser;
  });
}

async function getProfileByIds(ids: string[], cache: RequestCache = "default") {
  const users: IUser[] = [];

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const user = await fetchDB(`/collections/users/records/${id}`, {
      cache,
    }).then(async (res) => (await res.json()).items as IUser);
    users.push(user);
  }

  return users.map((user) => {
    return {
      ...user,
      provider_id: "",
      interested_tag_ids: [],
      updated: "",
    } as IUser;
  });
}

// follow function
async function followUser(follow_id: string, user: IUser) {
  // find if target exists
  const res = await fetchDB(`/collections/users/records/${follow_id}`);
  if (res.status === 404) return null;

  // fetch
  return fetchDB(`/collections/users/records/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...user,
      following_ids: [...user.following_ids, follow_id],
    } as IUser),
  }).then((res) => {
    if (res.status === 400) return null;

    return res.json() as Promise<IUser>;
  });
}

async function unfollowUser(unfollow_id: string, user: IUser) {
  // not necessary to check if target exist

  // fetch
  return fetchDB(`/collections/users/records/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...user,
      following_ids: user.following_ids.filter((id) => id !== unfollow_id),
    } as IUser),
  }).then((res) => {
    if (res.status === 400) return null;

    return res.json() as Promise<IUser>;
  });
}

export {
  getUserByProviderId,
  signUp,
  searchUsersByName,
  searchTagsByQuery,
  getDbFileUrl,
  getProfileById,
  getPostsByUserId,
  getFollowersById,
  getProfileByIds,
  followUser,
  unfollowUser,
};
