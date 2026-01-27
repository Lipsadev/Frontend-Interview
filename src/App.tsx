import BlogList from "./components/BlogList";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          CA Monk Blog
        </h1>

        <BlogList />
      </div>
    </div>
  );
}

export default App;
