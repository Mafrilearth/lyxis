import type { Route } from "next";
import { redirect } from "next/navigation";

export default function CandidateIndexPage() {
  redirect("/candidate/dashboard" as Route);
}
