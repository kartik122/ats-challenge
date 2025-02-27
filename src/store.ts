// lib/store/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { analysisMetrics } from './lib/types/types';

export interface CVFile {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  content: string;
  uploadDate: string;
}

interface UserStore {
  currentCv: CVFile | null;
  setCurrentCv: (cv: CVFile | null) => void;
  cvFiles: CVFile[];
  addCV: (cv: CVFile) => void;
  removeCV: (id: string) => void;
  updateCV: (id: string, updatedData: Partial<CVFile>) => void;
  clearCVs: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // State for storing CV files
      currentCv: null,
      setCurrentCv: (cv) => set({ currentCv: cv }),
      cvFiles: [],
      
      // Add a new CV
      addCV: (cv) => set((state) => ({ 
        cvFiles: [...state.cvFiles, cv] 
      })),
      
      // Remove a CV by ID
      removeCV: (id) => set((state) => ({ 
        cvFiles: state.cvFiles.filter(file => file.id !== id) 
      })),
      
      // Update a CV
      updateCV: (id, updatedData) => set((state) => ({
        cvFiles: state.cvFiles.map(file => 
          file.id === id ? { ...file, ...updatedData } : file
        )
      })),
      
      // Clear all CVs
      clearCVs: () => set({ cvFiles: [] }),
    }),
    {
      name: 'user-cv-storage', // Name for the persisted storage
    }
  )
);

interface cvMetricsStore {
  cvMetrics: Record<string, analysisMetrics[]>;
  addCVMetrics: (id: string, metrics: analysisMetrics[]) => void;
}

export const useCVMetricsStore = create<cvMetricsStore>()(
  persist(
    (set) => ({
      cvMetrics: {},
      addCVMetrics: (id, metrics) => set((state) => ({
        cvMetrics: {
          ...state.cvMetrics,
          [id]: metrics
        }
      })),
    }),
    {
      name: 'cv-metrics-storage', // Name for the persisted storage
    }
  )
);