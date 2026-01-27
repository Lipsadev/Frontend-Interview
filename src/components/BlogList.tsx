import { useQuery } from "@tanstack/react-query";
import type { Blog } from "../api/blogs";
import { fetchBlogs } from "../api/blogs";

export default function BlogList() {
  const { data, isLoading, isError } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  if (isLoading) return <p>Loading blogs...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div className="space-y-4">
      {data?.map((blog: Blog) => (
        <div key={blog.id} className="border p-4 rounded">
          <h2 className="font-bold text-lg">{blog.title}</h2>

          <p className="text-sm text-gray-500">
            {blog.category.join(", ")}
          </p>

          <p>{blog.description}</p>
        </div>
      ))}
    </div>
  );
}
