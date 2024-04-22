"use client";
import { useState } from "react";
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
      className="transition-transform duration-300 ease-in-out hover:scale-110"
    >
      <Heart
        width={20}
        height={20}
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
