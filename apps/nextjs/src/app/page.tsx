import { HydrateClient } from "~/trpc/server";
import CryptoList from "./_components/CryptoList";
import Search from "./_components/Search";

export default function HomePage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  return (
    <HydrateClient>
      <main className="container h-screen py-16">
        <Search />
        <CryptoList searchQuery={searchParams.query} />
      </main>
    </HydrateClient>
  );
}
