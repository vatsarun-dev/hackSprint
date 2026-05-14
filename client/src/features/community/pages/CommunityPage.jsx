import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { developers } from "../../../lib/mock-data";
import { useDebounce } from "../../../hooks/useDebounce";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import DeveloperCard from "../../../components/cards/DeveloperCard";
import EmptyState from "../../../components/loaders/EmptyState";

const skillFilters = ["All", "React", "GSAP", "Node.js", "Open Source", "DX"];

const CommunityPage = () => {
  const [query, setQuery] = useState("");
  const [skill, setSkill] = useState("All");
  const debouncedQuery = useDebounce(query, 250);

  const filteredDevelopers = useMemo(() => {
    return developers.filter((developer) => {
      const matchesQuery =
        developer.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        developer.skills.some((item) => item.toLowerCase().includes(debouncedQuery.toLowerCase()));
      const matchesSkill = skill === "All" || developer.skills.includes(skill);
      return matchesQuery && matchesSkill;
    });
  }, [debouncedQuery, skill]);

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(139,92,246,0.14),rgba(59,130,246,0.05))] p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.22em] text-indigo-300">Developer discovery</p>
        <h1 className="mt-3 text-4xl font-semibold">Find developers by skill, craft, and momentum</h1>
        <p className="mt-4 max-w-2xl text-[var(--muted-foreground)]">
          Search the community, filter by specialty, and build a sharper network around what you actually ship.
        </p>
      </section>
      <Card className="space-y-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-11" placeholder="Search developers or skills" />
        </div>
        <div className="flex flex-wrap gap-2">
          {skillFilters.map((filter) => (
            <button key={filter} onClick={() => setSkill(filter)}>
              <Badge className={skill === filter ? "border-indigo-400/40 bg-indigo-500/15 text-indigo-200" : ""}>{filter}</Badge>
            </button>
          ))}
        </div>
      </Card>
      {filteredDevelopers.length ? (
        <div className="grid gap-5 lg:grid-cols-3">
          {filteredDevelopers.map((developer) => (
            <DeveloperCard key={developer.id} developer={developer} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No developers match that search"
          description="Try another skill tag or broaden the search terms to discover more builders."
        />
      )}
    </div>
  );
};

export default CommunityPage;
