import { PostType, UserType, CommentType } from "../util/types";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import postReducer from "../features/post/postSlice";
import { configureStore } from "@reduxjs/toolkit";
import { checkFileSize } from "../util/helper";
import { ChangeEvent } from "react";

export const mockUser = {
  username: "testuser",
  profilePicture: "",
  bio: "",
  id: 1,
} as UserType;

export const preloadedState = {
  auth: {
    auth: {
      token: null,
      ...mockUser,
      firstname: "test",
      lastname: "testerson",
      exipreDate: undefined,
    },
    isLoading: false
  },
};

export const testStore = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer
  },
  preloadedState,
});

export const mockPost = {
  content: "mock post content",
  createdAt: Date.now().toString(),
  id: 9999,
  mediaURL: "",
  comments: [],
  reactions: [],
  user: mockUser,
} as PostType;

export const mockComment = {
  content: "test comment",
  createdAt: Date.now().toString(),
  user: mockUser,
  id: 9999,
} as CommentType;

export function mockHandleFileChange(event: ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];
  if (file) {
    try {
      checkFileSize(file);
      const reader = new FileReader();

      // Read the file as a data URL
      reader.onloadend = () => {
        console.log('done "uploading"'); // remove upload functionality for testing
      };
      // Read the file
      reader.readAsDataURL(file);
    } catch (e) {
      console.error(e);
    }
  }
}
