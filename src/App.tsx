import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import CreateBlog from "./components/CreateBlog";
import { ThemeToggle } from "./components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function App() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Show intro animation on every page load
    const timer = setTimeout(() => {
      setIntroComplete(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Intro Hero Section - Always shows on page load */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background",
          "transition-opacity duration-700 ease-out",
          introComplete ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        {/* Centered Headline Container */}
        <div className="text-center px-6">
          {/* Logo Icon */}
          <div
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg"
            style={{
              animation: "intro-scale 0.6s ease-out 0.1s forwards",
              opacity: 0,
            }}
          >
            <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>

          {/* Main Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight"
            style={{
              animation: "intro-fade-up 0.7s ease-out 0.25s forwards",
              opacity: 0,
            }}
          >
            CA Monk Blog
          </h1>

          {/* Tagline */}
          <p
            className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-md mx-auto"
            style={{
              animation: "intro-fade-up 0.7s ease-out 0.45s forwards",
              opacity: 0,
            }}
          >
            Stay updated with the latest trends in finance, accounting, and career growth
          </p>

          {/* Subtle decorative line */}
          <div
            className="mt-8 mx-auto w-12 h-0.5 bg-primary/30 rounded-full"
            style={{
              animation: "intro-expand 0.5s ease-out 0.65s forwards",
              opacity: 0,
              transform: "scaleX(0)",
            }}
          />
        </div>
      </div>

      {/* Main Content - Revealed after intro */}
      <div
        className={cn(
          "transition-all duration-700 ease-out delay-100",
          introComplete
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo & Title */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                    CA Monk Blog
                  </h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    Finance, Accounting & Career Insights
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 sm:gap-3">
                <ThemeToggle />
                <Button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  size="sm"
                  className={showCreateForm ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : ""}
                >
                  {showCreateForm ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="hidden sm:inline">Close</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="hidden sm:inline">New Article</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Create Form */}
          {showCreateForm && (
            <div className="mb-8">
              <CreateBlog onClose={() => setShowCreateForm(false)} />
            </div>
          )}

          {/* Two-Panel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Panel - Article List */}
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="lg:sticky lg:top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Latest Articles
                  </h2>
                </div>
                <div className="space-y-3 max-h-[calc(100vh-12rem)] overflow-y-auto pr-1 scrollbar-thin">
                  <BlogList />
                </div>
              </div>
            </aside>

            {/* Right Panel - Article Detail */}
            <section className="lg:col-span-8 xl:col-span-9">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                      {/* Illustration */}
                      <div className="w-24 h-24 rounded-2xl bg-muted/50 flex items-center justify-center mb-6">
                        <svg
                          className="w-12 h-12 text-muted-foreground/60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>

                      <h3 className="text-2xl font-semibold text-foreground mb-2">
                        Select an article
                      </h3>
                      <p className="text-muted-foreground max-w-md leading-relaxed">
                        Choose an article from the list to read the full content, or create a new one to share your knowledge.
                      </p>
                    </div>
                  }
                />
                <Route path="/blogs/:id" element={<BlogDetail />} />
              </Routes>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/40 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} CA Monk. All rights reserved.</p>
              <p className="text-xs">
                Empowering finance professionals with knowledge
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Intro animation keyframes */}
      <style>{`
        @keyframes intro-fade-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes intro-scale {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes intro-expand {
          from {
            opacity: 0;
            transform: scaleX(0);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
}
