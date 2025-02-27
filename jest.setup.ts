import '@testing-library/jest-dom';
import React from 'react';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useParams() {
    return {};
  },
  usePathname() {
    return '';
  },
}));

jest.mock('next/link', () => {
  return jest.fn(({ children, ...props }) => {
    return React.createElement('a', props, children);
  });
});

// Mock lucide-react
jest.mock('lucide-react', () => ({
  FileText: () => React.createElement('div', { 'data-testid': 'mock-icon-filetext' }),
  Menu: () => React.createElement('div', { 'data-testid': 'mock-icon-menu' }),
  X: () => React.createElement('div', { 'data-testid': 'mock-icon-x' }),
  ChevronDown: () => React.createElement('div', { 'data-testid': 'mock-icon-chevrondown' }),
  Building2: () => React.createElement('div', { 'data-testid': 'mock-icon-building2' }),
  MapPin: () => React.createElement('div', { 'data-testid': 'mock-icon-mappin' }),
  Twitter: () => React.createElement('div', { 'data-testid': 'mock-icon-twitter' }),
  Linkedin: () => React.createElement('div', { 'data-testid': 'mock-icon-linkedin' }),
  ArrowRight: () => React.createElement('div', { 'data-testid': 'mock-icon-arrowright' }),
  Loader2: () => React.createElement('div', { 'data-testid': 'mock-icon-loader2' }),
  AlertCircle: () => React.createElement('div', { 'data-testid': 'mock-icon-alertcircle' }),
  Trash2: () => React.createElement('div', { 'data-testid': 'mock-icon-trash2' }),
  LineChart: () => React.createElement('div', { 'data-testid': 'mock-icon-linechart' })
}));

// Mock intersection observer
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;