import { Metadata } from "next";
import { getBlogBySlug, BLOGS } from "@/lib/blogData";
import BlogClient from "./BlogClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Shivam Bhardwaj",
      description: "The requested blog could not be found.",
    };
  }

  return {
    title: `${blog.title} | Shivam Bhardwaj`,
    description: blog.desc,
    openGraph: {
      title: blog.title,
      description: blog.desc,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  return BLOGS.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogReadingPage({ params }: Props) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-primary)" }}>
        <h2>Blog article not found.</h2>
      </div>
    );
  }

  return <BlogClient blog={blog} />;
}
