"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { assetPath } from "../assets";
import { bookingDestinations } from "../data";
import { SiteShell } from "../ui";

const roomOptions = [
  { name: "HORIZON SUITE", zh: "地平线套房", size: "112㎡", price: "¥8,600", priceValue: 8600, image: assetPath("/images/suite-ocean.webp") },
  { name: "COAST HOUSE", zh: "海岸独栋", size: "186㎡", price: "¥12,800", priceValue: 12800, image: assetPath("/images/hero-coast.webp") },
];

type StayDetails = {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: string;
  children: string;
};

const defaultStay: StayDetails = {
  destination: "haeon",
  checkIn: "2026-09-18",
  checkOut: "2026-09-21",
  adults: "2",
  children: "0",
};

function displayDate(value: string) {
  return value.replaceAll("-", ".");
}

function nightsBetween(checkIn: string, checkOut: string) {
  const start = Date.parse(`${checkIn}T00:00:00Z`);
  const end = Date.parse(`${checkOut}T00:00:00Z`);
  return Math.max(1, Math.round((end - start) / 86_400_000));
}

export default function ReservePage() {
  const [step, setStep] = useState(1);
  const [room, setRoom] = useState(0);
  const [complete, setComplete] = useState(false);
  const [stay, setStay] = useState<StayDetails>(defaultStay);
  const [formFeedback, setFormFeedback] = useState("已从首页进入？你的选择会自动显示在这里。");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const destination = params.get("destination");
    const checkIn = params.get("checkIn");
    const checkOut = params.get("checkOut");
    const adults = params.get("adults");
    const children = params.get("children");
    const validDestination = bookingDestinations.some((item) => item.id === destination);
    const frame = window.requestAnimationFrame(() => {
      setStay({
        destination: validDestination && destination ? destination : defaultStay.destination,
        checkIn: checkIn || defaultStay.checkIn,
        checkOut: checkOut || defaultStay.checkOut,
        adults: adults && ["1", "2", "3", "4"].includes(adults) ? adults : defaultStay.adults,
        children: children && ["0", "1", "2"].includes(children) ? children : defaultStay.children,
      });
      if (destination || checkIn || checkOut || adults || children) {
        setFormFeedback("已带入你在首页选择的目的地、日期与住客信息。");
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const selectedDestination = bookingDestinations.find((item) => item.id === stay.destination) ?? bookingDestinations[0];
  const nights = nightsBetween(stay.checkIn, stay.checkOut);
  const total = roomOptions[room].priceValue * nights;
  const guestSummary = `${stay.adults}位成人${stay.children !== "0" ? ` · ${stay.children}位儿童` : ""}`;

  const updateStay = (field: keyof StayDetails, value: string) => {
    setStay((current) => ({ ...current, [field]: value }));
  };

  const continueToRooms = () => {
    if (!stay.checkIn || !stay.checkOut || stay.checkOut <= stay.checkIn) {
      setFormFeedback("请确认离店日期晚于入住日期后再继续。");
      return;
    }
    setStep(2);
  };
  return (
    <SiteShell>
      <section className="reserve-page">
        <header><p>DIRECT RESERVATION</p><h1>规划你的停留</h1><div>{[1, 2, 3].map((item) => <span key={item} className={step >= item ? "active" : ""}>0{item}<i />{item === 1 ? "日期与人数" : item === 2 ? "选择房型" : "确认行程"}</span>)}</div></header>
        {!complete && step === 1 && <div className="reserve-step stay-step"><div className="step-copy"><p>STEP 01</p><h2>何时出发，<br />和谁一起？</h2><p>选择入住日期后，我们会展示可订房型与当日礼遇。</p></div><form onSubmit={(event) => { event.preventDefault(); continueToRooms(); }}><label>酒店<select value={stay.destination} onChange={(event) => updateStay("destination", event.target.value)}>{bookingDestinations.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label><div><label>入住日期<input type="date" value={stay.checkIn} onChange={(event) => updateStay("checkIn", event.target.value)} required /></label><label>离店日期<input type="date" value={stay.checkOut} min={stay.checkIn} onChange={(event) => updateStay("checkOut", event.target.value)} required /></label></div><div><label>成人<select value={stay.adults} onChange={(event) => updateStay("adults", event.target.value)}><option>2</option><option>1</option><option>3</option><option>4</option></select></label><label>儿童<select value={stay.children} onChange={(event) => updateStay("children", event.target.value)}><option>0</option><option>1</option><option>2</option></select></label></div><p className="reserve-form-feedback" role="status" aria-live="polite">{formFeedback}</p><button className="primary-action">查看可订房型 <span>→</span></button></form></div>}
        {!complete && step === 2 && <div className="reserve-step room-step"><div className="step-copy"><p>STEP 02</p><h2>选择你的房间</h2><p>所有价格均含双人早餐、欢迎礼遇与 16:00 延迟退房。</p><p className="selection-recap">已保留 · {selectedDestination.chinese} · {displayDate(stay.checkIn)} — {displayDate(stay.checkOut)} · {guestSummary}</p></div><div className="room-options">{roomOptions.map((option, index) => <button key={option.name} className={room === index ? "selected" : ""} onClick={() => setRoom(index)}><div><Image unoptimized src={option.image} alt={option.zh} fill sizes="35vw" /></div><span>{index === 0 ? "BEST AVAILABLE" : "PRIVATE HOUSE"}</span><h3>{option.name}</h3><p>{option.zh} · {option.size}</p><b>{option.price}<small> / NIGHT</small></b><i>{room === index ? "已选择" : "选择此房型"}</i></button>)}</div><div className="step-actions"><button onClick={() => setStep(1)}>← 返回</button><button className="primary-action" onClick={() => setStep(3)}>继续 <span>→</span></button></div></div>}
        {!complete && step === 3 && <div className="reserve-step confirm-step"><div className="step-copy"><p>STEP 03</p><h2>确认这段行程</h2><p>这是一个前端演示流程，不会提交付款或真实个人资料。</p></div><div className="stay-summary"><div className="summary-image"><Image unoptimized src={roomOptions[room].image} alt={roomOptions[room].zh} fill sizes="40vw" /></div><h3>{selectedDestination.name} · {roomOptions[room].name}</h3><dl><div><dt>入住</dt><dd>{displayDate(stay.checkIn)}</dd></div><div><dt>离店</dt><dd>{displayDate(stay.checkOut)}</dd></div><div><dt>住客</dt><dd>{guestSummary}</dd></div><div><dt>预计总价</dt><dd>¥{new Intl.NumberFormat("zh-CN").format(total)}</dd></div></dl><label>称呼<input placeholder="例如：林先生（仅保存在当前页面）" /></label><button className="primary-action" onClick={() => setComplete(true)}>保存行程草稿 <span>→</span></button><small>{nights} 晚 · 不需要银行卡，不会产生真实预订。</small></div><button className="back-link" onClick={() => setStep(2)}>← 返回选择房型</button></div>}
        {complete && <div className="reserve-complete"><span>✓</span><p>ITINERARY SAVED LOCALLY</p><h2>行程草稿已准备好</h2><p>{selectedDestination.chinese} · {displayDate(stay.checkIn)} — {displayDate(stay.checkOut)}<br />{roomOptions[room].zh} · {guestSummary}</p><button onClick={() => { setComplete(false); setStep(1); }}>重新规划</button></div>}
      </section>
    </SiteShell>
  );
}
