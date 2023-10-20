import Link from "next/link";

function ClientPage() {
  const clientsArr = [
    { id: "1", name: "user1" },
    { id: "2", name: "user2" },
  ];

  return (
    <div>
      Client page
      <ul>
        {clientsArr.map((client) => (
          <li key={client.id}>
            <Link
              href={{
                pathname: "/clients/[id]",
                query: { id: client.id },
              }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientPage;
