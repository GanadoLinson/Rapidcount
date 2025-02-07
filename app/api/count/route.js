/* eslint-disable */
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { text } = await req.json();
        
        if (!text) {
            return NextResponse.json({ detail: "Text cannot be empty" }, { status: 400 });
        }
        
        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
        const charCount = text.length;
        const charCountNoSpaces = text.replace(/\s+/g, '').length;
        
        return NextResponse.json({
            word_count: wordCount,
            char_count: charCount,
            char_count_no_spaces: charCountNoSpaces
        });
    } catch (error) {
        console.error(error);  // Log the error for debugging purposes
        return NextResponse.json({ detail: "Invalid request" }, { status: 400 });
    }
}
