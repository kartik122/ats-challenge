import { parseDocument } from "@/lib/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    if (request.method !== "POST") {
        return NextResponse.json("Method not allowed", { status: 405 });
    }
    const formData = await request.formData();
    const file = formData.get("file") as File;
    // console.log("FILE = ", file)
    try {
        const result = await parseDocument(file);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}