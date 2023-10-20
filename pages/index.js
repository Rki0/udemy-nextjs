import Link from "next/link";

function index() {
  return (
    <div>
      <h1>Home Page</h1>

      <ul>
        <li>
          <Link href="/portfolio">portfolio</Link>
        </li>
        <li>
          <Link href="/clients">client</Link>
        </li>
        <li>
          <Link href="/portfolio">portfolio</Link>
        </li>
      </ul>
    </div>
  );
}

export default index;
