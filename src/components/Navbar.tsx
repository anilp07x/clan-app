'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useClanData } from '@/hooks/useApi';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: clanData } = useClanData();

  const navigation = [
    { name: 'Dashboard', href: '/' },
    { name: 'Membros', href: '/members' },
    { name: 'Guerras', href: '/wars' },
    { name: 'Raids', href: '/raids' },
    { name: 'Estatísticas', href: '/stats' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo e info do clã */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {clanData?.badgeUrls?.medium ? (
                <Image
                  src={clanData.badgeUrls.medium}
                  alt="Escudo do clã"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm font-semibold">C</span>
                </div>
              )}
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold text-gray-900">
                {clanData?.name || 'Carregando...'}
              </h1>
              <p className="text-sm text-gray-600">
                {clanData?.tag || '#LOADING'}
              </p>
            </div>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Botão mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Info do clã no mobile */}
              <div className="px-3 py-2 border-b border-gray-100 mb-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  {clanData?.name || 'Carregando...'}
                </h2>
                <p className="text-sm text-gray-600">
                  {clanData?.tag || '#LOADING'}
                </p>
              </div>
              
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
