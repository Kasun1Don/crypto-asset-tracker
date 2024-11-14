import type { TRPCRouterRecord } from "@trpc/server";
import axios from "axios";

import { publicProcedure } from "../trpc";

//types based on the sample response from the CMC API
interface QuoteData {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  last_updated: string;
}

interface Quote {
  USD: QuoteData;
}

interface Cryptocurrency {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank?: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  infinite_supply: boolean;
  last_updated: string;
  date_added: string;
  tags: string[];
  platform: null | object;
  self_reported_circulating_supply: number | null;
  self_reported_market_cap: number | null;
  quote: Quote;
}

// set header required for making API requests
const api = axios.create({
  baseURL: process.env.CMC_API_URL,
  headers: {
    "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
  },
});

// router to get listings
export const listingsRouter = {
  getListings: publicProcedure.query(async () => {
    try {
      const { data } = await api.get<{ data: Cryptocurrency[] }>("");

      const mappedData = data.data.map((crypto: Cryptocurrency) => ({
        name: crypto.name,
        symbol: crypto.symbol,
        volume_24h: crypto.quote.USD.volume_24h,
        cmc_rank: crypto.cmc_rank,
        price: crypto.quote.USD.price,
        market_cap: crypto.quote.USD.market_cap,
        percent_change_24h: crypto.quote.USD.percent_change_24h,
      }));

      return mappedData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch listings: ${error.message}`);
      }
      throw error;
    }
  }),
} satisfies TRPCRouterRecord;
