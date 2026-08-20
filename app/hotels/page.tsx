"use client";

import { useMemo, useState } from "react";
import { properties } from "../data";
import { PropertyCard, SiteShell } from "../ui";

const regions = ["全部", "海岸", "岛屿", "山境", "城市"];

export default function HotelsPage() {
  const [region, setRegion] = useState("全部");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => properties.filter((property) => (region === "全部" || property.region === region) && `${property.name}${property.chinese}${property.location}`.toLowerCase().includes(query.toLowerCase())), [query, region]);
  return (
    <SiteShell>
      <section className="collection-intro">
        <p>THE COLLECTION · 06 PLACES</p><h1>去往一个地方，<br />也被那个地方改变。</h1><p>从海岸、岛屿到山境与旧城，寻找下一段适合你的停留。</p>
      </section>
      <section className="collection-tools" aria-label="筛选酒店">
        <div>{regions.map((item) => <button key={item} className={region === item ? "active" : ""} onClick={() => setRegion(item)}>{item}<span>{item === "全部" ? properties.length : properties.filter((p) => p.region === item).length}</span></button>)}</div>
        <label><span>SEARCH</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="输入目的地或酒店名称" /></label>
      </section>
      <section className="collection-results section-pad"><div className="result-count">{String(filtered.length).padStart(2, "0")} PLACES FOUND</div><div className="collection-grid">{filtered.map((property, index) => <PropertyCard key={property.id} property={property} index={index} />)}</div>{filtered.length === 0 && <div className="empty-result"><p>没有找到相符的居所。</p><button onClick={() => { setRegion("全部"); setQuery(""); }}>清除筛选</button></div>}</section>
    </SiteShell>
  );
}
