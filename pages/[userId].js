import React from "react";

function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export default UserIdPage;

// server에서 생성되는 것이기 때문에 pre-rendering 등이 필요없고, 따라서, [productId].js에서 getStaticProps()를 사용해 어떤 페이지를 pre-rendering할지 정하지 않으면 에러가 발생했던 것과 달리 에러가 발생하지 않는다.
export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.userId;

  return {
    props: {
      id: "userId : " + userId,
    },
  };
}
