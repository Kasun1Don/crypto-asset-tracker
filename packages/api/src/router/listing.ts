import type { TRPCRouterRecord } from "@trpc/server";
import axios from "axios";

import type { Cryptocurrency } from "../types";
import { publicProcedure } from "../trpc";

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
