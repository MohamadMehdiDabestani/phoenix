import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

export const Rtl = (props) => {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
};

