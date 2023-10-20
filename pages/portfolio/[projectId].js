import { useRouter } from "next/router";

function Detailpage() {
  const router = useRouter();

  return <div>Detail about {router.query.projectId}</div>;
}

export default Detailpage;
