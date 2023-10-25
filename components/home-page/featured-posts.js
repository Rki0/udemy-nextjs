import PostGrid from "../posts/posts-grid";
import styles from "./featured-posts.module.css";

function FeaturedPosts(props) {
  return (
    <section className={styles.latest}>
      <h2>Featured Posts</h2>

      <PostGrid posts={props.posts} />
    </section>
  );
}

export default FeaturedPosts;
