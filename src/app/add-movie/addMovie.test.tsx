import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddMovieForm from './page';
import axios from 'axios';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

jest.mock('axios');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('AddMovieForm', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockImplementation((url) => {
      if (url.includes('/api/directors')) {
        return Promise.resolve({
          data: [
            { id: 1, firstName: 'James', lastName: 'Cameron', dateOfBirth: '1954-08-16' },
          ],
        });
      } else if (url.includes('/api/actors')) {
        return Promise.resolve({
          data: [
            { id: 1, firstName: 'Sam', lastName: 'Worthington', dateOfBirth: '1976-08-02' },
          ],
        });
      }
    });
    (axios.post as jest.Mock).mockResolvedValue({ data: { message: 'Movie added successfully' } });
  });

  it('renders the form and its elements', async () => {
    render(<AddMovieForm />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Add New Movie')).toBeInTheDocument();
    });

    expect(screen.getByLabelText('Movie Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Movie Length (in minutes)')).toBeInTheDocument();
    expect(screen.getByLabelText('Release Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Trailer URL')).toBeInTheDocument();
    expect(screen.getByLabelText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getByText('Genre')).toBeInTheDocument();
    expect(screen.getByText('Actors')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Movie' })).toBeInTheDocument();
  });

  it('submits the form with the correct data', async () => {
    render(<AddMovieForm />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Add New Movie')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Movie Title'), { target: { value: 'Test Movie' } });
    fireEvent.change(screen.getByLabelText('Movie Length (in minutes)'), { target: { value: '120' } });
    fireEvent.change(screen.getByLabelText('Release Date'), { target: { value: '2023-06-01' } });
    fireEvent.change(screen.getByLabelText('Trailer URL'), { target: { value: 'https://www.youtube.com/watch?v=test' } });
    fireEvent.change(screen.getByLabelText('Overview'), { target: { value: 'This is a test movie.' } });

    fireEvent.click(screen.getByText('Rating'));
    fireEvent.click(screen.getByText('PG-13'));
    fireEvent.click(screen.getByText('Director'));
    fireEvent.click(screen.getByText('James Cameron'));
    fireEvent.click(screen.getByText('Genre'));
    fireEvent.click(screen.getByText('Action'));
    fireEvent.click(screen.getByLabelText('Sam Worthington'));

    fireEvent.click(screen.getByRole('button', { name: 'Add Movie' }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/movies/', {
        id: 0,
        movieTitle: 'Test Movie',
        movieLength: 120,
        releaseDate: '2023-06-01',
        trailerUrl: 'https://www.youtube.com/watch?v=test',
        director: {
          id: 1,
          firstName: 'James',
          lastName: 'Cameron',
          dateOfBirth: '1954-08-16',
        },
        genre: {
          id: 1,
          genre: 'Action',
        },
        rating: {
          id: 3,
          rating: 'PG-13',
          description: 'Parents Strongly Cautioned',
        },
        actors: [{ id: 1 }],
        overview: 'This is a test movie.',
      });
    });
  });
});
