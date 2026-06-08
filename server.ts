import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Helper function to dynamically resolve authenticated Streamable video links
  async function getStreamableVideoUrl(shortcode: string): Promise<string | null> {
    try {
      const url = `https://streamable.com/e/${shortcode}`;
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });
      if (!res.ok) {
        return null;
      }
      const html = await res.text();
      
      // Attempt 1: Match `"url": "//cdn-cf-east.streamable.com/video/mp4/..."`
      const matches = html.match(/"url"\s*:\s*"([^"]+\.mp4[^"]*)"/gi);
      if (matches) {
        for (const m of matches) {
          const innerUrlMatch = m.match(/"url"\s*:\s*"([^"]+)"/i);
          if (innerUrlMatch) {
            let cleared = innerUrlMatch[1]
              .replace(/\\u0026/g, "&")
              .replace(/&amp;/g, "&");
            if (cleared.startsWith("//")) {
              cleared = "https:" + cleared;
            }
            if (cleared.includes("/video/mp4/")) {
              return cleared;
            }
          }
        }
      }

      // Attempt 2: Search for any content-attribute or src-attribute containing `.mp4`
      const rawMatches = html.match(/(?:src|content)=["']((?:https?:)?\/\/[^\s"'><]+?\.mp4\?[^\s"'><]+)/gi);
      if (rawMatches) {
        for (const m of rawMatches) {
          const urlMatch = m.match(/(?:src|content)=["']([^"'\s]+)/i);
          if (urlMatch) {
            let cleared = urlMatch[1]
              .replace(/&amp;/g, "&")
              .replace(/\\u0026/g, "&");
            if (cleared.startsWith("//")) {
              cleared = "https:" + cleared;
            }
            if (cleared.includes("/video/mp4/")) {
              return cleared;
            }
          }
        }
      }
      
      return null;
    } catch {
      return null;
    }
  }

  // Serve background video by proxying/redirecting to the latest streamable CDN URL
  app.get("/api/video", async (req, res) => {
    res.redirect("https://res.cloudinary.com/dqtyuf02y/video/upload/v1780853514/gemini_generated_video_8b15deec_ifrrms.mp4");
  });

  // Serve About background video by proxying/redirecting to the latest streamable CDN URL
  app.get("/api/video-about", async (req, res) => {
    const resolvedUrl = await getStreamableVideoUrl("p093mq");
    if (resolvedUrl) {
      res.redirect(resolvedUrl);
    } else {
      // Direct, robust CDN fallback
      res.redirect("https://cdn-cf-east.streamable.com/video/mp4/p093mq.mp4?Expires=1781029680&Signature=Ih-zB~h9v00ae1QG40gKWD5QRUjszKqbXEM7D9f~tLBxL20IzT-1LWAJ59xJViESr56SoBImkt2yDGziglxI6p33bWcuL0n923autZxW0c9qLesVr7I1gi-ho-N2yVlmM578mKyy7DLrql~rUq1MQAdh-YSjR1O6eBWeHKXkBrXFxoWVIyK16n78Wfm7w0vqZQF9TBoCGlgDQ~5o3WnbaPsZJvirZhu48kyndTHEsIDErjKz1XkVb28dVSC~a8vUaLH-FKCNAFK3cPaJGNOMRp5KNCwZzf1RLrZfQAwBpdeu9KlB9kBB2XPAgeXaJdRvsF7E0uwlfJByIU1A4ClcNQ__&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ");
    }
  });

  // Serve Certs background video by proxying/redirecting to the latest streamable CDN URL
  app.get("/api/video-certs", async (req, res) => {
    const resolvedUrl = await getStreamableVideoUrl("5pf5e8");
    if (resolvedUrl) {
      res.redirect(resolvedUrl);
    } else {
      // Direct fallback
      res.redirect("https://cdn-cf-east.streamable.com/video/mp4/5pf5e8.mp4");
    }
  });

  // Serve Contact background video by proxying/redirecting to the latest streamable CDN URL
  app.get("/api/video-contact", async (req, res) => {
    const resolvedUrl = await getStreamableVideoUrl("2424gn");
    if (resolvedUrl) {
      res.redirect(resolvedUrl);
    } else {
      // Direct fallback
      res.redirect("https://cdn-cf-east.streamable.com/video/mp4/2424gn.mp4");
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Let React UI handle routing for anything else in Express v4
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
