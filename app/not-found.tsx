import Link from "next/link";
export default function NotFound() {
  return (
    <main className="section page-heading">
      <span className="eyebrow">404 / A little off course</span>
      <h1>
        Let’s find
        <br />
        your way back.
      </h1>
      <Link className="button" href="/">
        Back to the studio ↗
      </Link>
    </main>
  );
}
