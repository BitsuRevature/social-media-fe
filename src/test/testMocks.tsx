import { PostType, UserType } from '../util/types';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

export const preloadedState = {
    auth: {
      auth: {
        token: null,
        id: null,
        username: null,
        profilePicture: null,
        bio: null,
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
  
export const mockUser = {} as UserType;
  
export const mockPost = {
      content: "mock post content",
      createdAt: Date.now().toString(),
      id: 9999,
      mediaURL: "",
      comments: [],
      reactions: [],
      user: mockUser
  } as PostType;

