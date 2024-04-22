"use client";
import { useEffect, useState } from "react";
import Heart from "@react-sandbox/heart";

const FavoriteButton = ({
  id,
  favorite,
  favorites,
}: {
  id: number;
  favorite: boolean;
  favorites: number[];
}) => {
  const [isFavorite, setIsFavorite] = useState(favorite);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);

    try {
      if (favorites?.includes(id)) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.error(error);
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
