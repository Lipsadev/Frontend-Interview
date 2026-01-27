import { Routes, Route } from "react-router-dom";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        CA Monk Blog
      </h1>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        
        {/* LEFT: Blog List */}
        <div className="md:col-span-1 border border-gray-700 rounded-lg p-4">
          <BlogList />
        </div>

        {/* RIGHT: Blog Detail */}
        <div className="md:col-span-2 border border-gray-700 rounded-lg p-6">
          <Routes>
            <Route
              path="/"
              element={
                <p className="text-gray-400 text-center mt-20">
                  Select a blog to read
                </p>
              }
            />
            <Route path="/blogs/:id" element={<BlogDetail />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;
