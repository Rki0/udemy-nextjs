import React from "react";

function UserProfile(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfile;

// return 값은 getStaticProps()와 동일. 단, revalidate는 사용할 수 없다. 매 요청마다 실행되기 때문이다.
// 이 함수는 서버에서만 실행된다.(server-side). 따라서 server 측 코드를 사용할 수 있다.
export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      username: "Rki0",
    },
  };
}
