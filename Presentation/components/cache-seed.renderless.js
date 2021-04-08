import { useEffect } from "react";
import { BrowserCache } from "../../Infrastructure/browser-cache";

function CacheSeed() {
  useEffect(() => {
    const cache = new BrowserCache();
    const didSeedCache = !!cache.session.getItem("didSeedCache");
    if (!didSeedCache) {
      cache.session.setItem("SENTRY_DSN", process.env.SENTRY_DSN);
      cache.session.setItem("didSeedCache", true);
    }
  });
  return null;
}

export default CacheSeed;
