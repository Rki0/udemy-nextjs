import Link from "next/link";
import { useRouter } from "next/router";

function ClientProjectsPage() {
  const router = useRouter();

  const loadProjectHandler = () => {
    // ...

    // router.push("/clients/1/2");
    router.push({
      pathname: "/clients/[id]/[clientProjectId]",
      query: {
        id: "1",
        clientProjectId: "2",
      },
    });
  };

  return (
    <div>
      <h1>Project of {router.query.id} Client</h1>

      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientProjectsPage;
