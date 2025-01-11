import { PostType, UserType, CommentType } from '../util/types';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

export const mockUser = {
  username: 'testuser',
  profilePicture: "",
  bio: "",
  id: 9999
} as UserType;

export const preloadedState = {
    auth: {
      auth: {
        token: null,
        ...mockUser,
        firstname: "test",
        lastname:  "testerson",
        exipreDate: undefined
      },
      isLoading: false, 
    },
  };
  
export const testStore = configureStore({
    reducer: {
      auth: authReducer,
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
      user: mockUser
  } as PostType;

export const mockComment = {
  content: "test comment",
  createdAt: Date.now().toString(),
  user: mockUser,
  id: 9999
} as CommentType;
