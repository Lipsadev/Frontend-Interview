import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import type { Blog } from "../api/blogs";
import { fetchBlogs } from "../api/blogs";

export default function BlogList() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  if (isLoading)
    return <p className="text-gray-400">Loading blogs...</p>;

  if (isError)
    return <p className="text-red-400">Something went wrong.</p>;

  return (
    <div className="space-y-4">
      {data?.map((blog) => {
        const isActive = String(blog.id) === id;

        return (
          <Link
            key={blog.id}
            to={`/blogs/${blog.id}`}
            className={`block rounded-lg p-4 border transition
              ${
                isActive
                  ? "border-blue-500 bg-gray-800"
                  : "border-gray-700 hover:bg-gray-800"
              }`}
          >
            {/* Category + Date */}
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span className="uppercase">
                {blog.category.join(", ")}
              </span>
              <span>
                {new Date(blog.date).toLocaleDateString()}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-blue-400 mb-1">
              {blog.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-300">
              {blog.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
