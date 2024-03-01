import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'string-width';
import './chunks/astro_8yywXDSL.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message) {
  return log(opts, "info", label, message);
}
function warn(opts, label, message) {
  return log(opts, "warn", label, message);
}
function error(opts, label, message) {
  return log(opts, "error", label, message);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message) {
    info(this.options, label, message);
  }
  warn(label, message) {
    warn(this.options, label, message);
  }
  error(label, message) {
    error(this.options, label, message);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    })
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.vcxvXoSr.css"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.vcxvXoSr.css"}],"routeData":{"route":"/articles","type":"page","pattern":"^\\/articles\\/?$","segments":[[{"content":"articles","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/articles/index.astro","pathname":"/articles","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.vcxvXoSr.css"}],"routeData":{"route":"/articles/search","type":"page","pattern":"^\\/articles\\/search\\/?$","segments":[[{"content":"articles","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/articles/search.astro","pathname":"/articles/search","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.vcxvXoSr.css"}],"routeData":{"route":"/articles/tag/[...tag]","type":"page","pattern":"^\\/articles\\/tag(?:\\/(.*?))?\\/?$","segments":[[{"content":"articles","dynamic":false,"spread":false}],[{"content":"tag","dynamic":false,"spread":false}],[{"content":"...tag","dynamic":true,"spread":true}]],"params":["...tag"],"component":"src/pages/articles/tag/[...tag].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.vcxvXoSr.css"},{"type":"inline","content":"p{margin:20px 0}h2{margin:20px 0;font-size:1.8rem}\n"}],"routeData":{"route":"/articles/[...slug]","type":"page","pattern":"^\\/articles(?:\\/(.*?))?\\/?$","segments":[[{"content":"articles","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/articles/[...slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.vcxvXoSr.css"}],"routeData":{"route":"/about","type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.vcxvXoSr.css"}],"routeData":{"route":"/404","type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/search.json","type":"endpoint","pattern":"^\\/api\\/search\\.json$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"search.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/search.json.ts","pathname":"/api/search.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/components/Footer.astro",{"propagation":"in-tree","containsHead":false}],["/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/layouts/MainLayout.astro",{"propagation":"in-tree","containsHead":false}],["/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/pages/about.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/pages/articles/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/articles/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/pages/articles/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/articles/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/pages/articles/search.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/articles/search@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/pages/articles/tag/[...tag].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/articles/tag/[...tag]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/pages/api/search.json.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/api/search.json@_@ts",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,s)=>{let n=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),n();break}});for(let e of s.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/src/pages/about.astro":"chunks/pages/about_TcWA0M6B.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_W0rwtaqQ.mjs","/src/pages/articles/search.astro":"chunks/pages/search_vI9pjLMK.mjs","/src/pages/api/search.json.ts":"chunks/pages/search_xbg0AOc6.mjs","\u0000@astrojs-manifest":"manifest_SYzUKiFC.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_bBpX1LJN.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_7zfoK77M.mjs","\u0000@astro-page:src/pages/articles/index@_@astro":"chunks/index_DIGDoS8n.mjs","\u0000@astro-page:src/pages/articles/search@_@astro":"chunks/search_Qe-EmZlK.mjs","\u0000@astro-page:src/pages/articles/tag/[...tag]@_@astro":"chunks/_.._TfRxDrG5.mjs","\u0000@astro-page:src/pages/articles/[...slug]@_@astro":"chunks/_.._3L4WzlHk.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_mE3B-G-X.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_GxH-_65G.mjs","\u0000@astro-page:src/pages/api/search.json@_@ts":"chunks/search_ZGJl4VVU.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/best-laptops-for-developers.md?astroContentCollectionEntry=true":"chunks/best-laptops-for-developers_oTl8SgYJ.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/cannon-excellence.md?astroContentCollectionEntry=true":"chunks/cannon-excellence_ogZVOMwt.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/cutting-edge-tablets.md?astroContentCollectionEntry=true":"chunks/cutting-edge-tablets_RdBWPX_4.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/elevate-your-mobile-experience.md?astroContentCollectionEntry=true":"chunks/elevate-your-mobile-experience_ll3XCtab.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/guardian-of-the-digital-realm.md?astroContentCollectionEntry=true":"chunks/guardian-of-the-digital-realm_A22fyKmW.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/immerse-in-the-virtual-world.md?astroContentCollectionEntry=true":"chunks/immerse-in-the-virtual-world_cb9yh_iN.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/world-of-drones.md?astroContentCollectionEntry=true":"chunks/world-of-drones_VtJtaZdv.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/best-laptops-for-developers.md?astroPropagatedAssets":"chunks/best-laptops-for-developers_fQQQ0ON5.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/cannon-excellence.md?astroPropagatedAssets":"chunks/cannon-excellence_cE47Fivr.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/cutting-edge-tablets.md?astroPropagatedAssets":"chunks/cutting-edge-tablets_-iUnAtOE.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/elevate-your-mobile-experience.md?astroPropagatedAssets":"chunks/elevate-your-mobile-experience_Y27X88uu.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/guardian-of-the-digital-realm.md?astroPropagatedAssets":"chunks/guardian-of-the-digital-realm_LmYBas9b.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/immerse-in-the-virtual-world.md?astroPropagatedAssets":"chunks/immerse-in-the-virtual-world_8nGN3ZwS.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/world-of-drones.md?astroPropagatedAssets":"chunks/world-of-drones_f-7YwmKa.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/best-laptops-for-developers.md":"chunks/best-laptops-for-developers_7hsR0hjO.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/cannon-excellence.md":"chunks/cannon-excellence_EO-Cl_7d.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/cutting-edge-tablets.md":"chunks/cutting-edge-tablets_VCDatO6X.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/elevate-your-mobile-experience.md":"chunks/elevate-your-mobile-experience_RtbWy77k.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/guardian-of-the-digital-realm.md":"chunks/guardian-of-the-digital-realm_jo1w3fy3.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/immerse-in-the-virtual-world.md":"chunks/immerse-in-the-virtual-world_ZNU4wOFl.mjs","/Users/xeonpowersystem/Documents/_Works/Web-DEV/Astro-Projects/astro-blog/src/content/blog/world-of-drones.md":"chunks/world-of-drones_aVIUmE9s.mjs","astro:scripts/before-hydration.js":""},"assets":["/_astro/team1.h16uyLK_.png","/_astro/error-404.DseNikHR.png","/_astro/team3.dJ45xbp-.png","/_astro/team2.nMfarSHx.png","/_astro/about.tRWd0W6T.jpg","/_astro/logo.AafrY0HE.png","/_astro/about.vcxvXoSr.css","/favicon.svg","/images/image1.png","/images/image2.png","/images/image3.png","/images/image4.png","/images/image5.png","/images/image6.png","/images/image7.png","/images/screen.png"]});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
