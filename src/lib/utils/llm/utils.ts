import { JobRole } from "@/lib/types/job";
import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';
import { matchingCriteria } from '@/lib/constants/constants';
import { PROMPTS } from "@/lib/constants/prompts";
import { parseLLMResponse } from "../utils";
import { analysisMetrics } from "@/lib/types/types";

interface analyzePipelineParams {
    cvContent: string;
    jobInfo: JobRole;
    llm: ChatOpenAI | ChatAnthropic;
}

export const createLLM = (llmType: string) => {
    switch (llmType) {
      case 'openai':
        return new ChatOpenAI({
          modelName: 'gpt-4o-mini',
          temperature: 0.2,
          openAIApiKey: process.env.OPENAI_API_KEY,
        });
      case 'claude':
        return new ChatAnthropic({
          modelName: 'claude-3-opus-20240229',
          temperature: 0.2,
          anthropicApiKey: process.env.ANTHROPIC_API_KEY,
        });
      default:
        throw new Error(`Unsupported LLM type: ${llmType}`);
    }
  };

export const analyzePipeline = async ({cvContent, jobInfo, llm}: analyzePipelineParams): Promise<analysisMetrics[]> => {
    const messages = [
        {role: 'system', content: 'You are a very strong critique and hiring manager, that will score and analyze a CV based on the job requirements and the CV content.'},
    ]
    const matchResults = await Promise.all(
        matchingCriteria.map(async (criteria) => {
            const prompt = PROMPTS["get_score"].replace("{0}", JSON.stringify(jobInfo)).replace("{1}", cvContent).replace("{2}", criteria);
            messages.push({
                role: "human",
                content: prompt
            })
            const data = await llm.invoke(messages);
            return parseLLMResponse(data.content as string);

        })
    );
    return matchResults;
}
