import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white py-16 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#F05A22] flex items-center justify-center">
                <Sparkles size={15} />
              </div>
              <span className="font-bold text-[17px]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>TalentFlow</span>
            </div>
            <p className="text-sm text-white/45 leading-relaxed">The premium job discovery platform for modern professionals.</p>
          </div>
          {[
            { label: "Product", links: ["Find Jobs", "Companies", "Dashboard", "Saved Jobs"] },
            { label: "Company", links: ["About Us", "Blog", "Careers", "Press"] },
            { label: "Support", links: ["Help Center", "Contact", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.label}>
              <p className="font-semibold mb-4 text-sm text-white/70">{col.label}</p>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <a key={link} href="#" className="text-sm text-white/40 hover:text-white transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© 2026 TalentFlow, Inc. All rights reserved.</p>
          <p className="text-xs text-white/30">Made with care for the modern job seeker.</p>
        </div>
      </div>
    </footer>
  );
}
