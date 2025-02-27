import { render, screen } from '@testing-library/react';
import Home from '../page';

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  FileText: () => <div data-testid="file-text-icon" />,
  BarChart2: () => <div data-testid="barchart2-icon" />,
  Trophy: () => <div data-testid="trophy-icon" />,
}));

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /Smart CV Parser & Ranker/i })).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<Home />);
    expect(screen.getByText(/Optimize your job search with AI-powered CV analysis/i)).toBeInTheDocument();
  });

  it('renders the feature cards', () => {
    render(<Home />);
    expect(screen.getByText('Parse Multiple Formats')).toBeInTheDocument();
    expect(screen.getByText('Job Role Matching')).toBeInTheDocument();
    expect(screen.getByText('Competitive Ranking')).toBeInTheDocument();
  });

  it('renders the feature descriptions', () => {
    render(<Home />);
    expect(screen.getByText(/Upload your CV in PDF, DOCX, or plain text format/i)).toBeInTheDocument();
    expect(screen.getByText(/See how well your CV matches different job roles/i)).toBeInTheDocument();
    expect(screen.getByText(/Get insights on where you stand compared to other candidates/i)).toBeInTheDocument();
  });

  it('renders the call-to-action section', () => {
    render(<Home />);
    expect(screen.getByText(/Ready to optimize your job search?/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload your CV now and get instant feedback/i)).toBeInTheDocument();
  });

  it('renders the action buttons', () => {
    render(<Home />);
    const getStartedButtons = screen.getAllByText(/Get Started/i);
    const uploadButtons = screen.getAllByText(/Upload Your CV/i);
    expect(getStartedButtons.length).toBeGreaterThan(0);
    expect(uploadButtons.length).toBeGreaterThan(0);
  });
});