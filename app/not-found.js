import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <p className="muted">That page does not exist, or the link is incomplete.</p>
      <Link href="/" className="button">
        Go to the start
      </Link>
    </>
  );
}
