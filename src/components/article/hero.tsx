type HeroProps = {
  title: string;
  authorName: string;
};

export default function ArticleHero({ title, authorName }: HeroProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-center text-4xl font-bold">{title}</h1>
      <p className="mt-4 text-lg text-gray-600">By {authorName}</p>
    </div>
  );
}
