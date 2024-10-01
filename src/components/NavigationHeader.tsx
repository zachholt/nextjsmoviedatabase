import Link from "next/link";
import Image from "next/image";

const NavigationHeader = () => {
  const navItems = [
    { href: "/actors", label: "Actors" },
    { href: "/directors", label: "Directors" },
    { href: "/movies", label: "Movies" },
  ];

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-2">
              <Image
                src="/movie-slate.png"
                alt="Movie Database Logo"
                width={32}
                height={32}
              />
            </div>
            <Link href="/" className="text-white text-xl font-bold">
              Movie Database
            </Link>
          </div>
          <div className="flex space-x-4">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationHeader;