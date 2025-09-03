import { aj } from "../configs/arcjet.js";
import { ENV } from "../configs/env.js";

export const arcjetMiddleware = async (req, res, next) => {
  try {
    if (ENV.NODE_ENV === "development" || req.path === "/api/health") {
      return next(); // skip arcjet in dev
    }
    const decision = await aj.protect(req, {
      requested: 1, // consume 1 token for each request
    });
    console.log("Arcjet decision:", decision);
    if (decision.isDenied) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({
          error: "Too many requests",
          message: "Rate limit exceeded: Please try again later.",
        });
      } else if (decision.reason.isBot()) {
        res.status(403).json({
          error: "Bot Access denied",
          message: "Access denied: Bot traffic is not allowed.",
        });
      } else {
        res.status(403).json({
          error: "Forbidden",
          message: "Access denied: Your request was blocked by security rules.",
        });
      }
    }

    // check for spoofed bots
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Access denied: Malicious traffic detected.",
      });
    }
    next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);
    next();
  }
};
