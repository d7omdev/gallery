import { getImage } from "~/server/queries";

// import { Modal } from "./modal";
export default async function FullPageImage(props: { id: number }) {
  const image = await getImage(props.id);
  return <img src={image.url} alt={image.name} className="w-96" />;
}
