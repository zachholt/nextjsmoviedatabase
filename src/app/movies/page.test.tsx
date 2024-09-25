// import '@testing-library/jest-dom';
// import { render, screen, fireEvent } from '@testing-library/react';
// import MovieDisplay from './page';
// import axios from 'axios';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// jest.mock('axios');

// const queryClient = new QueryClient();

// const wrapper = ({ children }: { children: React.ReactNode }) => (
//   <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
// );

// describe('delete movie', () => {
//   it('should delete a movie', async () => {
//     // Mock the GET request to return a movie
//     (axios.get as jest.Mock).mockResolvedValueOnce({
//       data: [{ id: '1', movieTitle: 'Test Movie', movieLength: '120', releaseDate: '2023-01-01' }],
//     });

//     // Mock the DELETE request
//     (axios.delete as jest.Mock).mockResolvedValueOnce({});

//     // Render MovieDisplay with the QueryClientProvider
//     render(<MovieDisplay />, { wrapper });

//     // Wait for the movie to be rendered
//     const deleteButton = await screen.findByRole('button', { name: 'Delete Movie' });
//     fireEvent.click(deleteButton);

//     // Check if the delete function was called
//     expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/api/movies/1');
//   });
// });