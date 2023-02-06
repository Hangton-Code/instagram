interface IUser {
  id: string;
  avatar: string;
  user_name: string;
  display_name: string;
  provider_id: string;
  following_ids: string[];
  interested_tag_ids: string[];
  created: string;
  updated: string;
}

interface IPost {
  id: string;
  image?: string;
  content: string;
  liked_by_ids: string[];
  tag_ids: string[];
  created: string;
  updated: string;
}

interface ITag {
  id: string;
  name: string;
  description: string;
  created: string;
  updated: string;
  // just for client reference
  posts: number;
}

export type { IUser, IPost, ITag };
