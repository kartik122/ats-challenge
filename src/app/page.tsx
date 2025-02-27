import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FileText, BarChart2, Trophy } from "lucide-react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Your existing header would go here */}
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Smart CV Parser & Ranker
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mb-8">
            Optimize your job search with AI-powered CV analysis that matches your profile to the perfect roles.
          </p>
          <Link href="/upload" passHref>
            <Button size="lg" className="px-8 py-6 text-lg">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="flex flex-col items-center text-center p-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Parse Multiple Formats</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Upload your CV in PDF, DOCX, or plain text format for instant analysis and optimization suggestions.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col items-center text-center p-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Job Role Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                See how well your CV matches different job roles with detailed skill and experience compatibility analysis.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col items-center text-center p-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Competitive Ranking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Get insights on where you stand compared to other candidates and recommendations to improve your CV.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted rounded-lg p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-2xl font-bold mb-2">Ready to optimize your job search?</h2>
            <p className="text-muted-foreground">
              Upload your CV now and get instant feedback on your career prospects.
            </p>
          </div>
          <Link href="/upload" passHref>
            <Button size="lg" className="whitespace-nowrap">
              Upload Your CV
            </Button>
          </Link>
        </div>
      </main>
      
      {/* Your existing footer would go here */}
    </div>
  );
}

export default Home;