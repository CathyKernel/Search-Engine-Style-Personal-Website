"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { HomeView } from "@/components/google/home-view";
import { ResultsView } from "@/components/google/results-view";
import { TopicView } from "@/components/google/topic-view";
import { AboutView } from "@/components/google/about-view";
import { Footer } from "@/components/google/footer";
import { topics, type Topic } from "@/data/topics";

type TopicId = Topic["id"];

type View =
  | { type: "home" }
  | { type: "results"; query: string }
  | { type: "topic"; topicId: TopicId; anchor?: string }
  | { type: "about"; anchor?: string };

/* ---------- The browser URL is the external store for the view ---------- */

function subscribe(onUrlChange: () => void) {
  window.addEventListener("popstate", onUrlChange);
  return () => window.removeEventListener("popstate", onUrlChange);
}

function getSnapshot() {
  return window.location.href;
}

function getServerSnapshot() {
  return "/";
}

function viewFromHref(href: string): View {
  /* The base is only a parsing anchor for relative hrefs — never displayed. */
  const url = new URL(href, "http://localhost");
  const params = url.searchParams;
  const anchor = decodeURIComponent(url.hash.slice(1)) || undefined;
  const topic = params.get("topic");
  const about = params.get("about");
  const q = params.get("q");

  if (topic && topics.some((t) => t.id === topic)) {
    return { type: "topic", topicId: topic as TopicId, anchor };
  }
  if (about === "1") return { type: "about", anchor };
  if (q && q.trim().length > 0) return { type: "results", query: q };
  return { type: "home" };
}

function viewToUrl(view: View): string {
  switch (view.type) {
    case "results":
      return `/?q=${encodeURIComponent(view.query)}`;
    case "topic":
      return `/?topic=${view.topicId}${view.anchor ? `#${encodeURIComponent(view.anchor)}` : ""}`;
    case "about":
      return `/?about=1${view.anchor ? `#${encodeURIComponent(view.anchor)}` : ""}`;
    default:
      return "/";
  }
}

export default function Page() {
  const href = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const view = useMemo(() => viewFromHref(href), [href]);
  const [lastQuery, setLastQuery] = useState("");
  const viewKey = useMemo(
    () =>
      view.type === "topic"
        ? `topic-${view.topicId}`
        : view.type === "results"
          ? `results-${view.query}`
          : view.type,
    [view]
  );

  /* pushState doesn't fire popstate, so we announce the change ourselves. */
  const navigate = useCallback((next: View) => {
    window.history.pushState({}, "", viewToUrl(next));
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  const onSearch = useCallback(
    (q: string) => {
      setLastQuery(q);
      navigate({ type: "results", query: q });
    },
    [navigate]
  );

  const onGoHome = useCallback(() => navigate({ type: "home" }), [navigate]);

  const onOpenTopic = useCallback(
    (topicId: TopicId, anchor?: string) => navigate({ type: "topic", topicId, anchor }),
    [navigate]
  );

  const onOpenAbout = useCallback(
    (anchor?: string) => navigate({ type: "about", anchor }),
    [navigate]
  );

  const onGoBack = useCallback(() => window.history.back(), []);

  const onFooterNavigate = useCallback(
    (dest: "about" | "how" | "home") => {
      if (dest === "about") onOpenAbout();
      else if (dest === "how") onOpenAbout("how");
      else onGoHome();
    },
    [onOpenAbout, onGoHome]
  );

  return (
    <div key={viewKey} className="flex min-h-screen flex-col bg-white dark:bg-[#202124]">
      {view.type === "home" && (
        <HomeView
          onSearch={onSearch}
          onOpenTopic={(t) => onOpenTopic(t)}
          onOpenAbout={() => onOpenAbout()}
        />
      )}

      {view.type === "results" && (
        <ResultsView
          query={view.query}
          onSearch={onSearch}
          onGoHome={onGoHome}
          onOpenTopic={onOpenTopic}
          onOpenAbout={onOpenAbout}
        />
      )}

      {view.type === "topic" && (
        <TopicView
          topicId={view.topicId}
          anchor={view.anchor}
          query={lastQuery}
          onSearch={onSearch}
          onGoHome={onGoHome}
          onGoBack={onGoBack}
        />
      )}

      {view.type === "about" && (
        <AboutView
          anchor={view.anchor}
          query={lastQuery}
          onSearch={onSearch}
          onGoHome={onGoHome}
          onGoBack={onGoBack}
        />
      )}

      <Footer onNavigate={onFooterNavigate} />
    </div>
  );
}
