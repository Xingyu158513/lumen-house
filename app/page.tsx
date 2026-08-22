import Image from "next/image";
import Link from "next/link";
import { assetPath } from "./assets";
import { properties } from "./data";
import { BookingBar, EditorialSlider, PropertyCard, SiteShell } from "./ui";

export default function Home() {
  return (
    <SiteShell tone="dark">
      <section className="home-hero">
        <div className="hero-media"><Image unoptimized src={assetPath("/images/hero-coast.webp")} alt="海崖上的原创酒店建筑" fill priority sizes="100vw" /></div>
        <div className="hero-overlay" />
        <div className="hero-kicker"><span>37°18&apos; N</span><span>EAST COAST · 2026</span></div>
        <div className="hero-title"><p>AN ORIGINAL COLLECTION OF PLACES</p><h1><span>STAYS SHAPED</span><span>BY PLACE.</span></h1><div className="hero-message"><small>为在意建筑、自然与安静节奏的旅行者</small><h2>住进一个地方<br />本来的样子。</h2><p>三处原创目的地酒店，从海岸、岛屿到杉谷，让建筑退后，让风景成为停留的主角。</p><Link href="/hotels">先看三处居所 <i>→</i></Link></div></div>
        <div className="hero-scroll"><span>SCROLL TO DISCOVER</span><i /></div>
      </section>

      <div className="booking-dock"><BookingBar /></div>

      <section className="manifesto section-pad" data-reveal>
        <p className="section-label">01 / OUR POINT OF VIEW</p>
        <div><h2>真正的奢华，<br />是一个地方仍然像它自己。</h2><p>我们寻找沿海的风、山谷的雾、旧城的尺度，再让建筑与服务安静地退到它们身后。每一家 Lumen House 都拥有不同的节奏，却共享同一种克制。</p></div>
      </section>

      <section className="featured-grid section-pad">
        <div className="section-heading" data-reveal><p className="section-label">02 / WHERE TO NEXT</p><h2>三种地貌，<br />三种停留方式。</h2><Link href="/hotels">查看完整酒店名录 ↗</Link></div>
        <div className="property-stack">{properties.slice(0, 3).map((property, index) => <PropertyCard key={property.id} property={property} index={index} />)}</div>
      </section>

      <section className="split-story" data-reveal>
        <div className="split-image"><Image unoptimized src={assetPath("/images/suite-ocean.webp")} alt="面向海面的套房" fill sizes="(max-width: 800px) 100vw, 56vw" /></div>
        <div className="split-copy"><p className="section-label">03 / ROOMS AS LANDSCAPE</p><h2>把风景<br />留在房间里</h2><p>低矮的家具、连续的石材与深檐，将视线推向海平面。房间不是旅程的终点，而是一台让光、风与潮汐被重新感知的仪器。</p><ul><li><span>01</span> 每间套房独立面海</li><li><span>02</span> 私人管家与在地早餐</li><li><span>03</span> 48 小时弹性取消</li></ul><Link href="/property">查看房型 <span>→</span></Link></div>
      </section>

      <EditorialSlider items={[properties[0], properties[1], properties[2]]} />

      <section className="journal section-pad" id="journal">
        <div className="section-heading" data-reveal><p className="section-label">04 / FIELD NOTES</p><h2>行旅不是清单，<br />而是感官的重新排序。</h2></div>
        <div className="journal-grid">
          <article data-reveal><div><Image unoptimized src={assetPath("/images/dining-cliff.webp")} alt="海崖火房餐厅" fill sizes="50vw" /></div><p>TABLE / 08.2026</p><h3>把一场晚餐交给潮汐与火</h3><Link href="/property">阅读手记 ↗</Link></article>
          <article data-reveal><div><Image unoptimized src={assetPath("/images/mountain-onsen.webp")} alt="雾中山谷温泉" fill sizes="50vw" /></div><p>WELLNESS / 09.2026</p><h3>在杉谷，雾是一天的第一道疗愈</h3><Link href="/property">阅读手记 ↗</Link></article>
        </div>
      </section>

      <section className="closing-marquee" aria-hidden="true"><div>LUMEN HOUSE · STAYS SHAPED BY PLACE · LUMEN HOUSE · STAYS SHAPED BY PLACE · </div></section>
    </SiteShell>
  );
}
