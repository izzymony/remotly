import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white text-charcoal py-16 px-5 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-[10px] bg-purple flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
              <span className="font-bold text-[17px] text-charcoal" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                TalentFlow
              </span>
            </div>
            <p className="text-sm text-charcoal-50 leading-relaxed">
              The premium career platform and employer review hub for modern professionals.
            </p>
          </div>
          {[
            { label: "Product", links: ["Find Jobs", "Companies", "Dashboard", "Saved Jobs"] },
            { label: "Company", links: ["About Us", "Blog", "Careers", "Press"] },
            { label: "Support", links: ["Help Center", "Contact", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.label}>
              <p className="font-semibold mb-4 text-sm text-charcoal">{col.label}</p>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <Link key={link} href="#" className="text-sm text-charcoal-50 hover:text-purple transition-colors">
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-charcoal-30">© 2026 TalentFlow, Inc. All rights reserved.</p>
          <p className="text-xs text-charcoal-30">Designed with care for a premium job search experience.</p>
        </div>
      </div>
    </footer>
  );
}
