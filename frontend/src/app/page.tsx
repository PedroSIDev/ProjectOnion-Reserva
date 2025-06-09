import Header from '@/components/layout/Header';

export default function HomePage() {
  return (
    <section
      id="home-page-section"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
    >
      <div id="home-page" className="flex flex-col min-h-screen">
        <Header />
      </div>
    </section>
  );
}