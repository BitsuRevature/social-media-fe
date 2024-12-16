export type AuthContextType = {
    token: string | null;
    id: number | null;
    username: string | null;
    profilePicture: string | null;
    bio: string | null;
    firstname: string | null;
    lastname: string | null;
}

export type LoginType = {
    username: string;
    password: string;
}

export type RegisterType = {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
}

export type PostType = {
    content: string;
    createdAt: string;
    id: number;
    mediaURL: string;
    comments: CommentType[];
    reactions: ReactionType[];
    user: UserType;
}

export type CreatePostType = {
    content: string;
    mediaURL: string;
}

export type CommentType = {
    content: string;
    createdAt: string;
    user: UserType;
    id: number;

}

export type UserType = {
    username: string;
    bio: string;
    profilePicture: string;
    id: number;

}

export type ReactionType = {
    id: number;
    type: string;
    user: UserType;
}

export type UserPIType = {
    firstname: string;
    lastname: string ;
}

export type UserBioType = {
    bio: string;
}

