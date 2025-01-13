import axios from "../config/axiosConfig.ts";
import { UserBioType, UserPIType, UserProfileType, UserType, FriendRequestType } from "./types";

export async function changePIInfo(data: UserPIType) {
  try {
    await axios.put("/users/PI", data);
  } catch (error) {
    throw error;
  }
}

export async function changeBio(data: UserBioType) {
  try {
    await axios.put("/users/bio", data);
  } catch (error) {
    throw error;
  }
}

export async function changeProfilePic(data: string) {
  try {
    await axios.put("/users/profilePic", { profilePicture: data });
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers(search: string): Promise<UserType[]>{
    try {
        const response = await axios.get(`/users?search=${search}`)
        console.info("==============API HELPER=============== ALL ")
        console.info(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserFollowing(search: string): Promise<UserType[]> {
    try {
        const response = await axios.get(`/users/following?search=${search}`)
        console.info("==============API HELPER=============== USER")
        console.info(response.data);
        
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getUserFollowers(search: string): Promise<UserType[]> {
    try {
        const response = await axios.get(`/users/followers?search=${search}`)
        console.info("==============API HELPER=============== USER")
        console.info(response.data);
        
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function unFollow(id: number){
    try{
        await axios.delete(`/users/following/${id}`)
    }catch(error){
        throw error;
    }
}

export async function follow(id: number) {
  try {
    await axios.post(`/users/following/${id}`);
  } catch (error) {
    throw error;
  }
}

export async function getUserDetails(username: String): Promise<UserProfileType> {
  try {
    const response = await axios.get(`/users/${username}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Send a friend request
export async function sendFriendRequest(id: number) {
  await axios.post(`/friends/${id}`);
}

// Accept a friend request
export async function acceptFriendRequest(requestId: number) {
  await axios.put(`/friends/requests/accept/${requestId}`);
}

// Decline a friend request
export async function declineFriendRequest(requestId: number) {
  await axios.put(`/friends/requests/decline/${requestId}`);
}

// Unfriend a user
export async function unfriend(id: number) {
  await axios.delete(`/friends/${id}`);
}

// Get list of friends
export async function getFriends(): Promise<UserType[]> {
  const response = await axios.get(`/friends`);
  return response.data;
}

// Get pending friend requests
export async function getFriendRequests(): Promise<UserType[]> {
  const response = await axios.get(`/friends/requests`);
  return response.data;
}

// Check if a user is a friend
export async function checkIsFriend(userId: number): Promise<boolean> {
  const response = await axios.get(`/friends/is-friend/${userId}`);
  return response.data;
}
export async function checkIsFriendRequest(userId: number, status: string): Promise<boolean> {
  const response = await axios.get(`/friends/is-friend-request/${userId}/${status}`);
  return response.data;
}

