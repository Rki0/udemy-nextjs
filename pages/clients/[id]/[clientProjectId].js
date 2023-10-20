import { useRouter } from "next/router";

function SelectedClientProjectPage() {
  const router = useRouter();

  return (
    <div>
      selected Clieint{router.query.id} project :{router.query.clientProjectId}
    </div>
  );
}

export default SelectedClientProjectPage;
