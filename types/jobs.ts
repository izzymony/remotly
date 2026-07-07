export type JobProvider = "adzuna" | "indeed";
export type ProviderFilter = JobProvider | "all";

export interface JobCategory {
  id: string;
  label: string;
  description: string;
  query: string;
  icon: string;
}

export interface CompanyInfo{
  companyLogo?: string;
  companySize?:number;
  rating?:number; 
}


export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  
  url: string;
  jobType:string;
  rating: number; 
  provider: JobProvider;
  postedAt?: string;
  companyLogoUrl?: string;
  domain?: string;
  category?: string;
  salary?: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  employmentType?: string;
  contractType?: string;
  remote?: boolean;
  CompanyInfo?: CompanyInfo;
}
export interface JobSearchResponse {
  jobs: JobListing[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  providers: JobProvider[];
  errors: string[];
  companyLogoUrl:string;
  query: {
    q?: string;
    location?: string;
    country: string;
    provider: ProviderFilter;
  };
}


export interface Companies{
  company_id:string;
  name:string;
  description:string;
  company_url:string;
  logo_url:string;
  industry:string;
  location:string;
  follower_count: string;
  metadata:{
    total_count: number;
    count:number;
    page: number;
    total_pages:number;
    has_next_page: boolean;
    has_prev_page: boolean;
  }
}
 



export const COMPANIES = [
  { id: 1, name: "Stripe", industry: "Fintech", size: "1,000–5,000", openJobs: 23, logo: "#6772E5", tagline: "Infrastructure for internet commerce", website: "stripe.com", location: "San Francisco, CA", founded: 2010, about: "Stripe is a global technology company that builds economic infrastructure for the internet. Businesses of every size—from new startups to public companies—use our software to accept payments and manage their businesses online.", culture: "We hire the best people and trust them to do exceptional work, then get out of their way.", benefits: ["Competitive salary", "Equity package", "Remote-friendly", "Full health & dental", "Home office stipend", "Learning budget"] },
  { id: 2, name: "Linear", industry: "Productivity Software", size: "100–500", openJobs: 8, logo: "#5E6AD2", tagline: "The issue tracker built for high-performance teams", website: "linear.app", location: "Remote", founded: 2019, about: "Linear is the issue tracking tool built for high-performance teams. It streamlines software projects, sprints, tasks, and bug tracking with an interface designed for speed and focus.", culture: "We build tools for the people who build the future. Speed and quality are not in tension.", benefits: ["Fully remote", "Equity", "Flexible hours", "Top-tier hardware", "Annual team retreat", "Wellness stipend"] },
  { id: 3, name: "Notion", industry: "Productivity", size: "500–1,000", openJobs: 15, logo: "#111111", tagline: "Write, plan, share. All in one place.", website: "notion.so", location: "San Francisco, CA", founded: 2016, about: "Notion is an all-in-one workspace where you can write, plan, collaborate, and get organized. It combines notes, tasks, wikis, and databases into a powerful productivity tool used by millions worldwide.", culture: "We believe tools should empower people, not constrain them. Curiosity is our north star.", benefits: ["Equity", "Health insurance", "401k match", "Flexible PTO", "Team offsites", "Catered meals"] },
  { id: 4, name: "Figma", industry: "Design Tools", size: "500–1,000", openJobs: 12, logo: "#F24E1E", tagline: "Design together. Build faster.", website: "figma.com", location: "San Francisco, CA", founded: 2012, about: "Figma is a collaborative interface design tool that enables design teams to work together in real-time. Used by the world's best product teams to design, prototype, and gather feedback.", culture: "Design is a team sport. We believe great work happens when talented people collaborate.", benefits: ["Equity", "Health & dental", "Parental leave", "Remote options", "Design stipend", "Conference budget"] },
  { id: 5, name: "Vercel", industry: "Developer Tools", size: "200–500", openJobs: 18, logo: "#000000", tagline: "Ship faster. Iterate smarter.", website: "vercel.com", location: "Remote", founded: 2015, about: "Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration. Deploy web projects with zero configuration.", culture: "We empower developers to ship faster. Developer experience is a product, not a feature.", benefits: ["Remote-first", "Equity", "Competitive salary", "Home office setup", "Health benefits", "Flexible PTO"] },
  { id: 6, name: "Anthropic", industry: "AI Research", size: "200–500", openJobs: 31, logo: "#CC785C", tagline: "AI safety for a better future", website: "anthropic.com", location: "San Francisco, CA", founded: 2021, about: "Anthropic is an AI safety company focused on building reliable, interpretable, and steerable AI systems. We are dedicated to developing AI that is safe, beneficial, and understandable for everyone.", culture: "Safety-focused, rigorously curious, and deeply thoughtful about the impact of what we build.", benefits: ["Exceptional salary", "Equity", "Health & dental", "401k match", "Learning stipend", "Catered meals"] },
  { id: 7, name: "OpenAI", industry: "AI Research", size: "1,000–5,000", openJobs: 45, logo: "#10A37F", tagline: "Ensuring AI benefits all of humanity", website: "openai.com", location: "San Francisco, CA", founded: 2015, about: "OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity. We build and maintain advanced AI systems.", culture: "Mission-driven, deeply curious, and focused on long-term positive impact for all of humanity.", benefits: ["Top market salary", "Equity", "Full health coverage", "Generous PTO", "Cafeteria", "Transportation"] },
  { id: 8, name: "Loom", industry: "Video Collaboration", size: "100–500", openJobs: 6, logo: "#625DF5", tagline: "Say more with async video", website: "loom.com", location: "Remote", founded: 2015, about: "Loom is a video messaging platform that helps teams communicate more effectively through async video. Millions of people use Loom to record and share video messages that get their point across instantly.", culture: "Async-first, results-focused. We believe meetings are optional but clear communication is not.", benefits: ["Remote-first", "Equity", "Health benefits", "Video equipment budget", "Flexible hours", "Team retreats"] },
  { id: 9, name: "Retool", industry: "Internal Tools", size: "200–500", openJobs: 9, logo: "#3D3D3D", tagline: "Build internal tools, fast", website: "retool.com", location: "San Francisco, CA", founded: 2017, about: "Retool is the platform for building internal tools. Connect to any database or API, build UI with drag-and-drop, and deploy your tools instantly. Trusted by thousands of companies worldwide.", culture: "Build fast, iterate faster. We believe internal tools should be as good as consumer products.", benefits: ["Equity", "Health insurance", "Unlimited PTO", "Home office budget", "401k", "Team events"] },
  { id: 10, name: "Airtable", industry: "No-Code Platform", size: "500–1,000", openJobs: 14, logo: "#FCB400", tagline: "Build apps, without limits", website: "airtable.com", location: "San Francisco, CA", founded: 2012, about: "Airtable is a low-code platform for building collaborative apps. Customize your workflow, collaborate seamlessly, and achieve ambitious outcomes without writing a single line of code.", culture: "Empowering creators without technical barriers. We believe everyone deserves powerful tools.", benefits: ["Equity", "Comprehensive health", "401k", "Paid parental leave", "Learning stipend", "Flexible work"] },
  { id: 11, name: "Coda", industry: "Productivity", size: "100–500", openJobs: 5, logo: "#E94E4E", tagline: "A doc as powerful as an app", website: "coda.io", location: "Mountain View, CA", founded: 2014, about: "Coda is a doc platform that blends the flexibility of docs, the structure of spreadsheets, and the power of apps. Teams use Coda to collaborate on everything from meeting notes to product roadmaps.", culture: "We love documents deeply. We believe the best teams express their thinking through great writing.", benefits: ["Equity", "Health coverage", "Flexible PTO", "Home office stipend", "Learning budget", "Team offsites"] },
  { id: 12, name: "Superhuman", industry: "Email Client", size: "50–200", openJobs: 3, logo: "#F33F86", tagline: "The fastest email experience ever made", website: "superhuman.com", location: "San Francisco, CA", founded: 2015, about: "Superhuman is the AI-powered email client designed for speed. Built for high-performance professionals who live in their inbox, we obsess over every detail to create a genuinely delightful experience.", culture: "Obsess over the details that matter most. We only ship when something is truly exceptional.", benefits: ["Equity", "Top-tier health", "Flexible PTO", "Home office stipend", "Career growth", "Remote options"] },
];

export const JOBS = [
  { id: 1, title: "Senior Frontend Engineer", companyId: 1, company: "Stripe", location: "Remote", salary: "$150k–$200k", type: "Full-time", level: "Senior", posted: "2 days ago", skills: ["React", "TypeScript", "GraphQL", "CSS"], description: "We're looking for a Senior Frontend Engineer to join our web platform team at Stripe. You'll work on the products that help millions of businesses build their payment experiences, touching code that processes billions of dollars in transactions worldwide.", responsibilities: ["Build and maintain complex React applications at scale", "Collaborate closely with design and backend engineering teams", "Mentor and guide junior and mid-level engineers", "Drive key technical architecture decisions"], requirements: ["5+ years of frontend engineering experience", "Deep expertise in React and TypeScript", "Experience building and evolving design systems", "Strong command of modern CSS and animation"], benefits: ["Up to $200k base salary", "Meaningful equity package", "Remote-first culture", "Full health & dental coverage", "401k with match", "$1,500 home office stipend"], category: "Engineering", featured: true, remote: true },
  { id: 2, title: "Product Designer", companyId: 2, company: "Linear", location: "Remote", salary: "$130k–$170k", type: "Full-time", level: "Mid", posted: "3 days ago", skills: ["Figma", "Prototyping", "Design Systems", "User Research"], description: "Linear is looking for a Product Designer to help define and build exceptional software experiences. You'll work directly with engineering and leadership on features that ship to hundreds of thousands of developers every week.", responsibilities: ["Design features from initial concept all the way to ship", "Build and continuously evolve the design system", "Conduct user research and synthesize insights", "Collaborate daily in code with engineers"], requirements: ["3+ years of product design experience at a software company", "Expert-level Figma skills and prototyping ability", "Strong portfolio demonstrating end-to-end product thinking", "Experience building and maintaining design systems"], benefits: ["Remote work with flexible hours", "Equity participation", "Top-tier hardware of your choice", "Annual full-team retreat", "Wellness budget", "$2,000 learning stipend"], category: "Design", featured: true, remote: true },
  { id: 3, title: "Staff Backend Engineer", companyId: 6, company: "Anthropic", location: "San Francisco, CA", salary: "$200k–$280k", type: "Full-time", level: "Staff", posted: "1 day ago", skills: ["Python", "Distributed Systems", "ML Infrastructure", "Go"], description: "Join Anthropic's core infrastructure team to build the systems that power next-generation AI models. You'll work on some of the most technically challenging and consequential engineering problems in the industry.", responsibilities: ["Design and build distributed systems at massive scale", "Optimize ML training and inference infrastructure", "Drive improvements in system reliability and efficiency", "Mentor and help grow a world-class engineering team"], requirements: ["7+ years of backend engineering experience", "Deep distributed systems expertise", "Strong Python proficiency", "Experience with ML workloads is a significant plus"], benefits: ["Exceptional base compensation", "Meaningful equity", "Full health & dental coverage", "Generous learning stipend", "Catered meals on-site", "401k with match"], category: "Engineering", featured: true, remote: false },
  { id: 4, title: "Growth Marketing Manager", companyId: 3, company: "Notion", location: "New York, NY", salary: "$110k–$150k", type: "Full-time", level: "Mid", posted: "5 days ago", skills: ["SEO", "Growth Analytics", "A/B Testing", "Content Strategy"], description: "Notion's growth team is looking for a Marketing Manager to help us reach more users and teams worldwide. You'll own key growth channels, run experiments, and help build the engine that drives Notion's next phase of growth.", responsibilities: ["Own SEO, content, and organic growth channels", "Run structured A/B experiments across the funnel", "Partner closely with product on growth-oriented features", "Report on growth metrics and communicate insights broadly"], requirements: ["4+ years of growth marketing experience at a SaaS company", "Strong quantitative and analytical skills", "Proven SEO and content strategy expertise", "Track record of growth impact at B2B products"], benefits: ["Competitive equity", "Comprehensive health insurance", "401k match", "Flexible PTO policy", "Team offsites", "Catered lunches"], category: "Marketing", featured: false, remote: false },
  { id: 5, title: "Developer Relations Engineer", companyId: 5, company: "Vercel", location: "Remote", salary: "$120k–$160k", type: "Full-time", level: "Mid", posted: "1 week ago", skills: ["Next.js", "TypeScript", "Technical Writing", "Public Speaking"], description: "Join Vercel as a Developer Relations Engineer to help grow and support our global developer community. You'll create technical content, speak at conferences, and build deep relationships with developers who build the web's best experiences.", responsibilities: ["Create technical tutorials, blog posts, and video content", "Represent Vercel at conferences and community events", "Help developers succeed with Vercel and Next.js", "Collect and relay developer feedback to the product team"], requirements: ["3+ years of engineering experience with public-facing work", "Deep Next.js and modern web development knowledge", "Excellent written and verbal communication skills", "Experience with public speaking or content creation"], benefits: ["Remote-first with flexible hours", "Equity participation", "Full conference and travel budget", "Home office equipment setup", "Health benefits", "Unlimited PTO"], category: "Engineering", featured: false, remote: true },
  { id: 6, title: "ML Research Engineer", companyId: 7, company: "OpenAI", location: "San Francisco, CA", salary: "$180k–$260k", type: "Full-time", level: "Senior", posted: "4 days ago", skills: ["PyTorch", "Python", "Transformers", "CUDA"], description: "OpenAI is looking for an ML Research Engineer to help build and advance the state of the art in large language models. You'll work alongside world-class researchers and engineers on problems that genuinely matter.", responsibilities: ["Implement and rapidly iterate on research ideas", "Train and rigorously evaluate large language models", "Write clean, efficient, and reproducible ML code", "Collaborate actively with research scientists"], requirements: ["5+ years of machine learning engineering experience", "Strong PyTorch proficiency and understanding of internals", "Experience working with large language models", "Publications in top ML venues a plus but not required"], benefits: ["Top-of-market base salary", "Meaningful equity", "Full health coverage for you and family", "Generous PTO policy", "Full cafeteria", "Transportation benefits"], category: "Engineering", featured: true, remote: false },
  { id: 7, title: "iOS Engineer", companyId: 4, company: "Figma", location: "San Francisco, CA", salary: "$140k–$190k", type: "Full-time", level: "Senior", posted: "6 days ago", skills: ["Swift", "UIKit", "SwiftUI", "CoreGraphics"], description: "Join Figma's mobile team to build one of the most complex and beloved creative tools on iOS. You'll work on features that push the boundaries of what's possible on mobile for designers and developers worldwide.", responsibilities: ["Build complex rendering engine features for the iOS app", "Optimize performance for large, complex design documents", "Collaborate with design and web teams to maintain consistency", "Ship high-quality iOS features that delight millions"], requirements: ["4+ years of iOS development experience", "Expert Swift proficiency including advanced language features", "Experience with graphics or rendering a strong plus", "Sharp problem-solving skills and attention to craft"], benefits: ["Meaningful equity stake", "Full health & dental", "Generous parental leave", "Remote options available", "Annual design tool stipend", "Conference budget"], category: "Engineering", featured: false, remote: false },
  { id: 8, title: "Data Scientist", companyId: 9, company: "Retool", location: "Remote", salary: "$130k–$175k", type: "Full-time", level: "Mid", posted: "1 week ago", skills: ["Python", "SQL", "Statistics", "Machine Learning"], description: "Retool's data science team is looking for a Data Scientist to help us deeply understand how customers build and use internal tools. You'll drive data-informed product decisions that shape the direction of the platform.", responsibilities: ["Build predictive models to surface product and growth insights", "Partner with PM and design to define success metrics", "Create dashboards, reports, and data visualizations", "Design and analyze experiments across the product surface"], requirements: ["3+ years of data science or applied ML experience", "Strong SQL and Python skills, especially for data analysis", "Solid grounding in experimental design and A/B testing", "Excellent communication skills for technical and non-technical audiences"], benefits: ["Remote-first environment", "Equity participation", "Comprehensive health insurance", "Unlimited PTO", "Home office equipment budget", "401k"], category: "Data", featured: false, remote: true },
  { id: 9, title: "Head of Product", companyId: 10, company: "Airtable", location: "San Francisco, CA", salary: "$180k–$240k", type: "Full-time", level: "Executive", posted: "3 days ago", skills: ["Product Strategy", "Team Leadership", "B2B SaaS", "Roadmapping"], description: "Airtable is looking for a Head of Product to lead our core platform team. You'll define our product vision, guide a team of talented product managers, and help shape the future of how teams organize and build their work.", responsibilities: ["Define, own, and evolve the product roadmap", "Manage and mentor a growing team of product managers", "Partner closely with engineering, design, and go-to-market", "Drive company-level product strategy and vision"], requirements: ["8+ years of product management experience", "3+ years managing and developing PM teams", "Experience leading product at a B2B SaaS platform", "Exceptional track record of shipping impactful products"], benefits: ["Meaningful equity stake", "Comprehensive health & dental", "401k with match", "Paid parental leave", "Learning & development stipend", "Flexible work arrangements"], category: "Product", featured: false, remote: false },
  { id: 10, title: "Engineering Manager", companyId: 8, company: "Loom", location: "Remote", salary: "$170k–$220k", type: "Full-time", level: "Manager", posted: "2 weeks ago", skills: ["Technical Leadership", "React", "Node.js", "Team Building"], description: "Loom is seeking an Engineering Manager for our consumer product team. You'll lead a talented team building the core recording, editing, and playback experience that millions of people use every day.", responsibilities: ["Manage and actively grow a team of 6–8 engineers", "Own the technical roadmap for the consumer product surface", "Partner with PM and design on prioritization and strategy", "Drive hiring, onboarding, and team culture in a remote environment"], requirements: ["6+ years of software engineering experience", "2+ years as an engineering manager with direct reports", "Strong background in React and Node.js", "Proven experience managing remote teams effectively"], benefits: ["Remote-first globally distributed team", "Equity participation", "Health & wellness benefits", "Video equipment budget", "Flexible hours", "Annual team retreat"], category: "Engineering", featured: false, remote: true },
  { id: 11, title: "Content Strategist", companyId: 11, company: "Coda", location: "Remote", salary: "$90k–$120k", type: "Full-time", level: "Mid", posted: "4 days ago", skills: ["Content Writing", "SEO", "Brand Voice", "Editorial Planning"], description: "Coda's marketing team is looking for a Content Strategist to help us tell our story and educate the world about the power of connected, powerful documents. You'll own our editorial voice and content engine.", responsibilities: ["Own the content calendar and overall editorial strategy", "Write and edit long-form content including guides, case studies, and blog posts", "Partner with SEO and growth teams on organic strategy", "Manage a network of content freelancers and contributors"], requirements: ["2+ years of content strategy experience at a SaaS company", "Exceptional writing, editing, and storytelling skills", "Working knowledge of SEO best practices and tools", "Experience with B2B content marketing"], benefits: ["Equity participation", "Full health coverage", "Flexible PTO policy", "Home office stipend", "Learning & development budget", "Annual team offsites"], category: "Marketing", featured: false, remote: true },
  { id: 12, title: "UX Researcher", companyId: 12, company: "Superhuman", location: "Remote", salary: "$120k–$160k", type: "Full-time", level: "Mid", posted: "5 days ago", skills: ["User Research", "Usability Testing", "Quant Research", "Figma"], description: "Superhuman is looking for a UX Researcher to deeply understand how power users think about and interact with email. Your insights will directly shape the future of the fastest, most delightful email experience ever built.", responsibilities: ["Plan, conduct, and analyze qualitative and quantitative user research studies", "Synthesize complex insights into clear, actionable recommendations", "Partner closely with product managers and designers throughout the design process", "Help establish and scale the user research practice company-wide"], requirements: ["3+ years of UX research experience at a software company", "Strong command of mixed-methods research approaches", "Excellent communication and stakeholder management skills", "Experience with both consumer and B2B product research"], benefits: ["Meaningful equity stake", "Top-tier health & dental coverage", "Flexible PTO", "Home office equipment stipend", "Clear career growth path", "Remote options"], category: "Design", featured: false, remote: true },
];

export const CATEGORIES = [
  { name: "Engineering", count: 847, color: "#F05A22" },
  { name: "Design", count: 234, color: "#F24E1E" },
  { name: "Marketing", count: 312, color: "#10A37F" },
  { name: "Product", count: 189, color: "#FCB400" },
  { name: "Data", count: 276, color: "#625DF5" },
  { name: "AI/ML", count: 421, color: "#CC785C" },
];

export const TESTIMONIALS = [
  { name: "Sarah Chen", role: "Frontend Engineer at Stripe", avatar: "SC", text: "TalentFlow made my job search effortless. I found my dream role in 3 weeks — the search quality and company insights are genuinely unmatched by anything else I tried.", rating: 5 },
  { name: "Marcus Rivera", role: "Product Designer at Linear", avatar: "MR", text: "I've tried every job platform out there. TalentFlow is the only one that actually surfaces relevant roles without the noise. Landed a 40% salary increase thanks to it.", rating: 5 },
  { name: "Priya Patel", role: "ML Engineer at Anthropic", avatar: "PP", text: "The company profiles on TalentFlow are incredibly detailed. I walked into my interviews already knowing exactly what I was signing up for. It's genuinely a game-changer.", rating: 5 },
];

export const RECENT_SEARCHES = ["Senior React Engineer", "Product Designer Remote", "ML Engineer SF", "Engineering Manager"];
export const TRENDING = ["Frontend Engineer", "Product Manager", "Data Scientist", "DevOps Engineer", "UX Designer"];

export const jobCategories: JobCategory[] = [
  {
    id: "engineering",
    label: "Engineering",
    description: "Software, data, cloud, product, and technical roles",
    query: "software engineer",
    icon: "⌘",
  },
  {
    id: "design",
    label: "Design",
    description: "UX, UI, brand, motion, and product design jobs",
    query: "product designer",
    icon: "✦",
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Growth, performance, content, and brand marketing roles",
    query: "marketing manager",
    icon: "↗",
  },
  {
    id: "sales",
    label: "Sales",
    description: "Account executive, SDR, customer success, and revenue roles",
    query: "sales executive",
    icon: "$",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    description: "Clinical, nursing, therapy, and healthcare support jobs",
    query: "nurse",
    icon: "+",
  },
  {
    id: "finance",
    label: "Finance",
    description: "Accounting, analyst, banking, and fintech opportunities",
    query: "financial analyst",
    icon: "%",
  },
];
