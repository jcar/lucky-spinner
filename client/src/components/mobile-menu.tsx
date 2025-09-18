import { useState } from 'react';
import { Link } from 'wouter';

interface MobileMenuProps {
  currentPath?: string;
}

export default function MobileMenu({ currentPath = '/' }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/', label: 'Home', icon: 'fas fa-home' },
    { path: '/about', label: 'About', icon: 'fas fa-info-circle' },
    { path: '/privacy', label: 'Privacy', icon: 'fas fa-shield-alt' },
    { path: '/terms', label: 'Terms', icon: 'fas fa-file-contract' },
    { path: '/contact', label: 'Contact', icon: 'fas fa-envelope' },
  ];

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Toggle menu"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-lg`} />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-64 bg-card border-l border-border z-50 shadow-lg">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <i className="fas fa-dice text-primary-foreground text-sm" />
                  </div>
                  <span className="font-semibold">Lucky Spinner</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-muted-foreground hover:text-foreground"
                >
                  <i className="fas fa-times" />
                </button>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                  >
                    <div
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                        currentPath === item.path
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }`}
                    >
                      <i className={`${item.icon} w-5`} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </div>
  );
}