import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createBlog } from "../api/blogs";

export default function CreateBlog() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });

      setTitle("");
      setCategory("");
      setDescription("");
      setContent("");
      setCoverImage("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      title,
      category: category.split(",").map((c) => c.trim()),
      description,
      content,
      coverImage,
      date: new Date().toISOString(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded mb-8 space-y-3"
    >
      <h2 className="text-xl font-bold">Create New Blog</h2>

      <input
        className="w-full border p-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        className="w-full border p-2"
        placeholder="Categories (comma separated)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <input
        className="w-full border p-2"
        placeholder="Cover Image URL"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
      />

      <textarea
        className="w-full border p-2"
        placeholder="Short description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <textarea
        className="w-full border p-2"
        placeholder="Full blog content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Creating..." : "Create Blog"}
      </button>
    </form>
  );
}
