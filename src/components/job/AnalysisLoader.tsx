import { Loader2 } from "lucide-react";

export const AnalysisLoader = () => {
    return (
        <div className="flex items-center justify-center w-full h-10 bg-muted rounded-md px-4">
            <Loader2 className="h-5 w-5 text-primary animate-spin mr-2" />
            <span className="text-sm font-medium">Analysing...</span>
        </div>
    );
};