import { getImage } from "~/server/queries";

// import { Modal } from "./modal";
export default async function FullPageImage(props: { id: number }) {
  const image = await getImage(props.id);
  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        <img src={image.url} alt={image.name} className="object-contain" />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col border-l">
        <h1 className="text-2xl font-bold">{image.name}</h1>
      </div>
    </div>
  );
}
