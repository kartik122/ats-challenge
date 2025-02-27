export interface JobRole {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    responsibilities: string[];
    technicalRequirements: string[];
    softSkills: string[];
    experience: string;
    education: string;
    additionalCriteria: {
      hourlyRate: string;
      shiftTimings: string;
    };
}

export interface JobData {
    jobRoles: JobRole[];
}

