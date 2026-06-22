import { useState, useRef } from "react";

const C = {
  bg:"#0D0F14",surface:"#13151C",card:"#191C26",cardHov:"#1E2130",
  border:"#252836",accent:"#5B7FFF",accentDim:"#5B7FFF15",
  green:"#3DD68C",greenDim:"#3DD68C15",
  amber:"#F5A623",amberDim:"#F5A62315",
  red:"#FF5A5A",redDim:"#FF5A5A15",
  purple:"#A78BFA",purpleDim:"#A78BFA15",
  teal:"#2DD4BF",tealDim:"#2DD4BF15",
  muted:"#5A5F73",text:"#E2E4EC",soft:"#9CA3B0",
};

/* ─── TOOLTIP ──────────────────────────────────────────────────────────────── */
function InfoTip({ text, compact=false }) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top:0, left:0, place:"top" });
  const iconRef = useRef(null);
  const tipW = text.length > 180 ? 300 : 240;

  function place() {
    if (!iconRef.current) return;
    const r = iconRef.current.getBoundingClientRect();
    const vw = window.innerWidth, vh = window.innerHeight;
    // horizontal: keep the tooltip on-screen
    let left = r.left + r.width/2 - tipW/2;
    left = Math.max(8, Math.min(left, vw - tipW - 8));
    // vertical: above the icon by default, below if not enough room
    const estH = 130;
    const place = r.top > estH + 12 ? "top" : "bottom";
    const top = place === "top" ? r.top - 8 : r.bottom + 8;
    setCoords({ top, left, place });
  }
  function onEnter() { place(); setShow(true); }

  return (
    <>
      <span ref={iconRef}
        onMouseEnter={onEnter} onMouseLeave={()=>setShow(false)}
        style={{ cursor:"help", color:C.accent, fontSize:compact?9:11, fontWeight:700,
          background:C.accentDim, border:`1px solid ${C.accent}55`,
          borderRadius:"50%", width:compact?13:15, height:compact?13:15,
          display:"inline-flex", alignItems:"center", justifyContent:"center",
          lineHeight:1, flexShrink:0 }}>i</span>
      {show && (
        <div style={{ position:"fixed",
          top:coords.top, left:coords.left,
          transform: coords.place==="top" ? "translateY(-100%)" : "none",
          background:"#23263A", border:`1px solid ${C.border}`, borderRadius:8,
          padding:"9px 12px", width:tipW, fontSize:11, color:C.soft, zIndex:9999,
          lineHeight:1.6, boxShadow:"0 8px 24px #000a", pointerEvents:"none",
          whiteSpace:"pre-line", textAlign:"left" }}>
          {text}
        </div>
      )}
    </>
  );
}

const GLOSSARY = {
  "NRR (Net Revenue Retention)":"The % of revenue retained from existing clients over a year, including upsells/expansions minus downgrades and churn. Above 100% means clients spend more over time without any new sales — the strongest SaaS health signal.",
  "CLV (Customer Lifetime Value)":"The total revenue a single member/customer is expected to generate over their entire relationship with the brand. Loyalty programs aim to raise CLV by increasing frequency and retention.",
  "AOV (Average Order Value)":"The average amount a customer spends per transaction. Loyalty programs lift AOV through tier rewards and milestone incentives.",
  "ARR (Annual Recurring Revenue)":"The predictable yearly subscription revenue of a SaaS company. Excludes one-time implementation or services fees.",
  "ACV (Annual Contract Value)":"The yearly value of a single client contract. Used to compare typical deal sizes across regions.",
  "CDP (Customer Data Platform)":"A unified database that combines all data about a customer (or channel partner) into a single 360° profile — the foundation for personalization and AI.",
  "MACH Architecture":"Microservices-based, API-first, Cloud-native, Headless. A modern modular tech approach that lets enterprises swap components without rebuilding the whole system.",
  "Agentic AI":"AI that autonomously plans and executes multi-step tasks without human intervention — e.g. detecting a problem, analyzing data, and recommending an action on its own.",
  "Point Breakage":"The portion of issued loyalty points that expire unused. Some breakage is financially healthy; too much signals members can't find value.",
  "Coalition Loyalty":"One loyalty program spanning multiple brands — members earn at Brand A and redeem at Brand B (e.g. a bank + retail + fuel coalition).",
  "Reward Velocity":"How long it takes a member to earn their first reward after joining. Faster velocity = higher early engagement and retention.",
};

function GlossaryStrip() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom:20 }}>
      <button onClick={()=>setOpen(o=>!o)} style={{
        background:C.card, border:`1px solid ${C.border}`, color:C.text,
        borderRadius:8, padding:"9px 14px", fontSize:12, fontWeight:600,
        cursor:"pointer", width:"100%", textAlign:"left",
        display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span>📖 Glossary — key terms explained (NRR, CLV, AOV, CDP, MACH, Agentic AI…)</span>
        <span style={{ color:C.muted }}>{open?"▲ Hide":"▼ Show"}</span>
      </button>
      {open && (
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderTop:"none",
          borderRadius:"0 0 8px 8px", padding:14, display:"grid",
          gridTemplateColumns:"1fr 1fr", gap:10, marginTop:-1 }}>
          {Object.entries(GLOSSARY).map(([t,d])=>(
            <div key={t} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:7, padding:"9px 12px" }}>
              <div style={{ fontSize:12, fontWeight:700, color:C.accent, marginBottom:3 }}>{t}</div>
              <div style={{ fontSize:11, color:C.soft, lineHeight:1.55 }}>{d}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Pill({ label, color=C.muted, size=11 }) {
  return <span style={{ display:"inline-block", fontSize:size, padding:"2px 8px", borderRadius:4,
    background:color+"18", color, border:`1px solid ${color}33`, fontWeight:600, whiteSpace:"nowrap" }}>{label}</span>;
}
function SectionHead({ title, color=C.muted }) {
  return <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase",
    color, marginBottom:12, paddingBottom:6, borderBottom:`1px solid ${C.border}` }}>{title}</div>;
}

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
const REGIONS = [
  { id:"india",  label:"🇮🇳 India",             color:C.amber  },
  { id:"sea",    label:"🌏 SEA",                color:C.teal   },
  { id:"gcc",    label:"🕌 GCC / Middle East",  color:C.green  },
  { id:"us",     label:"🇺🇸 US / North America",color:C.accent },
  { id:"europe", label:"🇪🇺 Europe",             color:C.purple },
  { id:"apac",   label:"🌐 APAC",               color:C.red    },
];

const COMPETITORS = [
  /* ── LOYALIFE (self) ── */
  {
    id:"loyalife", name:"Loyalife — Xoxoday", tier:"self",
    badge:"⭐ Our Platform", badgeColor:C.accent,
    hq:"Bengaluru, India", founded:2022,
    regions:["india","sea","gcc","us","europe","apac"],
    consumerRegions:["india","sea","gcc","us","europe","apac"],
    channelRegions:["india","sea","gcc","apac"],
    geos:["🇮🇳 India","🇦🇪 UAE / GCC","🇸🇬 SEA","🇺🇸 USA","🌍 Africa"],
    industries:["Banking & BFSI","Retail & FMCG","Channel B2B","Insurance","Airlines & Travel"],
    revenue:"~$4-6M est. loyalty revenue (part of the larger Xoxoday group; Loyalife not separately disclosed)",
    revenueNote:"Loyalife is Xoxoday's enterprise loyalty division (built on the Giift acquisition). Loyalty-only revenue is an estimate at ~$4-6M and is not separately filed. Xoxoday raised a Series C (Apis Partners, 57 Stars) in early 2026 and is preparing for a potential IPO in late 2027/early 2028.",
    growth:"Giift heritage: 50,000+ programs, 55+ countries, 130M+ users; 250+ integrations; AI Agent in active development",
    clients:"250+ enterprise clients",
    members:"65M+ end-users (incl. banking customers)",
    transactions:"Xoxoday group: ~250K transactions/day; ~$1B cumulative GMV",
    consumerEx:"End-to-end B2C enterprise loyalty with owned Plum catalog. ① First Abu Dhabi Bank (FAB) KSA — three banking loyalty programs with Lulu POS redemption. ② EBL (Eastern Bank Ltd) — SKYCOINS reward program. ③ Emirates Investment Bank (EIB) — premium cashback-led card loyalty. ④ SBM Bank (Kenya) — banking loyalty storefront.",
    channelEx:"Full-stack channel partner incentives. ① Stanley Black & Decker — PowerPerks (SBD) channel partner app, live. ② Canon — channel partner program (dealer/reseller). ③ Diageo / Johnnie Walker — store-specific QR scratch-and-win campaign. ④ Alkem Rewards Plus — channel-partner program with OCR-based invoice auto-processing. ⑤ Lupin (Loyalty+) — pharmacist-retailer loyalty with invoice-based claims.",
    strengths:["Owned 10M+ Plum catalog (175+ countries) — no 3rd-party dependency for rewards","On-premise + cloud deployment for regulated banking industries","SOC2 + ISO27001 + GDPR + DPDP (India) + PCI DSS — broadest compliance","GST + KYC validation natively — India enterprise moat","OCR invoice processing live (Alkem, Lupin); AI Agent in active development","Coalition / partner network as native module","Marquee channel wins: Stanley Black & Decker, Canon, Diageo"],
    gaps:["AI maturity gap vs. Capillary (aiRA) and Antavo (Timi) — Agent in dev","No multilingual interface yet (roadmap)","No app-less onboarding (Zeapl leads here)","Not yet in Forrester/Gartner analyst reports","DMS (Tally/SAP/Marg) integration still on roadmap"],
    loyalifevs:"This is us. Growth focus: ride the APAC/QR/mobile-first tailwind, lead the channel 'enrollment→engagement' shift, and use cloud+on-prem flexibility as the BFSI wedge. Close the AI gap and pursue Forrester/Gartner recognition.",
    keyClients:["FAB KSA — 3 banking programs","Stanley Black & Decker — PowerPerks","Canon — channel partner app","Diageo / Johnnie Walker — QR campaign","EBL — SKYCOINS rewards","Emirates Investment Bank — cashback","Alkem Rewards Plus — channel","Lupin — retailer loyalty"],
  },
  /* ── PRIMARY ── */
  {
    id:"capillary", name:"Capillary Technologies", tier:"primary",
    badge:"🔴 Direct Threat", badgeColor:C.red,
    hq:"Singapore / India", founded:2008,
    regions:["india","sea","gcc","us","apac"],
    consumerRegions:["india","sea","gcc","us","apac"],
    channelRegions:["india","sea","gcc"],
    geos:["🇮🇳 India","🇸🇬 Singapore / SEA","🇦🇪 UAE","🇺🇸 USA","🇲🇾 Malaysia"],
    industries:["Retail & FMCG","Banking & BFSI","Airlines","QSR","Telecom"],
    revenue:"₹735 Cr (~$88M) FY26 — public co.; now profitable (₹52 Cr net profit, 13% OPM)",
    revenueNote:"Listed on NSE/BSE (Nov 2025). Revenue grew ₹525 Cr (FY24) → ₹598 Cr (FY25) → ₹735 Cr (FY26). 5-yr sales CAGR 34%; swung from years of losses to profit in FY25-26. Loyalty-only platform — all revenue is loyalty. Mkt cap ~₹3,990 Cr.",
    growth:"+23% TTM (₹735 Cr FY26); profitable; 1.82B consumers; 400+ brands; Forrester Wave Leader Q4 2025",
    clients:"400+ enterprise brands",
    members:"1.82B consumers on platform",
    transactions:"180,000 transactions/hr peak",
    consumerEx:"① Vishal Mega Mart — 100M+ members, tripled active rate moving from card to app. ② Al-Futtaim Blue Rewards — cross-brand coalition in GCC (retail, auto, hospitality). ③ ASICS SEA — omnichannel loyalty across SEA markets.",
    channelEx:"① Polycab — ILA Best B2B Loyalty 2025 for electrician & distributor incentive. ② Jotun — channel partner incentive for paint dealers across APAC/ME.",
    strengths:["Profitable public company: ₹735 Cr FY26, ₹52 Cr net profit, 34% 5-yr CAGR — category financial leader","Forrester Wave Leader Q4 2025 + Everest PEAK Matrix Leader 2025","1.82B consumers — largest verified member base","aiRA AI: autonomous audience build, reward optimisation, campaign launch","Kognitiv acquisition (Nov 2025) adds 20-country reach + Petsmart, Hallmark","NRR >100% — existing clients expand spend; consolidating market via M&A"],
    gaps:["No owned reward catalog (3rd-party dependent)","Top 5 clients = 43% of revenue (concentration risk)","Weaker coalition depth outside APAC","Low ROE/ROCE — profitable but capital-heavy after acquisitions"],
    loyalifevs:"Loyalife wins: owned Plum catalog, on-premise banking, DPDP + PCI DSS compliance, coalition network, GCC banking depth. Reality check: Capillary is now a profitable, public, ~$88M category leader consolidating via M&A — treat as the benchmark. Loyalife competes on owned catalog + BFSI/on-prem + channel claims/OCR, not on scale.",
    keyClients:["Vishal Mega Mart — 100M+ members","Al-Futtaim Blue Rewards — coalition","ASICS — SEA omnichannel","Polycab — channel (ILA 2025)","Petsmart / Hallmark — via Kognitiv"],
  },
  {
    id:"antavo", name:"Antavo AI Loyalty Cloud", tier:"primary",
    badge:"🔴 Direct Threat", badgeColor:C.red,
    hq:"UK / Hungary", founded:2012,
    regions:["europe","us","apac"],
    consumerRegions:["europe","us","apac"],
    channelRegions:[],
    geos:["🇬🇧 UK","🇩🇪 Germany","🇺🇸 USA","🇫🇷 France","🇦🇺 Australia"],
    industries:["Retail & Fashion","Food & Beverage / QSR","Travel & Hospitality","Beauty & Cosmetics","CPG / FMCG"],
    revenue:"~$15-25M ARR est. (Series B prep 2025; 40% YoY growth, unaudited)",
    revenueNote:"Pure-play loyalty only — 100% from platform licensing. Reinvests 60% revenue in product. Series B pending.",
    growth:"GCLR 2026 authority (3,000 marketers + 10,000 consumers surveyed); 500M member actions/yr; Gartner + Forrester + IDC",
    clients:"100+ enterprise brands",
    members:"500M member actions/yr",
    transactions:"600+ API req/sec",
    consumerEx:"① KFC UK — 40% reward redemption rate, 53% app download lift. ② LuisaViaRoma — 34% YoY transaction growth, 199% higher AOV for platinum members. ③ Scandic Hotels — omnichannel hospitality loyalty.",
    channelEx:"Not a channel loyalty player. Pure B2C consumer. Timi AI assists program admin side only.",
    strengths:["Timi AI — agentic AI managing full program lifecycle autonomously (world's first)","Gartner + Forrester + IDC — recognized by all three major analysts","600 API req/sec — peak throughput ready","10 loyalty program types; 60% revenue reinvested in R&D","Clubs module: 100K members/club, points pooling"],
    gaps:["No owned reward catalog","No on-premise deployment","No APAC/India/ME presence","Series B pending = capital scaling risk","Zero B2B channel loyalty"],
    loyalifevs:"Loyalife wins: Plum catalog, APAC/banking/on-premise, DPDP compliance. Antavo's Timi AI is Loyalife's #1 AI competitive threat. Loyalife's AI Agent (in active development) is the direct response.",
    keyClients:["KFC UK — 40% redemption","LuisaViaRoma — luxury fashion","Scandic Hotels — hospitality","Benefit Cosmetics — beauty","C&A — fashion retail"],
  },
  {
    id:"epsilon", name:"Epsilon (Publicis Groupe)", tier:"primary",
    badge:"🔴 Direct Threat", badgeColor:C.red,
    hq:"USA", founded:1969,
    regions:["us","europe","apac","gcc"],
    consumerRegions:["us","europe","apac","gcc"],
    channelRegions:[],
    geos:["🇺🇸 USA","🇬🇧 UK","🇩🇪 Germany","🇸🇬 Singapore","🇦🇺 Australia"],
    industries:["Banking & Financial Services","Retail","Travel & Hospitality","Healthcare","FMCG"],
    revenue:"Part of Publicis Groupe (~€14B group). Epsilon loyalty division est. $500M+.",
    revenueNote:"Epsilon is a full marketing technology division of Publicis. Loyalty is one product line — standalone loyalty revenue not disclosed. Massive enterprise client base.",
    growth:"Forrester Wave Leader Q4 2025 (highest scores in Customer Profiles, Privacy, Supporting Services)",
    clients:"Fortune 500 enterprises globally",
    members:"250M+ consumer identities in Epsilon data cloud",
    transactions:"Processes billions of marketing transactions/year",
    consumerEx:"① Best Buy — Agility Loyalty™ powers one of the largest US loyalty programs. ② Hilton — member engagement and personalization at scale. ③ Walgreens — pharmacy loyalty program with healthcare personalization. ④ Citi + Visa — financial services loyalty with identity resolution.",
    channelEx:"Not a channel loyalty player — exclusively B2C consumer and financial services.",
    strengths:["Forrester Wave Leader Q4 2025 (highest scores in 9 criteria)","250M+ consumer identity graph — deterministic data advantage","Real-time decisioning engine for 1:1 personalization","Built-in AI for next-best-offer, churn prediction, campaign forecasting","Global scale across NA, EMEA, APAC"],
    gaps:["No owned reward catalog","US/EMEA centric — limited India/SEA depth","No on-premise option","Expensive — targets Fortune 500 only","No B2B channel loyalty"],
    loyalifevs:"Minimal direct overlap — Epsilon targets Fortune 500 NA/EMEA; Loyalife targets APAC/GCC/India enterprise. Where they compete: large BFSI deals. Loyalife wins on owned catalog, on-premise, coalition networks, and India compliance (DPDP).",
    keyClients:["Best Buy — Agility Loyalty™","Hilton — hospitality","Walgreens — pharmacy","Citi — financial services","Visa — payments loyalty"],
  },
  {
    id:"openloyal", name:"Open Loyalty", tier:"primary",
    badge:"🟡 Indirect Threat", badgeColor:C.amber,
    hq:"Poland", founded:2016,
    regions:["europe","us","sea","apac"],
    consumerRegions:["europe","us","apac"],
    channelRegions:["europe","us"],
    geos:["🇩🇪 Germany","🇳🇱 Netherlands","🇺🇸 USA","🇬🇧 UK","🇸🇬 Singapore"],
    industries:["FMCG / CPG","Retail & E-commerce","Finance & Insurance","Fuel & Convenience","B2B Channel"],
    revenue:"OEX SA group €225M (2025). Open Loyalty division undisclosed.",
    revenueNote:"OEX SA is a 15-company group — Open Loyalty is one division. Google + Deloitte #1 Tech Rocketship.",
    growth:"800M loyalty events/yr; 99.99% uptime SLA; Gartner Market Guide 2025",
    clients:"100+ companies in 45+ countries",
    members:"800M loyalty events/yr",
    transactions:"99.99% uptime; 250+ API endpoints",
    consumerEx:"① Heineken — gamified loyalty across 27 markets. ② ALDO — 41% AOV uplift, 2× purchase frequency, 91% retention. ③ Breville — unified promotions/loyalty across multiple markets.",
    channelEx:"① Intersport — tiered partner rewards across sports retail distributor network. ② JTI — trade channel incentive program in Europe.",
    strengths:["API-first MACH architecture — 250+ REST/GraphQL endpoints","800M events/yr = proven scale","99.99% uptime SLA — only platform to publish this","Gartner Market Guide 2025 vendor","No vendor lock-in — composable architecture"],
    gaps:["No managed services — needs strong engineering team","No owned reward catalog","No India localization (GST, UPI, regional languages)","Developer-heavy = slow for non-technical teams"],
    loyalifevs:"Loyalife wins: managed services, India-native (UPI/GST/WhatsApp), owned catalog, turnkey deployment. Open Loyalty appeals to engineering-heavy enterprises wanting composability.",
    keyClients:["Heineken — gamified, 27 markets","ALDO — +41% AOV","Breville — promotions+loyalty","Intersport — channel partner","JTI — trade channel (EU)"],
  },
  {
    id:"talonone", name:"Talon.One", tier:"primary",
    badge:"🟡 Indirect Threat", badgeColor:C.amber,
    hq:"Germany", founded:2015,
    regions:["europe","us","apac"],
    consumerRegions:["europe","us","apac"],
    channelRegions:["europe","us"],
    geos:["🇩🇪 Germany","🇺🇸 USA","🇬🇧 UK","🇫🇷 France","🇦🇺 Australia"],
    industries:["Retail & QSR","Grocery","Financial Services","E-commerce","SaaS / Tech"],
    revenue:"$130M raised (Series U, June 2025). Revenue undisclosed but significant.",
    revenueNote:"Well-funded — $130M Series U in June 2025. Focuses on promotions + loyalty combined. Revenue undisclosed.",
    growth:"$130M Series U Jun 2025; Gartner 2025 Market Guide; Forrester Landscape Q3 2025",
    clients:"Enterprise brands globally",
    members:"Undisclosed",
    transactions:"High-volume enterprise throughput; 100K+ rule evaluations/sec",
    consumerEx:"① Major QSR chain — loyalty + promotions unified in one engine. ② Grocery retailer — complex multi-brand offer management with real-time personalization. ③ Financial services — spend-based loyalty with coupon and referral mechanics.",
    channelEx:"Limited channel loyalty. Primarily B2C promotion engine with loyalty extensions.",
    strengths:["Most advanced promotion + loyalty combined engine","100K+ rule evaluations/sec — highest throughput for complex offer logic","$130M Series U (June 2025) — well-capitalized","GDPR/CCPA/ISO compliant; multi-cloud infrastructure","Native integrations: Salesforce, Braze, Emarsys, commercetools"],
    gaps:["No owned reward catalog","Promotions-first — loyalty is secondary","No India/APAC localization","No on-premise option","Expensive for pure loyalty use cases"],
    loyalifevs:"Loyalife wins on: owned catalog, coalition/banking loyalty, on-premise, APAC/India. Talon.One wins on complex promotion logic at scale. Different buyer profiles: Talon for promo-heavy retail; Loyalife for loyalty-first enterprise.",
    keyClients:["Enterprise QSR — loyalty+promo","Grocery retailer — offer engine","Financial services — spend loyalty"],
  },
  {
    id:"eagleeye", name:"Eagle Eye Solutions", tier:"primary",
    badge:"🟡 Indirect Threat", badgeColor:C.amber,
    hq:"UK", founded:2003,
    regions:["europe","us","apac"],
    consumerRegions:["europe","us","apac"],
    channelRegions:[],
    geos:["🇬🇧 UK","🇺🇸 USA","🇨🇦 Canada","🇦🇺 Australia","🇫🇷 France"],
    industries:["Grocery & Supermarkets","Fuel Retail","Fashion & Retail","Hospitality","CPG"],
    revenue:"Public company (AIM: EYE). FY2024 revenue ~£50M (~$63M).",
    revenueNote:"Publicly listed on London AIM. Revenue is loyalty platform + professional services. 850M+ personalized offers/week.",
    growth:"850M+ personalized offers/week; Tesco Clubcard Challenges — ILA Best Global Loyalty 2025; Forrester + Gartner + IDC",
    clients:"Tesco, Asda, Loblaws, Carrefour, Woolworths Group",
    members:"6M active Asda Rewards members; 5M+ Winn-Dixie members",
    transactions:"1,000+ transactions/sec; 850M personalized offers/week",
    consumerEx:"① Tesco Clubcard Challenges — AI-driven personalized challenges to millions; ILA Best Global Loyalty Launch 2025. ② Asda Rewards — 6M active members, £525M in Cashpots distributed. ③ Loblaws (Canada) — national grocery loyalty personalization.",
    channelEx:"Not a channel loyalty player — exclusively grocery/retail B2C.",
    strengths:["850M personalized offers/week — highest throughput of any listed platform","1,000+ transactions/sec — real-time at grocery scale","Forrester + Gartner + IDC recognized","AI-driven 1:1 personalization built for grocery","Public company — financial transparency","MACH Alliance certified"],
    gaps:["Grocery/retail vertical only — no BFSI, channel, or India","No owned reward catalog","No coalition loyalty","Minimal APAC/India/GCC presence"],
    loyalifevs:"Minimal overlap — Eagle Eye is purpose-built for Western grocery chains. Loyalife competes in BFSI, APAC, coalition, and channel — different verticals entirely.",
    keyClients:["Tesco Clubcard — AI challenges","Asda Rewards — 6M members","Loblaws — grocery (Canada)","Giant Eagle myPerks — 25M offers/mo","Winn-Dixie — 5M members"],
  },
  {
    id:"biw", name:"BI Worldwide", tier:"primary",
    badge:"🔴 Direct Threat", badgeColor:C.red,
    hq:"USA", founded:1950,
    regions:["india","us","europe","apac"],
    consumerRegions:[],
    channelRegions:["india","us","europe","apac"],
    geos:["🇮🇳 India","🇺🇸 USA","🇬🇧 UK","🇩🇪 Germany","🇦🇺 Australia"],
    industries:["Automotive","FMCG & CPG","Agriculture","Pharma","Construction Materials"],
    revenue:"Large private — est. $200M+ globally. India channel loyalty undisclosed.",
    revenueNote:"Services-first — revenue includes consulting, program design, execution fees. Not SaaS ARR. Not directly comparable to platform revenue.",
    growth:"70+ yrs; 14 Dragons awards; GoalQuest® patented; 282 India employees",
    clients:"100+ trade brands in India",
    members:"Undisclosed",
    transactions:"Undisclosed",
    consumerEx:"Not a consumer loyalty player — exclusively B2B channel and sales incentive.",
    channelEx:"① Diageo DRINC — dealer incentive; Diageo Supplier Award for 10× scheme deployment speed. ② Michelin India — distributor loyalty for truck tyre dealers (GoalQuest® design). ③ Shell — fuel retailer partner incentive.",
    strengths:["GoalQuest® — world's only patented sales incentive design","70+ yrs of behavioural science applied to channel incentives","14 Dragons awards for channel incentive excellence","Deep C-suite relationships in India auto/FMCG/agri","End-to-end managed service: strategy → execution → measurement"],
    gaps:["Services-first = no self-service platform","No UPI / India payment rails","No GST validation natively","Heavy process overhead — long deployment timelines","No owned reward catalog"],
    loyalifevs:"Loyalife wins: platform-first self-service, UPI cashback, GST-compliant onboarding, faster go-live, Plum catalog. BIW wins on C-suite consulting relationships. Best displacement play when clients want to own their program stack.",
    keyClients:["Diageo DRINC — dealer (10× speed)","Michelin India — tyre dealers","Shell — fuel retailer channel","Tata Group — channel","Bosch — auto channel"],
  },
  {
    id:"almondsai", name:"Almonds AI (Channelverse™)", tier:"primary",
    badge:"🟠 Rising Disruptor", badgeColor:C.amber,
    hq:"India", founded:2020,
    regions:["india"],
    consumerRegions:[],
    channelRegions:["india"],
    geos:["🇮🇳 India"],
    industries:["FMCG & Beverages","Paints & Construction","Beauty & Personal Care","Pharma","Automotive"],
    revenue:"₹16 Cr seed funded; FY25 revenue target ₹200 Cr (unverified)",
    revenueNote:"Early stage. Channel loyalty is sole focus. Backed by Haldiram promoters + OfBusiness co-founder.",
    growth:"India Channel Loyalty Report 2026 published; Channelverse™ gamification + predictive AI",
    clients:"Coca-Cola, Asian Paints, L'Oréal, Zandu",
    members:"Undisclosed",
    transactions:"Undisclosed",
    consumerEx:"Not a consumer loyalty player.",
    channelEx:"① Asian Paints — distributor & painter loyalty with gamified leaderboards + predictive nudges. ② Coca-Cola India — retailer channel loyalty with gamified shelf-share tracking.",
    strengths:["Channelverse™ gamification + predictive AI","Published India Channel Loyalty Report 2026 (₹28,000 Cr market data)","India-native: deep FMCG distribution understanding","Kounter: SMB SaaS tier for mid-market brands","Strategic FMCG-sector investors"],
    gaps:["India-only","No SOC2 / GDPR / ISO certs","No owned reward catalog","Seed stage = execution risk"],
    loyalifevs:"Loyalife wins: global scale, compliance, Plum catalog, banking/BFSI. Almonds AI's thought leadership (India Channel Loyalty Report) is a GTM and positioning threat.",
    keyClients:["Asian Paints — distributor+painter","Coca-Cola India — retailer channel","L'Oréal — channel loyalty","Zandu — FMCG channel"],
  },
  {
    id:"zeapl", name:"Zeapl.ai", tier:"primary",
    badge:"🟠 Rising Disruptor", badgeColor:C.amber,
    hq:"India (Noida)", founded:2020,
    regions:["india"],
    consumerRegions:[],
    channelRegions:["india"],
    geos:["🇮🇳 India"],
    industries:["Automotive & Tyres","FMCG & Home Care","Paints & Construction","Pharma","Consumer Durables"],
    revenue:"2.5× YoY growth; MEITY-backed (revenue undisclosed)",
    revenueNote:"Channel loyalty core product. Ex-Airtel founders. Revenue not public.",
    growth:"2.5× YoY; Graham Bell Award; MEITY supported; 18 Indian languages",
    clients:"TATA, TVS, P&G, Berger, Marico, Nerolac",
    members:"Undisclosed",
    transactions:"Undisclosed",
    consumerEx:"Not a consumer loyalty player.",
    channelEx:"① TVS Eurogrip — mechanic influencer loyalty on WhatsApp with instant UPI payouts (no app needed). ② Berger Paints — painter channel loyalty in 18 Indian languages with AI churn alerts.",
    strengths:["App-less — no download barrier for Tier 2/3 blue-collar partners","18 Indian languages — deepest vernacular support in market","AI churn prediction live","On-premise + hybrid deployment","Graham Bell Award + MEITY credibility"],
    gaps:["India-only","No enterprise compliance (SOC2/GDPR)","No owned reward catalog","Smaller team = delivery risk at enterprise scale"],
    loyalifevs:"Loyalife wins: global scale, Plum catalog, enterprise compliance, banking programs. Zeapl's app-less + 18-language model is Loyalife's clearest Tier 2/3 India gap.",
    keyClients:["TVS Eurogrip — mechanic WhatsApp","Berger Paints — painter, 18 langs","TATA — channel","P&G — FMCG channel","Nerolac — paint channel"],
  },
  /* ── SECONDARY ── */
  {
    id:"voucherify", name:"Voucherify", tier:"secondary",
    badge:"⚪ Niche / API-First", badgeColor:C.muted,
    hq:"Poland", founded:2015,
    regions:["europe","us","apac"],
    consumerRegions:["europe","us","apac"],
    channelRegions:[],
    geos:["🇵🇱 Poland","🇺🇸 USA","🇬🇧 UK","🇩🇪 Germany","🇦🇺 Australia"],
    industries:["E-commerce","Fintech","SaaS / Tech","Retail","Media & Subscriptions"],
    revenue:"Bootstrapped; profitable since day one; 30% YoY growth (self-reported)",
    revenueNote:"No VC backing. Transparent API-call based pricing starting €169/month. 97% customer retention. Not a primary Loyalife competitor.",
    growth:"30% YoY; 97% customer retention; <5% staff turnover; 60-day free trial",
    clients:"Michelin, Breville, TIER Mobility, ekar",
    members:"Unlimited members (pricing not per member)",
    transactions:"Undisclosed",
    consumerEx:"① Michelin — iterate fast loyalty and promotions without upfront commitment. ② TIER Mobility — migrated from Talon.One with guided migration service.",
    channelEx:"Limited B2B channel. Primarily API-first promotions for developer-led B2C brands.",
    strengths:["Transparent API-call pricing — pay for use only","97% customer retention — strongest in market","60-day free trial — low barrier","Developer-first: 6 SDKs, excellent docs","Profitable bootstrapped — no VC pressure"],
    gaps:["No owned reward catalog","No coalition/banking loyalty","No India/APAC localization","Limited managed services"],
    loyalifevs:"Different market segment — Voucherify targets developer-led mid-market. Loyalife competes at enterprise. Minimal direct overlap.",
    keyClients:["Michelin — promotions+loyalty","TIER Mobility — migrated from Talon","Breville — iterate fast","ekar — mobility"],
  },
  {
    id:"collinson", name:"Collinson Group", tier:"secondary",
    badge:"⚪ Niche Player", badgeColor:C.muted,
    hq:"UK", founded:1987,
    regions:["gcc","us","apac","europe"],
    consumerRegions:["gcc","us","apac","europe"],
    channelRegions:[],
    geos:["🇬🇧 UK","🇦🇪 UAE","🇺🇸 USA","🇸🇬 Singapore","🇭🇰 Hong Kong"],
    industries:["Travel & Airlines","Banking / Premium Cards","Insurance","Fintech","Hospitality"],
    revenue:"Large private — est. $500M+ group revenue. Loyalty division undisclosed.",
    revenueNote:"Group includes travel services, insurance, and loyalty. Loyalty is a subset.",
    growth:"N/A (private)",
    clients:"Enterprise banks and airlines globally",
    members:"Undisclosed",
    transactions:"Undisclosed",
    consumerEx:"① Priority Pass — airport lounge benefit for premium credit cardholders in 150+ countries. ② Airline frequent flyer management for major Asian carriers.",
    channelEx:"Not a channel loyalty player — exclusively B2C travel and card programs.",
    strengths:["Priority Pass — global premium card loyalty benefit","Deep banking card relationships globally","SOC2 + GDPR compliant"],
    gaps:["Travel vertical only","Limited API/headless","No India/APAC B2B channel","No on-premise"],
    loyalifevs:"Minimal direct overlap except premium banking cards. Loyalife is broader across verticals, geographies, and program types.",
    keyClients:["Priority Pass — lounge benefit","Premium card issuers — card loyalty","Asian airlines — frequent flyer"],
  },
  {
    id:"comarch", name:"Comarch", tier:"secondary",
    badge:"⚪ Niche Player", badgeColor:C.muted,
    hq:"Poland", founded:1993,
    regions:["europe","gcc"],
    consumerRegions:["europe","gcc"],
    channelRegions:["europe"],
    geos:["🇩🇪 Germany","🇵🇱 Poland","🇬🇧 UK","🇸🇦 Saudi Arabia","🇺🇸 USA"],
    industries:["Telecom","Retail","Banking","Fuel / Energy","Airlines"],
    revenue:"Comarch group PLN 2B+ (~$500M). Loyalty division undisclosed.",
    revenueNote:"Large IT company — loyalty is one of many product lines. Loyalty division revenue not separately tracked.",
    growth:"N/A (loyalty division untracked publicly)",
    clients:"Enterprise — mainly European",
    members:"Undisclosed",
    transactions:"Undisclosed",
    consumerEx:"① European telco — points for data plan renewals, device upgrades. ② Fuel retail chain — transaction-to-points with partner redemption.",
    channelEx:"Limited B2B channel capability. ① Some European retail distributor programs but not core focus.",
    strengths:["Deep telecom + banking loyalty in Europe","On-premise deployment","30+ yrs enterprise tenure","Full EU compliance"],
    gaps:["Slower implementation","Less flexible commercial model","Minimal APAC/India","No owned catalog"],
    loyalifevs:"Loyalife wins on speed, flexibility, APAC coverage, global catalog. Comarch's European telecom moat is not a core Loyalife battleground.",
    keyClients:["European telcos — data plan loyalty","Fuel retail — transaction points","EU retail chains — points"],
  },
  {
    id:"loyaltyxpert", name:"LoyaltyXpert", tier:"secondary",
    badge:"⚪ SMB Player", badgeColor:C.muted,
    hq:"India", founded:2017,
    regions:["india"],
    consumerRegions:[],
    channelRegions:["india"],
    geos:["🇮🇳 India"],
    industries:["Paints","Pumps & Fittings","Electrical & Automation","Steel","FMCG"],
    revenue:"SMB SaaS — undisclosed (low ACV)",
    revenueNote:"Channel loyalty only. SMB pricing. Not an enterprise competitor.",
    growth:"N/A",
    clients:"Valli Paints, Lubi Pumps, Digisol, GBR TMT",
    members:"Undisclosed",
    transactions:"Undisclosed",
    consumerEx:"Not a consumer loyalty player.",
    channelEx:"① Lubi Pumps — dealer loyalty with QR coupons + dual wallet. ② Valli Paints — painter channel loyalty with tier rewards + warranty management.",
    strengths:["Affordable SMB pricing","Dual wallet + QR coupons","Warranty management","India-specific tiers"],
    gaps:["No AI","India-only","No compliance certs","No owned catalog"],
    loyalifevs:"Loyalife outpaces significantly on compliance, analytics, global reach, and AI. LoyaltyXpert targets SMB segment Loyalife doesn't actively pursue.",
    keyClients:["Lubi Pumps — dealer QR loyalty","Valli Paints — painter tiers","Digisol — channel","GBR TMT — steel channel"],
  },
  {
    id:"o4s", name:"O4S (Out-4-Sure)", tier:"secondary",
    badge:"⚪ Niche Disruptor", badgeColor:C.muted,
    hq:"India / USA", founded:2017,
    regions:["india"],
    consumerRegions:[],
    channelRegions:["india"],
    geos:["🇮🇳 India","🇺🇸 USA"],
    industries:["Agriculture","Building Materials","FMCG","Lifestyle Products","Pharma"],
    revenue:"₹10.6 Cr FY25; $11M raised (Series A)",
    revenueNote:"Channel loyalty + rebate automation — 100% of O4S revenue. SKU serialization moat.",
    growth:"Series A; Venture Highway + Brand Capital backed",
    clients:"Agriculture and building materials brands",
    members:"Undisclosed",
    transactions:"Undisclosed",
    consumerEx:"Not a consumer loyalty player.",
    channelEx:"① Building materials — every bag of cement gets unique QR; dealers scan to earn points per unit. ② Agriculture brand — dealer incentive closing primary-to-secondary sales data gap.",
    strengths:["SKU-level serialization — unique attribution per product unit","Closes primary-to-secondary sales data gap","Partner learning & development module"],
    gaps:["Narrow use case (serialization only)","Small revenue","No owned catalog","No compliance certs"],
    loyalifevs:"Narrow overlap. O4S's serialization moat is unique but limited. Loyalife competes on full program management.",
    keyClients:["Building materials — SKU serialization","Agriculture — dealer incentive","FMCG — rebate automation"],
  },
];

const REGIONAL_MAP = {
  india: {
    note:"Ranked by scale (member base, client count, in-region revenue) and market penetration (depth of deployments, share of enterprise deals). India is Loyalife's home turf — Capillary leads consumer by scale; channel is the most contested, with Almonds and Zeapl penetrating fast.",
    consumer:[
      { id:"loyalife", rank:1, why:"Home market; banking + channel breadth on owned catalog", clients:"Shivalik Small Finance Bank, Indian BFSI & retailer programs" },
      { id:"capillary", rank:2, why:"Marquee + scale: Vishal Mega Mart (100M+ members), Tata, Starbucks India; India #1 by revenue; Forrester Leader. Both big clients AND scale.", clients:"Vishal Mega Mart (100M+ members), Tata, Starbucks India" },
    ],
    channel:[
      { id:"loyalife", rank:1, why:"OCR claims live (Alkem/Lupin); GST+UPI native; Plum catalog", clients:"Alkem Rewards Plus, Lupin, Greenply, Ashirwad Pipes" },
      { id:"capillary", rank:2, why:"ILA Best B2B 2025; partner CDP; aiRA", clients:"Polycab (electrician/distributor program)" },
      { id:"biw", rank:3, why:"70-yr behavioural science; GoalQuest®; deep C-suite", clients:"Michelin India, Tata, Bosch, Dalmia" },
      { id:"almondsai", rank:4, why:"Marquee weight lifts it above SMB-heavy rivals: Coca-Cola, Asian Paints, L'Oréal are blue-chip channel accounts; Channelverse™ gamification; fastest-rising.", clients:"Asian Paints, Coca-Cola India, L'Oréal" },
      { id:"zeapl", rank:5, why:"App-less + 18 languages; Tier 2/3 reach", clients:"TVS, Berger Paints, P&G, Nerolac" },
      { id:"loyaltyxpert", rank:6, why:"Ranked lower: many small/SMB accounts rather than marquee names; SMB pricing; QR + dual wallet.", clients:"Lubi Pumps, Valli Paints, GBR TMT" },
      { id:"o4s", rank:7, why:"SKU serialization niche; rebate automation", clients:"Building materials & agriculture brands" },
    ],
  },
  sea: {
    note:"Ranked by scale and market penetration. Capillary dominates SEA consumer by scale (Singapore HQ, deep Indonesia/Malaysia penetration); channel loyalty is still nascent, so penetration is low across all players.",
    consumer:[
      { id:"capillary", rank:1, why:"SEA HQ (Singapore); Domino's Indonesia, ASICS SEA", clients:"ASICS, Domino's Indonesia, Courts" },
      { id:"loyalife", rank:2, why:"Owned catalog + banking; expanding presence", clients:"EBL (Eastern Bank, Bangladesh) — SKYCOINS" },
      { id:"antavo", rank:3, why:"Global brands with SEA footprint (Kathmandu)", clients:"Kathmandu, global fashion brands" },
      { id:"openloyal", rank:4, why:"API-first; composable for SEA tech teams", clients:"Regional e-commerce & FMCG" },
    ],
    channel:[
      { id:"loyalife", rank:1, why:"Owned catalog + WhatsApp; SEA channel expansion", clients:"Regional FMCG & pharma channel programs" },
      { id:"capillary", rank:2, why:"SEA retail + channel depth", clients:"Jotun (paint channel, APAC/SEA)" },
      { id:"biw", rank:3, why:"Global channel managed service", clients:"MNC auto/FMCG channel programs" },
    ],
  },
  gcc: {
    note:"Ranked by scale and market penetration, weighted toward banking/BFSI (the dominant GCC vertical). Loyalife leads on banking coalition penetration; Capillary scales via Capillary Arabia. Banking coalition loyalty is the key battleground.",
    consumer:[
      { id:"loyalife", rank:1, why:"GCC banking strength; on-premise; multi-program/multi-currency", clients:"First Abu Dhabi Bank (FAB) KSA, Emirates Investment Bank (EIB)" },
      { id:"capillary", rank:2, why:"Al-Futtaim Blue Rewards; Capillary Arabia (Saudi entity)", clients:"Al-Futtaim Blue Rewards (cross-brand coalition)" },
      { id:"epsilon", rank:3, why:"Global BFSI loyalty; identity resolution", clients:"Regional banking & financial services" },
      { id:"collinson", rank:4, why:"Premium card + travel loyalty (Priority Pass)", clients:"GCC premium card issuers, airlines" },
      { id:"comarch", rank:5, why:"Banking + fuel loyalty; Saudi presence", clients:"Regional banks, fuel retail" },
    ],
    channel:[
      { id:"loyalife", rank:1, why:"Banking + partner channel; owned catalog", clients:"FAB KSA partner ecosystem (Lulu POS redemption)" },
      { id:"capillary", rank:2, why:"GCC retail + channel via Capillary Arabia", clients:"Al-Futtaim group channel" },
      { id:"biw", rank:3, why:"Global channel incentive managed service", clients:"MNC channel programs in GCC" },
    ],
  },
  us: {
    note:"Ranked by scale (enterprise client base, member volume) and market penetration. Epsilon leads consumer by sheer scale (250M+ identities, Fortune 500 penetration); Loyalife has minimal US penetration — an emerging challenger only.",
    consumer:[
      { id:"epsilon", rank:1, why:"Marquee weight: powers Best Buy, Hilton, Walgreens, Citi, Visa — some of the largest US programs. Forrester Leader Q4 2025. Few but very large clients = top rank.", clients:"Best Buy, Hilton, Walgreens, Citi, Visa" },
      { id:"antavo", rank:2, why:"20% of new business from NA; Brightline, F1 Arcade", clients:"Brightline Trains, Skims, KFC US" },
      { id:"eagleeye", rank:3, why:"Marquee grocery weight: Giant Eagle (25M+ offers/mo), Winn-Dixie (5M members) — large named accounts at scale.", clients:"Giant Eagle myPerks, Winn-Dixie" },
      { id:"talonone", rank:4, why:"Promotion+loyalty engine; well-funded ($130M)", clients:"Enterprise QSR & grocery" },
      { id:"openloyal", rank:5, why:"Composable; US retail & fintech", clients:"CarParts, US fintech apps" },
      { id:"capillary", rank:6, why:"Kognitiv acquisition (Nov 2025) adds US/ANZ reach; profitable public co. expanding", clients:"Petsmart, Hallmark (via Kognitiv)" },
    ],
    channel:[
      { id:"loyalife", rank:1, why:"Owned catalog; emerging US channel play", clients:"US channel program pilots" },
      { id:"biw", rank:2, why:"US HQ; 70-yr channel incentive heritage", clients:"Michelin, SKF, Bosch (US channel)" },
      { id:"openloyal", rank:3, why:"API-first B2B channel", clients:"US B2B distributor programs" },
      { id:"talonone", rank:4, why:"Promotion engine with channel extensions", clients:"Enterprise B2B promotions" },
    ],
  },
  europe: {
    note:"Ranked by scale and market penetration. Europe is the most crowded market — Antavo and Open Loyalty have the deepest penetration by client base. Loyalife has limited European penetration today.",
    consumer:[
      { id:"antavo", rank:1, why:"European HQ; KFC UK, C&A, Scandic, Benefit", clients:"KFC UK, C&A, Scandic Hotels, Benefit Cosmetics" },
      { id:"openloyal", rank:2, why:"Heineken, ALDO, Intersport across EU", clients:"Heineken, ALDO, Intersport, limango" },
      { id:"talonone", rank:3, why:"Berlin HQ; promotion+loyalty engine", clients:"EU QSR & grocery enterprises" },
      { id:"eagleeye", rank:4, why:"UK grocery dominance; Tesco, Asda", clients:"Tesco Clubcard, Asda Rewards" },
      { id:"epsilon", rank:5, why:"EMEA enterprise loyalty + identity", clients:"EU retail & financial services" },
      { id:"comarch", rank:6, why:"Poland HQ; telecom + banking depth", clients:"European telcos, EU banks" },
    ],
    channel:[
      { id:"openloyal", rank:1, why:"EU channel via API; Intersport, JTI", clients:"Intersport, JTI (trade channel)" },
      { id:"loyalife", rank:2, why:"Owned catalog; emerging EU presence (Croatia cashback program)", clients:"Croatia cashback program" },
      { id:"biw", rank:3, why:"EU channel managed service", clients:"MNC auto/FMCG channel (EU)" },
      { id:"comarch", rank:4, why:"Some EU retail distributor programs", clients:"EU retail distributor programs" },
      { id:"voucherify", rank:5, why:"API-first promotions for dev-led brands", clients:"TIER Mobility, ekar" },
    ],
  },
  apac: {
    note:"Ranked by scale and market penetration across ANZ + broader Asia. Capillary leads consumer by scale (1.82B consumers, ANZ via Kognitiv); channel penetration is led by Loyalife, Capillary, and BIW.",
    consumer:[
      { id:"capillary", rank:1, why:"APAC leader; ANZ via Kognitiv; 1.82B consumers", clients:"Vishal Mega Mart, ASICS, ANZ brands" },
      { id:"loyalife", rank:2, why:"Owned catalog; APAC banking", clients:"EBL (Bangladesh) — SKYCOINS" },
      { id:"antavo", rank:3, why:"Kathmandu (ANZ); global fashion brands", clients:"Kathmandu, Country Road Group (Politix)" },
      { id:"openloyal", rank:4, why:"API-first; APAC tech-forward brands", clients:"APAC e-commerce & retail" },
      { id:"eagleeye", rank:5, why:"Woolworths Group (ANZ grocery)", clients:"Woolworths Group, ANZ grocery" },
    ],
    channel:[
      { id:"loyalife", rank:1, why:"Owned catalog + WhatsApp; APAC channel", clients:"APAC FMCG channel programs" },
      { id:"capillary", rank:2, why:"APAC retail + channel via Jotun", clients:"Jotun (paint channel)" },
      { id:"biw", rank:3, why:"ANZ + Asia channel managed service", clients:"MNC channel programs (APAC)" },
    ],
  },
};

const INDUSTRIES = [
  { id:"bfsi",     label:"🏦 Banking & BFSI",      color:C.green  },
  { id:"fmcg",     label:"🛒 FMCG & CPG",          color:C.amber  },
  { id:"retail",   label:"🏬 Retail & E-comm",     color:C.accent },
  { id:"paints",   label:"🎨 Paints & Building",   color:C.purple },
  { id:"auto",     label:"🚗 Automotive",          color:C.red    },
  { id:"travel",   label:"✈️ Travel & Hospitality",color:C.teal   },
  { id:"pharma",   label:"💊 Pharma & Healthcare", color:C.soft   },
];

const INDUSTRY_MAP = {
  bfsi: {
    note:"Banking & BFSI is the highest-value loyalty vertical — coalition programs, card-linked rewards, and on-premise/compliance demands dominate. Ranked by scale and penetration in financial-services loyalty.",
    consumer:[
      { id:"loyalife", rank:1, why:"Banking + on-premise + DPDP/PCI compliance; BFSI is Loyalife's strongest vertical", clients:"FAB KSA, Emirates Investment Bank, EBL (SKYCOINS), SBM Bank Kenya, Shivalik SFB" },
      { id:"epsilon", rank:2, why:"Global BFSI scale; identity resolution; Citi, Visa", clients:"Citi, Visa, large US banks" },
      { id:"capillary", rank:3, why:"Card-linked offers; fleet & coalition modules; BFSI penetration in India/GCC", clients:"Banking clients in India & GCC" },
      { id:"collinson", rank:4, why:"Premium card loyalty (Priority Pass); deep card-issuer relationships", clients:"Premium card issuers globally" },
      { id:"comarch", rank:5, why:"European banking loyalty; on-premise", clients:"European banks" },
    ],
    channel:[
      { id:"loyalife", rank:1, why:"Bank partner channel programs; owned catalog", clients:"FAB KSA partner ecosystem" },
    ],
  },
  fmcg: {
    note:"FMCG/CPG is the largest channel-loyalty vertical (dealer/retailer/distributor incentives) and a major consumer vertical. Ranked by scale and depth of FMCG deployments.",
    consumer:[
      { id:"capillary", rank:1, why:"Deep FMCG/retail penetration; 413 brands", clients:"FMCG majors across India/SEA" },
      { id:"openloyal", rank:2, why:"Heineken, JTI — CPG at scale", clients:"Heineken, JTI" },
      { id:"loyalife", rank:3, why:"Owned catalog; FMCG consumer programs", clients:"FMCG reward storefronts" },
      { id:"epsilon", rank:4, why:"CPG personalization at scale", clients:"Global CPG brands" },
    ],
    channel:[
      { id:"almondsai", rank:1, why:"FMCG-native; Coca-Cola, backed by FMCG investors; fastest-rising", clients:"Coca-Cola India, Zandu" },
      { id:"capillary", rank:2, why:"FMCG channel + CDP; scale across India", clients:"FMCG distributor programs" },
      { id:"biw", rank:3, why:"70-yr FMCG channel managed service; Diageo", clients:"Diageo DRINC, Shell" },
      { id:"loyalife", rank:4, why:"OCR claims + GST/UPI; owned catalog", clients:"Lupin (retailer loyalty), Ashirwad Pipes" },
      { id:"zeapl", rank:5, why:"App-less for FMCG last-mile; P&G, Marico", clients:"P&G, Marico" },
      { id:"o4s", rank:6, why:"Rebate automation; serialization for high-volume FMCG", clients:"High-volume FMCG brands" },
    ],
  },
  retail: {
    note:"Retail & E-commerce is the most mature consumer-loyalty vertical, dominated by omnichannel and points/tier programs. Ranked by scale and retail penetration.",
    consumer:[
      { id:"capillary", rank:1, why:"Retail is core; Vishal Mega Mart 100M+, Starbucks", clients:"Vishal Mega Mart, Starbucks, Madura" },
      { id:"antavo", rank:2, why:"Fashion/retail specialist; C&A, LuisaViaRoma", clients:"C&A, LuisaViaRoma, Kathmandu" },
      { id:"eagleeye", rank:3, why:"Grocery retail dominance; Tesco, Asda", clients:"Tesco, Asda, Loblaws" },
      { id:"openloyal", rank:4, why:"E-commerce composable; ALDO, Intersport", clients:"ALDO, Intersport" },
      { id:"epsilon", rank:5, why:"Retail personalization; Best Buy", clients:"Best Buy" },
      { id:"loyalife", rank:6, why:"Owned catalog; retail reward storefronts", clients:"Retail reward storefront programs" },
    ],
    channel:[
      { id:"loyalife", rank:1, why:"Retailer loyalty + invoice/visibility claims; QR engine", clients:"Greenply (retailer), Alkem Rewards Plus" },
      { id:"capillary", rank:2, why:"Retail channel + CDP", clients:"Retail distributor programs" },
    ],
  },
  paints: {
    note:"Paints & Building Materials is a pure channel-loyalty vertical — painters, contractors, dealers, masons. The most contested India channel battleground. Ranked by penetration in this segment.",
    consumer:[],
    channel:[
      { id:"almondsai", rank:1, why:"Asian Paints — category leader on Channelverse™", clients:"Asian Paints" },
      { id:"zeapl", rank:2, why:"Berger, Nerolac in 18 languages; app-less for painters", clients:"Berger Paints, Nerolac" },
      { id:"loyalife", rank:3, why:"Warranty module + OCR + owned catalog; contractor/retailer programs", clients:"Greenply (plywood), Ashirwad Pipes" },
      { id:"loyaltyxpert", rank:4, why:"SMB paints specialist; Valli Paints", clients:"Valli Paints" },
      { id:"o4s", rank:5, why:"SKU serialization for building materials (cement bags)", clients:"Building materials brands" },
      { id:"biw", rank:6, why:"Managed service for construction channel", clients:"Dalmia, construction brands" },
    ],
  },
  auto: {
    note:"Automotive channel loyalty spans dealers, mechanics, and after-sales. Mechanic/influencer programs are a fast-growing India sub-segment. Ranked by penetration in auto channel.",
    consumer:[],
    channel:[
      { id:"loyalife", rank:2, why:"WhatsApp + UPI channel capability; owned catalog (emerging in auto)", clients:"Auto-channel pilots (WhatsApp + UPI)" },
      { id:"zeapl", rank:1, why:"TATA, TVS; app-less mechanic loyalty in vernacular", clients:"TATA, TVS" },
      { id:"biw", rank:3, why:"Michelin, Bosch, SKF — deep auto channel heritage; GoalQuest®", clients:"Michelin, Bosch, SKF" },
      { id:"capillary", rank:4, why:"Auto channel + CDP", clients:"Auto distributor programs" },
    ],
  },
  travel: {
    note:"Travel & Hospitality loyalty centres on frequent-flyer, hotel, and premium-card programs. A consumer-only vertical. Ranked by scale and travel-specific depth.",
    consumer:[
      { id:"collinson", rank:1, why:"Travel loyalty specialist; Priority Pass global", clients:"Priority Pass, airlines" },
      { id:"antavo", rank:2, why:"Hospitality; Scandic Hotels, Brightline", clients:"Scandic Hotels, Brightline Trains" },
      { id:"epsilon", rank:3, why:"Hilton; hospitality at scale", clients:"Hilton" },
      { id:"loyalife", rank:4, why:"Owned catalog incl. flights category; travel redemption", clients:"Plum travel/flights redemption (bank programs)" },
      { id:"capillary", rank:5, why:"Travel & hospitality module", clients:"Travel brands in APAC" },
    ],
    channel:[],
  },
  pharma: {
    note:"Pharma & Healthcare loyalty covers chemist/retailer channel incentives and patient/wellness programs. Compliance-sensitive. Ranked by penetration in pharma.",
    consumer:[
      { id:"epsilon", rank:1, why:"Walgreens pharmacy loyalty; healthcare personalization", clients:"Walgreens" },
      { id:"loyalife", rank:2, why:"DPDP/compliance-grade; pharma OTC consumer programs", clients:"Lupin OTC (Lupin Loyalty+)" },
    ],
    channel:[
      { id:"loyalife", rank:1, why:"Alkem & Lupin chemist/retailer claims with OCR; compliance", clients:"Alkem Rewards Plus, Lupin (retailer loyalty)" },
      { id:"capillary", rank:2, why:"Pharma channel via Persuade acquisition", clients:"Pharma distributor programs" },
      { id:"almondsai", rank:3, why:"Zandu (ayurveda/wellness) channel", clients:"Zandu" },
    ],
  },
};

/* ─── DATA MATRIX ─────────────────────────────────────────────────────────── */
const MATRIX_DEFS = {
  "Members / End-Users": "Total consumers or B2B partners enrolled across all programs running on the platform.",
  "Brands / Clients": "Number of enterprise clients actively running loyalty programs on this platform.",
  "Countries Active": "Geographies where the platform has live deployments.",
  "Integrations": "Number of pre-built connectors to CRM, POS, ERP, payment, and messaging systems.",
  "Loyalty-only Revenue": "Revenue attributable specifically to the loyalty platform product — excludes group/parent company revenue.",
  "Revenue Growth": "Year-over-year revenue or ARR growth rate.",
  "Typical ACV (India)": "Annual contract value range for a mid-market India deal — excludes implementation fees.",
  "Peak Tx Volume": "Maximum transaction processing rate (per hour or per second) the platform handles at peak load (e.g. festive sales).",
  "Uptime SLA": "Published service availability guarantee. 99.99% = ~52 min downtime/year.",
  "Member Actions/yr": "All loyalty events processed annually — points earned, redeemed, tier changes, campaign clicks.",
  "Redemption Rate": "% of issued points/rewards actually redeemed. Benchmark: 15-25% healthy for consumer; 30-50% for channel.",
  "Active Member Rate": "% of enrolled members who performed a loyalty action in the last 90 days. Benchmark: 30-50% healthy.",
  "AOV Uplift (Members vs Non)": "How much more loyalty members spend per order vs. non-members. Benchmark: 20%+ uplift.",
  "Member Retention Rate": "% of loyalty members who remain active year-over-year. Benchmark: 60-70%.",
  "NRR (Platform)": "Net Revenue Retention — % of prior-year platform revenue retained + expanded. >100% = clients grow spend.",
  "Point Breakage Rate": "% of issued points that expire unredeemed. Benchmark: 10-15% optimal; Antavo 2026 reports 27% average.",
  "CLV: Member vs Non-Member": "How much more valuable a loyalty member is over their lifetime vs. a non-member. Benchmark: 3.5× average.",
  "Purchase Frequency Uplift": "How much more often loyalty members buy vs. non-members. Benchmark: 20-30% uplift in retail; active redeemers buy 3.1× more annually.",
  "Reward Redemption Speed": "How fast a member receives their reward after redeeming. Instant/sub-24hr is now baseline expectation, especially in India via UPI. Slow redemption kills engagement.",
  "Personalized Offers / Scale": "Volume of individually-personalized offers the platform can generate and deliver. A proxy for AI-driven personalization maturity and infrastructure scale.",
  "Avg ROI Delivered": "The average return a client's loyalty program delivers — revenue generated per unit of program cost. Industry average is 5.3× with 92.7% of programs reporting positive ROI (Antavo GCLR 2026).",
  "Cashpots / Value Distributed": "Total monetary reward value distributed to members through the platform. A signal of program scale and member value delivered.",
  "Claim Auto-Approval (Channel)": "% of channel-partner claims (invoices) approved automatically by AI/OCR without manual review. Higher = faster partner payouts and lower ops cost. Target: 70-80%.",
  "AI Maturity": "How advanced each platform's AI is — from basic rule-based logic to live predictive models to autonomous agents. Hover each cell to see exactly what that company is doing.",
  "Agentic AI": "AI that autonomously plans and executes multi-step loyalty tasks without human intervention. Hover each cell to see what that company has built.",
  "SOC2 + ISO27001 + GDPR": "The three global enterprise security/privacy certifications required by regulated industry procurement.",
  "India DPDP + PCI DSS": "India Digital Personal Data Protection Act compliance + Payment Card Industry Data Security Standard.",
  "On-Premise Deployment": "Ability to deploy the platform within a client's own data center — required by many banking and insurance clients.",
  "Owned Reward Catalog": "Platform owns its reward inventory (gift cards, experiences, vouchers) vs. sourcing from third-party providers.",
  "Analyst Recognition": "Presence in Forrester Wave, Gartner Magic Quadrant/Market Guide, or Everest PEAK Matrix.",
};

// Per-cell tooltips: CELL_DEFS[metric][companyHeader] = explanation of exactly what that company is doing.
// Used for the AI rows (every company) and to flag notably strong competitor capabilities elsewhere.
const CELL_DEFS = {
  "AI Maturity": {
    "Loyalife":"In development: an AI Agent built on a modular LLM core — authentication/SSO, conversation management, message history, and context-window handling are being built now. Model-driven analysis (the OPTIMISE module — an AI business analyst that investigates issues like dropping redemption and returns an action plan) is scoped next.",
    "Capillary":"Live: aiRA, an AI assistant that understands a campaign brief, auto-builds the target audience, optimises rewards, and launches across markets. Paired with a predictive nudge framework and Adobe CDP integration for real-time segmentation.",
    "Antavo":"Live: Timi AI, an agentic assistant modelled on a real loyalty analyst (available in 80 languages) plus the Loyalty Planner (scopes a program 10× faster) and the Optimizer (lets you 'speak to your data' to surface insights).",
    "Epsilon":"Live: AI decisioning built on a 250M+ consumer identity graph — real-time next-best-offer, churn prediction, and campaign performance forecasting, all powered by deterministic first-party data.",
    "Open Loyalty":"Roadmap: AI is not a core differentiator. The platform is API-first/composable, so clients typically plug in their own AI/ML or CDP rather than using native AI.",
    "Eagle Eye":"Live: EagleAI personalization layer — generates 850M+ personalized offers/week at grocery scale, with real-time 1:1 decisioning at the point of sale.",
    "Talon.One":"Beta: an AI Copilot that assists with building promotion and loyalty rules. Strength is the rules engine (100K+ evaluations/sec); AI is an assist layer, not autonomous.",
    "BI Worldwide":"Rule-based: GoalQuest® applies behavioural-science models (not ML) to design sales-incentive structures. Predictive in the statistical sense, not a generative/agentic AI.",
    "Almonds AI":"Live: predictive AI inside Channelverse™ — gamification + predictive analytics for channel partners; building toward AI agents and LLMs for personalized loyalty recommendations.",
    "Zeapl.ai":"Live: AI churn prediction and behaviour-triggered alerts/nudges for channel partners, with predictive analytics on partner activity.",
  },
  "Agentic AI": {
    "Loyalife":"In development: the agentic layer is an AI Program Advisor that decomposes a manager's question (e.g. 'why are redemptions dropping?') into investigation steps, queries the data, and returns recommendations. The foundation (LLM core, SSO, conversations) is being built first; autonomous reasoning comes after.",
    "Capillary":"Moderate: aiRA can autonomously build audiences and launch campaigns from a brief, but is more of an AI co-pilot than a fully autonomous agent that self-directs program optimisation.",
    "Antavo":"Strongest in market: Timi AI is a true agentic assistant that supports every stage of program development via real-time video chat, and can autonomously suggest program structure, timing, and reward tweaks.",
    "Epsilon":"AI decisioning runs autonomous next-best-action and offer selection per individual in real time, though it's framed as decisioning rather than a conversational agent.",
    "Open Loyalty":"None — no agentic AI layer.",
    "Eagle Eye":"Partial: EagleAI autonomously selects and personalizes offers at scale, but is not a conversational program-management agent.",
    "Talon.One":"None — the AI Copilot assists rule-building but does not act autonomously.",
    "BI Worldwide":"None — relies on human consultants + GoalQuest® methodology, not autonomous AI.",
    "Almonds AI":"Building: publicly stated intent to build AI agents and LLMs for personalized loyalty recommendations; not yet live.",
    "Zeapl.ai":"None yet — has predictive AI but no autonomous agent layer.",
  },
  "Owned Reward Catalog": {
    "Loyalife":"Strong moat: 10M+ rewards across 100+ countries via Xoxoday Plum, fully owned — no third-party aggregator dependency for redemption. Competitors mostly source rewards from external providers.",
    "BI Worldwide":"Managed reward sourcing: catalogue rewards, travel rewards, and experiential incentives delivered as a service rather than an owned tech catalogue.",
  },
  "On-Premise Deployment": {
    "Loyalife":"Strong for regulated industries: on-premise + cloud deployment lets banks/insurers keep data in their own environment — a key reason Loyalife wins BFSI deals where cloud-only vendors can't compete.",
    "Open Loyalty":"Supports on-premise via its composable architecture — appeals to enterprises with data-sovereignty needs and strong internal engineering.",
    "Zeapl.ai":"Offers on-premise + hybrid — rare among India startups; relevant for clients with data-residency requirements.",
  },
  "Personalized Offers / Scale": {
    "Eagle Eye":"Notable strength: executes 850M+ personalized offers every week at 1,000+ transactions/sec — the highest published personalization throughput of any listed loyalty platform.",
    "Epsilon":"Notable strength: processes billions of personalized marketing events/year on a 250M+ identity graph — among the largest personalization engines in the market.",
  },
  "Member Retention Rate": {
    "Voucherify":"Notable: 97% customer (client) retention — the highest in the loyalty-tech vendor space, signalling strong product stickiness.",
    "Capillary":"Notable: Net Revenue Retention above 100% — existing clients expand spend year-over-year, a strong product-market-fit signal.",
  },
  "Claim Auto-Approval (Channel)": {
    "Loyalife":"Differentiator: OCR + ML pipeline (live for Alkem & Lupin) auto-reads invoices and targets ~80% auto-approval, cutting dealer payout time from days to seconds.",
    "Capillary":"Live OCR invoice processing with fraud/duplicate detection — mature claims automation for channel programs.",
  },
  "Analyst Recognition": {
    "Capillary":"Notable: named a Leader in the Forrester Wave: Loyalty Platforms Q4 2025 AND a Leader in Everest Group's PEAK Matrix 2025 — top-tier dual recognition.",
    "Antavo":"Notable: recognised by all three major analysts — Forrester, Gartner, and IDC — rare for a pure-play vendor.",
    "Epsilon":"Notable: named a Leader in the Forrester Wave: Loyalty Platforms Q4 2025, with the highest possible scores in 9 criteria.",
  },
};

const DATA_MATRIX = {
  headers:["Metric","Loyalife","Capillary","Antavo","Epsilon","Open Loyalty","Eagle Eye","Talon.One","BI Worldwide","Almonds AI","Zeapl.ai"],
  rows:[
    { group:"Scale", metric:"Members / End-Users",       vals:["65M+","1.82B","N/A (actions)","250M+ identities","~15M est.","6M+ (Asda alone)","Undisclosed","Undisclosed","Undisclosed","Undisclosed"] },
    { group:"Scale", metric:"Brands / Clients",          vals:["250+","413","100+","Fortune 500","100+","Tesco/Asda/Loblaws+","Enterprise","100+ India","4 named","6 named"] },
    { group:"Scale", metric:"Countries Active",          vals:["100+","46","Global","NA/EMEA/APAC","45+","UK/US/CA/AU/FR","Global","Global","India","India"] },
    { group:"Scale", metric:"Integrations",              vals:["250+","250+","API-first","100+ CDP","250+ endpoints","MACH API","100+","Managed svc","~50 est.","~30 est."] },
    { group:"Financial", metric:"Loyalty-only Revenue",  vals:["~$4-6M est.","~$88M (FY26)","~$15-25M","$500M+ (div)","Undisclosed","~$63M (total)","Undisclosed","Undisclosed (svc)","Pre-revenue","Pre-revenue"] },
    { group:"Financial", metric:"Revenue Growth",        vals:["Series C grp","+23% TTM, profitable","Pure-play growth","Publicis scale","800M events/yr","Public (LSE)","$130M Series U","Mature","₹200 Cr target","2.5× YoY"] },
    { group:"Financial", metric:"Typical ACV (India)",   vals:["$30K-$150K","$50K-$250K","$100K+","$500K+","$50K+","$500K+","$100K+","Undisclosed","$10K-$50K","$10K-$50K"] },
    { group:"Performance", metric:"Peak Tx Volume",      vals:["N/A (public)","180K/hr","600 req/sec","Bn+ events/yr","800M events/yr","1,000 tx/sec","100K rules/sec","N/A","N/A","N/A"] },
    { group:"Performance", metric:"Uptime SLA",          vals:["N/A","N/A","N/A","N/A","99.99%","N/A","N/A","N/A","N/A","N/A"] },
    { group:"Performance", metric:"Member Actions/yr",   vals:["N/A","1.97B+ tx","500M actions","Billions","800M events","850M offers/wk","N/A","N/A","N/A","N/A"] },
    { group:"Loyalty KPIs", metric:"Redemption Rate",    vals:["N/A (public)","N/A","N/A","N/A","ALDO: high","N/A","N/A","N/A","N/A","N/A"] },
    { group:"Loyalty KPIs", metric:"Active Member Rate", vals:["N/A (public)","Vishal: tripled AMR","N/A","N/A","ALDO: 91% retention","Asda: 6M active","N/A","N/A","N/A","N/A"] },
    { group:"Loyalty KPIs", metric:"AOV Uplift (Members vs Non)", vals:["N/A","N/A","LuisaViaRoma: 199%","N/A","ALDO: +41%","N/A","N/A","N/A","N/A","N/A"] },
    { group:"Loyalty KPIs", metric:"Member Retention Rate", vals:["N/A","NRR >100%","N/A","N/A","ALDO: 91%","N/A","Voucherify: 97%","N/A","N/A","N/A"] },
    { group:"Loyalty KPIs", metric:"CLV: Member vs Non-Member", vals:["N/A","N/A","4× (Modanisa)","N/A","3.5× (ALDO)","N/A","N/A","N/A","N/A","N/A"] },
    { group:"Loyalty KPIs", metric:"Purchase Frequency Uplift", vals:["N/A","N/A","LuisaViaRoma: +34% tx","N/A","ALDO: 2× frequency","N/A","N/A","Diageo: 10× deploy","N/A","N/A"] },
    { group:"Loyalty KPIs", metric:"Reward Redemption Speed", vals:["Instant (UPI/Plum)","Instant","N/A","N/A","N/A","Real-time","N/A","N/A","Instant UPI","Sub-24hr UPI"] },
    { group:"Loyalty KPIs", metric:"Personalized Offers / Scale", vals:["N/A","aiRA campaigns","N/A","Bn+ /yr","N/A","850M/week","100K rules/sec","N/A","N/A","N/A"] },
    { group:"Loyalty KPIs", metric:"Avg ROI Delivered", vals:["N/A","N/A","5.3× (GCLR 2026 avg)","N/A","N/A","N/A","N/A","Documented uplift","N/A","34%+ sales lift"] },
    { group:"Loyalty KPIs", metric:"Cashpots / Value Distributed", vals:["$5B+ (Xoxoday grp)","N/A","N/A","N/A","N/A","Asda: £525M","N/A","N/A","N/A","N/A"] },
    { group:"Loyalty KPIs", metric:"Claim Auto-Approval (Channel)", vals:["80% target (OCR)","✅ OCR live","N/A","N/A","N/A","N/A","N/A","Manual/managed","✅ OCR","Partial"] },
    { group:"AI", metric:"AI Maturity",                  vals:["In Development","Live — aiRA + nudge","Live — Timi AI","Live — AI decisioning","Roadmap","Live — EagleAI","AI copilot beta","GoalQuest® rule-based","Predictive AI live","Churn prediction live"] },
    { group:"AI", metric:"Agentic AI",                   vals:["In Development","Moderate (aiRA)","✅ Timi AI","AI decisioning","❌","EagleAI (partial)","❌","❌","Building","❌"] },
    { group:"Compliance", metric:"SOC2 + ISO27001 + GDPR", vals:["✅ All three","✅ All three","✅ GDPR + ISO","✅","✅ ISO + SOC2","✅","✅ GDPR + ISO","✅","⚠️ Partial","⚠️ Partial"] },
    { group:"Compliance", metric:"India DPDP + PCI DSS", vals:["✅ Both","⚠️ PCI yes","❌","❌","❌","❌","❌","❌","❌","❌"] },
    { group:"Tech", metric:"On-Premise Deployment",      vals:["✅","❌","❌","❌","✅","❌","❌","❌","❌","✅"] },
    { group:"Tech", metric:"Owned Reward Catalog",       vals:["✅ 10M+ (Plum)","❌ 3rd party","❌","❌","❌","❌","❌","✅ Managed","✅","✅"] },
    { group:"Analyst", metric:"Analyst Recognition",     vals:["Not listed","Forrester Leader + Everest PEAK","Gartner + Forrester + IDC","Forrester Leader Q4 2025","Gartner MG 2025","Forrester + Gartner + IDC","Gartner MG 2025","14 Dragons","India Report 2026","Graham Bell Awd"] },
  ]
};

/* ─── COMP CARD ───────────────────────────────────────────────────────────── */
function CompCard({ c, open, onToggle }) {
  const isSelf = c.tier === "self";
  return (
    <div style={{ background:open?(isSelf?C.accentDim:C.cardHov):C.card,
      border:`1px solid ${open?(isSelf?C.accent:C.accent+"55"):isSelf?C.accent+"44":C.border}`,
      borderRadius:12, overflow:"hidden", marginBottom:10, transition:"all 0.15s" }}>
      <div onClick={onToggle} style={{ padding:"14px 18px", cursor:"pointer" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:4 }}>
              <span style={{ fontSize:14, fontWeight:700, color:isSelf?C.accent:C.text }}>{c.name}</span>
              <Pill label={c.badge} color={c.badgeColor} />
            </div>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:4 }}>
              <span style={{ fontSize:11, color:C.muted }}>📍 {c.hq} · {c.founded}</span>
              <span style={{ fontSize:11, color:C.green }}>💰 {c.revenue}</span>
            </div>
            <div style={{ fontSize:10, color:C.muted, fontStyle:"italic" }}>⚠️ {c.revenueNote}</div>
          </div>
          <span style={{ color:C.muted, fontSize:14, flexShrink:0 }}>{open?"▲":"▼"}</span>
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:10 }}>
          {[["👥",c.members,"Members"],["🏢",c.clients,"Clients"],["📈",c.growth,"Growth"]].map(([em,v,l],i)=>(
            <div key={i} style={{ background:C.surface, border:`1px solid ${isSelf?C.accent+"33":C.border}`,
              borderRadius:7, padding:"6px 10px", flex:1, minWidth:110 }}>
              <div style={{ fontSize:11, fontWeight:700, color:isSelf?C.accent:C.accent }}>{v}</div>
              <div style={{ fontSize:10, color:C.muted }}>{em} {l}</div>
            </div>
          ))}
        </div>
      </div>

      {open && (
        <div style={{ borderTop:`1px solid ${C.border}`, padding:"14px 18px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
            {[["Consumer Loyalty",C.accent,c.consumerEx],["Channel Loyalty",C.purple,c.channelEx]].map(([t,cl,txt])=>(
              <div key={t} style={{ background:C.surface, border:`1px solid ${cl}22`, borderRadius:8, padding:"10px 12px" }}>
                <div style={{ fontSize:10, fontWeight:700, color:cl, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:5 }}>{t}</div>
                <div style={{ fontSize:11, color:C.soft, lineHeight:1.65 }}>{txt}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
            <div>
              <div style={{ fontSize:10, color:C.muted, textTransform:"uppercase", fontWeight:700, letterSpacing:"0.07em", marginBottom:5 }}>Top 5 Countries</div>
              <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>{c.geos.map((g,i)=><Pill key={i} label={g} color={C.soft} size={10}/>)}</div>
            </div>
            <div>
              <div style={{ fontSize:10, color:C.muted, textTransform:"uppercase", fontWeight:700, letterSpacing:"0.07em", marginBottom:5 }}>Focus Industries</div>
              <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>{c.industries.map((g,i)=><Pill key={i} label={g} color={C.amber} size={10}/>)}</div>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
            <div>
              <div style={{ fontSize:10, color:C.green, textTransform:"uppercase", fontWeight:700, letterSpacing:"0.07em", marginBottom:5 }}>Strengths</div>
              {c.strengths.map((s,i)=>(
                <div key={i} style={{ fontSize:11, color:C.soft, padding:"2px 0", display:"flex", gap:5 }}>
                  <span style={{ color:C.green, flexShrink:0 }}>+</span>{s}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize:10, color:C.red, textTransform:"uppercase", fontWeight:700, letterSpacing:"0.07em", marginBottom:5 }}>Gaps</div>
              {c.gaps.map((g,i)=>(
                <div key={i} style={{ fontSize:11, color:C.soft, padding:"2px 0", display:"flex", gap:5 }}>
                  <span style={{ color:C.red, flexShrink:0 }}>−</span>{g}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:isSelf?C.greenDim:C.accentDim, border:`1px solid ${isSelf?C.green:C.accent}33`, borderRadius:8, padding:"10px 12px", marginBottom:10 }}>
            <div style={{ fontSize:10, color:isSelf?C.green:C.accent, textTransform:"uppercase", fontWeight:700, letterSpacing:"0.07em", marginBottom:4 }}>
              {isSelf?"🎯 Focus Areas":"⚡ How Loyalife Wins & Where to Watch"}
            </div>
            <div style={{ fontSize:11, color:C.soft, lineHeight:1.65 }}>{c.loyalifevs}</div>
          </div>
          <div>
            <div style={{ fontSize:10, color:C.muted, marginBottom:5 }}>Reference Clients</div>
            <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
              {c.keyClients.map((k,i)=>(
                <span key={i} style={{ fontSize:10, padding:"2px 8px", borderRadius:4,
                  background:C.surface, border:`1px solid ${C.border}`, color:C.soft }}>{k}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── VIEWS ───────────────────────────────────────────────────────────────── */
function AllView() {
  const [expanded, setExpanded] = useState({});
  const [filter, setFilter] = useState("all");
  function toggle(id) { setExpanded(p=>({...p,[id]:!p[id]})); }
  const self = COMPETITORS.filter(c=>c.tier==="self");
  const primary = COMPETITORS.filter(c=>c.tier==="primary");
  const secondary = COMPETITORS.filter(c=>c.tier==="secondary");

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
        {[["Consumer Loyalty",C.accent,"Programs where a brand rewards its end-customers (B2C) for purchases, engagement, and brand interactions. Goal: increase repeat visits, basket size, and brand preference over competitors.\n\nExamples: ① Credit card points for every transaction. ② Retail tier upgrades for spending ₹50K+/year. ③ Airline miles for flights."],
          ["Channel Loyalty",C.purple,"Programs where a brand rewards its distribution partners (B2B) — distributors, dealers, retailers, mechanics — for selling, promoting, and advocating for the brand.\n\nExamples: ① Paint company rewards painters per bag used. ② Pharma firm incentivizes chemists for stocking a drug. ③ FMCG brand tracks retailer shelf visibility via QR codes."]
        ].map(([t,cl,txt])=>(
          <div key={t} style={{ background:C.card, border:`1px solid ${cl}33`, borderRadius:10, padding:"12px 16px" }}>
            <div style={{ fontSize:11, fontWeight:700, color:cl, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>{t}</div>
            <div style={{ fontSize:11, color:C.soft, lineHeight:1.65, whiteSpace:"pre-line" }}>{txt}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"inline-flex", gap:4, background:C.surface, border:`1px solid ${C.border}`,
        borderRadius:8, padding:3, marginBottom:16 }}>
        {[["all","All"],["self","Loyalife"],["primary","Primary"],["secondary","Niche / SMB"]].map(([v,l])=>(
          <button key={v} onClick={()=>setFilter(v)} style={{
            background:filter===v?C.accent:"transparent", color:filter===v?"#fff":C.muted,
            border:"none", borderRadius:6, padding:"6px 12px", fontSize:11, fontWeight:600, cursor:"pointer" }}>{l}</button>
        ))}
      </div>

      {(filter==="all"||filter==="self") && self.map(c=><CompCard key={c.id} c={c} open={!!expanded[c.id]} onToggle={()=>toggle(c.id)}/>)}
      {(filter==="all"||filter==="primary") && <>
        {(filter==="all")&&<div style={{ fontSize:10, fontWeight:700, color:C.red, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8, marginTop:8 }}>Primary Competitors — Direct Threat</div>}
        {primary.map(c=><CompCard key={c.id} c={c} open={!!expanded[c.id]} onToggle={()=>toggle(c.id)}/>)}
      </>}
      {(filter==="all"||filter==="secondary") && <>
        {(filter==="all")&&<div style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8, marginTop:8 }}>Secondary / Niche Players</div>}
        {secondary.map(c=><CompCard key={c.id} c={c} open={!!expanded[c.id]} onToggle={()=>toggle(c.id)}/>)}
      </>}
    </div>
  );
}

function MethodologyBanner() {
  return (
    <div style={{ background:C.amberDim, border:`1px solid ${C.amber}44`,
      borderRadius:8, padding:"12px 16px", marginBottom:16 }}>
      <div style={{ fontSize:11, fontWeight:700, color:C.amber, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>
        ⚠️ How to read these rankings — directional, not exact
      </div>
      <div style={{ fontSize:11, color:C.soft, lineHeight:1.65 }}>
        Region- and industry-level revenue is <strong style={{ color:C.text }}>not publicly disclosed</strong> for almost any of these vendors, so these rankings are <strong style={{ color:C.text }}>directional judgments</strong>, not a precise revenue league table. They weigh, in order:
        <div style={{ marginTop:6, paddingLeft:4 }}>
          <div style={{ marginBottom:2 }}><strong style={{ color:C.amber }}>1. Client quality &amp; marquee weight</strong> — a few large, blue-chip, reference-able clients (e.g. a national bank, a Fortune 500 brand) count for <em>more</em> than a long tail of small accounts.</div>
          <div style={{ marginBottom:2 }}><strong style={{ color:C.amber }}>2. Scale signals</strong> — member/transaction volume and in-region deployment footprint.</div>
          <div style={{ marginBottom:2 }}><strong style={{ color:C.amber }}>3. Analyst recognition</strong> — Forrester / Gartner / Everest standing as a credibility proxy.</div>
        </div>
        <div style={{ marginTop:6, color:C.muted }}>If you can share internal RevOps data (in-region revenue, deal counts, win/loss), these can be re-ranked on hard numbers.</div>
      </div>
    </div>
  );
}

function RegionalRow({ comp, entry, color }) {
  const isSelf = comp.tier === "self";
  return (
    <div style={{ display:"flex", gap:12, alignItems:"flex-start",
      background:isSelf?C.accentDim:C.card,
      border:`1px solid ${isSelf?C.accent+"44":C.border}`,
      borderRadius:10, padding:"12px 14px", marginBottom:8 }}>
      <div style={{ flexShrink:0, width:28, height:28, borderRadius:7,
        background:color+"22", color, border:`1px solid ${color}44`,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:13, fontWeight:800 }}>{entry.rank}</div>
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:3 }}>
          <span style={{ fontSize:13, fontWeight:700, color:isSelf?C.accent:C.text }}>{comp.name}</span>
          <Pill label={comp.badge} color={comp.badgeColor} size={10} />
        </div>
        <div style={{ fontSize:11, color:C.soft, lineHeight:1.55, marginBottom:5 }}>
          <span style={{ color:color, fontWeight:600 }}>Why ranked here: </span>{entry.why}
        </div>
        <div style={{ fontSize:11, color:C.muted, lineHeight:1.5 }}>
          <span style={{ fontWeight:600, color:C.soft }}>In-region clients: </span>{entry.clients}
        </div>
      </div>
    </div>
  );
}

function RegionalView() {
  const [activeR, setActiveR] = useState("india");
  const rmap = REGIONAL_MAP[activeR]||{consumer:[],channel:[],note:""};
  const reg = REGIONS.find(r=>r.id===activeR);
  const findComp = id => COMPETITORS.find(c=>c.id===id);

  return (
    <div>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
        {REGIONS.map(r=>(
          <button key={r.id} onClick={()=>setActiveR(r.id)} style={{
            background:activeR===r.id?r.color:C.surface, color:activeR===r.id?"#fff":C.muted,
            border:`1px solid ${activeR===r.id?r.color:C.border}`,
            borderRadius:8, padding:"7px 14px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{r.label}</button>
        ))}
      </div>

      <MethodologyBanner />

      {/* Ranking basis note */}
      <div style={{ background:C.surface, border:`1px solid ${reg?.color}33`, borderLeft:`3px solid ${reg?.color}`,
        borderRadius:8, padding:"10px 14px", marginBottom:20 }}>
        <div style={{ fontSize:10, fontWeight:700, color:reg?.color, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4 }}>How players are ranked in {reg?.label}</div>
        <div style={{ fontSize:11, color:C.soft, lineHeight:1.6 }}>{rmap.note}</div>
      </div>

      <div style={{ marginBottom:24 }}>
        <SectionHead title={`Consumer Loyalty — ranked for ${reg?.label}`} color={C.accent}/>
        {rmap.consumer.length===0
          ? <div style={{ fontSize:12, color:C.muted, fontStyle:"italic" }}>No major consumer loyalty platforms mapped to this region yet.</div>
          : rmap.consumer.map(e=>{ const comp=findComp(e.id); return comp ? <RegionalRow key={e.id} comp={comp} entry={e} color={C.accent}/> : null; })}
      </div>

      <div>
        <SectionHead title={`Channel / B2B Loyalty — ranked for ${reg?.label}`} color={C.purple}/>
        {rmap.channel.length===0
          ? <div style={{ fontSize:12, color:C.muted, fontStyle:"italic" }}>No major channel loyalty platforms mapped to this region yet.</div>
          : rmap.channel.map(e=>{ const comp=findComp(e.id); return comp ? <RegionalRow key={e.id} comp={comp} entry={e} color={C.purple}/> : null; })}
      </div>

      <div style={{ marginTop:16, fontSize:10, color:C.muted, fontStyle:"italic" }}>
        For full company profiles (revenue, strengths, gaps, global clients), see the All Competitors tab.
      </div>
    </div>
  );
}

function IndustryView() {
  const [activeI, setActiveI] = useState("bfsi");
  const imap = INDUSTRY_MAP[activeI]||{consumer:[],channel:[],note:""};
  const ind = INDUSTRIES.find(i=>i.id===activeI);
  const findComp = id => COMPETITORS.find(c=>c.id===id);

  return (
    <div>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
        {INDUSTRIES.map(i=>(
          <button key={i.id} onClick={()=>setActiveI(i.id)} style={{
            background:activeI===i.id?i.color:C.surface, color:activeI===i.id?"#0D0F14":C.muted,
            border:`1px solid ${activeI===i.id?i.color:C.border}`,
            borderRadius:8, padding:"7px 14px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{i.label}</button>
        ))}
      </div>

      <MethodologyBanner />

      <div style={{ background:C.surface, border:`1px solid ${ind?.color}33`, borderLeft:`3px solid ${ind?.color}`,
        borderRadius:8, padding:"10px 14px", marginBottom:20 }}>
        <div style={{ fontSize:10, fontWeight:700, color:ind?.color, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4 }}>How players are ranked in {ind?.label}</div>
        <div style={{ fontSize:11, color:C.soft, lineHeight:1.6 }}>{imap.note}</div>
      </div>

      <div style={{ marginBottom:24 }}>
        <SectionHead title={`Consumer Loyalty — ranked for ${ind?.label}`} color={C.accent}/>
        {imap.consumer.length===0
          ? <div style={{ fontSize:12, color:C.muted, fontStyle:"italic" }}>This is primarily a channel-loyalty vertical — minimal consumer loyalty activity here.</div>
          : imap.consumer.map(e=>{ const comp=findComp(e.id); return comp ? <RegionalRow key={e.id} comp={comp} entry={e} color={C.accent}/> : null; })}
      </div>

      <div>
        <SectionHead title={`Channel / B2B Loyalty — ranked for ${ind?.label}`} color={C.purple}/>
        {imap.channel.length===0
          ? <div style={{ fontSize:12, color:C.muted, fontStyle:"italic" }}>This is primarily a consumer-loyalty vertical — minimal channel loyalty activity here.</div>
          : imap.channel.map(e=>{ const comp=findComp(e.id); return comp ? <RegionalRow key={e.id} comp={comp} entry={e} color={C.purple}/> : null; })}
      </div>

      <div style={{ marginTop:16, fontSize:10, color:C.muted, fontStyle:"italic" }}>
        For full company profiles (revenue, strengths, gaps, global clients), see the All Competitors tab.
      </div>
    </div>
  );
}

function DataMatrixView() {
  const groups = [...new Set(DATA_MATRIX.rows.map(r=>r.group))];
  const [activeG, setActiveG] = useState("All");
  const groupColors = { Scale:C.accent, Financial:C.green, Performance:C.teal, "Loyalty KPIs":C.purple, AI:C.amber, Compliance:C.red, Tech:C.teal, Analyst:C.soft };
  const filtered = activeG==="All" ? DATA_MATRIX.rows : DATA_MATRIX.rows.filter(r=>r.group===activeG);

  function cellColor(v) {
    if (!v||v==="N/A"||v==="Undisclosed") return C.muted;
    if (v.startsWith("✅")) return C.green;
    if (v.startsWith("⚠️")||v.includes("Partial")||v.includes("Dev")||v.includes("Roadmap")||v.includes("Building")||v.includes("beta")||v.includes("partial")) return C.amber;
    if (v.startsWith("❌")) return C.red;
    return C.soft;
  }

  return (
    <div>
      <div style={{ fontSize:12, color:C.soft, marginBottom:12, lineHeight:1.6 }}>
        Data-first comparison across Scale, Financial, Performance, Loyalty KPIs, AI, Compliance, and Technology.
        Hover the <span style={{ color:C.accent }}>ⓘ</span> next to any metric for its definition.
        Where data is unavailable, we note it rather than estimate.
      </div>
      <GlossaryStrip />
      <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:16 }}>
        {["All",...groups].map(g=>(
          <button key={g} onClick={()=>setActiveG(g)} style={{
            background:activeG===g?(groupColors[g]||C.accent):C.surface,
            color:activeG===g?"#fff":C.muted,
            border:`1px solid ${activeG===g?(groupColors[g]||C.accent):C.border}`,
            borderRadius:6, padding:"5px 12px", fontSize:11, fontWeight:600, cursor:"pointer" }}>{g}</button>
        ))}
      </div>
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11 }}>
          <thead>
            <tr>
              {DATA_MATRIX.headers.map((h,i)=>(
                <th key={i} style={{ padding:"7px 8px", textAlign:i<=1?"left":"center",
                  fontSize:9, letterSpacing:"0.06em", textTransform:"uppercase", fontWeight:700,
                  whiteSpace:"nowrap", color:i===1?C.accent:C.muted,
                  background:i===1?C.accentDim:"transparent",
                  borderBottom:`1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row,ri)=>{
              const gc = groupColors[row.group]||C.soft;
              const hasDef = !!MATRIX_DEFS[row.metric];
              return (
                <tr key={ri} style={{ background:ri%2===0?"transparent":"#ffffff03", borderLeft:`2px solid ${gc}33` }}>
                  <td style={{ padding:"7px 8px", fontSize:11, color:C.soft, whiteSpace:"nowrap",
                    borderBottom:`1px solid ${C.border}11` }}>
                    <span style={{ fontSize:9, padding:"1px 5px", borderRadius:3,
                      background:gc+"18", color:gc, fontWeight:700, marginRight:5, letterSpacing:"0.06em" }}>{row.group}</span>
                    {row.metric}
                    {hasDef && <span style={{ marginLeft:5 }}><InfoTip text={MATRIX_DEFS[row.metric]}/></span>}
                  </td>
                  {row.vals.map((v,vi)=>{
                    const colName = DATA_MATRIX.headers[vi+1];
                    const cellDef = CELL_DEFS[row.metric] && CELL_DEFS[row.metric][colName];
                    return (
                      <td key={vi} style={{ padding:"7px 8px", textAlign:"center",
                        color:vi===0?C.accent:cellColor(v), fontWeight:vi===0?700:400,
                        background:vi===0?C.accentDim:(cellDef?C.amber+"0C":"transparent"),
                        borderBottom:`1px solid ${C.border}11`,
                        maxWidth:130, fontSize:10 }}>
                        <span style={{ display:"inline-flex", alignItems:"center", gap:3, justifyContent:"center",
                          whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:"100%" }}>
                          <span style={{ overflow:"hidden", textOverflow:"ellipsis" }}>{v}</span>
                          {cellDef && <InfoTip text={cellDef} compact />}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop:10, display:"flex", gap:14, fontSize:11, color:C.muted, flexWrap:"wrap" }}>
        <span><span style={{ color:C.green }}>Green</span> = confirmed positive</span>
        <span><span style={{ color:C.amber }}>Amber</span> = partial/in-progress</span>
        <span><span style={{ color:C.red }}>Red</span> = not available</span>
        <span><span style={{ color:C.muted }}>Grey</span> = undisclosed/N/A</span>
        <span><span style={{ color:C.accent }}>ⓘ</span> = hover for what that company is doing</span>
      </div>
    </div>
  );
}

/* ─── LOYALTY METRICS ─────────────────────────────────────────────────────── */
const METRIC_CATS = [
  { category:"Engagement", color:C.accent, metrics:[
    { name:"Redemption Rate", formula:"Points Redeemed ÷ Points Issued × 100", bench:"15–25% healthy; <10% = friction", why:"Primary health signal. Members who redeem spend 3.1× more annually than non-redeemers.", consumer:"Benchmark: 15–25% healthy for retail. Beauty brands see 66% revenue uplift within 90 days for redeeming customers. KFC UK hit 40% redemption rate (Antavo).", channel:"Target 30–50% for channel. Low rate = dealers don't find rewards worthwhile or process is too complex. High claim rejection also tanks this.", fs:"Redeemed / Issued" },
    { name:"Active Member Rate", formula:"Active Members (last 90 days) ÷ Total Enrolled × 100", bench:"30–50% = healthy; top programs 60–70%", why:"Separates truly engaged members from dormant sign-ups. Low AMR = your program is a database, not a loyalty engine.", consumer:"Vishal Mega Mart (Capillary) tripled active rate moving card-based to app-based. Industry top: 60–70%.", channel:"Channel programs often see 20–40% AMR — WhatsApp/app-less access (Zeapl) improves this significantly.", fs:"Active / Total" },
    { name:"Purchase Frequency Uplift", formula:"Avg purchases/member/month ÷ Avg purchases/non-member/month", bench:"20–30% uplift typical; up to 3.1× for active redeemers", why:"Does loyalty actually change buying behaviour? Active redeemers spend 3.1× more annually.", consumer:"Antavo: LuisaViaRoma saw 34% YoY transaction growth. Retail: 20–30% higher repeat purchase rates.", channel:"Channel partners in active programs increase purchase frequency 15–25% — particularly visible during scheme periods.", fs:"Member freq / Non-member freq" },
    { name:"Tier Migration Rate", formula:"Members who moved up a tier ÷ Total eligible × 100", bench:"10–20% quarterly upgrade = well-designed tier", why:"Tier upgrades are the most powerful engagement event. Upgraded members show 3–5× higher retention.", consumer:"Aspirational tier design drives 2× upgrade rates. Staircase programs (Antavo's specialty) outperform flat-tier.", channel:"Tracking distributor → silver → gold → platinum migration reveals scheme effectiveness. 15% quarterly is strong.", fs:"Upgrades / Eligible" },
  ]},
  { category:"Financial", color:C.green, metrics:[
    { name:"Loyalty ROI", formula:"(Revenue from loyalty purchases − Total program cost) ÷ Total program cost × 100", bench:"5.3× average (GCLR 2026); top programs 12.6×; 92.7% positive", why:"The ultimate justification metric. Average: every $1 spent on rewards returns $5.30 in incremental revenue.", consumer:"Antavo GCLR 2026: 92.7% of program owners report positive ROI; 51.5% of marketing budget now goes to loyalty + CRM; 83% of owners satisfied.", channel:"Diageo DRINC: 10× scheme deployment speed. Channel programs target 4–8× ROI on incentive spend.", fs:"(Revenue − Cost) / Cost" },
    { name:"CLV: Member vs Non-Member", formula:"Loyal member lifetime revenue ÷ Non-member lifetime revenue", bench:"3.5× average; top programs 12.6× (Loyalty Science Lab)", why:"The boardroom metric. Shows long-term revenue value of loyalty beyond individual transactions.", consumer:"Loyalty Science Lab: 3.5× average, top programs 12.6×. Average 35% revenue lift from loyalty programs.", channel:"Channel partners in programs show 2–4× higher repeat order value vs. non-enrolled partners.", fs:"Member CLV / Non-member CLV" },
    { name:"AOV Uplift", formula:"Loyalty member avg order value ÷ Non-member avg order value", bench:"Industry standard 20%; top programs 2× or more", why:"Does loyalty drive bigger baskets? Tier upgrades reliably push members to spend more per transaction.", consumer:"Open Loyalty: ALDO +41% AOV. Antavo: LuisaViaRoma platinum members +199% AOV. Modanisa: 4× revenue from loyalty members.", channel:"Tracked as Average Invoice Value. Channel programs target 15–20% higher invoice size for active partners.", fs:"Member AOV / Non-member AOV" },
    { name:"Point Breakage Rate", formula:"Points expired/voided ÷ Total points issued × 100", bench:"Antavo 2026: 27% average; optimal: 10–15%", why:"Double-edged: too high = program disengagement risk; too low = overspend on rewards. 10–15% is sustainable.", consumer:"Antavo 2026: 27% of earned points go unspent. 12% expire in programs with expiration policies.", channel:"High breakage in channel programs signals scheme complexity. Target <20% — dealers can't understand or access redemption.", fs:"Expired / Issued" },
  ]},
  { category:"Retention", color:C.purple, metrics:[
    { name:"Member Retention Rate", formula:"(Members at end − New members) ÷ Members at start × 100", bench:"60–70% industry avg; top programs 85%+", why:"5% improvement in retention → 25–95% profit increase. The single most powerful financial lever in loyalty.", consumer:"Capillary NRR >100% (platform clients expand spend). Open Loyalty: ALDO 91% retention. Voucherify: 97% client retention.", channel:"Losing a distributor costs 5–7× more to replace. Top channel programs target 80%+ annual partner retention.", fs:"(End − New) / Start" },
    { name:"Churn Rate", formula:"Members lost ÷ Total members at start × 100", bench:"<20% annual = healthy; >30% = serious problem", why:"Acquiring new customers costs 5–7× retaining existing ones. AI churn prediction reduces annual churn 15–25%.", consumer:"AI-powered programs (Capillary aiRA, Antavo Timi) detect pre-churn signals 60 days in advance.", channel:"Silent churn (enrolled but stopped buying) is the bigger threat — tracked via purchase frequency decline.", fs:"Lost / Starting members" },
    { name:"Time-to-First-Reward", formula:"Avg days from enrollment to first redemption", bench:"6–7 months average (Loyalty Science Lab); top programs <3 months", why:"If the first reward takes too long, members disengage before experiencing value. The 90-day window is critical.", consumer:"Programs that reduce reward velocity to <3 months see 2× higher long-term active rates.", channel:"Channel programs must deliver first reward within first scheme cycle (30–45 days) to prove value and earn trust.", fs:"Days to first reward" },
    { name:"Net Revenue Retention", formula:"(Start MRR + Expansion − Contraction − Churn) ÷ Start MRR × 100", bench:">100% = platform grows revenue from existing clients without new sales", why:">100% NRR means existing clients expand — the most capital-efficient growth mode for a SaaS platform.", consumer:"Capillary IPO filing: NRR >100%. Best Buy, Hilton (Epsilon) multi-year expanding contracts.", channel:"For Loyalife: NRR >100% means channel clients add more programs, members, or geographies.", fs:"(MRR + expansion − churn) / Start MRR" },
  ]},
  { category:"Efficiency", color:C.teal, metrics:[
    { name:"Enrollment-to-Activation Rate", formula:"Members who complete first transaction after signup ÷ Total enrolled × 100", bench:"60–70% healthy; <40% = onboarding friction", why:"Signing up ≠ being a loyalty member. The activation gap is where most programs leak value before they start.", consumer:"WhatsApp-based onboarding (Zeapl, Loyalife) shows 15–20% higher activation vs app-only.", channel:"GST-verified onboarding (Loyalife) reduces fake enrollments and improves genuine activation — India enterprise moat.", fs:"Activated / Enrolled" },
    { name:"Claim Approval Rate & SLA", formula:"Auto-approved claims ÷ Total claims × 100; avg days to approval", bench:"Target 70–80% auto-approval; <24 hrs digital; <72 hrs manual", why:"#1 satisfaction driver in channel loyalty. A rejected claim destroys partner trust faster than any reward can rebuild.", consumer:"N/A — applies to channel loyalty and FMCG dealer programs.", channel:"Loyalife OCR (Alkem/Lupin): targets 80% auto-approval. BIW managed service delivers faster SLA at higher cost.", fs:"Auto-approved / Total claims" },
    { name:"Reward Funding Rate", formula:"Total reward cost ÷ Total transaction volume × 100", bench:"Avg 6.9% (median 2.4%); range 0.02–38.3% (Loyalty Science Lab)", why:"How much of transaction value flows back as rewards. Higher = more engaging but must be ROI-positive.", consumer:"Loyalty Science Lab: avg 6.9% funding. High-generosity programs (6–10%) drive 2× engagement.", channel:"Channel programs fund 2–5% of dealer purchase volume as points. Higher rates justify scheme complexity.", fs:"Reward cost / Transaction vol" },
    { name:"Integration Adoption Rate", formula:"Clients using 3+ integrated systems ÷ Total clients × 100", bench:"Target 60%+ clients with 3+ integrations (creates switching costs)", why:"Deep integrations create switching costs. A platform embedded in 5 enterprise systems is effectively permanent.", consumer:"Open Loyalty: 250+ endpoints. Capillary: 250+ integrations across CRM/CDP/POS.", channel:"Loyalife: WhatsApp (Zixflow), Plum catalog, OCR pipeline. DMS (SAP/Tally) connector on roadmap.", fs:"Clients 3+ integrations / Total" },
  ]},
];

function MetricsView() {
  const [openM, setOpenM] = useState(null);
  const [aType, setAType] = useState("both");
  return (
    <div>
      <div style={{ fontSize:12, color:C.soft, marginBottom:14, lineHeight:1.65 }}>
        <strong style={{ color:C.text }}>16 metrics that define loyalty program success</strong> — across Engagement, Financial, Retention, and Efficiency.
        Each includes formula, industry benchmark, why it matters, and how it applies to Consumer vs Channel loyalty.
      </div>
      <GlossaryStrip />
      <div style={{ display:"inline-flex", gap:4, background:C.surface, border:`1px solid ${C.border}`,
        borderRadius:8, padding:3, marginBottom:20 }}>
        {[["both","Consumer + Channel"],["consumer","Consumer"],["channel","Channel"]].map(([v,l])=>(
          <button key={v} onClick={()=>setAType(v)} style={{
            background:aType===v?C.accent:"transparent", color:aType===v?"#fff":C.muted,
            border:"none", borderRadius:6, padding:"6px 12px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{l}</button>
        ))}
      </div>
      {METRIC_CATS.map((cat,ci)=>(
        <div key={ci} style={{ marginBottom:22 }}>
          <div style={{ background:cat.color+"18", border:`1px solid ${cat.color}33`,
            borderRadius:8, padding:"10px 14px", marginBottom:10 }}>
            <div style={{ fontSize:13, fontWeight:700, color:cat.color }}>{cat.category} Metrics</div>
          </div>
          {cat.metrics.map((m,mi)=>{
            const key=`${ci}-${mi}`;
            const isOpen=openM===key;
            return (
              <div key={mi} style={{ background:isOpen?C.cardHov:C.card,
                border:`1px solid ${isOpen?cat.color+"55":C.border}`,
                borderRadius:10, marginBottom:8, overflow:"hidden" }}>
                <div onClick={()=>setOpenM(isOpen?null:key)} style={{
                  padding:"12px 16px", cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
                  <div>
                    <span style={{ fontSize:13, fontWeight:700, color:C.text }}>{m.name}</span>
                    <span style={{ fontSize:10, color:C.muted, marginLeft:10 }}>
                      <code style={{ color:cat.color }}>{m.fs}</code>
                    </span>
                  </div>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <span style={{ fontSize:10, color:cat.color, background:cat.color+"18",
                      border:`1px solid ${cat.color}33`, padding:"2px 8px", borderRadius:4, fontWeight:600, whiteSpace:"nowrap" }}>
                      {m.bench.split(";")[0]}
                    </span>
                    <span style={{ color:C.muted, fontSize:14 }}>{isOpen?"▲":"▼"}</span>
                  </div>
                </div>
                {isOpen && (
                  <div style={{ borderTop:`1px solid ${C.border}`, padding:"14px 16px" }}>
                    <div style={{ marginBottom:10 }}>
                      <div style={{ fontSize:10, color:C.muted, textTransform:"uppercase", fontWeight:700, letterSpacing:"0.07em", marginBottom:4 }}>Full Formula</div>
                      <code style={{ fontSize:11, color:cat.color, background:cat.color+"10", padding:"4px 8px", borderRadius:4 }}>{m.formula}</code>
                    </div>
                    <div style={{ marginBottom:10 }}>
                      <div style={{ fontSize:10, color:C.muted, textTransform:"uppercase", fontWeight:700, letterSpacing:"0.07em", marginBottom:4 }}>Benchmark</div>
                      <div style={{ fontSize:11, color:C.soft, lineHeight:1.6 }}>{m.bench}</div>
                    </div>
                    <div style={{ marginBottom:10 }}>
                      <div style={{ fontSize:10, color:C.muted, textTransform:"uppercase", fontWeight:700, letterSpacing:"0.07em", marginBottom:4 }}>Why It Matters</div>
                      <div style={{ fontSize:11, color:C.soft, lineHeight:1.6 }}>{m.why}</div>
                    </div>
                    {(aType==="both"||aType==="consumer") && (
                      <div style={{ background:C.accentDim, border:`1px solid ${C.accent}33`, borderRadius:8, padding:"8px 12px", marginBottom:8 }}>
                        <div style={{ fontSize:10, color:C.accent, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4 }}>Consumer Context</div>
                        <div style={{ fontSize:11, color:C.soft, lineHeight:1.6 }}>{m.consumer}</div>
                      </div>
                    )}
                    {(aType==="both"||aType==="channel") && (
                      <div style={{ background:C.purpleDim, border:`1px solid ${C.purple}33`, borderRadius:8, padding:"8px 12px" }}>
                        <div style={{ fontSize:10, color:C.purple, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4 }}>Channel Context</div>
                        <div style={{ fontSize:11, color:C.soft, lineHeight:1.6 }}>{m.channel}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ─── MAIN ────────────────────────────────────────────────────────────────── */
/* ─── MARKET & GROWTH VIEW ────────────────────────────────────────────────── */
const TAM = [
  { label:"Global loyalty management market", now:"$16.4B (2026)", then:"$32.5B by 2031", cagr:"14.6% CAGR", note:"North America = 38% of 2025 revenue, but APAC is the fastest-growing region — driven by mobile wallets + QR interoperability leapfrogging cards.", color:C.accent },
  { label:"India loyalty market", now:"$4.07B (2026)", then:"$7.18B by 2030", cagr:"15.3% CAGR", note:"Grew 19.9% CAGR over 2021-25. Capillary leads with 15-20% share, then InterMiles (10-15%) and Zeta (8-12%). Ecosystem-led, payments-driven.", color:C.amber },
  { label:"India B2B channel loyalty", now:"₹26,800 Cr (2026)", then:"Riding $8T retail by 2035", cagr:"17.5% global B2B CAGR", note:"Almonds AI Channel Loyalty Report 2026. The key shift: from enrollment metrics to measurable ROI + behavioural engagement.", color:C.purple },
  { label:"Cloud vs on-premise", now:"On-prem = 74.7% (2025)", then:"Cloud APIs +16.4%/yr", cagr:"fastest segment", note:"Cloud-based API platforms are eroding on-premise share. Loyalife offering BOTH is a wedge for regulated BFSI clients.", color:C.teal },
];

const TRENDS = [
  { t:"APAC + QR + mobile-first tailwind", d:"APAC is the fastest-growing loyalty region because UPI/QR interoperability lets consumers redeem points instantly at checkout — leapfrogging card-based models. 80% of India's last-mile influencers now prefer mobile-first redemption.", takeaway:"Loyalife's India-native UPI/GST/WhatsApp stack + Plum catalog is built exactly for this. Lean into it as the #1 growth narrative.", color:C.green },
  { t:"Channel loyalty: enrollment → engagement", d:"51% of channel partners are enrolled in 6+ programs but actively engage with only a few — transactional reward fatigue is real. Brands now want measurable ROI, behavioural engagement, and AI-led program intelligence; 65% believe training & participation should be rewarded alongside sales.", takeaway:"Position Loyalife's claims/OCR + analytics + non-sales reward triggers as the answer to channel fatigue. B2B loyalty grows 17.5% CAGR — faster than consumer.", color:C.purple },
  { t:"Cloud + on-prem flexibility = BFSI wedge", d:"On-premise still held 74.7% share in 2025, but cloud API platforms grow 16.4%/yr. Regulated BFSI/insurance clients need data sovereignty AND modern APIs. Most pure-plays (Capillary, Antavo) are cloud-only.", takeaway:"Loyalife's dual deployment + DPDP/PCI/ISO compliance is a structural moat in GCC/India banking that Capillary and Antavo can't match.", color:C.accent },
  { t:"Market consolidation + AI arms race", d:"Capillary is now a profitable public company consolidating via M&A (Kognitiv, Nov 2025). Hyperscalers are embedding loyalty into CDPs; Shopify & PayPal rumored to be eyeing loyalty M&A. AI ROI is rising for the 3rd straight year (5.3× avg).", takeaway:"Pure-plays must differentiate on vertical depth or owned data. Loyalife's owned Plum catalog + BFSI/channel verticals is the defensible niche — but the AI gap (vs aiRA/Timi) must close fast.", color:C.amber },
];

// Growth signals per competitor — revenue trajectory, funding, M&A, profitability
const GROWTH_SIGNALS = [
  { name:"Loyalife — Xoxoday", rev:"~$4-6M est. (loyalty div.)", growth:"Part of Xoxoday Series C (2026); IPO targeted 2027/28", profit:"n/d", mna:"Built on Giift acquisition (50K+ programs, 130M+ users)", self:true },
  { name:"Capillary", rev:"₹735 Cr / ~$88M (FY26)", growth:"+23% TTM, 34% 5-yr CAGR", profit:"Profitable: ₹52 Cr net, 13% OPM", mna:"Acquired Kognitiv (Nov 2025), Brierley earlier" },
  { name:"Antavo", rev:"~$15-25M ARR est.", growth:"Strong (pure-play); GCLR authority", profit:"Reinvests 60% of revenue in product", mna:"Organic; Series B prep" },
  { name:"Epsilon", rev:"$500M+ (loyalty div. est.)", growth:"Publicis-scale; Forrester Leader", profit:"Profitable (Publicis-owned)", mna:"Part of Publicis Groupe (~€14B)" },
  { name:"Open Loyalty", rev:"n/d (OEX SA grp €225M)", growth:"800M loyalty events/yr; Gartner MG 2025", profit:"n/d", mna:"Organic" },
  { name:"Eagle Eye", rev:"~£50M / ~$63M", growth:"Public (LSE AIM); 850M offers/wk", profit:"Profitable", mna:"Acquired Untie Nots, Eagle AI" },
  { name:"Talon.One", rev:"n/d", growth:"$130M Series U (Jun 2025)", profit:"n/d", mna:"VC-funded growth" },
  { name:"BI Worldwide", rev:"$200M+ est. (global)", growth:"Services-led; mature", profit:"Profitable (private)", mna:"Organic" },
  { name:"Almonds AI", rev:"₹16 Cr funded; ₹200 Cr FY25 target", growth:"Fast-rising; published India report", profit:"Pre-profit (seed)", mna:"Backed by Haldiram + OfBusiness co-founder" },
  { name:"Zeapl.ai", rev:"n/d", growth:"2.5× YoY; MEITY-backed", profit:"Pre-profit", mna:"Organic" },
];

function MarketView() {
  return (
    <div>
      {/* TAM */}
      <SectionHead title="Market Sizing — the loyalty market is big, growing, and tilting toward Loyalife's strengths" color={C.accent} />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:24 }}>
        {TAM.map((m,i)=>(
          <div key={i} style={{ background:C.card, border:`1px solid ${m.color}33`, borderLeft:`3px solid ${m.color}`, borderRadius:10, padding:"12px 16px" }}>
            <div style={{ fontSize:12, fontWeight:700, color:C.text, marginBottom:6 }}>{m.label}</div>
            <div style={{ display:"flex", gap:8, alignItems:"baseline", flexWrap:"wrap", marginBottom:6 }}>
              <span style={{ fontSize:16, fontWeight:800, color:m.color }}>{m.now}</span>
              <span style={{ fontSize:11, color:C.muted }}>→ {m.then}</span>
              <span style={{ fontSize:10, fontWeight:700, color:m.color, background:m.color+"18", border:`1px solid ${m.color}33`, borderRadius:4, padding:"1px 7px" }}>{m.cagr}</span>
            </div>
            <div style={{ fontSize:11, color:C.soft, lineHeight:1.6 }}>{m.note}</div>
          </div>
        ))}
      </div>

      {/* Strategic narratives */}
      <SectionHead title="Four growth narratives for Loyalife — where the market is moving" color={C.purple} />
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
        {TRENDS.map((t,i)=>(
          <div key={i} style={{ background:C.card, border:`1px solid ${t.color}33`, borderRadius:10, padding:"14px 16px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
              <span style={{ fontSize:11, fontWeight:800, color:t.color, background:t.color+"18", border:`1px solid ${t.color}44`, borderRadius:"50%", width:22, height:22, display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{i+1}</span>
              <span style={{ fontSize:13, fontWeight:700, color:C.text }}>{t.t}</span>
            </div>
            <div style={{ fontSize:11, color:C.soft, lineHeight:1.65, marginBottom:8 }}>{t.d}</div>
            <div style={{ background:t.color+"12", border:`1px solid ${t.color}33`, borderRadius:8, padding:"8px 12px" }}>
              <span style={{ fontSize:10, fontWeight:700, color:t.color, textTransform:"uppercase", letterSpacing:"0.06em" }}>Loyalife takeaway: </span>
              <span style={{ fontSize:11, color:C.soft, lineHeight:1.6 }}>{t.takeaway}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Growth signals table */}
      <SectionHead title="Competitor growth signals — revenue, trajectory, profitability, M&A" color={C.green} />
      <div style={{ fontSize:11, color:C.soft, marginBottom:10, lineHeight:1.6 }}>
        A data- and growth-oriented snapshot. "n/d" = not disclosed. Capillary is the clear financial leader; most others are private/estimated.
      </div>
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11 }}>
          <thead>
            <tr>
              {["Company","Loyalty Revenue","Growth Trajectory","Profitability","Funding / M&A"].map((h,i)=>(
                <th key={i} style={{ padding:"8px 10px", textAlign:"left", fontSize:9, letterSpacing:"0.06em",
                  textTransform:"uppercase", fontWeight:700, color:C.muted, whiteSpace:"nowrap",
                  borderBottom:`1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GROWTH_SIGNALS.map((g,i)=>(
              <tr key={i} style={{ background:g.self?C.accentDim:(i%2===0?"transparent":"#ffffff03") }}>
                <td style={{ padding:"8px 10px", fontSize:12, fontWeight:g.self?800:600, color:g.self?C.accent:C.text, whiteSpace:"nowrap", borderBottom:`1px solid ${C.border}11` }}>{g.name}</td>
                <td style={{ padding:"8px 10px", fontSize:11, color:C.green, borderBottom:`1px solid ${C.border}11` }}>{g.rev}</td>
                <td style={{ padding:"8px 10px", fontSize:11, color:C.soft, borderBottom:`1px solid ${C.border}11` }}>{g.growth}</td>
                <td style={{ padding:"8px 10px", fontSize:11, color:C.soft, borderBottom:`1px solid ${C.border}11` }}>{g.profit}</td>
                <td style={{ padding:"8px 10px", fontSize:11, color:C.soft, borderBottom:`1px solid ${C.border}11` }}>{g.mna}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Benchmark callouts */}
      <SectionHead title="Fresh 2026 loyalty benchmarks (Antavo GCLR 2026)" color={C.amber} />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(150px, 1fr))", gap:8 }}>
        {[
          { v:"5.3×", l:"Average loyalty ROI; 92.7% report positive return" },
          { v:"51.5%", l:"Of total marketing budget now on loyalty + CRM" },
          { v:"83%", l:"Of program owners satisfied with their program" },
          { v:"27%", l:"Of US loyalty points go unspent (>$10B/yr lost)" },
          { v:"65.9%", l:"Of consumers say loyalty is part of everyday life" },
          { v:"56.2% vs 82.6%", l:"Loyalty perception gap (customers vs marketers)" },
        ].map((b,i)=>(
          <div key={i} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:9, padding:"10px 13px" }}>
            <div style={{ fontSize:16, fontWeight:800, color:C.amber }}>{b.v}</div>
            <div style={{ fontSize:10, color:C.muted, marginTop:2, lineHeight:1.4 }}>{b.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const VIEWS=[{id:"all",label:"All Competitors"},{id:"market",label:"Market & Growth"},{id:"region",label:"By Region"},{id:"industry",label:"By Industry"},{id:"data",label:"Data Matrix"},{id:"metrics",label:"Loyalty Metrics"}];
const MSTATS=[{v:"$16.4B → $32B",l:"Global loyalty market 2026→2031 (14.6% CAGR)",c:C.accent},{v:"5.3×",l:"Avg loyalty ROI; 92.7% report positive (Antavo GCLR 2026)",c:C.green},{v:"51.5%",l:"Of marketing budget now on loyalty + CRM",c:C.amber},{v:"₹26,800 Cr",l:"India B2B channel loyalty market (2026)",c:C.purple}];

export default function App() {
  const [view, setView] = useState("all");
  return (
    <div style={{ background:C.bg, minHeight:"100vh", color:C.text,
      fontFamily:"'Inter', system-ui, sans-serif", padding:"20px 14px",
      maxWidth:1080, margin:"0 auto" }}>
      <div style={{ marginBottom:18 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
          <div style={{ background:C.accent, borderRadius:6, width:22, height:22,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:11, fontWeight:900, color:"#fff" }}>L</div>
          <span style={{ fontSize:10, color:C.muted, letterSpacing:"0.12em", textTransform:"uppercase" }}>
            Loyalife · Competitive Intelligence · CPO Review · Internal · June 2026
          </span>
        </div>
        <h1 style={{ fontSize:21, fontWeight:900, margin:"0 0 3px", letterSpacing:"-0.02em" }}>
          Consumer &amp; Channel Loyalty — Competitor Analysis
        </h1>
        <p style={{ fontSize:11, color:C.muted, margin:0 }}>
          Sources: Internal Wiki + Jira, Antavo GCLR 2026, Capillary FY26 filings (Screener/BSE), Mordor &amp; Fortune Business Insights market reports, Almonds AI Channel Loyalty Report 2026, Loyalty Science Lab, public filings · June 2026
        </p>
      </div>

      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:18 }}>
        {MSTATS.map((s,i)=>(
          <div key={i} style={{ background:C.card, border:`1px solid ${C.border}`,
            borderRadius:9, padding:"9px 13px", flex:1, minWidth:130 }}>
            <div style={{ fontSize:16, fontWeight:800, color:s.c }}>{s.v}</div>
            <div style={{ fontSize:10, color:C.muted, marginTop:2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:20,
        background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:4 }}>
        {VIEWS.map(v=>(
          <button key={v.id} onClick={()=>setView(v.id)} style={{
            background:view===v.id?C.accent:"transparent", color:view===v.id?"#fff":C.muted,
            border:"none", borderRadius:7, padding:"7px 16px",
            fontSize:12, fontWeight:600, cursor:"pointer", transition:"all 0.15s" }}>{v.label}</button>
        ))}
      </div>

      {view==="all"     && <AllView />}
      {view==="market"  && <MarketView />}
      {view==="region"  && <RegionalView />}
      {view==="industry"&& <IndustryView />}
      {view==="data"    && <DataMatrixView />}
      {view==="metrics" && <MetricsView />}

      <div style={{ marginTop:28, paddingTop:12, borderTop:`1px solid ${C.border}`, fontSize:10, color:C.muted }}>
        For internal use only · Do not share externally · Revenue figures are estimates or publicly disclosed figures unless noted
      </div>
    </div>
  );
}
