"use client";

import React, { useState, useEffect, useRef } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc";

function FloatInput({
  icon, label, type = "text", value, onChange, required, minLength, placeholder
}: {
  icon: string; label: string; type?: string;
  value: string; onChange: (v: string) => void;
  required?: boolean; minLength?: number; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div style={{
      position: "relative", width: "100%", maxWidth: 360,
      margin: "10px 0",
    }}>
      <div style={{
        display: "flex", alignItems: "center",
        background: active ? "#dbeafe" : "#eff6ff",
        border: `2px solid ${focused ? "#3b82f6" : "transparent"}`,
        borderRadius: 52, padding: "0 16px 0 12px",
        height: 56, transition: "all 0.2s", gap: 8,
      }}>
        <span style={{ fontSize: "1.1rem", minWidth: 24, textAlign: "center" }}>{icon}</span>
        <div style={{ flex: 1, position: "relative" }}>
          <label style={{
            position: "absolute",
            left: 0,
            top: active ? "2px" : "50%",
            transform: active ? "translateY(0)" : "translateY(-50%)",
            fontSize: active ? "0.65rem" : "0.88rem",
            fontWeight: active ? 700 : 500,
            color: focused ? "#2563eb" : "#93c5fd",
            transition: "all 0.2s",
            pointerEvents: "none",
            fontFamily: "inherit",
            letterSpacing: "0.01em",
          }}>
            {label}
          </label>
          <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required={required}
            minLength={minLength}
            placeholder={active ? (placeholder || "") : ""}
            style={{
              background: "none", outline: "none", border: "none",
              width: "100%", fontFamily: "inherit",
              fontSize: "0.9rem", fontWeight: 600,
              color: "#1e3a8a",
              paddingTop: active ? "16px" : 0,
              paddingBottom: active ? 0 : 0,
              lineHeight: "1.2",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function AuthSwitch() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const [siEmail, setSiEmail] = useState("");
  const [siPass, setSiPass] = useState("");
  const [siError, setSiError] = useState("");
  const [siLoading, setSiLoading] = useState(false);

  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPass, setSuPass] = useState("");
  const [suRole, setSuRole] = useState<"CHILD" | "PARENT">("CHILD");
  const [suParentId, setSuParentId] = useState("");
  const [suError, setSuError] = useState("");

  const register = trpc.auth.register.useMutation({
    onSuccess: () => { setSuError(""); setIsSignUp(false); },
    onError: (e) => setSuError(e.message),
  });

  useEffect(() => {
    if (!containerRef.current) return;
    if (isSignUp) containerRef.current.classList.add("sign-up-mode");
    else containerRef.current.classList.remove("sign-up-mode");
  }, [isSignUp]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSiLoading(true); setSiError("");
    const res = await signIn("credentials", { email: siEmail, password: siPass, redirect: false });
    if (res?.error) { setSiError("E-Mail oder Passwort falsch."); setSiLoading(false); return; }
    const session = await getSession();
    router.push(session?.user?.role === "PARENT" ? "/dashboard" : "/anlaute");
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault(); setSuError("");
    register.mutate({ name: suName, email: suEmail, password: suPass, role: suRole, parentId: suParentId || undefined });
  };

  return (
    <>
      <style>{`
        .auth-wrap * { margin:0; padding:0; box-sizing:border-box; }
        .auth-wrap {
          font-family: 'Baloo 2', cursive;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          min-height: 100vh;
          display: flex; justify-content: center; align-items: center; padding: 20px;
        }
        .auth-container {
          position: relative; width: 100%; max-width: 920px; height: 600px;
          background: white; border-radius: 24px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.25); overflow: hidden;
        }
        .forms-container { position: absolute; width:100%; height:100%; top:0; left:0; }
        .signin-signup {
          position: absolute; top:50%; transform:translate(-50%,-50%);
          left:75%; width:50%; transition:1s 0.7s ease-in-out;
          display:grid; grid-template-columns:1fr; z-index:5;
        }
        .auth-form {
          display:flex; align-items:center; justify-content:center; flex-direction:column;
          padding:0 3rem; transition:all 0.2s 0.7s; overflow:hidden;
          grid-column:1/2; grid-row:1/2;
        }
        .auth-form.sign-up-form { opacity:0; z-index:1; }
        .auth-form.sign-in-form { z-index:2; }

        .auth-title { font-size:1.9rem; color:#1e3a8a; margin-bottom:4px; font-weight:800; }
        .auth-subtitle { font-size:0.78rem; color:#93c5fd; margin-bottom:8px; font-weight:500; }

        .auth-btn {
          width:100%; max-width:360px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border:none; outline:none; height:50px; border-radius:50px;
          color:#fff; font-weight:700; margin:10px 0; cursor:pointer;
          transition:0.3s; font-size:0.88rem; font-family:inherit;
          letter-spacing:0.04em; display:flex; align-items:center; justify-content:center; gap:8px;
        }
        .auth-btn:hover { background:linear-gradient(135deg,#2563eb,#1e40af); transform:translateY(-2px); box-shadow:0 8px 20px rgba(59,130,246,0.4); }
        .auth-btn:disabled { opacity:0.6; cursor:not-allowed; transform:none; }

        .auth-error {
          font-size:0.75rem; color:#ef4444; text-align:center; margin:2px 0;
          background:#fef2f2; border:1px solid #fecaca; border-radius:20px;
          padding:4px 12px; max-width:360px; width:100%;
        }
        .auth-success {
          font-size:0.75rem; color:#16a34a; text-align:center; margin:2px 0;
          background:#f0fdf4; border:1px solid #bbf7d0; border-radius:20px;
          padding:4px 12px; max-width:360px; width:100%;
        }

        .role-row { display:flex; gap:8px; max-width:360px; width:100%; margin:8px 0; }
        .role-card {
          flex:1; border-radius:16px; border:2px solid #bfdbfe; background:#eff6ff;
          padding:10px 8px; cursor:pointer; transition:0.2s; font-family:inherit;
          text-align:center;
        }
        .role-card.active { background:linear-gradient(135deg,#3b82f6,#1d4ed8); border-color:transparent; box-shadow:0 4px 12px rgba(59,130,246,0.35); }
        .role-card .role-emoji { font-size:1.4rem; display:block; margin-bottom:3px; }
        .role-card .role-name { font-size:0.78rem; font-weight:800; display:block; color:#1d4ed8; transition:0.2s; }
        .role-card.active .role-name { color:white; }
        .role-card .role-hint { font-size:0.65rem; color:#93c5fd; display:block; margin-top:2px; transition:0.2s; }
        .role-card.active .role-hint { color:rgba(255,255,255,0.75); }

        .panels-container {
          position:absolute; height:100%; width:100%; top:0; left:0;
          display:grid; grid-template-columns:repeat(2,1fr);
        }
        .panel { display:flex; flex-direction:column; align-items:flex-end; justify-content:space-around; text-align:center; z-index:6; }
        .left-panel { pointer-events:all; padding:3rem 17% 2rem 12%; }
        .right-panel { pointer-events:none; padding:3rem 12% 2rem 17%; }
        .panel .content { color:#fff; transition:transform 0.9s ease-in-out; transition-delay:0.6s; }
        .panel h3 { font-weight:700; font-size:1.5rem; margin-bottom:8px; line-height:1.2; }
        .panel p { font-size:0.85rem; padding:0.5rem 0; opacity:0.85; line-height:1.5; }
        .panel-btn-wrap { display:flex; flex-direction:column; align-items:center; gap:4px; }
        .panel-btn {
          margin:0; background:none; border:2px solid rgba(255,255,255,0.8);
          width:140px; height:42px; border-radius:42px; color:white;
          font-weight:700; font-size:0.8rem; cursor:pointer; transition:0.3s;
          font-family:inherit; letter-spacing:0.05em; text-transform:uppercase;
        }
        .panel-btn:hover { background:rgba(255,255,255,0.15); transform:translateY(-2px); }
        .panel-hint { font-size:0.68rem; color:rgba(255,255,255,0.55); text-align:center; }

        .right-panel .content { transform:translateX(800px); }
        .auth-container:before {
          content:""; position:absolute; height:2000px; width:2000px; top:-10%; right:48%;
          transform:translateY(-50%); background:linear-gradient(-45deg,#3b82f6 0%,#1d4ed8 100%);
          transition:1.8s ease-in-out; border-radius:50%; z-index:6;
        }

        .auth-container.sign-up-mode:before { transform:translate(100%,-50%); right:52%; }
        .auth-container.sign-up-mode .left-panel .content { transform:translateX(-800px); }
        .auth-container.sign-up-mode .signin-signup { left:25%; }
        .auth-container.sign-up-mode .auth-form.sign-up-form { opacity:1; z-index:2; }
        .auth-container.sign-up-mode .auth-form.sign-in-form { opacity:0; z-index:1; }
        .auth-container.sign-up-mode .right-panel .content { transform:translateX(0%); }
        .auth-container.sign-up-mode .left-panel { pointer-events:none; }
        .auth-container.sign-up-mode .right-panel { pointer-events:all; }

        @media (max-width:870px) {
          .auth-container { min-height:800px; height:100vh; }
          .signin-signup { width:100%; top:95%; transform:translate(-50%,-100%); transition:1s 0.8s ease-in-out; }
          .signin-signup,.auth-container.sign-up-mode .signin-signup { left:50%; }
          .panels-container { grid-template-columns:1fr; grid-template-rows:1fr 2fr 1fr; }
          .panel { flex-direction:row; justify-content:space-around; align-items:center; padding:2rem 8%; grid-column:1/2; }
          .right-panel { grid-row:3/4; }
          .left-panel { grid-row:1/2; }
          .auth-container:before { width:1500px; height:1500px; transform:translateX(-50%); left:30%; bottom:68%; right:initial; top:initial; transition:2s ease-in-out; }
          .auth-container.sign-up-mode:before { transform:translate(-50%,100%); bottom:32%; right:initial; }
          .auth-container.sign-up-mode .left-panel .content { transform:translateY(-300px); }
          .auth-container.sign-up-mode .right-panel .content { transform:translateY(0); }
          .right-panel .content { transform:translateY(300px); }
          .auth-container.sign-up-mode .signin-signup { top:5%; transform:translate(-50%,0); }
        }
        @media (max-width:570px) { .auth-form { padding:0 1.5rem; } }
      `}</style>

      <div className="auth-wrap">
        <a href="/" style={{
          position:"fixed", top:20, left:20, zIndex:100,
          display:"flex", alignItems:"center", gap:6,
          background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)",
          border:"1px solid rgba(255,255,255,0.3)", borderRadius:99,
          padding:"8px 16px", color:"white", fontWeight:700, fontSize:"0.82rem",
          textDecoration:"none", transition:"all 0.2s",
        }}>← Startseite</a>

        <div className="auth-container" ref={containerRef}>
          <div className="forms-container">
            <div className="signin-signup">

              {/* ── Sign In ── */}
              <form className="auth-form sign-in-form" onSubmit={handleSignIn}>
                <h2 className="auth-title">Anmelden</h2>
                <p className="auth-subtitle">Willkommen zurück! Bitte melde dich an.</p>

                <FloatInput icon="📧" label="E-Mail Adresse" type="email"
                  value={siEmail} onChange={setSiEmail} required />
                <FloatInput icon="🔒" label="Passwort" type="password"
                  value={siPass} onChange={setSiPass} required />

                {siError && <div className="auth-error">{siError}</div>}

                <button type="submit" className="auth-btn" disabled={siLoading}>
                  {siLoading ? "⏳ Laden..." : "🔐 Anmelden"}
                </button>
              </form>

              {/* ── Sign Up ── */}
              <form className="auth-form sign-up-form" onSubmit={handleSignUp}>
                <h2 className="auth-title">Registrieren</h2>
                <p className="auth-subtitle">Erstelle dein Konto – kostenlos!</p>

                <FloatInput icon="👤" label="Vollständiger Name" type="text"
                  value={suName} onChange={setSuName} required minLength={2} />
                <FloatInput icon="📧" label="E-Mail Adresse" type="email"
                  value={suEmail} onChange={setSuEmail} required />
                <FloatInput icon="🔒" label="Passwort (min. 6 Zeichen)" type="password"
                  value={suPass} onChange={setSuPass} required minLength={6} />

                {/* Rol seçimi — placeholder açıklamalı */}
                <div className="role-row">
                  <button type="button"
                    className={`role-card${suRole === "CHILD" ? " active" : ""}`}
                    onClick={() => setSuRole("CHILD")}>
                    <span className="role-emoji">👦</span>
                    <span className="role-name">Kind</span>
                    <span className="role-hint">Ich lerne spielend</span>
                  </button>
                  <button type="button"
                    className={`role-card${suRole === "PARENT" ? " active" : ""}`}
                    onClick={() => setSuRole("PARENT")}>
                    <span className="role-emoji">👨</span>
                    <span className="role-name">Elternteil</span>
                    <span className="role-hint">Ich beobachte Kinder</span>
                  </button>
                </div>

                {suRole === "CHILD" && (
                  <FloatInput icon="🔑" label="Eltern-ID (optional)"
                    value={suParentId} onChange={setSuParentId}
                    placeholder="z.B. abc123..." />
                )}

                {suError && <div className="auth-error">{suError}</div>}
                {register.isSuccess && (
                  <div className="auth-success">✅ Konto erstellt! Bitte anmelden.</div>
                )}

                <button type="submit" className="auth-btn" disabled={register.isPending}>
                  {register.isPending ? "⏳ Laden..." : "✏️ Konto erstellen"}
                </button>
              </form>
            </div>
          </div>

          {/* ── Panels ── */}
          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>Neu hier? 👋</h3>
                <p>Erstelle dein kostenloses Konto und starte noch heute!</p>
                <div className="panel-btn-wrap">
                  <button className="panel-btn" onClick={() => setIsSignUp(true)}>Registrieren</button>
                  <span className="panel-hint">Kostenlos · Kein Abo</span>
                </div>
              </div>
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>Willkommen zurück! 🌟</h3>
                <p>Melde dich an und mach weiter wo du aufgehört hast.</p>
                <div className="panel-btn-wrap">
                  <button className="panel-btn" onClick={() => setIsSignUp(false)}>Anmelden</button>
                  <span className="panel-hint">Dein Fortschritt wartet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
