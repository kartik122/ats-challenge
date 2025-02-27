import { Loader2 } from "lucide-react";

export const JobLoader = () => {
    return (
        <div className="flex justify-center items-center mb-6">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <span className="ml-3 text-lg font-medium">Loading jobs...</span>
        </div>
    );
};