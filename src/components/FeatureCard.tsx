import React from 'react';
import Link from 'next/link';

interface FeatureCardProps {
  type: string;
  data: any;
}

export default function FeatureCard({ type, data }: FeatureCardProps) {
  if (!data) {
    return <div>Loading...</div>;
  }

  let title = '';
  if (type === 'director') {
    title = 'Featured Director';
  } else if (type === 'actor') {
    title = 'Featured Actor';
  } else if (type === 'movie') {
    title = 'Featured Movie';
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-bold mb-2 text-black">{title}</h3>
      <h4 className="text-lg font-bold mb-2 text-black">{type === 'movie' ? data.title : `${data.firstName} ${data.lastName}`}</h4>
      {type === 'director' && data.movies && <p>Directed {data.movies.length} movies</p>}
      {type === 'actor' && data.movies && <p>Acted in {data.movies.length} movies</p>}
      {type === 'movie' && data.movies && <p>{data.movies.movieTitle}</p>}

    </div>
  );
}