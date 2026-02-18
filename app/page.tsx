"use client";

import { useState, useRef, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import Image from "next/image";

type Mode = "translate" | "generate";

export default function Home() {
  const [mode, setMode] = useState<Mode>("translate");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const handleSubmit = useCallback(async () => {
    if (!input.trim()) return;

    // Abort any in-flight request
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    // Track which request this is so stale finally blocks don't clobber state
    const id = ++requestIdRef.current;

    setOutput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, mode }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) throw new Error("fail");

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setOutput((p) => p + dec.decode(value, { stream: true }));
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      if (id === requestIdRef.current) {
        setOutput("something went wrong. try again.");
      }
    } finally {
      // Only clear loading if this is still the active request
      if (id === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, [input, mode]);

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-svh flex items-start justify-center px-4 sm:px-5 pt-[6vh] sm:pt-[12vh] pb-10">
      <div className="w-full max-w-lg">
        <Image
          src="/clav/jester-hero.png"
          alt="jesterGPT"
          width={320}
          height={320}
          className="mx-auto mb-4 w-48 h-48 sm:w-80 sm:h-80"
          style={{ objectFit: "contain" }}
          unoptimized
          priority
        />
        {/* Title + mode toggle as one element */}
        <button
          onClick={() => setMode(mode === "translate" ? "generate" : "translate")}
          className="block mx-auto mb-8 font-mono text-2xl sm:text-3xl font-black cursor-pointer whitespace-nowrap tracking-tight text-center"
        >
          jestermaxx [{mode === "translate" ? "my copy" : "my idea"} ⇄]
        </button>

        {/* Input */}
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder={
            mode === "translate"
              ? "paste your text here..."
              : "describe your idea..."
          }
          rows={5}
          className="resize-none bg-card text-sm"
        />

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="w-full mt-3 font-mono text-sm tracking-wide cursor-pointer"
        >
          {isLoading ? "jestermaxxing..." : "submit"}
        </Button>

        {/* Output */}
        {output && (
          <div className="mt-6 p-4 bg-card border border-border text-sm leading-relaxed relative whitespace-pre-wrap">
            {output}
            {isLoading && <span className="typing-cursor" />}
            {!isLoading && (
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
