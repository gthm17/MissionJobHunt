const { useState, useEffect, useCallback, useRef } = React;

// ── CONSTANTS ────────────────────────────────────────────────────────────────

const QUOTES = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "It's not about having time. It's about making time.", author: "Unknown" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  { text: "Great things never come from comfort zones.", author: "Unknown" },
  { text: "Dream it. Wish it. Do it.", author: "Unknown" },
  { text: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown" },
  { text: "Little things make big days.", author: "Unknown" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Don't stop when you're tired. Stop when you're done.", author: "Unknown" },
  { text: "Work hard in silence, let your success be your noise.", author: "Frank Ocean" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
  { text: "In order to be irreplaceable one must always be different.", author: "Coco Chanel" },
];

const ROADMAP = [
  {
    phase: "PHASE 1",
    title: "JS Deep Dive",
    duration: "May 20 – May 26",
    color: "#00ff88",
    weeks: [
      {
        week: "Week 1",
        title: "JavaScript Mastery",
        tasks: [
          { id: "p1w1t1", text: "ES6+ arrow functions — syntax, this binding, when to use" },
          { id: "p1w1t2", text: "Destructuring — arrays, objects, nested, with defaults" },
          { id: "p1w1t3", text: "Spread & Rest operators — all use cases" },
          { id: "p1w1t4", text: "Promises — create, chain, .then/.catch/.finally" },
          { id: "p1w1t5", text: "Async/Await — convert promise chains, try/catch" },
          { id: "p1w1t6", text: "Array methods — map, filter, reduce, find, some, every" },
          { id: "p1w1t7", text: "DOM manipulation — querySelector, addEventListener, classList" },
          { id: "p1w1t8", text: "Event delegation & bubbling" },
          { id: "p1w1t9", text: "Modules — import/export (ES6)" },
          { id: "p1w1t10", text: "Build: To-do app with localStorage (pure JS, no framework)" },
          { id: "p1w1t11", text: "LeetCode: 3 Easy array problems" },
          { id: "p1w1t12", text: "Aptitude: Indiabix — 20 quant questions" },
        ],
        resources: [
          { label: "JS.info — Modern JavaScript Tutorial", url: "https://javascript.info" },
          { label: "MDN JS Reference", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
          { label: "freeCodeCamp JS Algorithms", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" },
        ],
      },
    ],
  },
  {
    phase: "PHASE 2",
    title: "React + Node + MySQL",
    duration: "May 27 – Aug 31",
    color: "#00cfff",
    weeks: [
      {
        week: "Week 2–4",
        title: "React Fundamentals",
        tasks: [
          { id: "p2w1t1", text: "Setup: Vite + React project scaffold" },
          { id: "p2w1t2", text: "JSX syntax — expressions, fragments, conditionals" },
          { id: "p2w1t3", text: "Components — functional, props, prop types" },
          { id: "p2w1t4", text: "useState — all forms, state immutability" },
          { id: "p2w1t5", text: "useEffect — dependencies, cleanup, fetch on mount" },
          { id: "p2w1t6", text: "Lists & keys — rendering arrays properly" },
          { id: "p2w1t7", text: "Event handling in React" },
          { id: "p2w1t8", text: "Controlled components — forms, inputs" },
          { id: "p2w1t9", text: "React Router — BrowserRouter, Route, Link, useNavigate" },
          { id: "p2w1t10", text: "Fetching data with Axios or fetch API" },
          { id: "p2w1t11", text: "Component lifecycle understanding" },
          { id: "p2w1t12", text: "Build: Movie search app using OMDB/TMDB free API" },
          { id: "p2w1t13", text: "Deploy movie app to Netlify/Vercel" },
          { id: "p2w1t14", text: "LeetCode: 2 Easy problems daily" },
          { id: "p2w1t15", text: "Aptitude: Indiabix — logical reasoning 20 questions" },
        ],
        resources: [
          { label: "React Official Docs", url: "https://react.dev/learn" },
          { label: "Vite Setup Guide", url: "https://vitejs.dev/guide/" },
          { label: "OMDB API (free movie API)", url: "https://www.omdbapi.com/" },
          { label: "Netlify Deploy Docs", url: "https://docs.netlify.com/" },
        ],
      },
      {
        week: "Week 5–7",
        title: "Node.js + Express + MySQL (Project-level)",
        tasks: [
          { id: "p2w2t1", text: "Node.js basics — modules, require, npm, package.json" },
          { id: "p2w2t2", text: "Express setup — app.js, middleware, routes" },
          { id: "p2w2t3", text: "REST API design — GET, POST, PUT, DELETE" },
          { id: "p2w2t4", text: "Request/Response cycle, status codes" },
          { id: "p2w2t5", text: "mysql2 package — connect Node to MySQL" },
          { id: "p2w2t6", text: "CRUD operations via Express + MySQL" },
          { id: "p2w2t7", text: "Environment variables with dotenv" },
          { id: "p2w2t8", text: "CORS setup for frontend-backend communication" },
          { id: "p2w2t9", text: "Error handling middleware in Express" },
          { id: "p2w2t10", text: "Postman/Thunder Client — test all your APIs" },
          { id: "p2w2t11", text: "Build: Task Manager REST API (full CRUD)" },
          { id: "p2w2t12", text: "Deploy backend to Render (free tier)" },
          { id: "p2w2t13", text: "LeetCode: 2 Easy + 1 Medium problem daily" },
        ],
        resources: [
          { label: "Node.js Official Docs", url: "https://nodejs.org/en/docs" },
          { label: "Express.js Guide", url: "https://expressjs.com/en/guide/routing.html" },
          { label: "mysql2 npm package", url: "https://www.npmjs.com/package/mysql2" },
          { label: "Render (free backend hosting)", url: "https://render.com" },
          { label: "Thunder Client (VS Code API tester)", url: "https://www.thunderclient.com/" },
        ],
      },
      {
        week: "Week 8–11",
        title: "Full Stack Project 1",
        tasks: [
          { id: "p2w3t1", text: "Plan project: Student Result Management System or Job Tracker" },
          { id: "p2w3t2", text: "Design database schema — tables, relations, foreign keys" },
          { id: "p2w3t3", text: "Build all backend API routes with Express + MySQL" },
          { id: "p2w3t4", text: "Build React frontend consuming your own API" },
          { id: "p2w3t5", text: "Add authentication — JWT or session-based" },
          { id: "p2w3t6", text: "Add form validation frontend + backend" },
          { id: "p2w3t7", text: "Deploy frontend (Vercel) + backend (Render) + DB (PlanetScale/Supabase)" },
          { id: "p2w3t8", text: "Write proper README with screenshots and live link" },
          { id: "p2w3t9", text: "Push to GitHub — clean commit history" },
          { id: "p2w3t10", text: "Practice verbal project walkthrough (2 mins)" },
          { id: "p2w3t11", text: "LeetCode: 10 problems total this block" },
          { id: "p2w3t12", text: "Aptitude: 30 verbal ability questions on Indiabix" },
        ],
        resources: [
          { label: "JWT Authentication Guide", url: "https://jwt.io/introduction" },
          { label: "PlanetScale free MySQL DB", url: "https://planetscale.com" },
          { label: "Supabase (free Postgres DB)", url: "https://supabase.com" },
          { label: "GitHub README Best Practices", url: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes" },
        ],
      },
    ],
  },
  {
    phase: "PHASE 3",
    title: "Java + DSA",
    duration: "Sep 1 – Oct 15",
    color: "#ff6b35",
    weeks: [
      {
        week: "Week 12–14",
        title: "Core Java (Interview-Ready)",
        tasks: [
          { id: "p3w1t1", text: "OOP — classes, objects, constructors" },
          { id: "p3w1t2", text: "Inheritance — extends, super, method overriding" },
          { id: "p3w1t3", text: "Polymorphism — compile-time vs runtime" },
          { id: "p3w1t4", text: "Encapsulation — getters, setters, access modifiers" },
          { id: "p3w1t5", text: "Abstraction — abstract classes, interfaces" },
          { id: "p3w1t6", text: "Exception handling — try/catch/finally, custom exceptions" },
          { id: "p3w1t7", text: "Collections — ArrayList, LinkedList, HashMap, HashSet" },
          { id: "p3w1t8", text: "String class methods — top 20 used in interviews" },
          { id: "p3w1t9", text: "Static keyword — fields, methods, blocks" },
          { id: "p3w1t10", text: "Write 25 Java programs covering all above" },
          { id: "p3w1t11", text: "Practice: Explain OOP concepts out loud without notes" },
        ],
        resources: [
          { label: "W3Schools Java Tutorial", url: "https://www.w3schools.com/java/" },
          { label: "JavaPoint OOP Guide", url: "https://www.javatpoint.com/java-oops-concepts" },
          { label: "GeeksforGeeks Java", url: "https://www.geeksforgeeks.org/java/" },
        ],
      },
      {
        week: "Week 15–17",
        title: "DSA Fundamentals",
        tasks: [
          { id: "p3w2t1", text: "Arrays — traversal, rotation, duplicates, sliding window" },
          { id: "p3w2t2", text: "Strings — reversal, palindrome, anagram, substring problems" },
          { id: "p3w2t3", text: "Linked List — singly, doubly, reverse, detect cycle" },
          { id: "p3w2t4", text: "Stack — implementation, valid parentheses, next greater element" },
          { id: "p3w2t5", text: "Queue — implementation, circular queue" },
          { id: "p3w2t6", text: "Binary Search — standard + variants" },
          { id: "p3w2t7", text: "Sorting — Bubble, Selection, Insertion, Merge, Quick (understand, not memorize)" },
          { id: "p3w2t8", text: "Recursion — factorial, fibonacci, backtracking basics" },
          { id: "p3w2t9", text: "HashMap problems — two sum, frequency count, grouping" },
          { id: "p3w2t10", text: "Two pointer technique — 5 problems" },
          { id: "p3w2t11", text: "Target: 60 LeetCode problems by Oct 15 (Easy + Medium)" },
          { id: "p3w2t12", text: "Aptitude: 100 quant problems on PrepInsta" },
        ],
        resources: [
          { label: "LeetCode (primary DSA platform)", url: "https://leetcode.com/problemset/" },
          { label: "Striver's DSA Sheet (A2Z)", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
          { label: "NeetCode Roadmap", url: "https://neetcode.io/roadmap" },
          { label: "GeeksforGeeks DSA", url: "https://www.geeksforgeeks.org/data-structures/" },
        ],
      },
    ],
  },
  {
    phase: "PHASE 4",
    title: "Project 2 + Resume + Apply",
    duration: "Oct 16 – Nov 30",
    color: "#c77dff",
    weeks: [
      {
        week: "Week 18–20",
        title: "Full Stack Project 2",
        tasks: [
          { id: "p4w1t1", text: "Plan project: Expense Tracker with Auth OR Mini E-commerce" },
          { id: "p4w1t2", text: "Implement Login/Register with JWT + bcrypt password hashing" },
          { id: "p4w1t3", text: "Full CRUD with MySQL + protected routes" },
          { id: "p4w1t4", text: "React frontend — clean UI, responsive design" },
          { id: "p4w1t5", text: "Add loading states, error handling, toast notifications" },
          { id: "p4w1t6", text: "Deploy fully — frontend + backend + DB all live" },
          { id: "p4w1t7", text: "README with live demo link + screenshots" },
          { id: "p4w1t8", text: "Verbal pitch: explain this project in 3 minutes" },
        ],
        resources: [
          { label: "bcrypt npm package", url: "https://www.npmjs.com/package/bcrypt" },
          { label: "React Toastify (notifications)", url: "https://www.npmjs.com/package/react-toastify" },
          { label: "Tailwind CSS (styling)", url: "https://tailwindcss.com/docs" },
        ],
      },
      {
        week: "Week 21–22",
        title: "Resume + LinkedIn + GitHub Polish",
        tasks: [
          { id: "p4w2t1", text: "Build ATS resume — 1 page, clean format (use the Resume Builder tab)" },
          { id: "p4w2t2", text: "Skills section: list all tech stack accurately" },
          { id: "p4w2t3", text: "Projects: 2–3 projects with live link + GitHub link" },
          { id: "p4w2t4", text: "Experience: Eduskhetra trainer role with impact points" },
          { id: "p4w2t5", text: "Get resume reviewed by 2 people" },
          { id: "p4w2t6", text: "LinkedIn: update headline, about, skills, add projects" },
          { id: "p4w2t7", text: "GitHub: pin 2 best projects, clean up old repos" },
          { id: "p4w2t8", text: "Write one LinkedIn post about a project you built" },
          { id: "p4w2t9", text: "Naukri profile — fill 100% completion" },
        ],
        resources: [
          { label: "ATS Resume Checker — Jobscan", url: "https://www.jobscan.co" },
          { label: "LinkedIn Profile Tips", url: "https://www.linkedin.com/help/linkedin/answer/a554351" },
          { label: "GitHub Profile README Guide", url: "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme" },
        ],
      },
      {
        week: "Week 23–24",
        title: "Start Applying",
        tasks: [
          { id: "p4w3t1", text: "UST Global — use referral NOW, apply on careers.ust.com" },
          { id: "p4w3t2", text: "TCS NextStep — register at nextstep.tcs.com" },
          { id: "p4w3t3", text: "Infosys InfyTQ — register at infytq.infosys.com" },
          { id: "p4w3t4", text: "Wipro NLTH — register at wipro.com/careers" },
          { id: "p4w3t5", text: "Cognizant careers portal — careers.cognizant.com" },
          { id: "p4w3t6", text: "Capgemini careers — careers.capgemini.com" },
          { id: "p4w3t7", text: "HCL — hcltech.com/careers" },
          { id: "p4w3t8", text: "LinkedIn Easy Apply — 5 jobs/day" },
          { id: "p4w3t9", text: "Naukri — apply to 5 fresher dev jobs daily" },
          { id: "p4w3t10", text: "Unstop — register and look for coding contests + jobs" },
          { id: "p4w3t11", text: "Join Telegram groups: freshershunt, offcampusjobs4u" },
          { id: "p4w3t12", text: "Target: 15+ applications sent by Nov 30" },
        ],
        resources: [
          { label: "TCS NextStep Portal", url: "https://nextstep.tcs.com" },
          { label: "Infosys InfyTQ", url: "https://infytq.infosys.com" },
          { label: "Wipro Careers", url: "https://careers.wipro.com" },
          { label: "Unstop (contests + jobs)", url: "https://unstop.com" },
          { label: "Freshershunt (off-campus alerts)", url: "https://freshershunt.in" },
        ],
      },
    ],
  },
  {
    phase: "PHASE 5",
    title: "Interview Prep Grind",
    duration: "Dec 1 – Jan 1",
    color: "#ffd60a",
    weeks: [
      {
        week: "Week 25–27",
        title: "Technical Interview Preparation",
        tasks: [
          { id: "p5w1t1", text: "DBMS: Normalization (1NF–3NF), joins, keys, ACID, transactions" },
          { id: "p5w1t2", text: "OS: Process vs Thread, scheduling algorithms, deadlock, paging" },
          { id: "p5w1t3", text: "CN: OSI model, TCP/IP, HTTP/HTTPS, DNS, REST basics" },
          { id: "p5w1t4", text: "Top 50 React interview questions — write answers, don't just read" },
          { id: "p5w1t5", text: "Top 30 JavaScript interview questions — closures, hoisting, event loop" },
          { id: "p5w1t6", text: "Top 30 Java OOP interview questions" },
          { id: "p5w1t7", text: "Top 20 SQL query interview questions — write them by hand" },
          { id: "p5w1t8", text: "Deep dive Project 1 — explain every line, every decision" },
          { id: "p5w1t9", text: "Deep dive Project 2 — explain every line, every decision" },
          { id: "p5w1t10", text: "LeetCode: Continue — target 85 problems total" },
          { id: "p5w1t11", text: "Do 3 mock technical interviews with a friend or record yourself" },
        ],
        resources: [
          { label: "InterviewBit — DBMS Questions", url: "https://www.interviewbit.com/dbms-interview-questions/" },
          { label: "GeeksforGeeks OS Questions", url: "https://www.geeksforgeeks.org/commonly-asked-operating-systems-interview-questions/" },
          { label: "Top 50 React Questions", url: "https://www.interviewbit.com/react-interview-questions/" },
          { label: "JS Interview Questions", url: "https://github.com/sudheerj/javascript-interview-questions" },
        ],
      },
      {
        week: "Week 28–29",
        title: "Aptitude + GD Grind",
        tasks: [
          { id: "p5w2t1", text: "Quant: Percentages, Profit/Loss, Time-Speed-Distance — 50 problems" },
          { id: "p5w2t2", text: "Quant: Ratios, Averages, Simple & Compound Interest — 50 problems" },
          { id: "p5w2t3", text: "Logical: Syllogisms, Blood Relations, Seating Arrangement — 30 problems each" },
          { id: "p5w2t4", text: "Verbal: Reading Comprehension — 10 passages on Indiabix" },
          { id: "p5w2t5", text: "PrepInsta: TCS mock aptitude test — 2 full tests" },
          { id: "p5w2t6", text: "PrepInsta: Infosys mock aptitude test — 2 full tests" },
          { id: "p5w2t7", text: "PrepInsta: Capgemini mock test — 2 full tests" },
          { id: "p5w2t8", text: "GD: Join Telegram GD practice group" },
          { id: "p5w2t9", text: "GD: Practice initiation — 5 different topics" },
          { id: "p5w2t10", text: "GD: Practice summarization — 5 different topics" },
          { id: "p5w2t11", text: "Record yourself in a solo GD — watch back once" },
        ],
        resources: [
          { label: "Indiabix — Aptitude (Primary)", url: "https://www.indiabix.com" },
          { label: "PrepInsta Company Mock Tests", url: "https://prepinsta.com" },
          { label: "GD Topics with Points", url: "https://www.jagranjosh.com/general-knowledge/group-discussion-topics-1531309892-1" },
        ],
      },
      {
        week: "Week 30–32",
        title: "HR Prep + Final Sprint",
        tasks: [
          { id: "p5w3t1", text: "Write and rehearse 'Tell me about yourself' — 90 seconds, tight" },
          { id: "p5w3t2", text: "Prepare: Why this company? (per company, different answer)" },
          { id: "p5w3t3", text: "Prepare: Strengths with real example" },
          { id: "p5w3t4", text: "Prepare: Weakness with mitigation story" },
          { id: "p5w3t5", text: "Prepare: Where do you see yourself in 5 years?" },
          { id: "p5w3t6", text: "Prepare: Tell me about a challenge you overcame" },
          { id: "p5w3t7", text: "Do 5 full mock HR interviews (record yourself)" },
          { id: "p5w3t8", text: "Body language: posture, eye contact, no fidgeting — daily mirror check" },
          { id: "p5w3t9", text: "LeetCode final push — reach 90 problems by Jan 1" },
          { id: "p5w3t10", text: "Follow up on all applications sent — LinkedIn messages to recruiters" },
          { id: "p5w3t11", text: "Prepare questions to ask interviewers (2–3 per company)" },
          { id: "p5w3t12", text: "Final resume check — latest projects, no typos, 1 page" },
        ],
        resources: [
          { label: "Glassdoor — HR Interview Questions", url: "https://www.glassdoor.co.in/Interview/index.htm" },
          { label: "Indeed HR Prep Guide", url: "https://www.indeed.com/career-advice/interviewing/interview-question-tell-me-about-yourself" },
        ],
      },
    ],
  },
];

const SOFT_SKILLS = [
  {
    title: "Communication & Articulation",
    tasks: [
      { id: "ss1", text: "Speak your code logic out loud while coding (daily habit)" },
      { id: "ss2", text: "Record 2-min self-intro video — do once every 2 weeks" },
      { id: "ss3", text: "Read one news article ALOUD daily for 5 mins" },
      { id: "ss4", text: "Explain what you learned each day to someone (or yourself)" },
    ],
  },
  {
    title: "Presentation & Project Pitching",
    tasks: [
      { id: "ss5", text: "After each project: prepare 3-min verbal walkthrough" },
      { id: "ss6", text: "Explain your project to a non-tech person successfully" },
      { id: "ss7", text: "Practice 'tell me about your project' 5 times per project" },
    ],
  },
  {
    title: "Group Discussion",
    tasks: [
      { id: "ss8", text: "Learn and practice PEEL structure (Point-Example-Explain-Link)" },
      { id: "ss9", text: "Practice initiating a GD on 5 different topics (solo, out loud)" },
      { id: "ss10", text: "Practice summarizing a GD on 5 different topics" },
      { id: "ss11", text: "Join Telegram GD group and attend 3 live sessions" },
      { id: "ss12", text: "Record one solo GD simulation — watch it back" },
    ],
  },
  {
    title: "Professional Writing",
    tasks: [
      { id: "ss13", text: "Write detailed README for every GitHub project" },
      { id: "ss14", text: "Write one LinkedIn post per month about something learned" },
      { id: "ss15", text: "Write professional email format — practice with mock scenario" },
    ],
  },
  {
    title: "Confidence & Body Language",
    tasks: [
      { id: "ss16", text: "Daily mirror practice — 5 mins, eye contact + posture" },
      { id: "ss17", text: "Sit straight while coding (build the habit now)" },
      { id: "ss18", text: "Record yourself answering 'tell me about yourself' monthly" },
    ],
  },
];

// ── STORAGE ──────────────────────────────────────────────────────────────────
const STORAGE_KEY = "gthm_roadmap_progress_v2";
const RESUME_KEY = "gthm_resume_data_v1";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveProgress(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function loadResume() {
  try {
    const raw = localStorage.getItem(RESUME_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveResume(data) {
  try { localStorage.setItem(RESUME_KEY, JSON.stringify(data)); } catch {}
}

// ── UTILS ────────────────────────────────────────────────────────────────────
function getAllTaskIds() {
  const ids = [];
  ROADMAP.forEach(ph => ph.weeks.forEach(w => w.tasks.forEach(t => ids.push(t.id))));
  SOFT_SKILLS.forEach(s => s.tasks.forEach(t => ids.push(t.id)));
  return ids;
}

function getTotalTasks() { return getAllTaskIds().length; }

function getCompletedCount(progress) {
  return getAllTaskIds().filter(id => progress[id]).length;
}

function getPhaseProgress(phase, progress) {
  const ids = [];
  phase.weeks.forEach(w => w.tasks.forEach(t => ids.push(t.id)));
  const done = ids.filter(id => progress[id]).length;
  return { done, total: ids.length, pct: ids.length ? Math.round((done / ids.length) * 100) : 0 };
}

// ── COMPONENTS ───────────────────────────────────────────────────────────────

function QuoteBar() {
  const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  return (
    <div style={{
      background: "linear-gradient(90deg, #0d1117 0%, #161b22 100%)",
      borderBottom: "1px solid #21262d",
      padding: "12px 24px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      minHeight: 48,
    }}>
      <span style={{ color: "#00ff88", fontFamily: "'Space Mono', monospace", fontSize: 14 }}>✦</span>
      <span style={{ color: "#8b949e", fontFamily: "'Space Mono', monospace", fontSize: 12, fontStyle: "italic" }}>
        "{q.text}"
      </span>
      <span style={{ color: "#484f58", fontFamily: "'Space Mono', monospace", fontSize: 11, marginLeft: "auto", whiteSpace: "nowrap" }}>
        — {q.author}
      </span>
    </div>
  );
}

function ProgressRing({ pct, color, size = 56 }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#21262d" strokeWidth={4} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={4}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.6s ease" }} />
    </svg>
  );
}

function OverallProgress({ progress }) {
  const total = getTotalTasks();
  const done = getCompletedCount(progress);
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div style={{
      background: "#161b22",
      border: "1px solid #21262d",
      borderRadius: 16,
      padding: "24px 28px",
      display: "flex",
      alignItems: "center",
      gap: 24,
      marginBottom: 24,
    }}>
      <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
        <ProgressRing pct={pct} color="#00ff88" size={80} />
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%) rotate(0deg)",
          textAlign: "center",
        }}>
          <div style={{ color: "#00ff88", fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700 }}>{pct}%</div>
        </div>
      </div>
      <div>
        <div style={{ color: "#e6edf3", fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>Overall Progress</div>
        <div style={{ color: "#8b949e", fontFamily: "'Space Mono', monospace", fontSize: 13, marginTop: 4 }}>
          {done} / {total} tasks completed
        </div>
        <div style={{
          marginTop: 10,
          height: 6,
          width: 280,
          background: "#21262d",
          borderRadius: 99,
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            width: `${pct}%`,
            background: "linear-gradient(90deg, #00ff88, #00cfff)",
            borderRadius: 99,
            transition: "width 0.5s ease",
          }} />
        </div>
      </div>
    </div>
  );
}

function TaskItem({ task, done, onToggle }) {
  return (
    <div
      onClick={() => onToggle(task.id)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "10px 14px",
        borderRadius: 8,
        cursor: "pointer",
        background: done ? "rgba(0,255,136,0.04)" : "transparent",
        border: `1px solid ${done ? "rgba(0,255,136,0.15)" : "#21262d"}`,
        marginBottom: 6,
        transition: "all 0.2s ease",
        userSelect: "none",
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: 4, border: `2px solid ${done ? "#00ff88" : "#484f58"}`,
        background: done ? "#00ff88" : "transparent",
        flexShrink: 0, marginTop: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s ease",
      }}>
        {done && <span style={{ color: "#0a0a0f", fontSize: 11, fontWeight: 900 }}>✓</span>}
      </div>
      <span style={{
        color: done ? "#484f58" : "#c9d1d9",
        fontSize: 13,
        fontFamily: "'Space Mono', monospace",
        textDecoration: done ? "line-through" : "none",
        lineHeight: 1.5,
        transition: "all 0.2s ease",
      }}>{task.text}</span>
    </div>
  );
}

function ResourceLink({ res }) {
  return (
    <a href={res.url} target="_blank" rel="noopener noreferrer"
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        color: "#58a6ff", fontSize: 12, fontFamily: "'Space Mono', monospace",
        textDecoration: "none", padding: "4px 10px",
        background: "rgba(88,166,255,0.08)", borderRadius: 6,
        border: "1px solid rgba(88,166,255,0.2)",
        marginRight: 8, marginBottom: 6,
        transition: "background 0.2s",
      }}
      onMouseOver={e => e.currentTarget.style.background = "rgba(88,166,255,0.15)"}
      onMouseOut={e => e.currentTarget.style.background = "rgba(88,166,255,0.08)"}
    >
      ↗ {res.label}
    </a>
  );
}

function WeekBlock({ week, progress, onToggle, phaseColor }) {
  const [open, setOpen] = useState(false);
  const done = week.tasks.filter(t => progress[t.id]).length;
  const pct = Math.round((done / week.tasks.length) * 100);
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          background: "#0d1117",
          border: `1px solid ${open ? phaseColor + "44" : "#21262d"}`,
          borderRadius: 10,
          padding: "14px 18px",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: phaseColor, fontFamily: "'Space Mono', monospace", fontSize: 11, opacity: 0.8 }}>{week.week}</span>
          <span style={{ color: "#e6edf3", fontWeight: 700, fontSize: 14 }}>{week.title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: pct === 100 ? "#00ff88" : "#8b949e" }}>
            {done}/{week.tasks.length}
          </span>
          <div style={{ width: 60, height: 4, background: "#21262d", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: phaseColor, transition: "width 0.4s" }} />
          </div>
          <span style={{ color: "#484f58", fontSize: 16 }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>
      {open && (
        <div style={{
          background: "#0d1117",
          border: `1px solid ${phaseColor}22`,
          borderTop: "none",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          padding: "16px 18px",
        }}>
          <div style={{ marginBottom: 14 }}>
            {week.tasks.map(task => (
              <TaskItem key={task.id} task={task} done={!!progress[task.id]} onToggle={onToggle} />
            ))}
          </div>
          {week.resources && week.resources.length > 0 && (
            <div>
              <div style={{ color: "#484f58", fontFamily: "'Space Mono', monospace", fontSize: 11, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>📚 Resources</div>
              <div>{week.resources.map((r, i) => <ResourceLink key={i} res={r} />)}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PhaseBlock({ phase, progress, onToggle }) {
  const [open, setOpen] = useState(false);
  const pp = getPhaseProgress(phase, progress);
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          background: "#161b22",
          border: `2px solid ${open ? phase.color : "#21262d"}`,
          borderRadius: 14,
          padding: "18px 22px",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          userSelect: "none",
          transition: "border-color 0.2s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
            <ProgressRing pct={pp.pct} color={phase.color} size={52} />
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              fontFamily: "'Space Mono', monospace", fontSize: 10, color: phase.color, fontWeight: 700
            }}>{pp.pct}%</div>
          </div>
          <div>
            <div style={{ color: phase.color, fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700 }}>{phase.phase}</div>
            <div style={{ color: "#e6edf3", fontSize: 16, fontWeight: 800 }}>{phase.title}</div>
            <div style={{ color: "#8b949e", fontFamily: "'Space Mono', monospace", fontSize: 11, marginTop: 2 }}>{phase.duration}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: pp.pct === 100 ? "#00ff88" : "#8b949e" }}>
            {pp.done}/{pp.total}
          </span>
          <span style={{ color: "#484f58", fontSize: 18 }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>
      {open && (
        <div style={{ padding: "16px 4px 0" }}>
          {phase.weeks.map((w, i) => (
            <WeekBlock key={i} week={w} progress={progress} onToggle={onToggle} phaseColor={phase.color} />
          ))}
        </div>
      )}
    </div>
  );
}

function SoftSkillsTab({ progress, onToggle }) {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ color: "#e6edf3", fontSize: 20, fontWeight: 800 }}>Soft Skills Tracker</h2>
        <p style={{ color: "#8b949e", fontFamily: "'Space Mono', monospace", fontSize: 12, marginTop: 4 }}>
          Run these PARALLEL to your technical roadmap — every week, all the way.
        </p>
      </div>
      {SOFT_SKILLS.map((s, i) => (
        <div key={i} style={{
          background: "#161b22", border: "1px solid #21262d",
          borderRadius: 12, padding: "18px 20px", marginBottom: 16,
        }}>
          <div style={{ color: "#c77dff", fontWeight: 700, fontSize: 15, marginBottom: 12 }}>{s.title}</div>
          {s.tasks.map(t => (
            <TaskItem key={t.id} task={t} done={!!progress[t.id]} onToggle={onToggle} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ── RESUME BUILDER ────────────────────────────────────────────────────────────

const defaultResume = {
  name: "", role: "Software Developer", phone: "", email: "", linkedin: "", github: "", location: "",
  summary: "",
  skills: { languages: "", frameworks: "", databases: "", tools: "" },
  projects: [
    { name: "", tech: "", live: "", github: "", points: ["", ""] },
    { name: "", tech: "", live: "", github: "", points: ["", ""] },
  ],
  experience: [{ role: "", company: "", duration: "", points: ["", ""] }],
  education: [{ degree: "", college: "", year: "", cgpa: "" }],
  achievements: [""],
};

function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", color: "#8b949e", fontSize: 11, fontFamily: "'Space Mono', monospace", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width: "100%", background: "#0d1117", border: "1px solid #21262d",
          borderRadius: 6, padding: "8px 12px", color: "#e6edf3",
          fontFamily: "'Space Mono', monospace", fontSize: 12, outline: "none",
        }}
        onFocus={e => e.target.style.borderColor = "#00ff88"}
        onBlur={e => e.target.style.borderColor = "#21262d"}
      />
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", color: "#8b949e", fontSize: 11, fontFamily: "'Space Mono', monospace", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</label>
      <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width: "100%", background: "#0d1117", border: "1px solid #21262d",
          borderRadius: 6, padding: "8px 12px", color: "#e6edf3",
          fontFamily: "'Space Mono', monospace", fontSize: 12, outline: "none", resize: "vertical",
        }}
        onFocus={e => e.target.style.borderColor = "#00ff88"}
        onBlur={e => e.target.style.borderColor = "#21262d"}
      />
    </div>
  );
}

function ResumePreview({ data }) {
  return (
    <div id="resume-preview" style={{
      background: "#fff", color: "#111", fontFamily: "Georgia, serif",
      width: "210mm", minHeight: "297mm", padding: "14mm 14mm",
      fontSize: "10.5pt", lineHeight: 1.4, boxSizing: "border-box",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", borderBottom: "2px solid #111", paddingBottom: 8, marginBottom: 10 }}>
        <div style={{ fontSize: "20pt", fontWeight: "bold", fontFamily: "Arial, sans-serif", letterSpacing: 1 }}>{data.name || "Your Name"}</div>
        <div style={{ fontSize: "10pt", color: "#333", marginTop: 4 }}>{data.role}</div>
        <div style={{ fontSize: "9pt", color: "#444", marginTop: 4, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px" }}>
          {data.phone && <span>📞 {data.phone}</span>}
          {data.email && <span>✉ {data.email}</span>}
          {data.location && <span>📍 {data.location}</span>}
          {data.linkedin && <span>in {data.linkedin}</span>}
          {data.github && <span>⌥ {data.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontFamily: "Arial", fontWeight: "bold", fontSize: "10pt", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid #ccc", marginBottom: 5, paddingBottom: 2 }}>Professional Summary</div>
          <p style={{ fontSize: "9.5pt", color: "#333", lineHeight: 1.5 }}>{data.summary}</p>
        </div>
      )}

      {/* Skills */}
      {Object.values(data.skills).some(v => v) && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontFamily: "Arial", fontWeight: "bold", fontSize: "10pt", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid #ccc", marginBottom: 5, paddingBottom: 2 }}>Technical Skills</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "9.5pt" }}>
            <tbody>
              {data.skills.languages && <tr><td style={{ width: "28%", fontWeight: "bold", padding: "1px 0" }}>Languages</td><td style={{ color: "#333" }}>{data.skills.languages}</td></tr>}
              {data.skills.frameworks && <tr><td style={{ fontWeight: "bold", padding: "1px 0" }}>Frameworks</td><td style={{ color: "#333" }}>{data.skills.frameworks}</td></tr>}
              {data.skills.databases && <tr><td style={{ fontWeight: "bold", padding: "1px 0" }}>Databases</td><td style={{ color: "#333" }}>{data.skills.databases}</td></tr>}
              {data.skills.tools && <tr><td style={{ fontWeight: "bold", padding: "1px 0" }}>Tools</td><td style={{ color: "#333" }}>{data.skills.tools}</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* Projects */}
      {data.projects.some(p => p.name) && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontFamily: "Arial", fontWeight: "bold", fontSize: "10pt", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid #ccc", marginBottom: 5, paddingBottom: 2 }}>Projects</div>
          {data.projects.filter(p => p.name).map((p, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: "bold", fontFamily: "Arial", fontSize: "9.5pt" }}>{p.name}</span>
                <span style={{ fontSize: "8.5pt", color: "#555", fontStyle: "italic" }}>{p.tech}</span>
              </div>
              {(p.live || p.github) && (
                <div style={{ fontSize: "8.5pt", color: "#555", marginTop: 1 }}>
                  {p.live && <span>Live: {p.live}  </span>}
                  {p.github && <span>GitHub: {p.github}</span>}
                </div>
              )}
              <ul style={{ margin: "3px 0 0 16px", paddingLeft: 0 }}>
                {p.points.filter(pt => pt).map((pt, j) => (
                  <li key={j} style={{ fontSize: "9pt", color: "#333", marginBottom: 2 }}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {data.experience.some(e => e.role) && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontFamily: "Arial", fontWeight: "bold", fontSize: "10pt", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid #ccc", marginBottom: 5, paddingBottom: 2 }}>Experience</div>
          {data.experience.filter(e => e.role).map((e, i) => (
            <div key={i} style={{ marginBottom: 7 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: "bold", fontFamily: "Arial", fontSize: "9.5pt" }}>{e.role} — {e.company}</span>
                <span style={{ fontSize: "8.5pt", color: "#555", fontStyle: "italic" }}>{e.duration}</span>
              </div>
              <ul style={{ margin: "3px 0 0 16px", paddingLeft: 0 }}>
                {e.points.filter(p => p).map((pt, j) => (
                  <li key={j} style={{ fontSize: "9pt", color: "#333", marginBottom: 2 }}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.some(e => e.degree) && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontFamily: "Arial", fontWeight: "bold", fontSize: "10pt", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid #ccc", marginBottom: 5, paddingBottom: 2 }}>Education</div>
          {data.education.filter(e => e.degree).map((e, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: "9.5pt" }}>
              <div>
                <span style={{ fontWeight: "bold" }}>{e.degree}</span>
                <span style={{ color: "#444" }}> — {e.college}</span>
              </div>
              <div style={{ textAlign: "right", color: "#555", fontStyle: "italic" }}>
                <div>{e.year}</div>
                {e.cgpa && <div>CGPA: {e.cgpa}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {data.achievements.some(a => a) && (
        <div>
          <div style={{ fontFamily: "Arial", fontWeight: "bold", fontSize: "10pt", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid #ccc", marginBottom: 5, paddingBottom: 2 }}>Achievements & Activities</div>
          <ul style={{ margin: "0 0 0 16px", paddingLeft: 0 }}>
            {data.achievements.filter(a => a).map((a, i) => (
              <li key={i} style={{ fontSize: "9pt", color: "#333", marginBottom: 2 }}>{a}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ResumeBuilder() {
  const [data, setData] = useState(() => loadResume() || defaultResume);
  const [tab, setTab] = useState("form");

  useEffect(() => { saveResume(data); }, [data]);

  const set = (field, value) => setData(d => ({ ...d, [field]: value }));
  const setSkill = (field, value) => setData(d => ({ ...d, skills: { ...d.skills, [field]: value } }));

  const setProject = (i, field, value) => setData(d => {
    const projects = [...d.projects];
    projects[i] = { ...projects[i], [field]: value };
    return { ...d, projects };
  });
  const setProjectPoint = (i, j, value) => setData(d => {
    const projects = [...d.projects];
    const points = [...projects[i].points];
    points[j] = value;
    projects[i] = { ...projects[i], points };
    return { ...d, projects };
  });
  const addProjectPoint = (i) => setData(d => {
    const projects = [...d.projects];
    projects[i] = { ...projects[i], points: [...projects[i].points, ""] };
    return { ...d, projects };
  });

  const setExp = (i, field, value) => setData(d => {
    const experience = [...d.experience];
    experience[i] = { ...experience[i], [field]: value };
    return { ...d, experience };
  });
  const setExpPoint = (i, j, value) => setData(d => {
    const experience = [...d.experience];
    const points = [...experience[i].points];
    points[j] = value;
    experience[i] = { ...experience[i], points };
    return { ...d, experience };
  });
  const addExpPoint = (i) => setData(d => {
    const experience = [...d.experience];
    experience[i] = { ...experience[i], points: [...experience[i].points, ""] };
    return { ...d, experience };
  });

  const setEdu = (i, field, value) => setData(d => {
    const education = [...d.education];
    education[i] = { ...education[i], [field]: value };
    return { ...d, education };
  });

  const setAchievement = (i, value) => setData(d => {
    const achievements = [...d.achievements];
    achievements[i] = value;
    return { ...d, achievements };
  });

  const handlePrint = () => {
    const printContents = document.getElementById("resume-preview").innerHTML;
    const w = window.open("", "_blank");
    w.document.write(`
      <html><head><title>${data.name || "Resume"} — Resume</title>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: Georgia, serif; background: white; }
        @page { size: A4; margin: 0; }
        @media print { body { -webkit-print-color-adjust: exact; } }
      </style></head>
      <body>${printContents}</body></html>
    `);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); w.close(); }, 500);
  };

  const btn = (label, active, onClick) => (
    <button onClick={onClick} style={{
      padding: "8px 18px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "'Syne', sans-serif",
      fontWeight: 700, fontSize: 13,
      background: active ? "#00ff88" : "#161b22",
      color: active ? "#0a0a0f" : "#8b949e",
      transition: "all 0.2s",
    }}>{label}</button>
  );

  const section = (title) => (
    <div style={{ color: "#00ff88", fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, margin: "20px 0 10px", borderBottom: "1px solid #21262d", paddingBottom: 6 }}>{title}</div>
  );

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h2 style={{ color: "#e6edf3", fontSize: 20, fontWeight: 800 }}>ATS Resume Builder</h2>
          <p style={{ color: "#8b949e", fontFamily: "'Space Mono', monospace", fontSize: 11, marginTop: 4 }}>
            Auto-saved. Fill once, download anytime.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {btn("✎ Edit", tab === "form", () => setTab("form"))}
          {btn("👁 Preview", tab === "preview", () => setTab("preview"))}
          <button onClick={handlePrint} style={{
            padding: "8px 18px", borderRadius: 6, border: "none", cursor: "pointer",
            background: "#ffd60a", color: "#0a0a0f", fontWeight: 800, fontFamily: "'Syne', sans-serif", fontSize: 13,
          }}>⬇ Download PDF</button>
        </div>
      </div>

      {tab === "form" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            {section("Personal Info")}
            <Input label="Full Name" value={data.name} onChange={v => set("name", v)} placeholder="Gautham R" />
            <Input label="Target Role" value={data.role} onChange={v => set("role", v)} placeholder="Software Developer" />
            <Input label="Phone" value={data.phone} onChange={v => set("phone", v)} placeholder="+91 XXXXX XXXXX" />
            <Input label="Email" value={data.email} onChange={v => set("email", v)} placeholder="yourname@gmail.com" />
            <Input label="LinkedIn URL/username" value={data.linkedin} onChange={v => set("linkedin", v)} placeholder="linkedin.com/in/yourname" />
            <Input label="GitHub URL/username" value={data.github} onChange={v => set("github", v)} placeholder="github.com/GTHM" />
            <Input label="Location" value={data.location} onChange={v => set("location", v)} placeholder="Kerala, India" />

            {section("Summary (2-3 lines max)")}
            <Textarea label="Summary" value={data.summary} onChange={v => set("summary", v)}
              placeholder="Final-year CSE student at CEK with hands-on experience in full-stack development (React, Node.js, MySQL). Built and deployed production-ready applications. Experienced trainer and tech enthusiast seeking developer role." rows={4} />

            {section("Technical Skills")}
            <Input label="Programming Languages" value={data.skills.languages} onChange={v => setSkill("languages", v)} placeholder="JavaScript, Java, Python, C" />
            <Input label="Frameworks & Libraries" value={data.skills.frameworks} onChange={v => setSkill("frameworks", v)} placeholder="React.js, Node.js, Express.js" />
            <Input label="Databases" value={data.skills.databases} onChange={v => setSkill("databases", v)} placeholder="MySQL, MongoDB" />
            <Input label="Tools & Platforms" value={data.skills.tools} onChange={v => setSkill("tools", v)} placeholder="Git, GitHub, VS Code, Postman, Netlify, Render" />

            {section("Education")}
            {data.education.map((e, i) => (
              <div key={i} style={{ background: "#0d1117", borderRadius: 8, padding: 12, marginBottom: 10, border: "1px solid #21262d" }}>
                <Input label="Degree / Course" value={e.degree} onChange={v => setEdu(i, "degree", v)} placeholder="B.Tech Computer Science and Engineering" />
                <Input label="College" value={e.college} onChange={v => setEdu(i, "college", v)} placeholder="College of Engineering Kottarakkara (KTU)" />
                <Input label="Year" value={e.year} onChange={v => setEdu(i, "year", v)} placeholder="2023 – 2027" />
                <Input label="CGPA" value={e.cgpa} onChange={v => setEdu(i, "cgpa", v)} placeholder="8.5" />
              </div>
            ))}
          </div>

          <div>
            {section("Projects")}
            {data.projects.map((p, i) => (
              <div key={i} style={{ background: "#0d1117", borderRadius: 8, padding: 12, marginBottom: 14, border: "1px solid #21262d" }}>
                <div style={{ color: "#c77dff", fontFamily: "'Space Mono', monospace", fontSize: 11, marginBottom: 8 }}>Project {i + 1}</div>
                <Input label="Project Name" value={p.name} onChange={v => setProject(i, "name", v)} placeholder="CodeSphere — Automated Lab Evaluator" />
                <Input label="Tech Stack" value={p.tech} onChange={v => setProject(i, "tech", v)} placeholder="React, Node.js, MySQL, PHP" />
                <Input label="Live URL" value={p.live} onChange={v => setProject(i, "live", v)} placeholder="yourproject.netlify.app" />
                <Input label="GitHub URL" value={p.github} onChange={v => setProject(i, "github", v)} placeholder="github.com/GTHM/projectname" />
                <div style={{ color: "#8b949e", fontSize: 11, fontFamily: "'Space Mono', monospace", marginBottom: 6 }}>BULLET POINTS (use action verbs, add numbers)</div>
                {p.points.map((pt, j) => (
                  <div key={j} style={{ marginBottom: 6 }}>
                    <input value={pt} onChange={e => setProjectPoint(i, j, e.target.value)}
                      placeholder={`• Built REST API handling 500+ student submissions daily`}
                      style={{ width: "100%", background: "#161b22", border: "1px solid #21262d", borderRadius: 6, padding: "7px 10px", color: "#e6edf3", fontFamily: "'Space Mono', monospace", fontSize: 11, outline: "none" }}
                    />
                  </div>
                ))}
                <button onClick={() => addProjectPoint(i)} style={{ background: "none", border: "1px dashed #484f58", borderRadius: 6, color: "#484f58", padding: "4px 10px", cursor: "pointer", fontSize: 11, fontFamily: "'Space Mono', monospace" }}>+ Add point</button>
              </div>
            ))}

            {section("Experience")}
            {data.experience.map((e, i) => (
              <div key={i} style={{ background: "#0d1117", borderRadius: 8, padding: 12, marginBottom: 14, border: "1px solid #21262d" }}>
                <Input label="Role" value={e.role} onChange={v => setExp(i, "role", v)} placeholder="Trainer / Educator" />
                <Input label="Company" value={e.company} onChange={v => setExp(i, "company", v)} placeholder="Eduskhetra" />
                <Input label="Duration" value={e.duration} onChange={v => setExp(i, "duration", v)} placeholder="Jan 2026 – Present" />
                <div style={{ color: "#8b949e", fontSize: 11, fontFamily: "'Space Mono', monospace", marginBottom: 6 }}>BULLET POINTS</div>
                {e.points.map((pt, j) => (
                  <div key={j} style={{ marginBottom: 6 }}>
                    <input value={pt} onChange={ev => setExpPoint(i, j, ev.target.value)}
                      placeholder="• Trained 50+ students in web development fundamentals"
                      style={{ width: "100%", background: "#161b22", border: "1px solid #21262d", borderRadius: 6, padding: "7px 10px", color: "#e6edf3", fontFamily: "'Space Mono', monospace", fontSize: 11, outline: "none" }}
                    />
                  </div>
                ))}
                <button onClick={() => addExpPoint(i)} style={{ background: "none", border: "1px dashed #484f58", borderRadius: 6, color: "#484f58", padding: "4px 10px", cursor: "pointer", fontSize: 11, fontFamily: "'Space Mono', monospace" }}>+ Add point</button>
              </div>
            ))}

            {section("Achievements & Activities")}
            {data.achievements.map((a, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <input value={a} onChange={e => setAchievement(i, e.target.value)}
                  placeholder="NSS Secretary, CEK Unit 333 — organized 10+ community events"
                  style={{ width: "100%", background: "#0d1117", border: "1px solid #21262d", borderRadius: 6, padding: "8px 12px", color: "#e6edf3", fontFamily: "'Space Mono', monospace", fontSize: 12, outline: "none" }}
                />
              </div>
            ))}
            <button onClick={() => setData(d => ({ ...d, achievements: [...d.achievements, ""] }))}
              style={{ background: "none", border: "1px dashed #484f58", borderRadius: 6, color: "#484f58", padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: "'Space Mono', monospace", marginTop: 4 }}>
              + Add achievement
            </button>
          </div>
        </div>
      )}

      {tab === "preview" && (
        <div style={{ overflow: "auto", background: "#f0f0f0", borderRadius: 12, padding: 20, display: "flex", justifyContent: "center" }}>
          <ResumePreview data={data} />
        </div>
      )}
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState("roadmap");
  const [progress, setProgress] = useState(loadProgress);

  const onToggle = useCallback((id) => {
    setProgress(p => {
      const next = { ...p, [id]: !p[id] };
      saveProgress(next);
      return next;
    });
  }, []);

  const tabs = [
    { id: "roadmap", label: "🗺 Roadmap" },
    { id: "soft", label: "🗣 Soft Skills" },
    { id: "resume", label: "📄 Resume Builder" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f" }}>
      {/* Top bar */}
      <div style={{
        background: "#0d1117",
        borderBottom: "1px solid #21262d",
        padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 56,
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#00ff88", fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 15 }}>GL17CH</span>
          <span style={{ color: "#484f58", fontFamily: "'Space Mono', monospace", fontSize: 13 }}>/ Dev Roadmap 2026</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: "6px 16px", borderRadius: 6, border: "none", cursor: "pointer",
              background: activeTab === t.id ? "#161b22" : "transparent",
              color: activeTab === t.id ? "#00ff88" : "#8b949e",
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13,
              transition: "all 0.2s",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <QuoteBar />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 24px" }}>
        {activeTab === "roadmap" && (
          <>
            <OverallProgress progress={progress} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 28 }}>
              {ROADMAP.map((ph, i) => {
                const pp = getPhaseProgress(ph, progress);
                return (
                  <div key={i} style={{
                    background: "#161b22", border: `1px solid ${pp.pct === 100 ? ph.color : "#21262d"}`,
                    borderRadius: 10, padding: "12px 14px", textAlign: "center",
                  }}>
                    <div style={{ color: ph.color, fontSize: 11, fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>{ph.phase}</div>
                    <div style={{ color: "#e6edf3", fontSize: 13, fontWeight: 700, marginTop: 2 }}>{ph.title}</div>
                    <div style={{ color: ph.color, fontFamily: "'Space Mono', monospace", fontSize: 18, fontWeight: 900, marginTop: 6 }}>{pp.pct}%</div>
                    <div style={{ color: "#484f58", fontSize: 10, fontFamily: "'Space Mono', monospace" }}>{pp.done}/{pp.total}</div>
                  </div>
                );
              })}
            </div>
            {ROADMAP.map((ph, i) => (
              <PhaseBlock key={i} phase={ph} progress={progress} onToggle={onToggle} />
            ))}
          </>
        )}
        {activeTab === "soft" && <SoftSkillsTab progress={progress} onToggle={onToggle} />}
        {activeTab === "resume" && <ResumeBuilder />}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
