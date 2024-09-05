import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt, imageName } = await req.json(); // Use req.json() to parse the body
    console.log("prompt: ", prompt);
    
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("output_format", "webp");
    formData.append("aspect_ratio", "2:3");

    const apiKey = process.env.STABILITY_AI_API_KEY;

    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "image/*",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`${response.status}: ${await response.text()}`);
    }

    const imageBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);

    // Convert the buffer to a base64 string
    const base64Image = buffer.toString('base64');

    // Return the base64 image in the response
    return NextResponse.json({ image: base64Image });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}