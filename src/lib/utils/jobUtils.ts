"use server";
import { JobData, JobRole } from "@/lib/types/job";
import { jobRoles } from "@/lib/constants/jobRoles"; 

/**
  This function reads the resources.json file and returns the job roles as an array of objects.
  @returns Promise<JobData> A promise that resolves to an object containing the job roles.
*/
export const getJobData = async (): Promise<JobData> =>  {
    try {
      return jobRoles;
    } catch (error) {
      console.error('Error loading job data:', error);
      return { jobRoles: [] };
    }
  }

/**
  This function takes an id as a parameter and returns the job role with the matching id.
  @param id - The id of the job role to be returned.
  @returns Promise<JobRole | undefined> A promise that resolves to the job role with the matching id, or undefined if no job role is found.
*/
export const getJobById = async (id: string): Promise<JobRole | undefined> => {
  const data = await getJobData();
  return data.jobRoles.find(job => job.id === id);
}