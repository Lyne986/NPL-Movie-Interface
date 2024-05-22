interface Card {
  title: string;
  chapter: number;
  image: string;
}

interface CardRecent {
  title: string;
  chapter: number;
  image: string;
  rating: number;
  status: string;
}

interface DashboardData {
  Cards: Card[];
  CardsRecent: CardRecent[];
}

export async function fetchDashboardData(searchQuery = ''): Promise<DashboardData | undefined> {
  try {
    const res = await fetch(`http://localhost:3000/api/get-movies${searchQuery ? `?title=${searchQuery}` : ''}`, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error(`An error has occurred: ${res.status}`);
    }

    const { data } = await res.json();

    return {
      Cards: data,
      CardsRecent: [
        { title: 'Kaguya-sama: Love is war', chapter: 1, image: 'https://m.media-amazon.com/images/I/71sQUwHdo2L.jpg', rating: 5, status: 'Finished' },
        { title: 'Kaguya-sama: Love is war', chapter: 1, image: 'https://m.media-amazon.com/images/I/71sQUwHdo2L.jpg', rating: 2, status: 'Finished' },
        { title: 'Kaguya-sama: Love is war', chapter: 1, image: 'https://m.media-amazon.com/images/I/71sQUwHdo2L.jpg', rating: 3, status: 'Finished' },
        { title: 'Kaguya-sama: Love is war', chapter: 1, image: 'https://m.media-amazon.com/images/I/71sQUwHdo2L.jpg', rating: 1, status: 'Finished' },
        { title: 'Kaguya-sama: Love is war', chapter: 1, image: 'https://m.media-amazon.com/images/I/71sQUwHdo2L.jpg', rating: 5, status: 'Finished' },
        { title: 'Kaguya-sama: Love is war', chapter: 1, image: 'https://m.media-amazon.com/images/I/71sQUwHdo2L.jpg', rating: 4, status: 'Finished' },
        { title: 'Kaguya-sama: Love is war', chapter: 1, image: 'https://m.media-amazon.com/images/I/71sQUwHdo2L.jpg', rating: 2, status: 'Finished' },
      ],
    };
  } catch (error) {
    console.error('An error has occurred:', error);
  }
}
