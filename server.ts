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

  // Serve background video by redirecting to the latest direct Cloudinary CDN URL (desktop or mobile)
  app.get("/api/video", async (req, res) => {
    const userAgent = (req.headers["user-agent"] || "").toLowerCase();
    const isMobileUA = /mobile|android|iphone|ipad|phone|iemobile/i.test(userAgent);
    const isMobile = req.query.device === "mobile" || req.query.mobile === "true" || isMobileUA;

    if (isMobile) {
      res.redirect("https://res.cloudinary.com/dqtyuf02y/video/upload/v1781023576/HnVideoEditor_2026_06_10_004448194_lso0dp.mp4");
    } else {
      res.redirect("https://res.cloudinary.com/dqtyuf02y/video/upload/v1780853514/gemini_generated_video_8b15deec_ifrrms.mp4");
    }
  });

  // Serve About background video by redirecting to the direct Cloudinary CDN URL (desktop or mobile)
  app.get("/api/video-about", async (req, res) => {
    const userAgent = (req.headers["user-agent"] || "").toLowerCase();
    const isMobileUA = /mobile|android|iphone|ipad|phone|iemobile/i.test(userAgent);
    const isMobile = req.query.device === "mobile" || req.query.mobile === "true" || isMobileUA;

    if (isMobile) {
      res.redirect("https://res.cloudinary.com/dqtyuf02y/video/upload/v1781023581/HnVideoEditor_2026_06_10_004413527_h17cuf.mp4");
    } else {
      res.redirect("https://res.cloudinary.com/dqtyuf02y/video/upload/v1780853433/gemini_generated_video_fbb884cc_oo3f8m.mp4");
    }
  });

  // Serve Certs background video by redirecting to the direct Cloudinary CDN URL (desktop or mobile)
  app.get("/api/video-certs", async (req, res) => {
    const userAgent = (req.headers["user-agent"] || "").toLowerCase();
    const isMobileUA = /mobile|android|iphone|ipad|phone|iemobile/i.test(userAgent);
    const isMobile = req.query.device === "mobile" || req.query.mobile === "true" || isMobileUA;

    if (isMobile) {
      res.redirect("https://res.cloudinary.com/dqtyuf02y/video/upload/v1781023581/HnVideoEditor_2026_06_10_004330226_gdoktp.mp4");
    } else {
      res.redirect("https://res.cloudinary.com/dqtyuf02y/video/upload/v1780853432/Make_character_alive_blinking_br__202606072030_onzb7e.mp4");
    }
  });

  // Serve Contact background video by redirecting to the direct Cloudinary CDN URL (desktop or mobile)
  app.get("/api/video-contact", async (req, res) => {
    const userAgent = (req.headers["user-agent"] || "").toLowerCase();
    const isMobileUA = /mobile|android|iphone|ipad|phone|iemobile/i.test(userAgent);
    const isMobile = req.query.device === "mobile" || req.query.mobile === "true" || isMobileUA;

    if (isMobile) {
      res.redirect("https://res.cloudinary.com/dqtyuf02y/video/upload/v1781023584/HnVideoEditor_2026_06_10_004224069_rnmhex.mp4");
    } else {
      res.redirect("https://res.cloudinary.com/dqtyuf02y/video/upload/v1780853433/gemini_generated_video_2c0a1bca_hpbmpi.mp4");
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
