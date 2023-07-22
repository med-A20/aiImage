// export async function GET(request) {
//     res.status(200).json({ message: "My first API route" });
//   }


import { NextResponse, NextRequest } from 'next/server'
import { Configuration, OpenAIApi } from 'openai-edge'

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(config)
   
 
export async function GET() {
 
 
  return NextResponse.json({ message : "testes" })
}

export async function POST(req){
    try {
        const { prompt } = await req.body;

        if(!config.apiKey){
          return new NextResponse("open Ai key error")
        }
    
        const aiResponse = await openai.createImage({
          n: 1,
          size: '1024x1024',
          response_format: 'b64_json',
          prompt : prompt
        });
        console.log({aiResponse})
        const image = aiResponse?.data?.data[0].url;
        return new NextResponse.json({ photo: image });
      } catch (error) {
        console.error("the error is" + error);
        return new NextResponse("Error", {status : 400});
      }
}