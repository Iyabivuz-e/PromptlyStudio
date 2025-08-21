import React from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Code2,
  Boxes,
  Paintbrush2,
  PlugZap,
  Shapes,
  Settings2,
  Sparkles,
  Library,
  FileDown,
  TimerReset,
  TerminalSquare,
  Workflow,
  Layers,
  Network,
  Handshake,
  CloudUpload,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";

// Single-file React page presenting the Promptly Studio project specs with a clean, modern UI.
// TailwindCSS + Framer Motion + lucide-react. Default export is a component.

const SectionTitle: React.FC<{ kicker?: string; title: string; subtitle?: string }>
  = ({ kicker, title, subtitle }) => (
  <div className="mx-auto mb-8 max-w-3xl text-center">
    {kicker && (
      <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
        {kicker}
      </span>
    )}
    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">{title}</h2>
    {subtitle && (
      <p className="mt-3 text-muted-foreground">{subtitle}</p>
    )}
  </div>
);

const Stat: React.FC<{ label: string; value: string }>= ({ label, value }) => (
  <div className="rounded-2xl border bg-background p-4 text-center shadow-sm">
    <div className="text-2xl font-extrabold tracking-tight">{value}</div>
    <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
  </div>
);

const ListItem: React.FC<{ icon: React.ReactNode; title: string; desc: string }>
  = ({ icon, title, desc }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl border bg-muted/40">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold leading-tight">{title}</h4>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  </div>
);

const Pill: React.FC<{ text: string }>= ({ text }) => (
  <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">{text}</Badge>
);

const TimelineItem: React.FC<{
  phase: string;
  weeks: string;
  desc: string;
  active?: boolean;
}> = ({ phase, weeks, desc, active }) => (
  <div className="relative pl-8">
    <div className="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-primary bg-background"></div>
    <div className={`rounded-2xl border p-4 ${active ? "bg-primary/5" : "bg-background"}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-semibold">{phase}</h4>
        <Badge className="rounded-full" variant={active ? "default" : "secondary"}>{weeks}</Badge>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  </div>
);

const HeroGradient = () => (
  <div className="pointer-events-none absolute inset-0 -z-10">
    <div className="absolute left-1/2 top-[-10%] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/20 via-purple-400/10 to-amber-400/10 blur-3xl" />
  </div>
);

export default function PromptlyStudioSpecPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold">Promptly Studio</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Pill text="React" />
            <Pill text="TailwindCSS" />
            <Pill text="Framer Motion" />
            <Pill text="Vite" />
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost">Docs</Button>
            <Button size="sm" className="gap-2">
              <Rocket className="h-4 w-4" /> Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <HeroGradient />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-14 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs">
              <span className="inline-flex items-center gap-1"><PlugZap className="h-4 w-4"/> Zero‑config platform</span>
              <span className="text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1"><Library className="h-4 w-4"/> Rwanda Dev UI</span>
            </div>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
              From <span className="text-primary">prompt</span> or <span className="text-primary">design</span> → to a full React app
            </h1>
            <p className="max-w-xl text-muted-foreground">
              Transform text prompts and Figma/XD designs into production‑ready React + Tailwind apps. Edit, preview, export — all in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2"><Sparkles className="h-4 w-4"/> Generate from prompt</Button>
              <Button variant="outline" className="gap-2"><Paintbrush2 className="h-4 w-4"/> Import Figma/XD</Button>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4">
              <Stat label="Time to first app" value="< 2 min" />
              <Stat label="Templates included" value="30+" />
              <Stat label="Local components" value="RDC UI" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className=""
          >
            <Card className="mx-auto max-w-lg border-primary/30 shadow-lg shadow-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><TerminalSquare className="h-5 w-5"/> Monaco Editor (Integrated)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="rounded-xl border bg-muted/30 p-3 font-mono">
{`prompt: "Create a todo app with drag-and-drop and dark mode."
→ React + Tailwind generated in seconds.`}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border bg-background p-3">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold"><Code2 className="h-4 w-4"/> React + Tailwind</div>
                    <p className="text-xs">Components, styles & logic scaffolded automatically.</p>
                  </div>
                  <div className="rounded-xl border bg-background p-3">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold"><Layers className="h-4 w-4"/> html-to-jsx</div>
                    <p className="text-xs">Designs parsed to JSX seamlessly.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle kicker="1. Project Vision" title="One platform. Many ways to build." subtitle="Turn prompts and Figma/XD files into real apps — with a local Rwanda Dev Community UI library and zero configuration." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="space-y-2 p-6">
              <ListItem icon={<Code2 className="h-4 w-4"/>} title="Prompt → React app" desc="Generate components, styles, and logic from plain text." />
              <ListItem icon={<Paintbrush2 className="h-4 w-4"/>} title="Figma/XD → App" desc="Import designs and export working React + Tailwind code." />
              <ListItem icon={<Library className="h-4 w-4"/>} title="Rwanda Dev UI" desc="Community-driven components ready to use locally." />
              <ListItem icon={<PlugZap className="h-4 w-4"/>} title="Zero‑config" desc="Install once, everything is pre‑wired and ready." />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Objectives</CardTitle></CardHeader>
            <CardContent className="grid gap-3 p-6">
              <ListItem icon={<Workflow className="h-4 w-4"/>} title="Generate apps w/o setup" desc="Skip boilerplate and start building features." />
              <ListItem icon={<TerminalSquare className="h-4 w-4"/>} title="Integrated editor" desc="Edit, preview, and export in one UI." />
              <ListItem icon={<Paintbrush2 className="h-4 w-4"/>} title="Import designs" desc="Transform Figma/XD into React + Tailwind." />
              <ListItem icon={<Library className="h-4 w-4"/>} title="Local library" desc="Share & customize templates and components." />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Deliverables (MVP)</CardTitle></CardHeader>
            <CardContent className="grid gap-3 p-6">
              <ListItem icon={<TerminalSquare className="h-4 w-4"/>} title="React app with editor" desc="Monaco-based editor embedded in UI." />
              <ListItem icon={<Sparkles className="h-4 w-4"/>} title="Prompt → Code" desc="React + Tailwind generation pipeline." />
              <ListItem icon={<Paintbrush2 className="h-4 w-4"/>} title="Figma import" desc="Design-to-code with html-to-jsx parser." />
              <ListItem icon={<Library className="h-4 w-4"/>} title="Component library" desc="Ready-to-use RDC components." />
              <ListItem icon={<FileDown className="h-4 w-4"/>} title="Full export" desc="One-click export of complete projects." />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle kicker="4. Technologies & Tools" title="Modern, fast, and battle‑tested." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><Shapes className="h-5 w-5"/> Frontend</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2 p-6">
              <Pill text="React.js" />
              <Pill text="TailwindCSS" />
              <Pill text="Framer Motion" />
              <Pill text="Vite" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><Settings2 className="h-5 w-5"/> Backend</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2 p-6">
              <Pill text="Node.js + Express" />
              <Pill text="Supabase / Firebase" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><Network className="h-5 w-5"/> AI & Dev Tools</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2 p-6">
              <Pill text="OpenAI / Anthropic" />
              <Pill text="Figma API" />
              <Pill text="html-to-jsx" />
              <Pill text="GitHub Actions" />
              <Pill text="Docker" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* MVP & Features */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle kicker="3. MVP" title="What ships in the first release" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Core Features</CardTitle></CardHeader>
            <CardContent className="grid gap-3 p-6">
              <ListItem icon={<TerminalSquare className="h-4 w-4"/>} title="UI with integrated code editor" desc="Monaco editor, live preview, export." />
              <ListItem icon={<Sparkles className="h-4 w-4"/>} title="Prompt → React + Tailwind" desc="Guided generation with templates and boilerplates." />
              <ListItem icon={<Paintbrush2 className="h-4 w-4"/>} title="Design import" desc="Figma/XD to React via API." />
              <ListItem icon={<Library className="h-4 w-4"/>} title="Pre‑integrated library" desc="RDC components available out of the box." />
              <ListItem icon={<FileDown className="h-4 w-4"/>} title="Full project export" desc="Ship to Vite + Tailwind projects instantly." />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Experience</CardTitle></CardHeader>
            <CardContent className="grid gap-3 p-6">
              <ListItem icon={<Handshake className="h-4 w-4"/>} title="Zero‑config install" desc="Everything configured on first run." />
              <ListItem icon={<Boxes className="h-4 w-4"/>} title="Templates & sharing" desc="Share, fork, and customize community templates." />
              <ListItem icon={<CloudUpload className="h-4 w-4"/>} title="Export ready" desc="One click to download the full codebase." />
              <ListItem icon={<Settings2 className="h-4 w-4"/>} title="Backend ready" desc="Connect Express + Supabase/Firebase quickly." />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle kicker="5. Project Timeline" title="From idea to launch" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Plan</CardTitle></CardHeader>
            <CardContent className="space-y-4 p-6">
              <TimelineItem phase="Phase 1 — Design & Architecture" weeks="2 weeks" desc="System design, UX flows, and component inventory." active />
              <TimelineItem phase="Phase 2 — Technical foundation" weeks="3 weeks" desc="Vite, Tailwind, editor shell, and generation pipeline." />
              <TimelineItem phase="Phase 3 — Prompt-based generation" weeks="4 weeks" desc="Prompt parsing, code synthesis, templates." />
              <TimelineItem phase="Phase 4 — Figma/XD import" weeks="4 weeks" desc="Figma API integration and html-to-jsx mapping." />
              <TimelineItem phase="Phase 5 — Packaging & Marketplace" weeks="3 weeks" desc="Templates, components, and sharing features." />
              <TimelineItem phase="Phase 6 — Testing & Launch" weeks="2 weeks" desc="E2E tests, docs, and release." />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Highlights</CardTitle></CardHeader>
            <CardContent className="grid gap-3 p-6">
              <ListItem icon={<TimerReset className="h-4 w-4"/>} title="Fast track" desc="Under 18 weeks from concept to MVP." />
              <ListItem icon={<Boxes className="h-4 w-4"/>} title="Component driven" desc="Standardized RDC UI library from day one." />
              <ListItem icon={<Sparkles className="h-4 w-4"/>} title="AI‑assisted" desc="Prompt + design inputs for maximum speed." />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-6">
        <div className="rounded-3xl border bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-bold md:text-2xl">Ready to turn ideas into interfaces?</h3>
              <p className="mt-1 text-muted-foreground">Generate apps from prompts, import Figma/XD, and export clean React + Tailwind code.</p>
            </div>
            <div className="flex gap-3">
              <Button className="gap-2"><Rocket className="h-4 w-4"/> Launch Studio</Button>
              <Button variant="outline">View Components</Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Promptly Studio — Built with love in Rwanda 🇷🇼
      </footer>
    </div>
  );
}