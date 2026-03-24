import { useState, useEffect } from "react";

const C = { primary:"#36BFB1", secondary:"#038C73", accent:"#02735E", dark:"#014034", black:"#0D0D0D", white:"#F5F5F5", gray:"#1a2a25", muted:"#b0c4bc" };

const Ic = {
  cart:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  x:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  star:<svg width="14" height="14" viewBox="0 0 24 24" fill="#36BFB1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  chk:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#36BFB1" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  arr:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  pin:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  mail:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  ph:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  clk:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
};

const SIcon = ({s,sz=48}) => {
  const st={width:sz,height:sz};
  if(s==="Cricket") return <svg style={st} viewBox="0 0 64 64" fill="none"><rect x="29" y="8" width="6" height="36" rx="3" fill={C.primary}/><ellipse cx="32" cy="52" rx="10" ry="5" fill={C.primary} opacity=".25"/><circle cx="50" cy="14" r="5" fill={C.primary} opacity=".5"/></svg>;
  if(s==="Pickleball") return <svg style={st} viewBox="0 0 64 64" fill="none"><rect x="26" y="32" width="12" height="24" rx="4" fill={C.primary}/><ellipse cx="32" cy="24" rx="15" ry="17" fill={C.primary} opacity=".2" stroke={C.primary} strokeWidth="2"/><circle cx="28" cy="22" r="2" fill={C.primary} opacity=".4"/><circle cx="36" cy="20" r="2" fill={C.primary} opacity=".4"/><circle cx="32" cy="28" r="2" fill={C.primary} opacity=".4"/></svg>;
  if(s==="Netball") return <svg style={st} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="15" stroke={C.primary} strokeWidth="2.5" fill={C.primary} opacity=".12"/><line x1="17" y1="32" x2="47" y2="32" stroke={C.primary} strokeWidth="1.5"/><line x1="32" y1="17" x2="32" y2="47" stroke={C.primary} strokeWidth="1.5"/></svg>;
  if(s==="Rugby") return <svg style={st} viewBox="0 0 64 64" fill="none"><ellipse cx="32" cy="32" rx="20" ry="11" transform="rotate(-30 32 32)" fill={C.primary} opacity=".15" stroke={C.primary} strokeWidth="2.5"/><line x1="26" y1="26" x2="38" y2="38" stroke={C.primary} strokeWidth="1.5"/></svg>;
  if(s==="Football") return <svg style={st} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="15" stroke={C.primary} strokeWidth="2.5" fill={C.primary} opacity=".12"/><path d="M24 20L32 16L40 20L44 28L40 36L32 40L24 36L20 28Z" stroke={C.primary} strokeWidth="1.5" fill="none"/></svg>;
  return null;
};

const HERO_IMG = "/rnr-hero.jpg";

const products = [
  {id:"pb1",name:"Project Boomstik Widebody",brand:"Selkirk LABS",price:333,cat:"paddle",skill:"Intermediate - Pro",shape:"Widebody",wt:"8.0-8.4 oz",core:"BoomCore",face:"T700 Carbon (3 layers)",pw:10,ct:8,sp:10,ss:10,img:"https://www.selkirk.com/cdn/shop/files/boomstik-widebody-front_800x.png?v=1724878261",feat:true},
  {id:"pb2",name:"Project Boomstik Elongated",brand:"Selkirk LABS",price:333,cat:"paddle",skill:"Intermediate - Pro",shape:"Elongated",wt:"8.1-8.4 oz",core:"BoomCore",pw:10,ct:8,sp:10,ss:9,img:"https://www.selkirk.com/cdn/shop/files/boomstik-elongated-front_800x.png?v=1724878261"},
  {id:"pb3",name:"LUXX Control Air Invikta",brand:"Selkirk",price:280,cat:"paddle",skill:"Beginner - Pro",shape:"Invikta",wt:"7.9-8.3 oz",core:"X7 Thickset Honeycomb",pw:6.5,ct:10,sp:10,ss:10,img:"https://www.selkirk.com/cdn/shop/files/LUXX-InfiniGrit-Invikta-Red-Front_800x.png?v=1730386706",feat:true,colors:["#e53935","#1e88e5","#8e24aa"]},
  {id:"pb4",name:"LUXX Control Air Epic",brand:"Selkirk",price:280,cat:"paddle",skill:"Beginner - Pro",shape:"Epic",wt:"7.9-8.3 oz",core:"X7 Thickset Honeycomb",pw:6,ct:10,sp:10,ss:10,img:"https://www.selkirk.com/cdn/shop/files/LUXX-InfiniGrit-Epic-Blue-Front_800x.png?v=1730386707",colors:["#e53935","#1e88e5","#8e24aa"]},
  {id:"pb5",name:"SLK Era Power Elongated",brand:"SLK by Selkirk",price:200,cat:"paddle",skill:"Intermediate - Pro",shape:"Elongated",wt:"7.9-8.4 oz",core:"Dynamic Fusion Core",pw:8.5,ct:7.5,sp:8.5,ss:9,img:"https://www.selkirk.com/cdn/shop/files/SLK-ERA-Power-Elongated-Cyan-Front_800x.png?v=1738007757",feat:true},
  {id:"pb6",name:"SLK Era Power Widebody",brand:"SLK by Selkirk",price:200,cat:"paddle",skill:"Intermediate - Pro",shape:"Widebody",wt:"8.0-8.3 oz",core:"Dynamic Fusion Core",pw:8.5,ct:7.5,sp:8.5,ss:8,img:"https://www.selkirk.com/cdn/shop/files/SLK-ERA-Power-Widebody-Cyan-Front_800x.png?v=1738007757"},
  {id:"pb7",name:"SLK Dauntless Widebody",brand:"SLK by Selkirk",price:180,cat:"paddle",skill:"Beginner - Pro",shape:"Widebody",wt:"7.7-8.1 oz",core:"SoloCore PureFoam",pw:7.5,ct:8,sp:9,ss:9,img:"https://www.selkirk.com/cdn/shop/files/Dauntless-Widebody-Green-Front_800x.png?v=1726587018",colors:["#616161","#1e88e5","#fb8c00","#43a047"]},
  {id:"pb8",name:"SLK Dauntless Elongated",brand:"SLK by Selkirk",price:180,cat:"paddle",skill:"Beginner - Pro",shape:"Elongated",wt:"7.7-8.1 oz",core:"SoloCore PureFoam",pw:7.5,ct:8,sp:9,ss:8,img:"https://www.selkirk.com/cdn/shop/files/Dauntless-Elongated-Blue-Front_800x.png?v=1726587018",colors:["#616161","#1e88e5","#fb8c00","#43a047"]},
  {id:"pb9",name:"SLK Geo Widebody",brand:"SLK by Selkirk",price:100,cat:"paddle",skill:"Beginner - Intermediate",shape:"Widebody",wt:"7.8-8.1 oz",core:"Polypropylene Honeycomb",pw:7,ct:9,sp:8,ss:9,img:"https://www.selkirk.com/cdn/shop/files/GEO-Widebody-Blue-Front_800x.png?v=1726587157",colors:["#1e88e5","#fff","#43a047","#e91e8f"]},
  {id:"pb10",name:"SLK Geo Elongated",brand:"SLK by Selkirk",price:100,cat:"paddle",skill:"Beginner - Intermediate",shape:"Elongated",wt:"7.8-8.1 oz",core:"Polypropylene Honeycomb",pw:7,ct:9,sp:8,ss:8,img:"https://www.selkirk.com/cdn/shop/files/GEO-Elongated-Blue-Front_800x.png?v=1726587157",colors:["#1e88e5","#fff","#43a047","#e91e8f"]},
  {id:"pb11",name:"SLK Valkyrie Widebody",brand:"SLK by Selkirk",price:80,cat:"paddle",skill:"Beginner",shape:"Widebody",wt:"7.9-8.1 oz",core:"X5 Polymer",img:"https://www.selkirk.com/cdn/shop/files/Valkyrie-SeaMist-Front_800x.png?v=1720554118",colors:["#00a86b","#e91e8f","#222","#90caf9","#c62828"]},
  {id:"pb12",name:"SLK Atlas Bundle",brand:"SLK by Selkirk",price:104,cat:"bundle",skill:"Beginner - Intermediate",desc:"2 Atlas Paddles + 1 Sling Bag + 3 Hybrid+ Balls",img:"https://www.selkirk.com/cdn/shop/files/SLK-Atlas-Bundle-Box_800x.png?v=1697055738",feat:true},
  {id:"pb13",name:"Pro S1 Ball 4-Pack",brand:"Selkirk",price:15,cat:"balls",desc:"38-hole patented design, USAP approved, 1-year no-crack warranty",img:"https://www.selkirk.com/cdn/shop/files/Pro-S1-4-Pack-Box_800x.png?v=1697054693"},
  {id:"pb14",name:"Pro S1 Ball 12-Pack",brand:"Selkirk",price:35,cat:"balls",desc:"38-hole patented design, USAP approved",img:"https://www.selkirk.com/cdn/shop/files/Pro-S1-12-Pack_800x.png?v=1697054693"},
  {id:"pb15",name:"Pro S1 Ball 100-Pack",brand:"Selkirk",price:250,cat:"balls",desc:"Bulk pack for clubs and facilities",img:"https://www.selkirk.com/cdn/shop/files/Pro-S1-4-Pack-Box_800x.png?v=1697054693"},
  {id:"pb16",name:"SLK Prime Net (Wheels)",brand:"SLK by Selkirk",price:170,cat:"nets",desc:"USAP approved, 22ft wide, lockable wheels, 23.8 lbs",img:"https://www.selkirk.com/cdn/shop/files/SLK-Prime-Net-Wheels_800x.png?v=1697056543"},
  {id:"pb17",name:"SLK Prime Portable Net",brand:"SLK by Selkirk",price:120,cat:"nets",desc:"USAP approved, 22ft wide, 19.18 lbs",img:"https://www.selkirk.com/cdn/shop/files/SLK-Prime-Net-Wheels_800x.png?v=1697056543"},
  {id:"pb18",name:"SLK Pro Portable Net",brand:"SLK by Selkirk",price:150,cat:"nets",desc:"Powder-coated steel frame, USAP approved",img:"https://www.selkirk.com/cdn/shop/files/SLK-Pro-Net_800x.png?v=1697056543"},
  {id:"pb19",name:"Quick Set Net",brand:"Selkirk",price:120,cat:"nets",desc:"Under 5 min setup, 9 lbs, tool-free",img:"https://www.selkirk.com/cdn/shop/files/QuickSet-Net-Open_800x.png?v=1720120838"},
  {id:"pb20",name:"Semi-Permanent Pro Net",brand:"Selkirk",price:2700,cat:"nets",desc:"Aluminum frame, 103 lbs, plays like permanent",img:"https://www.selkirk.com/cdn/shop/products/Selkirk-Labs-Semi-Permanent-Net_800x.jpg?v=1697070144"},
  {id:"pb21",name:"Premium Paddle Case",brand:"Selkirk",price:20,cat:"accessories",img:"https://www.selkirk.com/cdn/shop/files/Paddle-Case-BKRD-Front_800x.png?v=1720554543"},
  {id:"pb22",name:"SLK Paddle Case",brand:"SLK by Selkirk",price:12,cat:"accessories",img:"https://www.selkirk.com/cdn/shop/files/SLK-Case-Front_800x.png?v=1697067048"},
  {id:"pb23",name:"Faux Leather Grip",brand:"Selkirk",price:10,cat:"accessories",img:"https://www.selkirk.com/cdn/shop/products/faux-leather-grip_800x.jpg?v=1680901234"},
  {id:"pb24",name:"Tacky Overgrip 3-Pack",brand:"Selkirk",price:7,cat:"accessories",img:"https://www.selkirk.com/cdn/shop/products/tacky-overgrip-black_800x.jpg?v=1680901234",colors:["#222","#fff","#888"]},
  {id:"pb25",name:"Edge Guard Tape 30mm",brand:"Selkirk",price:8,cat:"accessories",img:"https://www.selkirk.com/cdn/shop/products/edge-tape-30-black_800x.jpg?v=1680901234",colors:["#222","#fff"]},
  {id:"pb26",name:"Tungsten Tape",brand:"Selkirk",price:10,cat:"accessories",img:"https://www.selkirk.com/cdn/shop/products/tungsten-tape_800x.jpg?v=1680901234"},
  {id:"pb27",name:"Carbon Cleaning Block",brand:"Selkirk",price:10,cat:"accessories",img:"https://www.selkirk.com/cdn/shop/products/cleaning-block_800x.jpg?v=1680901234"},
  {id:"pb28",name:"Players Towel",brand:"Selkirk",price:23,cat:"accessories",img:"https://www.selkirk.com/cdn/shop/files/Selkirk-Towel-Red-Front_800x.png?v=1720554843",colors:["#e53935","#fff","#1a237e","#e91e8f"]},
  {id:"pb29",name:"Core Line Sling Bag",brand:"Selkirk",price:40,cat:"bags",img:"https://www.selkirk.com/cdn/shop/files/Sling-Bag-Black-Front_800x.png?v=1720554343",colors:["#222","#c8a2c8","#888","#2e7d32","#c62828","#d2b48c"]},
  {id:"pb30",name:"Core Day Backpack",brand:"Selkirk",price:50,cat:"bags",img:"https://www.selkirk.com/cdn/shop/files/Core-Day-Bag-Black-Front_800x.png?v=1697067848",colors:["#222","#c8a2c8","#888","#2e7d32","#c62828","#d2b48c"]},
  {id:"pb31",name:"Core Team Backpack",brand:"Selkirk",price:80,cat:"bags",img:"https://www.selkirk.com/cdn/shop/files/Core-Team-Bag-Black-Front_800x.png?v=1697067848",colors:["#222","#c8a2c8","#888","#2e7d32","#c62828","#d2b48c"]},
  {id:"pb32",name:"Core Tour Backpack",brand:"Selkirk",price:130,cat:"bags",img:"https://www.selkirk.com/cdn/shop/files/Core-Tour-Bag-Red-Front_800x.png?v=1697067848",colors:["#222","#c8a2c8","#888","#2e7d32","#c62828","#d2b48c"]},
  {id:"pb33",name:"Pro Line Team Backpack",brand:"Selkirk",price:150,cat:"bags",img:"https://www.selkirk.com/cdn/shop/files/Pro-Team-Bag-White-Front_800x.png?v=1697067848",colors:["#222","#fff"]},
  {id:"pb34",name:"Mini Fanny Pack",brand:"Selkirk",price:30,cat:"bags",img:"https://www.selkirk.com/cdn/shop/files/Mini-Pack-Black-Front_800x.png?v=1720554343",colors:["#222","#c8a2c8","#888","#2e7d32","#c62828","#d2b48c"]},
  {id:"pb35",name:"Boost Glove",brand:"Selkirk",price:12,cat:"accessories",desc:"All-weather grip, honeycomb palm",img:"https://www.selkirk.com/cdn/shop/products/boost-glove-rh_800x.jpg?v=1680901234"},
  {id:"pb36",name:"Attaktix Leather Glove",brand:"Selkirk",price:30,cat:"accessories",desc:"Premium leather, Flex-Fit compression",img:"https://www.selkirk.com/cdn/shop/products/attaktix-glove_800x.jpg?v=1680901234"},
];

const sports = [
  {name:"Cricket",desc:"Premium bats, pads, helmets & more",c:"#038C73"},
  {name:"Pickleball",desc:"Selkirk paddles, balls & accessories",c:"#36BFB1"},
  {name:"Netball",desc:"Balls, bibs, posts & training gear",c:"#02735E"},
  {name:"Rugby",desc:"Boots, balls, protection & apparel",c:"#014034"},
  {name:"Football",desc:"Boots, balls, kits & training gear",c:"#038C73"},
];

const StatBar = ({l,v}) => (
  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
    <span style={{width:68,fontSize:10.5,color:C.muted,textTransform:"uppercase",letterSpacing:1,fontFamily:"'Barlow Condensed',sans-serif"}}>{l}</span>
    <div style={{flex:1,height:5,background:"rgba(54,191,177,0.1)",borderRadius:3}}>
      <div style={{width:`${(v/10)*100}%`,height:"100%",background:`linear-gradient(90deg,${C.secondary},${C.primary})`,borderRadius:3,transition:"width .5s"}}/>
    </div>
    <span style={{width:22,fontSize:11.5,color:C.primary,fontWeight:700,textAlign:"right",fontFamily:"'Barlow Condensed',sans-serif"}}>{v}</span>
  </div>
);

const Card = ({p,onAdd}) => {
  const [h,sH]=useState(false);
  const [ie,sIe]=useState(false);
  return (
    <div onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)} style={{background:h?"rgba(54,191,177,0.04)":"rgba(255,255,255,0.015)",border:`1px solid ${h?"rgba(54,191,177,0.22)":"rgba(255,255,255,0.05)"}`,borderRadius:16,overflow:"hidden",transition:"all .3s",transform:h?"translateY(-4px)":"none",cursor:"pointer",position:"relative"}}>
      {p.feat && <div style={{position:"absolute",top:12,left:12,background:C.primary,color:C.black,fontSize:9.5,fontWeight:800,padding:"3px 10px",borderRadius:20,letterSpacing:1,textTransform:"uppercase",zIndex:2,fontFamily:"'Barlow Condensed',sans-serif"}}>Featured</div>}
      <div style={{height:210,background:`linear-gradient(150deg,${C.dark}dd,${C.gray})`,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",padding:14}}>
        {!ie?<img src={p.img} alt={p.name} onError={()=>sIe(true)} style={{maxHeight:"100%",maxWidth:"100%",objectFit:"contain",filter:"drop-shadow(0 6px 20px rgba(0,0,0,.4))",transition:"transform .3s",transform:h?"scale(1.06)":"scale(1)"}}/>:<div style={{opacity:.15}}><SIcon s="Pickleball" sz={60}/></div>}
      </div>
      <div style={{padding:"12px 16px 16px"}}>
        <div style={{fontSize:10.5,color:C.primary,fontWeight:600,textTransform:"uppercase",letterSpacing:1.5,marginBottom:3,fontFamily:"'Barlow Condensed',sans-serif"}}>{p.brand}</div>
        <div style={{fontSize:14.5,fontWeight:700,color:C.white,marginBottom:4,lineHeight:1.3}}>{p.name}</div>
        {p.skill&&<div style={{fontSize:10.5,color:C.muted,marginBottom:5}}>{p.skill}</div>}
        {p.shape&&<div style={{fontSize:10.5,color:"rgba(54,191,177,.55)",marginBottom:5}}>{p.shape} &middot; {p.wt}</div>}
        {p.desc&&<div style={{fontSize:11.5,color:C.muted,marginBottom:7,lineHeight:1.4}}>{p.desc}</div>}
        {p.pw!==undefined&&<div style={{marginBottom:9}}><StatBar l="Power" v={p.pw}/><StatBar l="Control" v={p.ct}/><StatBar l="Spin" v={p.sp}/></div>}
        {p.colors&&<div style={{display:"flex",gap:4,marginBottom:9}}>{p.colors.map((cl,i)=><div key={i} style={{width:13,height:13,borderRadius:"50%",border:"1px solid rgba(255,255,255,.18)",background:cl}}/>)}</div>}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:21,fontWeight:800,color:C.white,fontFamily:"'Barlow Condensed',sans-serif"}}>${p.price}</span>
          <button onClick={e=>{e.stopPropagation();onAdd(p)}} style={{background:`linear-gradient(135deg,${C.secondary},${C.accent})`,color:C.white,border:"none",padding:"7px 15px",borderRadius:8,fontSize:10.5,fontWeight:700,cursor:"pointer",textTransform:"uppercase",letterSpacing:1,transition:"all .2s",fontFamily:"'Barlow Condensed',sans-serif"}} onMouseOver={e=>e.target.style.background=C.primary} onMouseOut={e=>e.target.style.background=`linear-gradient(135deg,${C.secondary},${C.accent})`}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default function App(){
  const [pg,sPg]=useState("home");
  const [cart,sCart]=useState([]);
  const [co,sCo]=useState(false);
  const [pf,sPf]=useState("all");
  const [ps,sPs]=useState("featured");
  const [sc,sSc]=useState(false);
  const [ne,sNe]=useState("");
  const [cf,sCf]=useState({n:"",e:"",m:""});

  useEffect(()=>{const h=()=>sSc(window.scrollY>50);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h)},[]);

  const add=p=>{sCart(prev=>{const x=prev.find(i=>i.id===p.id);if(x)return prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i);return[...prev,{...p,qty:1}]});sCo(true);setTimeout(()=>sCo(false),2500)};
  const rem=id=>sCart(prev=>prev.filter(i=>i.id!==id));
  const tot=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const cnt=cart.reduce((s,i)=>s+i.qty,0);
  const filt=products.filter(p=>pf==="all"||p.cat===pf).sort((a,b)=>{if(ps==="price-low")return a.price-b.price;if(ps==="price-high")return b.price-a.price;return(b.feat?1:0)-(a.feat?1:0)});
  const cats=[{k:"all",l:"All"},{k:"paddle",l:"Paddles"},{k:"balls",l:"Balls"},{k:"nets",l:"Nets"},{k:"accessories",l:"Accessories"},{k:"bags",l:"Bags"},{k:"bundle",l:"Bundles"}];

  return (
    <div style={{background:C.black,minHeight:"100vh",fontFamily:"'Sora',system-ui,sans-serif",color:C.white}}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&family=Barlow+Condensed:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}img{max-width:100%}@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.fadeUp{animation:fadeUp .7s ease both}`}</style>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:sc?"rgba(13,13,13,.96)":"transparent",backdropFilter:sc?"blur(20px)":"none",borderBottom:sc?"1px solid rgba(54,191,177,.1)":"none",transition:"all .3s",padding:"0 24px"}}>
        <div style={{maxWidth:1400,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:66}}>
          <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>sPg("home")}>
            <div style={{width:40,height:40,background:`linear-gradient(135deg,${C.primary},${C.accent})`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,color:C.black,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>RNR</div>
            <div><div style={{fontSize:16,fontWeight:800,color:C.white,letterSpacing:1.5,lineHeight:1,fontFamily:"'Barlow Condensed',sans-serif"}}>RNR SPORTS</div><div style={{fontSize:8.5,color:C.primary,textTransform:"uppercase",letterSpacing:3,fontFamily:"'Barlow Condensed',sans-serif"}}>Cayman Islands</div></div>
          </div>
          <div style={{display:"flex",gap:26,alignItems:"center"}}>
            {["home","shop","pickleball","about","contact"].map(p=>(
              <span key={p} onClick={()=>sPg(p)} style={{color:pg===p?C.primary:C.white,fontSize:11.5,fontWeight:600,cursor:"pointer",textTransform:"uppercase",letterSpacing:2,borderBottom:pg===p?`2px solid ${C.primary}`:"2px solid transparent",paddingBottom:4,transition:"color .2s",fontFamily:"'Barlow Condensed',sans-serif"}}>{p}</span>
            ))}
            <div onClick={()=>sCo(!co)} style={{position:"relative",cursor:"pointer",padding:4,color:C.white}}>
              {Ic.cart}
              {cnt>0&&<span style={{position:"absolute",top:-4,right:-6,background:C.primary,color:C.black,borderRadius:"50%",width:17,height:17,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9.5,fontWeight:800}}>{cnt}</span>}
            </div>
          </div>
        </div>
      </nav>

      {/* CART */}
      {co&&<div onClick={()=>sCo(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:1000}}/>}
      <div style={{position:"fixed",top:0,right:co?0:-440,width:410,height:"100vh",background:"rgba(13,13,13,.98)",backdropFilter:"blur(20px)",borderLeft:"1px solid rgba(54,191,177,.12)",zIndex:1001,transition:"right .3s",padding:26,overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:26}}>
          <h3 style={{fontSize:21,fontWeight:800,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>Your Cart</h3>
          <span onClick={()=>sCo(false)} style={{cursor:"pointer",color:C.muted}}>{Ic.x}</span>
        </div>
        {cart.length===0?<p style={{color:C.muted,textAlign:"center",marginTop:80,fontSize:13}}>Your cart is empty</p>:<>
          {cart.map(i=>(
            <div key={i.id} style={{display:"flex",gap:12,alignItems:"center",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
              <div style={{width:52,height:52,borderRadius:10,background:C.gray,overflow:"hidden",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <img src={i.img} alt="" style={{width:"100%",height:"100%",objectFit:"contain",padding:4}} onError={e=>e.target.style.display="none"}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{color:C.white,fontSize:12.5,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{i.name}</div>
                <div style={{color:C.muted,fontSize:10.5}}>Qty: {i.qty} x ${i.price}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{color:C.primary,fontWeight:700,fontSize:13.5,fontFamily:"'Barlow Condensed',sans-serif"}}>${i.price*i.qty}</div>
                <span onClick={()=>rem(i.id)} style={{color:"#e53935",cursor:"pointer",fontSize:10.5}}>Remove</span>
              </div>
            </div>
          ))}
          <div style={{borderTop:`2px solid ${C.primary}`,marginTop:22,paddingTop:18}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:18}}>
              <span style={{fontSize:17,fontWeight:700}}>Total</span>
              <span style={{color:C.primary,fontSize:23,fontWeight:800,fontFamily:"'Barlow Condensed',sans-serif"}}>${tot.toFixed(2)}</span>
            </div>
            <button style={{width:"100%",padding:15,background:`linear-gradient(135deg,${C.secondary},${C.primary})`,color:C.black,border:"none",borderRadius:10,fontSize:13,fontWeight:800,cursor:"pointer",textTransform:"uppercase",letterSpacing:2,fontFamily:"'Barlow Condensed',sans-serif"}}>Proceed to Checkout</button>
          </div>
        </>}
      </div>

      {/* ══ HOME ══ */}
      {pg==="home"&&<>
        {/* HERO with uploaded image */}
        <div style={{position:"relative",width:"100%",minHeight:"60vw",maxHeight:"92vh",overflow:"hidden",display:"flex",alignItems:"flex-end"}}>
          <img src={HERO_IMG} alt="RNR Cricket - Redefine the Game" style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
          {/* Bottom gradient overlay for blending into dark bg */}
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:"45%",background:"linear-gradient(transparent, rgba(13,13,13,0.7) 60%, #0D0D0D 100%)"}}/>
          {/* CTA overlay at bottom */}
          <div style={{position:"relative",zIndex:2,width:"100%",maxWidth:1400,margin:"0 auto",padding:"0 24px 48px"}} className="fadeUp">
            <p style={{fontSize:16,color:C.muted,marginBottom:20,maxWidth:500,lineHeight:1.6}}>
              Premium equipment for cricket, pickleball, netball, rugby & football. Trusted by athletes across the Caribbean.
            </p>
            <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
              <button onClick={()=>sPg("shop")} style={{padding:"15px 34px",background:`linear-gradient(135deg,${C.secondary},${C.primary})`,color:C.black,border:"none",borderRadius:10,fontSize:12.5,fontWeight:800,cursor:"pointer",textTransform:"uppercase",letterSpacing:2,fontFamily:"'Barlow Condensed',sans-serif",transition:"all .2s"}}>Shop Cricket Gear</button>
              <button onClick={()=>sPg("pickleball")} style={{padding:"14px 34px",background:"rgba(13,13,13,0.6)",backdropFilter:"blur(8px)",color:C.primary,border:`2px solid ${C.primary}`,borderRadius:10,fontSize:12.5,fontWeight:800,cursor:"pointer",textTransform:"uppercase",letterSpacing:2,fontFamily:"'Barlow Condensed',sans-serif",transition:"all .2s"}}>Explore Pickleball</button>
            </div>
          </div>
        </div>

        {/* CATEGORIES */}
        <div style={{maxWidth:1400,margin:"0 auto",padding:"72px 24px"}}>
          <div style={{textAlign:"center",marginBottom:44}}>
            <h2 style={{fontSize:38,fontWeight:900,margin:"0 0 8px",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>Shop by Sport</h2>
            <p style={{color:C.muted,fontSize:14.5}}>Everything you need, from the pitch to the court</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:16}}>
            {sports.map(s=>(
              <div key={s.name} onClick={()=>s.name==="Pickleball"?sPg("pickleball"):sPg("shop")} style={{background:`linear-gradient(150deg,${s.c}15,${s.c}05)`,border:`1px solid ${s.c}22`,borderRadius:16,padding:26,cursor:"pointer",transition:"all .3s",textAlign:"center"}} onMouseOver={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.borderColor=s.c+"77"}} onMouseOut={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor=s.c+"22"}}>
                <div style={{margin:"0 auto 12px",width:48}}><SIcon s={s.name}/></div>
                <div style={{fontSize:17,fontWeight:800,color:C.white,marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>{s.name}</div>
                <div style={{fontSize:11.5,color:C.muted,lineHeight:1.4}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURED */}
        <div style={{maxWidth:1400,margin:"0 auto",padding:"0 24px 80px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:30}}>
            <div>
              <h2 style={{fontSize:32,fontWeight:900,margin:0,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>Top Picks for Pickleball Season</h2>
              <p style={{color:C.muted,margin:"4px 0 0",fontSize:13.5}}>Selkirk paddles and gear - the #1 brand in pickleball</p>
            </div>
            <button onClick={()=>sPg("pickleball")} style={{padding:"9px 20px",background:"transparent",border:`1px solid ${C.primary}`,color:C.primary,borderRadius:8,fontSize:10.5,fontWeight:700,cursor:"pointer",textTransform:"uppercase",letterSpacing:1,fontFamily:"'Barlow Condensed',sans-serif",display:"flex",alignItems:"center",gap:6}}>View All {Ic.arr}</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}}>
            {products.filter(p=>p.feat).map(p=><Card key={p.id} p={p} onAdd={add}/>)}
          </div>
        </div>

        {/* WHY RNR */}
        <div style={{background:`linear-gradient(180deg,${C.dark},${C.black})`,padding:"80px 24px"}}>
          <div style={{maxWidth:1400,margin:"0 auto"}}>
            <h2 style={{fontSize:38,fontWeight:900,textAlign:"center",margin:"0 0 44px",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>Why Choose RNR</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:22}}>
              {[{t:"Quality Equipment",d:"Authorized dealer of Selkirk, the #1 pickleball brand, plus premium cricket and sports brands"},{t:"Local Caribbean Supplier",d:"Based in the Cayman Islands, serving the entire Caribbean sports community"},{t:"Trusted by Athletes",d:"Preferred supplier for clubs, schools, and competitive players across the islands"},{t:"Fast Island Delivery",d:"Quick and reliable delivery throughout Grand Cayman and the Cayman Islands"}].map((f,i)=>(
                <div key={i} style={{background:"rgba(54,191,177,.025)",border:"1px solid rgba(54,191,177,.06)",borderRadius:16,padding:30,textAlign:"center"}}>
                  <div style={{margin:"0 auto 14px",display:"flex",justifyContent:"center"}}>{Ic.chk}</div>
                  <div style={{fontSize:17,fontWeight:700,color:C.white,marginBottom:7}}>{f.t}</div>
                  <div style={{fontSize:12.5,color:C.muted,lineHeight:1.6}}>{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div style={{background:`linear-gradient(135deg,${C.dark},rgba(3,140,115,.1))`,padding:"80px 24px"}}>
          <div style={{maxWidth:1400,margin:"0 auto"}}>
            <h2 style={{fontSize:34,fontWeight:900,textAlign:"center",margin:"0 0 44px",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>What Athletes Say</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22}}>
              {[{n:"Marcus T.",s:"Cricket",t:"Best sports shop in the Caymans. Quality gear and amazing service. My go-to for all cricket equipment."},{n:"Sarah K.",s:"Pickleball",t:"The Selkirk LUXX Control Air is incredible. RNR had the best price and it arrived in 2 days!"},{n:"David R.",s:"Rugby",t:"Finally a local supplier that carries proper rugby gear. The team orders process is seamless."}].map((r,i)=>(
                <div key={i} style={{background:"rgba(0,0,0,.3)",border:"1px solid rgba(54,191,177,.08)",borderRadius:16,padding:30}}>
                  <div style={{display:"flex",gap:3,marginBottom:11}}>{[1,2,3,4,5].map(x=><span key={x}>{Ic.star}</span>)}</div>
                  <p style={{color:C.muted,fontSize:13.5,lineHeight:1.7,marginBottom:18,fontStyle:"italic"}}>"{r.t}"</p>
                  <div style={{display:"flex",alignItems:"center",gap:11}}>
                    <div style={{width:38,height:38,borderRadius:"50%",background:`linear-gradient(135deg,${C.secondary},${C.primary})`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:C.black,fontSize:14,fontFamily:"'Barlow Condensed',sans-serif"}}>{r.n[0]}</div>
                    <div><div style={{color:C.white,fontWeight:700,fontSize:13.5}}>{r.n}</div><div style={{color:C.primary,fontSize:10.5,textTransform:"uppercase",letterSpacing:1,fontFamily:"'Barlow Condensed',sans-serif"}}>{r.s} Player</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div style={{maxWidth:1400,margin:"0 auto",padding:"56px 24px"}}>
          <div style={{background:`linear-gradient(135deg,${C.secondary},${C.accent})`,borderRadius:22,padding:"44px 52px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:22}}>
            <div><h3 style={{fontSize:26,fontWeight:800,margin:"0 0 5px",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>Stay in the Game</h3><p style={{color:"rgba(255,255,255,.8)",margin:0,fontSize:13.5}}>Get exclusive deals, new arrivals & Caribbean sports news</p></div>
            <div style={{display:"flex",gap:12}}>
              <input value={ne} onChange={e=>sNe(e.target.value)} placeholder="Enter your email" style={{padding:"13px 18px",background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.22)",borderRadius:10,color:C.white,fontSize:13.5,width:270,outline:"none",fontFamily:"'Sora',sans-serif"}}/>
              <button style={{padding:"13px 26px",background:C.black,color:C.primary,border:"none",borderRadius:10,fontWeight:800,fontSize:11.5,cursor:"pointer",textTransform:"uppercase",letterSpacing:1,fontFamily:"'Barlow Condensed',sans-serif"}}>Subscribe</button>
            </div>
          </div>
        </div>
      </>}

      {/* ══ PICKLEBALL ══ */}
      {pg==="pickleball"&&<div style={{paddingTop:66}}>
        <div style={{position:"relative",padding:"68px 24px 44px",background:`linear-gradient(135deg,${C.black},${C.dark})`,overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,right:0,width:"40%",height:"100%",background:"radial-gradient(ellipse at center,rgba(54,191,177,.06),transparent 70%)"}}/>
          <div style={{maxWidth:1400,margin:"0 auto",position:"relative"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(54,191,177,.06)",border:"1px solid rgba(54,191,177,.18)",borderRadius:30,padding:"6px 16px",marginBottom:18}}>
              <span style={{fontSize:10.5,color:C.primary,fontWeight:700,textTransform:"uppercase",letterSpacing:2,fontFamily:"'Barlow Condensed',sans-serif"}}>Authorized Selkirk Dealer</span>
            </div>
            <h1 style={{fontSize:46,fontWeight:900,margin:"0 0 8px",lineHeight:1.1,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>Pickleball Gear</h1>
            <p style={{fontSize:14.5,color:C.muted,maxWidth:540,lineHeight:1.6,margin:"0 0 26px"}}>The complete Selkirk collection - from LABS innovation to SLK essentials. Paddles, balls, nets, bags, and accessories for every level.</p>
            <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:12}}>
              {cats.map(c=>(
                <button key={c.k} onClick={()=>sPf(c.k)} style={{padding:"6px 16px",background:pf===c.k?C.primary:"rgba(255,255,255,.03)",color:pf===c.k?C.black:C.muted,border:`1px solid ${pf===c.k?C.primary:"rgba(255,255,255,.07)"}`,borderRadius:20,fontSize:10.5,fontWeight:700,cursor:"pointer",textTransform:"uppercase",letterSpacing:1,transition:"all .2s",fontFamily:"'Barlow Condensed',sans-serif"}}>{c.l}</button>
              ))}
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{color:C.muted,fontSize:11,fontFamily:"'Barlow Condensed',sans-serif"}}>Sort:</span>
              {[{k:"featured",l:"Featured"},{k:"price-low",l:"Price Low"},{k:"price-high",l:"Price High"}].map(s=>(
                <button key={s.k} onClick={()=>sPs(s.k)} style={{padding:"4px 11px",background:ps===s.k?"rgba(54,191,177,.1)":"transparent",color:ps===s.k?C.primary:C.muted,border:"none",borderRadius:6,fontSize:10.5,cursor:"pointer",fontWeight:600,fontFamily:"'Barlow Condensed',sans-serif"}}>{s.l}</button>
              ))}
              <span style={{marginLeft:"auto",color:C.muted,fontSize:11,fontFamily:"'Barlow Condensed',sans-serif"}}>{filt.length} products</span>
            </div>
          </div>
        </div>
        <div style={{maxWidth:1400,margin:"0 auto",padding:"34px 24px 80px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:18}}>
            {filt.map(p=><Card key={p.id} p={p} onAdd={add}/>)}
          </div>
          {filt.length===0&&<div style={{textAlign:"center",padding:60,color:C.muted}}>No products found.</div>}
        </div>
        <div style={{background:`linear-gradient(135deg,${C.dark},${C.black})`,padding:"52px 24px"}}>
          <div style={{maxWidth:860,margin:"0 auto",textAlign:"center"}}>
            <div style={{fontSize:11,color:C.primary,fontWeight:700,textTransform:"uppercase",letterSpacing:3,marginBottom:10,fontFamily:"'Barlow Condensed',sans-serif"}}>Powered by Selkirk</div>
            <h3 style={{fontSize:26,fontWeight:800,margin:"0 0 12px",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>Innovation Meets Performance</h3>
            <p style={{color:C.muted,fontSize:13.5,lineHeight:1.8,maxWidth:650,margin:"0 auto"}}>Selkirk Sport leads with technologies like InfiniGrit surfaces for triple durability, BoomCore foam systems for explosive power, and MOI Tuning Systems for expanded sweet spots. Every paddle is backed by a limited lifetime warranty.</p>
            <div style={{display:"flex",justifyContent:"center",gap:44,marginTop:28}}>
              {[{v:"36+",l:"Products"},{v:"3",l:"Tech Lines"},{v:"#1",l:"In Pickleball"},{v:"USAP",l:"Approved"}].map((s,i)=>(
                <div key={i}><div style={{fontSize:26,fontWeight:900,color:C.primary,fontFamily:"'Barlow Condensed',sans-serif"}}>{s.v}</div><div style={{fontSize:10.5,color:C.muted,textTransform:"uppercase",letterSpacing:1,fontFamily:"'Barlow Condensed',sans-serif"}}>{s.l}</div></div>
              ))}
            </div>
          </div>
        </div>
      </div>}

      {/* ══ SHOP ══ */}
      {pg==="shop"&&<div style={{paddingTop:66}}>
        <div style={{padding:"68px 24px 44px",background:`linear-gradient(135deg,${C.black},${C.dark})`}}>
          <div style={{maxWidth:1400,margin:"0 auto"}}><h1 style={{fontSize:46,fontWeight:900,margin:"0 0 8px",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>Shop All Sports</h1><p style={{color:C.muted,fontSize:14.5}}>Premium gear for every game</p></div>
        </div>
        <div style={{maxWidth:1400,margin:"0 auto",padding:"36px 24px 80px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22}}>
            {sports.map(s=>(
              <div key={s.name} onClick={()=>s.name==="Pickleball"?sPg("pickleball"):null} style={{background:`linear-gradient(150deg,${s.c}10,${s.c}04)`,border:`1px solid ${s.c}18`,borderRadius:20,padding:38,cursor:"pointer",transition:"all .3s"}} onMouseOver={e=>e.currentTarget.style.transform="translateY(-4px)"} onMouseOut={e=>e.currentTarget.style.transform="none"}>
                <div style={{marginBottom:14}}><SIcon s={s.name} sz={54}/></div>
                <div style={{fontSize:23,fontWeight:800,color:C.white,marginBottom:7,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>{s.name}</div>
                <div style={{color:C.muted,fontSize:13.5,marginBottom:18,lineHeight:1.5}}>{s.desc}</div>
                <span style={{color:C.primary,fontWeight:700,fontSize:12,textTransform:"uppercase",letterSpacing:1,fontFamily:"'Barlow Condensed',sans-serif",display:"flex",alignItems:"center",gap:6}}>{s.name==="Pickleball"?"Browse Selkirk Collection":"Coming Soon"} {Ic.arr}</span>
              </div>
            ))}
          </div>
        </div>
      </div>}

      {/* ══ ABOUT ══ */}
      {pg==="about"&&<div style={{paddingTop:66}}>
        <div style={{padding:"68px 24px 80px",background:`linear-gradient(135deg,${C.black},${C.dark})`}}>
          <div style={{maxWidth:830,margin:"0 auto"}}>
            <h1 style={{fontSize:46,fontWeight:900,margin:"0 0 24px",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>About RNR</h1>
            <p style={{color:C.muted,fontSize:15.5,lineHeight:1.8,marginBottom:18}}>RNR Cricket Sporting Equipment was born from a love of sport and a desire to bring world-class equipment to the Caribbean. Based in the Cayman Islands, we started with cricket and have expanded to serve athletes across pickleball, netball, rugby, and football.</p>
            <p style={{color:C.muted,fontSize:15.5,lineHeight:1.8,marginBottom:18}}>We partner with industry leaders like Selkirk Sport, bringing their cutting-edge pickleball technology to island courts. From weekend warriors to competitive athletes, we are here to fuel your passion for sport.</p>
            <p style={{color:C.muted,fontSize:15.5,lineHeight:1.8,marginBottom:34}}>Whether you are smashing a cricket ball at the Oval, dinking at a pickleball court, or scoring on the football pitch - RNR is your home for sports in the Cayman Islands.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22}}>
              {[{v:"500+",l:"Products"},{v:"5",l:"Sports Covered"},{v:"2020",l:"Established"}].map((s,i)=>(
                <div key={i} style={{background:"rgba(54,191,177,.04)",borderRadius:16,padding:30,textAlign:"center",border:"1px solid rgba(54,191,177,.06)"}}>
                  <div style={{fontSize:34,fontWeight:900,color:C.primary,fontFamily:"'Barlow Condensed',sans-serif"}}>{s.v}</div>
                  <div style={{fontSize:11.5,color:C.muted,textTransform:"uppercase",letterSpacing:1,marginTop:3,fontFamily:"'Barlow Condensed',sans-serif"}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>}

      {/* ══ CONTACT ══ */}
      {pg==="contact"&&<div style={{paddingTop:66}}>
        <div style={{padding:"68px 24px 80px",background:`linear-gradient(135deg,${C.black},${C.dark})`}}>
          <div style={{maxWidth:1060,margin:"0 auto"}}>
            <h1 style={{fontSize:46,fontWeight:900,margin:"0 0 8px",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>Get in Touch</h1>
            <p style={{color:C.muted,fontSize:14.5,marginBottom:44}}>We would love to hear from you - orders, team equipment, or just to talk sport.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:44}}>
              <div>
                {[{l:"Name",f:"n"},{l:"Email",f:"e"}].map(x=>(
                  <div key={x.f} style={{marginBottom:18}}>
                    <label style={{display:"block",color:C.primary,fontSize:10.5,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:7,fontFamily:"'Barlow Condensed',sans-serif"}}>{x.l}</label>
                    <input value={cf[x.f]} onChange={e=>sCf({...cf,[x.f]:e.target.value})} style={{width:"100%",padding:13,background:"rgba(255,255,255,.03)",border:"1px solid rgba(54,191,177,.12)",borderRadius:10,color:C.white,fontSize:13.5,outline:"none",boxSizing:"border-box",fontFamily:"'Sora',sans-serif"}}/>
                  </div>
                ))}
                <div style={{marginBottom:18}}>
                  <label style={{display:"block",color:C.primary,fontSize:10.5,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:7,fontFamily:"'Barlow Condensed',sans-serif"}}>Message</label>
                  <textarea value={cf.m} onChange={e=>sCf({...cf,m:e.target.value})} rows={5} style={{width:"100%",padding:13,background:"rgba(255,255,255,.03)",border:"1px solid rgba(54,191,177,.12)",borderRadius:10,color:C.white,fontSize:13.5,outline:"none",resize:"vertical",fontFamily:"'Sora',sans-serif",boxSizing:"border-box"}}/>
                </div>
                <button style={{padding:"14px 34px",background:`linear-gradient(135deg,${C.secondary},${C.primary})`,color:C.black,border:"none",borderRadius:10,fontSize:12.5,fontWeight:800,cursor:"pointer",textTransform:"uppercase",letterSpacing:2,fontFamily:"'Barlow Condensed',sans-serif"}}>Send Message</button>
              </div>
              <div>
                <div style={{background:"rgba(54,191,177,.025)",border:"1px solid rgba(54,191,177,.08)",borderRadius:16,padding:30,marginBottom:18}}>
                  <h3 style={{color:C.white,fontSize:19,fontWeight:700,margin:"0 0 18px",fontFamily:"'Barlow Condensed',sans-serif"}}>Contact Info</h3>
                  {[{ic:Ic.pin,t:"George Town, Grand Cayman, Cayman Islands"},{ic:Ic.mail,t:"info@rnrsports.ky"},{ic:Ic.ph,t:"+1 (345) 555-0123"},{ic:Ic.clk,t:"Mon-Sat: 9:00 AM - 6:00 PM"}].map((x,i)=>(
                    <div key={i} style={{display:"flex",gap:11,alignItems:"center",marginBottom:13,color:C.muted,fontSize:13.5}}><span style={{color:C.primary,flexShrink:0}}>{x.ic}</span>{x.t}</div>
                  ))}
                </div>
                <div style={{background:"rgba(54,191,177,.025)",border:"1px solid rgba(54,191,177,.08)",borderRadius:16,padding:30}}>
                  <h3 style={{color:C.white,fontSize:19,fontWeight:700,margin:"0 0 8px",fontFamily:"'Barlow Condensed',sans-serif"}}>Team & Club Orders</h3>
                  <p style={{color:C.muted,fontSize:12.5,lineHeight:1.7}}>Need equipment for your team or club? We offer bulk pricing and custom orders. Contact us for a personalized quote.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}

      {/* FOOTER */}
      <footer style={{background:C.black,borderTop:"1px solid rgba(54,191,177,.06)",padding:"52px 24px 22px"}}>
        <div style={{maxWidth:1400,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:44,marginBottom:44}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                <div style={{width:34,height:34,background:`linear-gradient(135deg,${C.primary},${C.accent})`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:11,color:C.black,fontFamily:"'Barlow Condensed',sans-serif"}}>RNR</div>
                <span style={{fontSize:14,fontWeight:800,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>RNR Cricket Sporting Equipment</span>
              </div>
              <p style={{color:C.muted,fontSize:12.5,lineHeight:1.7,maxWidth:280}}>Your premier Caribbean sports retailer. Quality equipment for cricket, pickleball, netball, rugby & football.</p>
            </div>
            <div>
              <h4 style={{color:C.primary,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:14,fontFamily:"'Barlow Condensed',sans-serif"}}>Sports</h4>
              {["Cricket","Pickleball","Netball","Rugby","Football"].map(s=>(
                <div key={s} onClick={()=>s==="Pickleball"?sPg("pickleball"):sPg("shop")} style={{color:C.muted,fontSize:12.5,marginBottom:9,cursor:"pointer"}} onMouseOver={e=>e.target.style.color=C.primary} onMouseOut={e=>e.target.style.color=C.muted}>{s}</div>
              ))}
            </div>
            <div>
              <h4 style={{color:C.primary,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:14,fontFamily:"'Barlow Condensed',sans-serif"}}>Company</h4>
              {[{l:"About Us",p:"about"},{l:"Contact",p:"contact"},{l:"Shipping",p:"contact"},{l:"Returns",p:"contact"},{l:"Team Orders",p:"contact"}].map(x=>(
                <div key={x.l} onClick={()=>sPg(x.p)} style={{color:C.muted,fontSize:12.5,marginBottom:9,cursor:"pointer"}} onMouseOver={e=>e.target.style.color=C.primary} onMouseOut={e=>e.target.style.color=C.muted}>{x.l}</div>
              ))}
            </div>
            <div>
              <h4 style={{color:C.primary,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:14,fontFamily:"'Barlow Condensed',sans-serif"}}>Contact</h4>
              {[{ic:Ic.pin,t:"George Town, Grand Cayman"},{ic:Ic.mail,t:"info@rnrsports.ky"},{ic:Ic.ph,t:"+1 (345) 555-0123"}].map((x,i)=>(
                <div key={i} style={{display:"flex",gap:8,alignItems:"center",marginBottom:11,color:C.muted,fontSize:12.5}}><span style={{color:C.primary,flexShrink:0}}>{x.ic}</span>{x.t}</div>
              ))}
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,.04)",paddingTop:18,display:"flex",justifyContent:"space-between"}}>
            <span style={{color:"rgba(255,255,255,.2)",fontSize:11.5}}>2026 RNR Cricket Sporting Equipment. All rights reserved.</span>
            <span style={{color:"rgba(255,255,255,.2)",fontSize:11.5}}>Cayman Islands</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
