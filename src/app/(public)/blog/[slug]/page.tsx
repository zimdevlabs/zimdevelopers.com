import ArticleHero from "@/components/article/hero";
import { getPostBySlug } from "@/components/md-renderer/api";
import markdownToHtml from "@/components/md-renderer/markdownToHtml";
import { PostBody } from "@/components/md-renderer/post-body";
import { notFound } from "next/navigation";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <article>
      <ArticleHero authorName="Tino Mazorodze" title="Hello World" />
      <PostBody content={content} />
    </article>
  );
}
