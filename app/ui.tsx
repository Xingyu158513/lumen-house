"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { navItems, Property } from "./data";

export function SiteShell({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const root = document.documentElement;
        const distance = Math.max(1, root.scrollHeight - window.innerHeight);
        root.style.setProperty("--hero-shift", String(Math.min(y, window.innerHeight)));
        root.style.setProperty("--page-progress", String(Math.min(1, y / distance)));
        setScrolled(y > 48);
      });
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", sync);
      document.documentElement.style.removeProperty("--hero-shift");
      document.documentElement.style.removeProperty("--page-progress");
    };
  }, []);

  useEffect(() => {
    const open = menuOpen || bookingOpen;
    document.body.classList.toggle("overlay-open", open);
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); setBookingOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    const timer = window.setTimeout(() => menuRef.current?.querySelector<HTMLElement>("button,a,input")?.focus(), 80);
    return () => { window.clearTimeout(timer); window.removeEventListener("keydown", onKey); document.body.classList.remove("overlay-open"); };
  }, [bookingOpen, menuOpen]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8%" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className={`site-shell tone-${tone}`}>
      <div className="scroll-progress" aria-hidden="true" />
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <button className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label="打开导航"><i /><i /><span>菜单</span></button>
        <Link href="/" className="wordmark" aria-label="Lumen House 首页"><b>LUMEN</b><span>HOUSE</span></Link>
        <nav className="header-nav" aria-label="主要导航">
          <Link href="/hotels">酒店</Link><Link href="/property">目的地</Link>
        </nav>
        <button className="reserve-trigger" onClick={() => setBookingOpen(true)}>查询房价 <span>↗</span></button>
      </header>

      <div ref={menuRef} className={`menu-overlay ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen} inert={!menuOpen}>
        <button className="overlay-close" onClick={() => setMenuOpen(false)} aria-label="关闭导航">关闭 <span>×</span></button>
        <div className="menu-count">00 — 04</div>
        <nav aria-label="全屏导航">
          {navItems.map((item, index) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}>
              <small>0{index + 1}</small><strong>{item.en}</strong><span>{item.label}</span><i>↗</i>
            </Link>
          ))}
        </nav>
        <div className="menu-foot"><span>SHANGHAI · TOKYO · JEJU · COAST</span><span>RESERVATIONS +86 400 889 2028</span></div>
      </div>

      <BookingDrawer open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <main inert={menuOpen || bookingOpen}>{children}</main>
      <SiteFooter />
    </div>
  );
}

function BookingDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [destination, setDestination] = useState("海隅 HAEON COAST");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    onClose();
    router.push(`/reserve?destination=${encodeURIComponent(destination)}`);
  };
  return (
    <aside className={`booking-drawer ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open} aria-label="查询入住日期">
      <button className="drawer-mask" onClick={onClose} aria-label="关闭预订面板" />
      <form onSubmit={submit}>
        <button type="button" className="drawer-close" onClick={onClose}>关闭 <span>×</span></button>
        <p>DIRECT RESERVATIONS</p><h2>开始一段<br />安静的旅程</h2>
        <label>目的地<select value={destination} onChange={(e) => setDestination(e.target.value)}><option>海隅 HAEON COAST</option><option>屿庭 YURA COURTYARD</option><option>雾麓 MORU VALLEY</option></select></label>
        <div className="drawer-dates"><label>入住<input type="date" defaultValue="2026-09-18" /></label><label>离店<input type="date" defaultValue="2026-09-21" /></label></div>
        <label>住客<select defaultValue="2位成人 · 1间客房"><option>2位成人 · 1间客房</option><option>1位成人 · 1间客房</option><option>2位成人 · 1位儿童</option></select></label>
        <button className="primary-action" type="submit">查看房型与价格 <span>→</span></button>
        <small>直接预订礼遇：早餐 · 延迟退房 · 到店欢迎礼</small>
      </form>
    </aside>
  );
}

export function BookingBar() {
  const router = useRouter();
  const [destination, setDestination] = useState("海隅 · 东海岸");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    router.push(`/reserve?destination=${encodeURIComponent(destination)}`);
  };
  return (
    <form className="booking-bar" onSubmit={submit} aria-label="搜索酒店">
      <label><span>DESTINATION</span><select value={destination} onChange={(e) => setDestination(e.target.value)}><option>海隅 · 东海岸</option><option>屿庭 · 南方群岛</option><option>雾麓 · 北境杉谷</option></select></label>
      <label><span>CHECK IN</span><input type="date" defaultValue="2026-09-18" /></label>
      <label><span>CHECK OUT</span><input type="date" defaultValue="2026-09-21" /></label>
      <label><span>GUESTS</span><select defaultValue="2位住客"><option>2位住客</option><option>1位住客</option><option>家庭出行</option></select></label>
      <button type="submit"><span>查询可订房</span><i>↗</i></button>
    </form>
  );
}

export function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  return (
    <article className="property-card" data-reveal style={{ "--card-delay": `${index * 70}ms` } as React.CSSProperties}>
      <Link href="/property" className="property-image">
        <Image unoptimized src={property.image} alt={`${property.chinese}酒店环境`} fill sizes="(max-width: 760px) 90vw, 45vw" />
        <span className="image-index">0{index + 1}</span><i>查看酒店 ↗</i>
      </Link>
      <div className="property-copy"><p>{property.note}</p><h3>{property.name}</h3><h4>{property.chinese} · {property.location}</h4><p>{property.blurb}</p><div><span>每晚起 {property.from}</span><Link href="/property">探索酒店 →</Link></div></div>
    </article>
  );
}

export function EditorialSlider({ items }: { items: Property[] }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const move = (delta: number) => {
    setDirection(delta > 0 ? "next" : "prev");
    setActive((value) => (value + delta + items.length) % items.length);
  };
  const item = items[active];
  return (
    <section className={`editorial-slider direction-${direction}`} id="experiences" aria-live="polite">
      <div className="slider-image" key={item.id}><Image unoptimized src={item.image} alt={`${item.chinese}酒店`} fill sizes="100vw" priority={false} /></div>
      <div className="slider-shade" />
      <div className="slider-copy" key={`${item.id}-copy`}><p>FEATURED SANCTUARY · 0{active + 1}</p><h2>{item.name}</h2><h3>{item.chinese}<br />{item.location}</h3><p>{item.blurb}</p><Link href="/property">DISCOVER THIS PLACE <span>↗</span></Link></div>
      <div className="slider-controls"><button onClick={() => move(-1)} aria-label="上一家酒店">←</button><span>0{active + 1} / 0{items.length}</span><button onClick={() => move(1)} aria-label="下一家酒店">→</button></div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead"><p>STAY SOMEWHERE<br />THAT STAYS WITH YOU.</p><Link href="/reserve">开始规划旅程 <span>↗</span></Link></div>
      <div className="footer-grid"><div><b>LUMEN</b><span>HOUSE COLLECTION</span></div><nav><Link href="/hotels">酒店与居所</Link><Link href="/property">餐饮与体验</Link><Link href="/reserve">预订与礼遇</Link></nav><div><p>上海 · 东京 · 济州 · 北境</p><p>reservations@lumenhouse.example</p></div></div>
      <div className="footer-legal"><span>© 2026 LUMEN HOUSE — ORIGINAL CONCEPT</span><span>PRIVACY · ACCESSIBILITY · 中文 / EN</span></div>
    </footer>
  );
}
