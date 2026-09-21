import { redirect } from "next/navigation";
import { ROUTES } from "@/contracts/blog";

export default function AdminIndex() {
  redirect(ROUTES.adminPosts);
}
