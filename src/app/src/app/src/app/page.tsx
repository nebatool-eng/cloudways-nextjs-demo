type NewsItem = {
  id: number;
  title: string;
  url: string;
  time: number;
};

async function getTopStories(): Promise<NewsItem[]> {
  const res = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch top stories");
  }

  const storyIds: number[] = await res.json();
  const topTenIds = storyIds.slice(0, 10);

  const stories = await Promise.all(
    topTenIds.map(async (id: number) => {
      const storyRes = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      return storyRes.json();
    })
  );

  return stories;
}

export default async function Home() {
  const stories = await getTopStories();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Live Tech News Dashboard
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Server-rendered live on a persistent Node.js environment.
          </p>
        </header>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {stories.map((story) => (
              <li key={story.id}>
                
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        {story.title}
                      </p>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          ID: {story.id}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p className="font-mono">
                          Published:{" "}
                          {new Date(story.time * 1000).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
