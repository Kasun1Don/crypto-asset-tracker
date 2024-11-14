// component that handles crypto currency icons

import Image from "next/image";

interface CryptoIconProps {
  symbol: string; // takes crypto symbol as prop
}

export const CryptoIcon = ({ symbol }: CryptoIconProps) => {
  return (
    <Image
      // converts symbol to lowercase and looks for matching svg
      src={`/icons/color/${symbol.toLowerCase()}.svg`}
      width={35}
      height={35}
      alt={`${symbol} icon`}
      // if not found fall back to generic icon
      onError={(e) => {
        e.currentTarget.src = "/icons/color/generic.svg";
      }}
    />
  );
};
