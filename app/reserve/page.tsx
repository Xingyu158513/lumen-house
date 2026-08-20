"use client";

import Image from "next/image";
import { useState } from "react";
import { assetPath } from "../assets";
import { SiteShell } from "../ui";

const roomOptions = [
  { name: "HORIZON SUITE", zh: "地平线套房", size: "112㎡", price: "¥8,600", image: assetPath("/images/suite-ocean.webp") },
  { name: "COAST HOUSE", zh: "海岸独栋", size: "186㎡", price: "¥12,800", image: assetPath("/images/hero-coast.webp") },
];

export default function ReservePage() {
  const [step, setStep] = useState(1);
  const [room, setRoom] = useState(0);
  const [complete, setComplete] = useState(false);
  return (
    <SiteShell>
      <section className="reserve-page">
        <header><p>DIRECT RESERVATION</p><h1>规划你的停留</h1><div>{[1, 2, 3].map((item) => <span key={item} className={step >= item ? "active" : ""}>0{item}<i />{item === 1 ? "日期与人数" : item === 2 ? "选择房型" : "确认行程"}</span>)}</div></header>
        {!complete && step === 1 && <div className="reserve-step stay-step"><div className="step-copy"><p>STEP 01</p><h2>何时出发，<br />和谁一起？</h2><p>选择入住日期后，我们会展示可订房型与当日礼遇。</p></div><form onSubmit={(e) => { e.preventDefault(); setStep(2); }}><label>酒店<select><option>海隅 HAEON COAST</option><option>屿庭 YURA COURTYARD</option><option>雾麓 MORU VALLEY</option></select></label><div><label>入住日期<input type="date" defaultValue="2026-09-18" /></label><label>离店日期<input type="date" defaultValue="2026-09-21" /></label></div><div><label>成人<select><option>2</option><option>1</option><option>3</option><option>4</option></select></label><label>儿童<select><option>0</option><option>1</option><option>2</option></select></label></div><button className="primary-action">查看可订房型 <span>→</span></button></form></div>}
        {!complete && step === 2 && <div className="reserve-step room-step"><div className="step-copy"><p>STEP 02</p><h2>选择你的房间</h2><p>所有价格均含双人早餐、欢迎礼遇与 16:00 延迟退房。</p></div><div className="room-options">{roomOptions.map((option, index) => <button key={option.name} className={room === index ? "selected" : ""} onClick={() => setRoom(index)}><div><Image unoptimized src={option.image} alt={option.zh} fill sizes="35vw" /></div><span>{index === 0 ? "BEST AVAILABLE" : "PRIVATE HOUSE"}</span><h3>{option.name}</h3><p>{option.zh} · {option.size}</p><b>{option.price}<small> / NIGHT</small></b><i>{room === index ? "已选择" : "选择此房型"}</i></button>)}</div><div className="step-actions"><button onClick={() => setStep(1)}>← 返回</button><button className="primary-action" onClick={() => setStep(3)}>继续 <span>→</span></button></div></div>}
        {!complete && step === 3 && <div className="reserve-step confirm-step"><div className="step-copy"><p>STEP 03</p><h2>确认这段行程</h2><p>这是一个前端演示流程，不会提交付款或真实个人资料。</p></div><div className="stay-summary"><div className="summary-image"><Image unoptimized src={roomOptions[room].image} alt={roomOptions[room].zh} fill sizes="40vw" /></div><h3>HAEON COAST · {roomOptions[room].name}</h3><dl><div><dt>入住</dt><dd>2026.09.18</dd></div><div><dt>离店</dt><dd>2026.09.21</dd></div><div><dt>住客</dt><dd>2 ADULTS</dd></div><div><dt>预计总价</dt><dd>{room === 0 ? "¥25,800" : "¥38,400"}</dd></div></dl><label>称呼<input placeholder="例如：林先生（仅保存在当前页面）" /></label><button className="primary-action" onClick={() => setComplete(true)}>保存行程草稿 <span>→</span></button><small>不需要银行卡，不会产生真实预订。</small></div><button className="back-link" onClick={() => setStep(2)}>← 返回选择房型</button></div>}
        {complete && <div className="reserve-complete"><span>✓</span><p>ITINERARY SAVED LOCALLY</p><h2>行程草稿已准备好</h2><p>海隅 · 2026.09.18 — 09.21<br />{roomOptions[room].zh} · 2位住客</p><button onClick={() => { setComplete(false); setStep(1); }}>重新规划</button></div>}
      </section>
    </SiteShell>
  );
}
