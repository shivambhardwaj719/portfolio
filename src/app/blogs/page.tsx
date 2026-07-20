import BlogsClient from "./BlogsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Shivam Bhardwaj",
  description: "Explore highly technical articles and deep dives into Backend Development, System Design, DevOps, and Cloud Architectures.",
};

export default function BlogsPage() {
  return <BlogsClient />;
}
