"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Heart } from "./ui/heartSVG";

const FavoriteButton = ({
  favorite,
  imageId,
}: {
  favorite: boolean;
  imageId: number;
}) => {
  const [isFavorite, setIsFavorite] = useState(favorite);

  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);

    if (!favorite === isFavorite) {
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      className="flex items-center justify-center rounded-full p-1.5 transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-transparent"
      onClick={toggleFavorite}
    >
      {isFavorite ? <Heart fill="#be1931" /> : <Heart fill="#fff" />}
    </Button>
  );
};

export default FavoriteButton;
