import { createTRPCRouter, publicProcedure } from "../trpc";
import axiosInstance from "~/lib/functions/axiosInstance";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";

export interface UserData {
  id: number;
  email: string;
  login: string;
  avatar: string;
  wpm?: [number];
  highestWpm?: number;
}

export const userRouter = createTRPCRouter({
  getCurrentUser: publicProcedure.query(async () => {
    try {
      const cookieStore = cookies();

      const token = cookieStore.get("access_token");

      if (!token) {
        return redirect("/login");
      }
      const res = await axiosInstance.get<UserData>("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      console.log("res", res.data);
      return res.data;
    } catch (error) {
      console.log("hahah", error);
      // return redirect("/login");
    }
  }),

  getUsers: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ input }) => {
      const res = await axiosInstance.get<UserData[]>(`/users/${input.page}`);
      console.log("res", res.data);
      return res.data;
    }),
});
