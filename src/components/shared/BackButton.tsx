import { useRouter } from "next/navigation";
import { Button } from "../ui/button"
import { ArrowLeft } from "lucide-react";

export const BackButton = ({ pageRef, title }) => {
    const router = useRouter();
    return (
        <div className="flex items-center mb-8">
                <Button
                variant="ghost"
                className="mr-4"
                onClick={() => router.push(`/${pageRef}`)}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to {title}
                    </Button>
            </div>
    )
}