import Link from "next/link";

export default function Home() {
  return (
    <main className="p-52 text-center">
      <h1 className="text-4xl font-extrabold">Coming soon!</h1>
      (&nbsp;
      <Link
        href="/square"
        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
      >
        Look at my square, boy.
      </Link>
      &nbsp;)
    </main>
  );
}
