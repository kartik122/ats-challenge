import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/shared/Header';

describe('Header Component', () => {
  it('renders the logo and brand name', () => {
    render(<Header />);
    expect(screen.getByText('CVParser')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('renders upload CV button', () => {
    render(<Header />);
    expect(screen.getByText('Upload CV')).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button', {
      name: /toggle menu/i
    });

    fireEvent.click(menuButton);

    expect(screen.getByText('CV Manager')).toBeInTheDocument();
    expect(screen.getByText('Documentation', {
      selector: '.md\\:hidden a'
    })).toBeInTheDocument();
  });

});