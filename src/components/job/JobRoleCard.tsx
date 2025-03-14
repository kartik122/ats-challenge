import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, } from "lucide-react";
import { JobRole } from '@/lib/types/job';
import { useCVMetricsStore, useUserStore } from '@/store';
import ResumeScorePopup from './ResumeScoreAnalysis';
import { AnalysisLoader } from './AnalysisLoader';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { analysisMetrics } from '@/lib/types/types';


interface JobRoleCardProps {
  role: JobRole;
}

export const JobRoleCard = ({ role }: JobRoleCardProps) => {
  const [selectedLLM, setSelectedLLM] = useState("openai");
  const [loading, setLoading] = useState<boolean>(false);
  const { cvMetrics, addCVMetrics } = useCVMetricsStore();
  const { currentCv, cvFiles } = useUserStore();
  const { toast } = useToast();
  const router = useRouter();

  const handleAnalyze = async () => {
    if (cvFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "No Resume Found",
        description: "Please upload a resume first to analyze",
      });
      router.push('/upload');
      return;
    }
    setLoading(true);
    if(!currentCv) {
        toast({
            title: 'No CV Error',
            description: 'Please upload a CV to continue',
        })
        return ;
    }
    const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: JSON.stringify({
            resumeContent: currentCv.content,
            selectedLLM: selectedLLM,
            jobInfo: role,
        }),
    });
    const data: analysisMetrics[] = await response.json();
    // console.log("DATA = ", data);
    addCVMetrics(currentCv.id + ":" + role.id, data);
    setLoading(false);
  };

  return (
    <>
    <Card className="flex flex-col items-center text-center p-2 max-w-2xl mx-auto" key={role.id}>
      <CardHeader className="w-full">
        <CardTitle>{role.title}</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <CardDescription className="text-base">
          {role.description}
        </CardDescription>
      </CardContent>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full px-4 justify-between">
        <div className="w-[200px]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                <span className="flex items-center justify-between w-full">
                  {selectedLLM === "openai" ? "OpenAI" : "Claude"}
                  <ChevronDown className="h-4 w-4 ml-2 opacity-70" />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              <DropdownMenuItem onClick={() => setSelectedLLM("openai")}>
                OpenAI
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedLLM("claude")}>
                Claude
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-[200px]">
          {!!loading ? (
            <AnalysisLoader />
          ) : (
            <Button className="w-full h-10" onClick={() => handleAnalyze()}>
              Analyse CV
            </Button>
          )}
        </div>
      </div>
    </Card>
    {currentCv && cvMetrics[currentCv.id +":"+role.id] &&
        <div className="flex flex-col sm:flex-row gap-2 mt-4 w-full px-4">
          <ResumeScorePopup analysisResults={cvMetrics[currentCv.id +":"+role.id]} />
          <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => router.push(`/leaderboard/${role.id}`)}
              >
                Check on Leaderboard
              </Button>
        </div>
        }
    </>
  );
};