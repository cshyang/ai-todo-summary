import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // todos in the body of the Post request
  const { todos } = await request.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `When responding, welcome the user and say welcome to the Todo App!
        Limit the response to 200 characters`,
      },
      {
        role: "user",
        content: `Hi there, provide a summary of the following todos. Count how many todos are in each category suach as to-do, in-progress, and done. Then tell the user to have a productive day! 
        Here's the data: ${JSON.stringify(todos)}`,
      },
    ],
  });

  return NextResponse.json(response.choices[0].message);
}
