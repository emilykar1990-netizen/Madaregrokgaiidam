// app/api/price/route.ts
import { NextResponse } from 'next/server';

const getPrice = () => {
  const variance = (Math.random() - 0.5) * 0.0004; // tiny realistic ±0.02%
  return Number((1.000000 + variance).toFixed(6));
};

export const GET = async () => {
  const data = {
    price: getPrice(),
    usd: getPrice(),
    currency: "USD",
    decimals: 6,
    timestamp: Date.now(),
    name: "Flash USDT",
    symbol: "USDT",
  };

  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=60',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

// Makes it work even if some broken wallet sends POST or OPTIONS
export const POST = GET;
export const OPTIONS = GET;
