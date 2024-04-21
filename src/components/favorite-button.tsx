"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Heart } from "./ui/heartSVG";

const FavoriteButton = ({ favorite }: { favorite: boolean }) => {
  const [isFaforite, setIsFavorite] = useState(false);
  useEffect(() => {
    setIsFavorite(favorite);
  }, [favorite]);
  

  
  return (
    <Button
      type="submit"
      size={"icon"}
      variant={"ghost"}
      className="flex items-center justify-center rounded-full p-1.5 transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-transparent"
    >
      {isFaforite ? <Heart fill="#be1931" /> : <Heart fill="#fff" />}
    </Button>
  );
};

export default FavoriteButton;
