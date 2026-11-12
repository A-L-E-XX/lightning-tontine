'use client';

export default function ErrorPage({ reset }) {
  return (
    <>
      <h1>Something went wrong</h1>
      <p className="muted">
        The page could not load. Your money is not affected, because this app never holds it.
      </p>
      <button className="button" type="button" onClick={() => reset()}>
        Try again
      </button>
    </>
  );
}
