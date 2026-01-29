import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createBlog } from "../api/blogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CreateBlogProps {
  onClose?: () => void;
}

export default function CreateBlog({ onClose }: CreateBlogProps) {
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

      onClose?.();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      title,
      category: category.split(",").map((c) => c.trim().toUpperCase()),
      description,
      content,
      coverImage: coverImage || "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      date: new Date().toISOString(),
    });
  };

  return (
    <Card className="animate-[slide-up_0.3s_ease-out] shadow-xl border-border/40">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Create New Article</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Share your insights with the community
            </p>
          </div>
          {onClose && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-9 w-9 rounded-lg"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Title <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="Enter article title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Categories <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="FINANCE, TECH (comma separated)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Cover Image URL
            </label>
            <Input
              placeholder="https://example.com/image.jpg (optional)"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Description <span className="text-destructive">*</span>
            </label>
            <Textarea
              placeholder="Brief summary that will appear in the article list..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="min-h-[80px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Content <span className="text-destructive">*</span>
            </label>
            <Textarea
              placeholder="Write your article content here. Use double line breaks for paragraphs..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="min-h-[180px]"
            />
          </div>

          {mutation.isError && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Failed to create article. Please try again.
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {onClose && (
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1 sm:flex-none sm:min-w-[140px]"
            >
              {mutation.isPending ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Publish Article
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
