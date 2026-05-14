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
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-500 dark:text-white/60">Developer discovery</p>
          <h1 className="mt-4 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl">
            Find developers by skill, craft, and momentum.
          </h1>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            Search the community, filter by specialty, and build a sharper network around what you actually ship.
          </p>
        </div>
      </section>
      <Card className="space-y-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600 dark:text-zinc-400" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-11" placeholder="Search developers or skills" />
        </div>
        <div className="flex flex-wrap gap-2">
          {skillFilters.map((filter) => (
            <button key={filter} onClick={() => setSkill(filter)}>
              <Badge className={skill === filter ? "border-zinc-950 bg-zinc-950 text-white dark:border-white/20 dark:bg-white/10 dark:text-white" : ""}>{filter}</Badge>
            </button>
          ))}
        </div>
      </Card>
      {filteredDevelopers.length ? (
        <div className="grid gap-5 lg:grid-cols-3">
          {filteredDevelopers.map((developer, index) => (
            <div key={developer.id} className={index % 2 === 0 ? "lg:translate-y-8" : ""}>
              <DeveloperCard developer={developer} />
            </div>
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




