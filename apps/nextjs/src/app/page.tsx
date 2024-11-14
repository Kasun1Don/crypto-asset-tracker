import { HydrateClient } from "~/trpc/server";
import CryptoList from "./_components/CryptoList";

export default function HomePage() {
  return (
    <HydrateClient>
      <main className="container h-screen py-16">
        <CryptoList />
      </main>
    </HydrateClient>
  );
}
