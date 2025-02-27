import { analyzePipeline, createLLM } from "@/lib/utils/llm/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json("Method not allowed", { status: 405 });
 }
    const { resumeContent, selectedLLM, jobInfo } = await request.json();
    try {
        const llm = createLLM(selectedLLM);
        const result = await analyzePipeline({ cvContent: resumeContent, llm: llm, jobInfo: jobInfo });
        console.log("RESULT = ", result);
        return NextResponse.json(result, { status: 200 });
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        }, { status: 500 });
    }
}