"use server";

import { cookies } from "next/headers";
import axiosInstance from "@/config/axios";
import { IUser, Result } from "@/helpers/types";

export async function signOutUser(): Promise<Result<{ message: string }>> {
  try {
    await axiosInstance.post("/api/users/sign-out");
    return { data: { message: "Logged out successfully" } };
  } catch (error: any) {
    // Extract detailed error message if available
    const errorMessage = error.response?.data?.error || "Sign out failed";
    // console.error("Sign out failed:", errorMessage);
    return { error: errorMessage };
  }
}

export async function deleteUser(
  userId: string
): Promise<Result<{ message: string }>> {
  try {
    await axiosInstance.delete(`/api/users/${userId}`);

    return { data: { message: "User deleted successfully" } };
  } catch (error: any) {
    // Extract detailed error message if available
    const errorMessage = error.response?.data?.error || "Delete user failed";
    // console.error("Delete user failed:", errorMessage);
    return { error: errorMessage };
  }
}
export async function getAllUsersWithOutPagination() {
  try {
    const response = await axiosInstance.get("/api/users/user-without-pagination");
    console.log(response.data.body)
    return { data: response.data.body };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Fetch users failed";
    console.log("Fetch users failed:", error.response.data);
    return { error: errorMessage };
  }
}

export async function getUserById(
  id: string,
  page: number,
  limit: number,
) {
  try {
    const res = await axiosInstance.get(`/api/users/${id}`, {
      params: { page, limit },
    });

    const { timestamps } = res.data.body;
    const { meta } = res.data
    return { data: { timestamps, meta } };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Failed to get user timestamps";
    return { error: errorMessage };
  }
}

export async function editUser(
  userId: string,
  data: IUser
): Promise<Result<IUser>> {
  try {
    const response = await axiosInstance.put(`/api/users/${userId}`, data);

    return { data: response.data.body.updated_user };
  } catch (error: any) {
    // Extract detailed error message if available
    const errorMessage = error.response?.data?.error || "Edit user failed";
    // console.error("Edit user failed:", errorMessage);
    return { error: errorMessage };
  }
}
export async function checkInUser() {
  try {
    const response = await axiosInstance.post(`/api/users/check-in`);
    console.log("🚀 ~ checkInUser ~ response:", response.data);
    return { data: response.data };
  } catch (error: any) {
    console.log(error.response.data)
    const errorMessage = error.response?.data || "Failed to check in";
    console.error("Check in failed:", errorMessage);
    return { error: errorMessage };
  }
}

export async function checkOutUser() {
  try {
    const response = await axiosInstance.post(`/api/users/check-out`);
    console.log("🚀 ~ checkOutUser ~ response:", response.data);
    return { data: response.data };
  } catch (error: any) {
    const errorMessage = error.response?.data || "Failed to check out";
    console.error("Check out failed:", errorMessage);
    return { error: errorMessage };
  }
}
export async function createUser(data: IUser): Promise<Result<IUser>> {
  try {
    const response = await axiosInstance.post("/api/users", {
      ...data,
      _id: null,
    });

    return { data: response.data.body.new_admin_user };
  } catch (error: any) {
    console.log("🚀 ~ createUser ~ error:", error)
    // Extract detailed error message if available
    const errorMessage = error.response?.data?.error || "Create user failed";
    // console.error("Create user failed:", errorMessage);
    return { error: errorMessage };
  }
}
export async function inviteUser(data: any) {
  try {
    const response = await axiosInstance.post("/api/users/invite", {
      email: data
    });

    return { data: response.data.body };
  } catch (error: any) {
    console.log("🚀 ~ inviteUser ~ error:", error)
    const errorMessage = error.response?.data?.error || "Invite Member failed";
    // console.error("Create user failed:", errorMessage);
    return { error: errorMessage };
  }
}
export async function AuthUser(data: any) {
  try {
    const response = await axiosInstance.post("/api/users/authenticate", {
      id: data
    });

    return { data: response.data.success };
  } catch (error: any) {
    console.log("🚀 ~ AuthUser ~ error:", error)
    const errorMessage = error.response?.data?.error || "authentication Member failed";
    return { error: errorMessage };
  }
}

export async function getAllUsers({
  query,
  page,
  limit,
}: {
  query?: string;
  page?: number;
  limit?: number;
}): Promise<Result<{ users: IUser[] }>> {
  try {
    const response = await axiosInstance.get("/api/users", {
      params: { query, page, limit },
    });

    return { data: response.data.body, meta: response.data.meta };
  } catch (error: any) {
    // Extract detailed error message if available
    const errorMessage = error.response?.data?.error || "Fetch users failed";
    // console.error("Fetch users failed:", errorMessage);
    return { error: errorMessage };
  }
}
export async function getUserHistory({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}): Promise<Result<{ timestamps: any }>> {
  try {
    const response = await axiosInstance.get("/api/me/history", {
      params: { page, limit },
    });

    console.log(response.data.body)
    // Return data and metadata
    return { data: response.data.body, meta: response.data.meta };
  } catch (error: any) {
    console.log("🚀 ~ error:", error)
    // Check for a detailed error message or default to a generic message
    const errorMessage =
      error.response?.data?.error || "Fetch user history failed";

    return { error: errorMessage };
  }
}

