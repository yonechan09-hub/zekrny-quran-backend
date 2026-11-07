import { NextResponse } from "next/server";
import { qf } from "@/lib/qf";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const pick = (o: any, camel: string, snake: string) => o?.[camel] ?? o?.[snake];

export async function GET(req: Request, ctx: { params: Promise<{ page: string }> }) {
  try {
    const { page } = await ctx.params;
    const n = Number(page);
    if (!Number.isInteger(n) || n < 1 || n > 604) {
      return NextResponse.json({ error: "Invalid page" }, { status: 400 });
    }

    const verses: any[] = await qf.content.v4.verses.byPage(n as any, {
      words: true,
      wordFields: { lineNumber: true, pageNumber: true, textQpcHafs: true, textUthmani: true },
      mushaf: 5,
      perPage: 50,
    } as any);

    if (new URL(req.url).searchParams.get("debug")) {
      const w = verses?.[0]?.words?.[0];
      return NextResponse.json({ verseKeys: Object.keys(verses?.[0] ?? {}), wordKeys: Object.keys(w ?? {}), firstWord: w ?? null });
    }

    const out = verses.map((v) => {
      const key = String(pick(v, "verseKey", "verse_key") ?? "").split(":");
      return {
        verse_key: key.join(":"),
        chapter_id: Number(key[0] ?? 0),
        verse_number: Number(v.verseNumberInChapter ?? v.verseNumber ?? v.verse_number ?? key[1] ?? 0),
        juz_number: Number(pick(v, "juzNumber", "juz_number") ?? 0),
        page_number: Number(pick(v, "pageNumber", "page_number") ?? n),
        words: (v.words ?? []).map((w: any) => ({
          position: Number(w.position ?? 0),
          char_type_name: pick(w, "charTypeName", "char_type_name"),
          line_number: Number(pick(w, "lineNumber", "line_number") ?? 0),
          page_number: Number(pick(w, "pageNumber", "page_number") ?? n),
          text_qpc_hafs: pick(w, "textQpcHafs", "text_qpc_hafs"),
          text_uthmani: pick(w, "textUthmani", "text_uthmani"),
        })),
      };
    });

    const hasLines = out.some((v) => v.words.some((w: any) => w.line_number > 0));
    if (!hasLines) {
      return NextResponse.json({ error: "No line_number in response" }, { status: 502 });
    }

    return NextResponse.json(
      { page: n, verses: out },
      { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" } }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: "Quran Foundation request failed", detail: process.env.NODE_ENV === "development" ? String(e?.message ?? e) : undefined },
      { status: 502 }
    );
  }
}
