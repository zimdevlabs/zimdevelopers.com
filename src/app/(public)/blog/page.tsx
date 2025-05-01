import { PostPreview } from "@/components/article/card";
import { getAllPosts } from "@/components/md-renderer/api";

export default function BlogListing() {
  const allPosts = getAllPosts();

  return (
    <>
      <h1>All Articles</h1>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {allPosts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </>
  );
}
