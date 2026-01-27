import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogById } from "../api/blogs";

export default function BlogDetail() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading blog...</p>;
  if (isError) return <p>Failed to load blog.</p>;

  if (!data) return null;

  return (
    <div className="mt-6 border-t pt-6">
      <img
        src={data.coverImage}
        alt={data.title}
        className="w-full h-64 object-cover rounded mb-4"
      />

      <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
      <p className="text-sm text-gray-500 mb-4">
        {data.category.join(", ")}
      </p>

      <p>{data.content}</p>
    </div>
  );
}
