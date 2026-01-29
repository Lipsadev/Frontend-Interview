import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogById } from "../api/blogs";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

// Map category names to badge variants
const categoryVariants: Record<string, BadgeProps["variant"]> = {
  FINANCE: "finance",
  TECH: "tech",
  CAREER: "career",
  EDUCATION: "education",
  REGULATIONS: "regulations",
  LIFESTYLE: "lifestyle",
};

function formatReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogDetailSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Cover Image Skeleton */}
      <Skeleton className="w-full aspect-[2/1] rounded-2xl" />

      {/* Content Skeleton */}
      <div className="space-y-6">
        {/* Category badges */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-3/4" />
        </div>

        {/* Meta */}
        <Skeleton className="h-4 w-40" />

        {/* Divider */}
        <Skeleton className="h-px w-full" />

        {/* Content paragraphs */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogDetail() {
  const { id } = useParams();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-5">
          <svg
            className="w-8 h-8 text-destructive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Unable to load article
        </h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-sm">
          We couldn't fetch this article. Please check your connection and try again.
        </p>
        <Button onClick={() => refetch()} variant="outline">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </Button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <article className="animate-[fade-in_0.5s_ease-out]">
      {/* Cover Image */}
      <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-8 shadow-lg">
        <img
          src={data.coverImage}
          alt={data.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Article Header */}
      <header className="mb-8">
        {/* Categories & Read Time */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {data.category.map((cat) => (
            <Badge
              key={cat}
              variant={categoryVariants[cat] || "secondary"}
            >
              {cat}
            </Badge>
          ))}
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatReadTime(data.content)}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight mb-4">
          {data.title}
        </h1>

        {/* Date */}
        <p className="text-muted-foreground">
          {formatDate(data.date)}
        </p>
      </header>

      {/* Divider */}
      <div className="w-full h-px bg-border mb-8" />

      {/* Content */}
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {data.content.split("\n\n").map((paragraph, index) => (
          <p
            key={index}
            className="text-foreground/90 leading-[1.8] mb-6 text-[15px] md:text-base"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-border">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Thank you for reading
          </p>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </Button>
        </div>
      </footer>
    </article>
  );
}
