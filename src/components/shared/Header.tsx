"use client"
import { FC } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { FileText, Menu, X } from "lucide-react";
import { useState } from 'react';

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">CVParser</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/documentation" className="text-gray-700 hover:text-blue-600 transition-colors">
              Documentation
            </Link>
            <Link href="/support" className="text-gray-700 hover:text-blue-600 transition-colors">
              Support
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/upload">
              <Button>Upload CV</Button>
            </Link>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4 pb-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/cv-upload" className="text-gray-700 hover:text-blue-600 transition-colors">
                CV Manager
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                Documentation
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                Support
              </Link>
            </nav>
            <div className="pt-4 border-t border-gray-100">
              <Link href="/cv-upload">
                <Button className="w-full">Upload CV</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;