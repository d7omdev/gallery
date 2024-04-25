export type ImageType = {
  id: string;
  name: string;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
  favorite: boolean | null;
};

export type AlbumType = {
  id: string;
  name: string;
  imageIds: string[] | null;
  createdAt: Date;
  updatedAt: Date | null;
};
