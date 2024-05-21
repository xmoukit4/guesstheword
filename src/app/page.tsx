// pages/index.tsx
import Head from 'next/head';
import Game from '../components/Game';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Devinez le Mot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-green-100">
        <Game />
      </main>
    </div>
  );
};

export default Home;
