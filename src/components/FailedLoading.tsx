import Image from 'next/image';

interface FailedLoadingProps {
  errorMessage: string;
}

export default function FailedLoading({ errorMessage }: FailedLoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-screen">
      <p className="mt-4 text-2xl font-bold text-red-500">Failed to load information</p>
      <Image 
        src="/crying.jpg" 
        alt="Error"
        width={500}
        height={500}
      />
      <p className="mt-4 text-xl text-red-500">{errorMessage}</p>
    </div>
  );
}
