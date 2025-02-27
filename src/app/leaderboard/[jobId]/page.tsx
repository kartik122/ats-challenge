"use client"

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardHeader } from "@/components/ui/card";
import { getJobById } from '@/lib/utils/jobUtils';
import { useCVMetricsStore, useUserStore } from '@/store';
import { JobRole } from '@/lib/types/job';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CandidateScore {
  id: string;
  score: number;
  metrics: any[];
}

export default function LeaderboardPage() {
  const router = useRouter();
  const params = useParams();
  const [job, setJob] = useState<JobRole | null>(null);
  const [candidates, setCandidates] = useState<CandidateScore[]>([]);
  const { cvMetrics } = useCVMetricsStore();
  const { cvFiles } = useUserStore();
  const [openCandidate, setOpenCandidate] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const jobData = await getJobById(params.jobId as string);
      setJob(jobData || null);
    };
    fetchJobDetails();
  }, [params.jobId]);

  useEffect(() => {
    const candidateScores: CandidateScore[] = Object.entries(cvMetrics)
      .filter(([key]) => key.includes(`:${params.jobId}`))
      .map(([key, metrics]) => {
        const candidateId = key.split(':')[0];
        const weightedScore = calculateOverallScore(metrics);
        return {
          id: candidateId,
          score: weightedScore,
          metrics: metrics
        };
      })
      .sort((a, b) => b.score - a.score);

    setCandidates(candidateScores);
  }, [cvMetrics, params.jobId]);

  const calculateOverallScore = (metrics: any[]) => {
    if (!metrics || metrics.length < 4) return 0;
    const weights = [0.4, 0.3, 0.2, 0.1];
    return Math.round(
      metrics.reduce((sum, metric, index) =>
        sum + (metric.score / 25) * 100 * weights[index], 0)
    );
  };

  const getCVName = (id: string) => {
    const cv = cvFiles.find((cv) => cv.id === id);
    if (!cv) return "";
    return cv.name;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          className="mr-4"
          onClick={() => router.push('/job-board')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{job?.title} - Candidate Rankings</h1>
        <p className="text-muted-foreground">
          Showing {candidates.length} candidates ranked by match score
        </p>
      </div>

      <div className="space-y-4">
        {candidates.map((candidate, index) => (
          <Card key={candidate.id}>
            <CardHeader className="p-4">
              <Collapsible
                open={openCandidate === candidate.id}
                onOpenChange={() => setOpenCandidate(openCandidate === candidate.id ? null : candidate.id)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="text-lg px-3">
                        #{index + 1}
                      </Badge>
                      <div className="text-left">
                        <h3 className="font-semibold">Candidate {candidate.id.slice(0, 8)} : {getCVName(candidate.id)}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${getScoreColor(candidate.score)}`}>
                            {candidate.score}%
                          </span>
                          <Progress value={candidate.score} className="w-32 h-2" />
                        </div>
                      </div>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                      openCandidate === candidate.id ? "rotate-180" : ""
                    }`} />
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="pt-4">
                  <div className="space-y-4">
                    {candidate.metrics.map((metric, idx) => (
                      <div key={idx} className="border-t pt-4">
                        <h4 className="font-medium mb-2">
                          {idx === 0 ? "Skills Match" :
                           idx === 1 ? "Experience" :
                           idx === 2 ? "Education" : "Soft Skills"}
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium text-green-600 mb-2">Strengths</h5>
                            <ul className="text-sm space-y-1">
                              {metric.positives.map((pos: string, i: number) => (
                                <li key={i} className="text-muted-foreground">• {pos}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-red-600 mb-2">Areas for Improvement</h5>
                            <ul className="text-sm space-y-1">
                              {metric.negatives.map((neg: string, i: number) => (
                                <li key={i} className="text-muted-foreground">• {neg}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}