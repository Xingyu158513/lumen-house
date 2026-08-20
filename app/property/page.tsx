import Image from "next/image";
import Link from "next/link";
import { assetPath } from "../assets";
import { SiteShell } from "../ui";

export default function PropertyPage() {
  return (
    <SiteShell tone="dark">
      <section className="property-hero">
        <Image unoptimized src={assetPath("/images/hero-coast.webp")} alt="海隅酒店位于海崖与松林之间" fill priority sizes="100vw" />
        <div className="property-hero-shade" /><div className="property-hero-copy"><p>EAST COAST · 37°18&apos; N</p><h1>HAEON<br />COAST</h1><div><span>海隅 · 东海岸松岬</span><Link href="/reserve">查询房价 ↗</Link></div></div><div className="property-hero-index">01 / 05</div>
      </section>
      <nav className="property-subnav"><a href="#overview">酒店概览</a><a href="#suites">客房与套房</a><a href="#dining">餐饮</a><a href="#rituals">在地体验</a><Link href="/reserve">立即预订</Link></nav>
      <section className="property-overview section-pad" id="overview" data-reveal><p className="section-label">A QUIET EDGE OF THE EAST SEA</p><div><h2>在松林结束、<br />海面开始的地方</h2><p>海隅沿一段天然花岗岩海岸展开。二十六间套房顺着坡地错落布置，屋顶不高于松梢；餐厅、汤池与阅读室则通过一条遮蔽风雨的石廊相连。</p></div><dl><div><dt>26</dt><dd>SUITES & HOUSES</dd></div><div><dt>03</dt><dd>RESTAURANTS</dd></div><div><dt>1.8KM</dt><dd>PRIVATE COAST</dd></div><div><dt>24H</dt><dd>HOUSE HOST</dd></div></dl></section>
      <section className="suite-feature" id="suites"><div className="suite-photo"><Image unoptimized src={assetPath("/images/suite-ocean.webp")} alt="海隅地平线套房" fill sizes="65vw" /></div><div className="suite-info" data-reveal><p>ACCOMMODATION · 01</p><h2>HORIZON<br />SUITE</h2><h3>地平线套房</h3><p>112㎡ · 私人露台 · 下沉客厅 · 海景浴室</p><p>一整面长窗将室内的水平线与海面重合。深檐让夏季保持阴凉，冬日的低角度阳光则可以进入房间深处。</p><div><span>每晚起 ¥8,600</span><Link href="/reserve">查看可订日期 →</Link></div></div></section>
      <section className="dining-feature" id="dining"><Image unoptimized src={assetPath("/images/dining-cliff.webp")} alt="海崖边的开放火房" fill sizes="100vw" /><div className="dining-shade" /><div data-reveal><p>DINING · FIRE & TIDE</p><h2>潮与火之间的<br />一张长桌</h2><p>海盐、山野菜与当日渔获在开放火房中完成。菜单不从固定菜式开始，而从当天的风向和码头抵达的食材开始。</p><Link href="/reserve">预留餐桌 ↗</Link></div></section>
      <section className="rituals section-pad" id="rituals"><div className="section-heading" data-reveal><p className="section-label">RITUALS OF PLACE</p><h2>把行程交给<br />海岸的节奏</h2></div><div className="ritual-grid"><article data-reveal><span>01 / DAWN</span><h3>松岬晨行</h3><p>日出前沿旧盐路进入海岬，回到酒店时，早餐刚从火房端出。</p></article><article data-reveal><span>02 / TIDE</span><h3>潮间带餐桌</h3><p>跟随当地向导认识潮池、海藻与季节性贝类，晚餐会回应白天的发现。</p></article><article data-reveal><span>03 / NIGHT</span><h3>暗海观星</h3><p>离开建筑灯光，在崖边平台辨认夏季银河与冬季猎户。</p></article></div></section>
      <section className="property-gallery"><div><Image unoptimized src={assetPath("/images/courtyard-pool.webp")} alt="水院" fill sizes="40vw" /></div><div><Image unoptimized src={assetPath("/images/mountain-onsen.webp")} alt="山谷汤池" fill sizes="60vw" /></div><div><Image unoptimized src={assetPath("/images/suite-ocean.webp")} alt="面海套房" fill sizes="60vw" /></div></section>
    </SiteShell>
  );
}
