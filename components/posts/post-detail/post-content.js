import Image from "next/image";
import ReactMarkDown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import PostHeader from "./post-header";
import styles from "./post-content.module.css";

function PostContent(props) {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    img(image) {
      return (
        <Image
          src={`/images/posts/${post.slug}/${image.src}`}
          alt={image.alt}
          width={600}
          height={300}
        />
      );
    },
    // p(paragraph) {
    //   const { node } = paragraph;

    //   if (node.children[0].type === "image") {
    //     const image = node.children[0];

    //     return (
    //       <div className={styles.image}>
    //         <Image
    //           src={`/images/posts/${post.slug}/${image.url}`}
    //           alt={image.alt}
    //           width={600}
    //           height={300}
    //         />
    //       </div>
    //     );
    //   }

    //   return <p>{paragraph.children}</p>;
    // },
    code(code) {
      const { language, value } = code;

      return (
        <SyntaxHighlighter
          language={language}
          children={value}
          style={atomDark}
        />
      );
    },
  };

  return (
    <article className={styles.content}>
      <PostHeader title={post.title} image={imagePath} />

      <ReactMarkDown components={customRenderers}>{post.content}</ReactMarkDown>
    </article>
  );
}

export default PostContent;
