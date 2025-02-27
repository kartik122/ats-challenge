import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, CheckCircle, XCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { analysisMetrics } from '@/lib/types/types';
import { matchingCriteria } from '@/lib/constants/constants';
import { Button } from '@/components/ui/button';

const WEIGHT_FACTORS = {
  SKILLS: 0.4,      // 40% Skills Match
  EXPERIENCE: 0.3,  // 30% Experience & Responsibilities
  EDUCATION: 0.2,   // 20% Education & Certifications
  SOFT_SKILLS: 0.1  // 10% Soft Skills
};

const ResumeScorePopup = ({ analysisResults }: { analysisResults: analysisMetrics[] | undefined }) => {
  const [openSection, setOpenSection] = React.useState<number | null>(null);

  const calculateWeightedScore = () => {
    if (!analysisResults || analysisResults.length < 4) return 0;
    
    // Map each result to its appropriate weight
    const weightedScores = [
      analysisResults[0].score * WEIGHT_FACTORS.SKILLS,
      analysisResults[1].score * WEIGHT_FACTORS.EXPERIENCE,
      analysisResults[2].score * WEIGHT_FACTORS.EDUCATION,
      analysisResults[3].score * WEIGHT_FACTORS.SOFT_SKILLS
    ];
    
    // Sum the weighted scores and normalize to a 0-100 scale
    // Assuming the input scores are on a scale of 1-20
    const totalWeightedScore = weightedScores.reduce((sum, score) => sum + score, 0);
    // console.log("Weighted Score = ", totalWeightedScore);
    return Math.round((totalWeightedScore / 25) * 100);

  };

  // Get score color based on the value
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  // Get progress bar color based on the value
  const getProgressColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const weightedScore = useMemo(() => calculateWeightedScore(), [analysisResults]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-2">
          View Analysis
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="mb-6 space-y-4">
          <DialogTitle className="flex justify-between items-center">
            <span>Resume Match Analysis</span>
            <Badge variant="outline" className={`text-lg px-3 py-1 m-2 ${getScoreColor(weightedScore)}`}>
              {weightedScore}%
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Match Score</span>
              <span className={getScoreColor(weightedScore)}>{weightedScore}%</span>
            </div>
            <Progress 
              value={weightedScore} 
              className="h-2" 
            />
          </div>

          <div className="space-y-4">
            {analysisResults?.map((result, index) => (
              <Collapsible 
                key={index}
                open={openSection === index}
                onOpenChange={() => setOpenSection(openSection === index ? null : index)}
              >
                <CollapsibleTrigger className="flex justify-between items-center w-full p-4 hover:bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">
                      {index === 0 ? "40%" : index === 1 ? "30%" : index === 2 ? "20%" : "10%"}
                    </Badge>
                    <span className="font-medium">{matchingCriteria[index].split(":")[0]}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={getScoreColor((result.score / 25) * 100)}>
                      {result.score}/25
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSection === index ? "rotate-180" : ""}`} />
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {result.positives.map((positive, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{positive}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center">
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-2">
                      {result.negatives.map((negative, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="h-2 w-2 rounded-full bg-red-500 mt-2 mr-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{negative}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeScorePopup;