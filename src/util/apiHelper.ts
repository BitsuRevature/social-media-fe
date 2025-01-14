import axios from "../config/axiosConfig.ts";
import { UserBioType, UserPIType, UserProfileType, UserType,PagedUserType} from "./types";

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

export async function getAllUsers(search: string, page: number, size: number): Promise<PagedUserType> {
  try {
    const response = await axios.get(`/users?search=${search}&page=${page}&size=${size}`)
    console.info("==============API HELPER=============== ALL ")
    console.info(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserFollowing(search: string, page: number, size: number): Promise<PagedUserType> {
  try {
    const response = await axios.get(`/users/following?search=${search}&page=${page}&size=${size}`)
    console.info("==============API HELPER=============== USER")
    console.info(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserFollowers(search: string, page: number, size: number): Promise<PagedUserType> {
  try {
    const response = await axios.get(`/users/followers?search=${search}&page=${page}&size=${size}`)
    console.info("==============API HELPER=============== USER")
    console.info(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function unFollow(id: number) {
  try {
    await axios.delete(`/users/following/${id}`)
  } catch (error) {
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
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Send a friend request
export async function sendFriendRequest(id: number) {
  try {
    await axios.post(`/friends/${id}`);
  } catch (error) {
    throw error;
  }
}

export async function acceptFriendRequest(requestId: number) {
  try {
    await axios.put(`/friends/requests/accept/${requestId}`);
  } catch (error) {
    throw error;
  }
}

export async function declineFriendRequest(requestId: number) {
  try {
    await axios.put(`/friends/requests/decline/${requestId}`);
  } catch (error) {
    throw error;
  }
}

export async function unfriend(id: number) {
  try {
    await axios.delete(`/friends/${id}`);
  } catch (error) {
    throw error;
  }
}

export async function getFriends(): Promise<UserType[]> {
  try {
    const response = await axios.get(`/friends`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getFriendRequests(): Promise<UserType[]> {
  try {
    const response = await axios.get(`/friends/requests`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function checkIsFriend(userId: number): Promise<boolean> {
  try {
    const response = await axios.get(`/friends/is-friend/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function checkIsFriendRequest(userId: number, status: string): Promise<boolean> {
  try {
    const response = await axios.get(`/friends/is-friend-request/${userId}/${status}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function checkSentFriendRequest(userId: number, status: string): Promise<boolean> {
  try {
    const response = await axios.get(`/friends/sent-friend-request/${userId}/${status}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function checkIfFollowing(id: number): Promise<boolean>{
  try {
    const res = await axios.get(`/users/following/check/${id}`)
    return res.data;
  } catch(error) {
    throw error;
  }
}
