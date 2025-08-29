import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Separator className="mb-4" />
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Dashboard do Clã - Powered by Supercell API
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Dados atualizados em tempo real
          </p>
        </div>
      </div>
    </footer>
  );
}
