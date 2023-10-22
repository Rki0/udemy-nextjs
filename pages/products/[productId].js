import path from "path";
import fs from "fs/promises";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  // fallback contents
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  // context를 활용하여 동적인 생성이 가능하다.
  // useRouter() 쓰면 안되나요? 그건 브라우저에서 동작하는거니까 pre-rendering component에서는 사용할 수 없다. build 단계에서 작동하기 때문이다.
  const { params } = context;

  const productId = params.productId;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// 동적 페이지(e.g. []를 사용하는 페이지)의 경우에는 어떤 페이지를 pre-rendering 해야할지 Nest.js가 모르기 때문에
// 그냥 getStaticProps()를 사용하면 에러가 발생한다. 따라서, 어떤 것을 사용할지 알려줘야한다. 그걸 가능하게 하는 것이 바로 getStaicPaths()이다.
export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { productId: id } }));

  // paths의 []에 입력되는 것들을 pre-rendering 한다.
  return {
    paths: pathsWithParams,
    // paths: [
    //   { params: { productId: "p1" } },
    //   // { params: { productId: "p2" } },
    //   // { params: { productId: "p3" } },
    // ],
    fallback: true, // pre-rendering 할 것이 많을 때 유용. true를 설정하면 paths에 포함되지 않은 페이지라도 pre-rendering이 가능하게 해주며, 이 때 404 페이지가 아니라 fallback 페이지로 이동하게 해준다. 따라서, 기본 컴포넌트에서 fallback을 사용하여 화면을 구성해줄 필요가 있다. "blocking"을 사용한다면 서버에서 생성될 때까지 Next.js 앱이 대기하므로 유저 입장에서 응답시간이 길어지지만 fallback content를 생성할 필요가 없다.
  };
}

export default ProductDetailPage;
