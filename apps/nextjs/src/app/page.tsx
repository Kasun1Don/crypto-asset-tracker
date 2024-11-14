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
      <main className="container h-screen px-5 py-16 sm:px-10">
        <div className="mb-4 flex flex-col items-center justify-between sm:flex-row sm:items-start">
          <div className="flex flex-col items-center sm:flex-grow sm:items-start sm:pr-4">
            <h1 className="pb-2 text-center text-4xl font-bold sm:text-left">
              Assets Tracker
            </h1>
            <p className="text-lg">Track your favorite crypto assets</p>
          </div>
          <div className="mt-4 flex w-full min-w-80 items-center justify-center sm:mt-0 sm:w-auto sm:justify-end sm:pl-4">
            <Search />
          </div>
        </div>
        {/* pass search query to CryptoList to filter results */}
        <CryptoList searchQuery={searchParams.query} />
      </main>
    </HydrateClient>
  );
}
