import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">Skill Connect</div>
        <div className="flex space-x-4">
          <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Iniciar Sesión
          </Link>
          <Link 
            href="/register" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Registrarse
          </Link>
        </div>
      </nav>
    </div>
  );
}