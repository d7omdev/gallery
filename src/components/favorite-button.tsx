"use client";
import { useState } from "react";
import Heart from "@react-sandbox/heart";

const FavoriteButton = ({
  id,
  favorite,
  favorites,
}: {
  id: string;
  favorite: boolean;
  favorites: string[];
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
      className="rounded-full p-1 transition-transform duration-300 ease-in-out hover:scale-110"
    >
      <Heart
        width={25}
        height={25}
        strokeWidth={60}
        inactiveColor="white"
        active={isFavorite}
        onClick={() => {
          return null;
        }}
      />
    </button>
  );
};

export default FavoriteButton;
