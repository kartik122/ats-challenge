"use server";

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import mammoth from "mammoth";

/**
 * Utility function to determine file type and parse accordingly
 * @param file - File object to parse
 * @returns Promise with extracted text and metadata
 */
export async function parseDocument(file: File): Promise<string> {
    // const fileName = file.name.toLowerCase();
    const mimeType = file.type;
    console.log("MIME TYPE = ", mimeType);
    switch (mimeType) {
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return parseDocx(file);
        case "application/pdf":
            return parsePdf(file);
        case "text/plain":
            return parseTextFile(file);
        default:
            throw new Error(
                "Unsupported file type. Please provide .docx, .odt, .pdf, .md, or .txt files.",
            );
    }
}

/**
 * Parses .docx files using mammoth
 * @param file - File object containing the .docx document
 * @returns Promise with extracted text and metadata
 */
async function parseDocx(file: File): Promise<string> {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await mammoth.extractRawText({ buffer });

        return result.value.trim();
    } catch (error) {
        console.error("Error parsing docx file:", error);
        throw new Error("Failed to parse .docx file");
    }
}

/**
 * Parses PDF files using PDFLoader
 * @param file - File object containing the PDF document
 * @returns Promise with extracted text and metadata
 */
async function parsePdf(file: File): Promise<string> {
    try {
        const loader = new PDFLoader(file, { splitPages: false });
        const singleDoc = await loader.load();
        const text = await singleDoc[0].pageContent;
        return text;
    } catch (error) {
        console.error("Error parsing PDF file:", error);
        throw new Error("Failed to parse PDF file");
    }
}

/**
 * Parses plain text files
 * @param file - File object containing the text file
 * @returns Promise with extracted text and basic metadata
 */
async function parseTextFile(file: File): Promise<string> {
    try {
        const text = await file.text();
        const metadata = {
            format: "plain text",
            createdAt: new Date(file.lastModified),
            modifiedAt: new Date(file.lastModified),
        };
        return text.trim();
    } catch (error) {
        console.error("Error parsing text file:", error);
        throw new Error("Failed to parse text file");
    }
}

/**
 * Parses a string LLM response and extracts the JSON data
 * @param responseString - The string response from the LLM
 * @returns Parsed JSON object with score, positives, and negatives
 */
export async function parseLLMResponse(responseString: string) {
    try {
      // Look for JSON pattern within the string (anything between { and })
      const jsonMatch = responseString.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        throw new Error('No JSON object found in response');
      }
      
      // Parse the matched JSON string
      const jsonData = JSON.parse(jsonMatch[0]);
      
      // Validate the structure
      if (
        typeof jsonData.score === 'undefined' ||
        !Array.isArray(jsonData.positives) ||
        !Array.isArray(jsonData.negatives)
      ) {
        throw new Error('Invalid JSON structure');
      }
      
      return {
        score: jsonData.score,
        positives: jsonData.positives,
        negatives: jsonData.negatives
      };
    } catch (error) {
      console.error('Error parsing LLM response:', error);
      // Return a default structure
      return {
        score: 0,
        positives: [],
        negatives: [],
        error: `Failed to parse response: ${error.message}`
      };
    }
  };