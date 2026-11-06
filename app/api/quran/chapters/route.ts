import { NextResponse } from "next/server"; import { qf } from "@/lib/qf";
export const runtime="nodejs"; export async function GET(){try{const data=await qf.content.v4.chapters.list();return NextResponse.json(data,{headers:{"Cache-Control":"public, s-maxage=86400, stale-while-revalidate=604800"}})}catch{return NextResponse.json({error:"Quran Foundation request failed"},{status:502})}}
