import CreatePostForm from "@/components/posts/CreatePostForm";
import PostsList from "@/components/posts/PostList";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Seu Painel</h1>
        <p className="text-gray-600 mt-1">Gerencie seus posts e atividades</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <section className="md:col-span-1 bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Criar Novo Post</h2>
          <CreatePostForm />
        </section>

        <section className="md:col-span-2 bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Seus Posts</h2>
          <PostsList />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;