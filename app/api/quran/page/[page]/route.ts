import { NextResponse } from "next/server";
import { qf } from "@/lib/qf";
export const runtime = "nodejs"; export const dynamic = "force-dynamic";
export async function GET(_req: Request, ctx: { params: Promise<{page:string}> }) {
 try { const {page}=await ctx.params; const n=Number(page); if(!Number.isInteger(n)||n<1||n>604) return NextResponse.json({error:"Invalid page"},{status:400});
 const verses:any[] = await qf.content.v4.verses.byPage(String(n));
 const rows=verses.map(v=>{const key=String(v.verseKey??"").split(":");return [Number(key[0]??v.chapterId??0),Number(v.verseNumberInChapter??key[1]??0),String(v.textUthmani??v.text??""),Number(v.pageNumber??n),Number(v.juzNumber??0),Number(v.hizbNumber??0),v.sajdah?1:0]});
 return NextResponse.json({rows},{headers:{"Cache-Control":"public, s-maxage=3600, stale-while-revalidate=86400"}});
 } catch(e:any){return NextResponse.json({error:"Quran Foundation request failed",detail:process.env.NODE_ENV==="development"?String(e?.message??e):undefined},{status:502});}
}
