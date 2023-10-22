import fs from "fs/promises";
import Link from "next/link";
import path from "path";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link
            href={{
              pathname: "/products/[productId]",
              query: { productId: product.id },
            }}
          >
            {product.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// 하나의 파일에 getStaticProps()가 존재하면 얘부터 실행하고
// 그 다음 다른 컴포넌트를 실행한다.
// getStaticProps()에서는 다른 컴포넌트 함수의 props를 미리 pre-fetching 한다.
export async function getStaticProps(context) {
  console.log("re-generated");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    // 다른 컴포넌트를 렌더링하지 않고 다른 페이지로 리디렉션한다.
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    // 404 페이지를 로드하도록 하는 속성 notFound
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // 10초에 한 번씩 getStaticProps()를 실행한다. 따라서, 최신 데이터 갱신이 가능하다. static generation 컴포넌트이기 때문에 터미널에서 확인할 수 있으며 10초 전에 페이지를 새로고침하면, 갱신 전이기 때문에 console이 안 보일 것이다(즉, regenerated되지 않았다.). 10초 후 페이지를 새로고침하면 console이 추가될 것이다.(regenerated되었다는 뜻)
  };
}

export default HomePage;
