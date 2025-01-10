import axios from "../config/axiosConfig.ts";
import { PagedUserType, UserBioType, UserPIType, UserProfileType, UserType } from "./types";

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
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
}
