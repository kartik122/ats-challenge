"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getJobData } from "@/lib/utils/jobUtils";
import { JobData } from "@/lib/types/job";
import { JobLoader } from "./loader";
import MovableResumePopup from "@/components/modals/MovableResumePopup";
import { JobRoleCard } from "@/components/job/JobRoleCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function JobBoard() {
    const [jobData, setJobData] = useState<JobData>();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const [showResumePopup, setShowResumePopup] = useState(false);
    
    useEffect(() => {
        
        setLoading(true);
        const fetchJobData = async () => {
            const jobData: JobData = await getJobData();
            setJobData(jobData);
            setLoading(false);
        }
        fetchJobData();
    }, []);

    return (
        <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col min-h-screen">  
            <div className="flex items-center mb-8">
                <Button
                variant="ghost"
                className="mr-4"
                onClick={() => router.push('/upload')}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Jobs
                    </Button>
            </div>       
            <MovableResumePopup onClose={() => setShowResumePopup(false)}/>
            <main className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
                <div className="flex flex-col items-center text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                        Job Board
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mb-8">
                        Get insights on your CV and resume
                    </p>
                </div>

                {!!loading ? (
                    <JobLoader />
                ) : (
                    <div className="space-y-6">
                        {jobData?.jobRoles.map((role) => (
                            <JobRoleCard 
                                key={role.id} 
                                role={role} 
                            />
                        ))}
                    </div>
                )}
            </main>
            </div>
        </div>
    );
}