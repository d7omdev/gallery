"use client";
import { useState } from "react";
import Heart from "@react-sandbox/heart";

const FavoriteButton = ({ favorite }: { favorite: boolean }) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);

    if (!favorite === isFavorite) {
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <button
      onClick={() => {
        toggleFavorite();
      }}
    >
      <Heart
        width={30}
        height={30}
        className="hover: p-1"
        active={isFavorite}
        onClick={() => {
          return null;
        }}
      />
    </button>
  );
};

export default FavoriteButton;
