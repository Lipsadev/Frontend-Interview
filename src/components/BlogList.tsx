import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import type { Blog } from "../api/blogs";
import { fetchBlogs } from "../api/blogs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Map category names to badge variants
const categoryVariants: Record<string, BadgeProps["variant"]> = {
  FINANCE: "finance",
  TECH: "tech",
  CAREER: "career",
  EDUCATION: "education",
  REGULATIONS: "regulations",
  LIFESTYLE: "lifestyle",
};

function BlogCardSkeleton() {
  return (
    <Card className="p-5">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <Skeleton className="h-5 w-4/5" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-3 w-20" />
      </div>
    </Card>
  );
}

export default function BlogList() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="p-6 text-center border-destructive/20">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-destructive/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="font-medium text-foreground">Failed to load blogs</p>
        <p className="text-sm text-muted-foreground mt-1">
          Check if the server is running on port 3001
        </p>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="p-6 text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <p className="font-medium text-foreground">No articles yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Create your first blog to get started
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((blog, index) => {
        const isActive = String(blog.id) === id;

        return (
          <Link
            key={blog.id}
            to={`/blogs/${blog.id}`}
            className="block group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Card
              className={cn(
                "border-l-[3px] cursor-pointer",
                "hover:shadow-lg hover:-translate-y-0.5",
                "transition-all duration-200 ease-out",
                isActive
                  ? "border-l-primary bg-primary/[0.03] shadow-md"
                  : "border-l-transparent hover:border-l-primary/40"
              )}
            >
              <CardHeader className="pb-2">
                {/* Categories */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {blog.category.slice(0, 2).map((cat) => (
                    <Badge
                      key={cat}
                      variant={categoryVariants[cat] || "secondary"}
                      className="text-[10px] font-medium"
                    >
                      {cat}
                    </Badge>
                  ))}
                  {blog.category.length > 2 && (
                    <Badge variant="outline" className="text-[10px]">
                      +{blog.category.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <CardTitle
                  className={cn(
                    "text-base leading-snug",
                    "group-hover:text-primary transition-colors duration-150",
                    isActive && "text-primary"
                  )}
                >
                  {blog.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0 space-y-2">
                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {blog.description}
                </p>

                {/* Date */}
                <p className="text-xs text-muted-foreground/70">
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
