import { useRouter } from "next/router";

function BlogPostsPage() {
  const router = useRouter();
  console.log(router.query);
  return <div>This is blog posts page about {router.query.slug}</div>;
}

export default BlogPostsPage;
