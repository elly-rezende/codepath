export const tracks = [
  {
    id: "cs-fundamentals",
    title: "CS Fundamentals",
    color: "#D4A853",
    icon: "🧠",
    lessons: [
      {
        id: "big-o-intro",
        title: "What Big O Actually Means",
        xp: 30,
        difficulty: "beginner",
        hook: "Every time you write a loop inside another loop, you're creating an O(n²) problem — and in production, that can bring your API to its knees.",
        concept: `Big O notation isn't about exact speed — it's about how your code scales as the input grows. Think of it like this: if you're searching for a friend at a party of 10 people, checking everyone one by one is fine. But at a festival with 100,000 people? That same approach is a disaster.

When we say an algorithm is O(n), we mean the time it takes grows linearly with the input. Double the data, double the time. O(n²) means double the data, quadruple the time — that's your nested loop. O(1) means it takes the same time no matter what — like accessing an array by index.

Real-world impact: that Supabase query you wrote that joins two tables and filters? If you're doing it in a loop on the client side instead of letting Postgres handle it, you might be turning an O(n) database operation into O(n²) JavaScript processing. The database is optimized for this. Let it do its job.`,
        challenge: {
          instructions: "Identify the Big O complexity of each function below. Replace the comments with the correct Big O notation.",
          starterCode: `// What is the Big O of each function?

function findFirst(arr) {
  return arr[0];
}
// Complexity: // TODO: Replace with O(?)

function findItem(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
// Complexity: // TODO: Replace with O(?)

function hasDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}
// Complexity: // TODO: Replace with O(?)`,
          solution: `function findFirst(arr) {
  return arr[0];
}
// Complexity: O(1)

function findItem(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
// Complexity: O(n)

function hasDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}
// Complexity: O(n²)`,
          tests: [
            { description: "findFirst should be O(1)", check: "code.includes('O(1)')" },
            { description: "findItem should be O(n)", check: "code.includes('O(n)') && !code.includes('O(n²)') === false || (code.match(/O\\(n\\)/g) || []).length >= 1" },
            { description: "hasDuplicate should be O(n²)", check: "code.includes('O(n²)') || code.includes('O(n^2)')" }
          ]
        }
      },
      {
        id: "big-o-practice",
        title: "Big O in Practice: Measuring Real Performance",
        xp: 40,
        difficulty: "beginner",
        hook: "Knowing Big O theory is one thing — actually seeing a 1000x slowdown in your browser console hits different.",
        concept: `Let's move from theory to practice. The best way to internalize Big O is to feel it. When you run an O(n²) algorithm on 10 items, it's instant. On 10,000 items, you're waiting. On 1,000,000 items, you're restarting your browser.

Here's the thing most tutorials skip: Big O describes the worst case, and it drops constants. O(2n) is still O(n). O(n² + n) is still O(n²) because as n gets huge, the n² dominates. This is why a "slower" O(n) algorithm can actually beat a "faster" O(n log n) algorithm on small inputs — the constants matter when n is small.

In your React apps, this shows up everywhere. Filtering a list in a useEffect? That's O(n). Filtering and then sorting? That's O(n log n). Doing a nested comparison to find duplicates between two lists? O(n × m). When your component re-renders on every keystroke and runs that logic, you feel it.`,
        challenge: {
          instructions: "Write a function that finds common elements between two arrays. First write the O(n²) brute force way, then the O(n) optimized way using a Set.",
          starterCode: `// Brute force: O(n²) - check every pair
function findCommonSlow(arr1, arr2) {
  const common = [];
  // TODO: Use nested loops to find common elements

  return common;
}

// Optimized: O(n) - use a Set for O(1) lookups
function findCommonFast(arr1, arr2) {
  const common = [];
  // TODO: Use a Set to find common elements efficiently

  return common;
}

// Test both:
const a = [1, 2, 3, 4, 5];
const b = [4, 5, 6, 7, 8];
console.log("Slow:", findCommonSlow(a, b));
console.log("Fast:", findCommonFast(a, b));`,
          solution: `function findCommonSlow(arr1, arr2) {
  const common = [];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) common.push(arr1[i]);
    }
  }
  return common;
}

function findCommonFast(arr1, arr2) {
  const common = [];
  const set = new Set(arr1);
  for (const item of arr2) {
    if (set.has(item)) common.push(item);
  }
  return common;
}

const a = [1, 2, 3, 4, 5];
const b = [4, 5, 6, 7, 8];
console.log("Slow:", findCommonSlow(a, b));
console.log("Fast:", findCommonFast(a, b));`,
          tests: [
            { description: "findCommonSlow uses nested loops", check: "code.includes('for') && (code.match(/for/g) || []).length >= 3" },
            { description: "findCommonFast uses a Set", check: "code.includes('new Set') || code.includes('Set(')" },
            { description: "Both return [4, 5]", check: "true" }
          ]
        }
      },
      {
        id: "arrays-objects-maps",
        title: "Arrays, Objects, and Maps: Choosing the Right Tool",
        xp: 25,
        difficulty: "beginner",
        hook: "Using an array when you need a Map is like searching every drawer in your house for your keys — when you could just put a hook by the door.",
        concept: `In JavaScript, arrays, objects, and Maps all store collections of data, but they have wildly different performance characteristics. Understanding when to use which is one of those skills that separates someone who writes code from someone who writes efficient code.

Arrays are ordered lists. Great for sequences, queues, stacks. Accessing by index is O(1). Searching by value? O(n) — you have to check each element. Think of your Supabase query results: they come back as arrays because order matters.

Objects (and Maps) are key-value stores. Accessing by key is O(1) — instant. This is why when you need to look things up frequently, you convert your array into an object keyed by ID. Instead of users.find(u => u.id === 5), you do usersById[5]. Same result, dramatically different performance at scale.

Maps are like objects but better for frequent additions/deletions, can use any type as keys (not just strings), and maintain insertion order. Use Map when you're building caches, tracking state, or counting occurrences.`,
        challenge: {
          instructions: "Convert an array of users into a lookup object keyed by ID, then use it for fast access. This is a pattern you'll use constantly in React state management.",
          starterCode: `const users = [
  { id: 1, name: "Elly", role: "developer" },
  { id: 2, name: "Marcus", role: "designer" },
  { id: 3, name: "Aisha", role: "pm" },
  { id: 4, name: "Carlos", role: "developer" },
];

// TODO: Create a lookup object keyed by user id
// Hint: use reduce() or a for loop
const usersById = {};

// TODO: Find the user with id 3 using the lookup (O(1))
const user3 = undefined;

console.log("Lookup:", usersById);
console.log("User 3:", user3);
console.log("User 3 name:", user3?.name);`,
          solution: `const users = [
  { id: 1, name: "Elly", role: "developer" },
  { id: 2, name: "Marcus", role: "designer" },
  { id: 3, name: "Aisha", role: "pm" },
  { id: 4, name: "Carlos", role: "developer" },
];

const usersById = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});

const user3 = usersById[3];

console.log("Lookup:", usersById);
console.log("User 3:", user3);
console.log("User 3 name:", user3?.name);`,
          tests: [
            { description: "usersById is populated", check: "code.includes('usersById') && (code.includes('reduce') || code.includes('for'))" },
            { description: "user3 uses bracket notation lookup", check: "code.includes('usersById[3]') || code.includes('usersById[\"3\"]')" },
            { description: "Prints Aisha", check: "true" }
          ]
        }
      }
    ]
  },
  {
    id: "frontend",
    title: "Frontend Mastery",
    color: "#61DAFB",
    icon: "⚛️",
    lessons: [
      {
        id: "html-semantics",
        title: "HTML Semantics: Why Divs Aren't Enough",
        xp: 20,
        difficulty: "beginner",
        hook: "A screen reader user just tried to navigate your site and everything is a div. They have no idea what's a nav, what's an article, or where the main content starts.",
        concept: `Semantic HTML isn't about being fancy — it's about meaning. When you use <nav>, <main>, <article>, <section>, <aside>, and <footer>, you're creating a document outline that browsers, screen readers, and search engines understand.

Think of it like this: if you built a house with no labels on any door, visitors would have to open every single door to find the bathroom. Semantic HTML puts signs on the doors. A <nav> says "navigation is here." A <main> says "this is the primary content." An <aside> says "this is supplementary info."

For your React components, this means your Layout component should render <main>, not <div>. Your navbar should be wrapped in <nav>. Your blog posts should use <article>. This costs zero extra effort and makes your site accessible to the 15% of the world's population that lives with some form of disability. Plus, it improves SEO — Google understands semantic HTML better than div soup.`,
        challenge: {
          instructions: "Refactor this div-soup into proper semantic HTML. Replace the divs with the correct semantic elements.",
          starterCode: `// Replace the divs with semantic HTML elements
const html = \`
<div class="page">
  <div class="top-bar">
    <div class="logo">CodePath</div>
    <div class="links">
      <a href="/">Home</a>
      <a href="/learn">Learn</a>
      <a href="/profile">Profile</a>
    </div>
  </div>
  <div class="content">
    <div class="post">
      <div class="post-title">Understanding React Hooks</div>
      <div class="post-body">Hooks let you use state in functional components...</div>
    </div>
    <div class="sidebar">
      <div class="widget">Related Articles</div>
    </div>
  </div>
  <div class="bottom">
    <div>© 2026 CodePath</div>
  </div>
</div>
\`;

console.log(html);`,
          solution: `const html = \`
<div class="page">
  <header class="top-bar">
    <div class="logo">CodePath</div>
    <nav class="links">
      <a href="/">Home</a>
      <a href="/learn">Learn</a>
      <a href="/profile">Profile</a>
    </nav>
  </header>
  <main class="content">
    <article class="post">
      <h2 class="post-title">Understanding React Hooks</h2>
      <p class="post-body">Hooks let you use state in functional components...</p>
    </article>
    <aside class="sidebar">
      <div class="widget">Related Articles</div>
    </aside>
  </main>
  <footer class="bottom">
    <p>© 2026 CodePath</p>
  </footer>
</div>
\`;

console.log(html);`,
          tests: [
            { description: "Uses <nav> element", check: "code.includes('<nav')" },
            { description: "Uses <main> element", check: "code.includes('<main')" },
            { description: "Uses <article> element", check: "code.includes('<article')" },
            { description: "Uses <footer> element", check: "code.includes('<footer')" }
          ]
        }
      },
      {
        id: "css-flexbox-grid",
        title: "Flexbox vs Grid: When to Use Which",
        xp: 25,
        difficulty: "beginner",
        hook: "You've been using flexbox for everything, including layouts that would take 2 lines with CSS Grid. Let's fix that.",
        concept: `Here's the simplest mental model: Flexbox is for one-dimensional layouts (a row OR a column). Grid is for two-dimensional layouts (rows AND columns). If you're laying out items in a single line — navigation links, a toolbar, a card's internal layout — flexbox is your tool.

If you're creating a page layout with a sidebar and main content area, a dashboard with cards in a grid, or anything where items need to align both horizontally AND vertically — that's Grid territory.

The real-world analogy: Flexbox is like arranging books on a single shelf. You can space them out, align them, push some to the left and others to the right. Grid is like arranging furniture in a room — you're working with rows and columns simultaneously, and things can span multiple rows or columns. Your React dashboard? That's Grid for the overall layout, with Flexbox inside individual cards for their content.`,
        challenge: {
          instructions: "Write CSS that creates a dashboard layout: sidebar on the left (250px wide), main content area that fills the rest. Inside the main area, create a 3-column grid of cards.",
          starterCode: `// Write the CSS for this layout
const css = \`
.dashboard {
  /* TODO: Use CSS Grid for the sidebar + main layout */

}

.sidebar {
  /* TODO: Make sidebar 250px wide */

}

.main {
  /* TODO: Main content fills remaining space */

}

.card-grid {
  /* TODO: 3-column grid of cards with gap */

}

.card {
  /* TODO: Use flexbox for card content (vertical) */

}
\`;

console.log("CSS written! Check the styles.");
console.log(css);`,
          solution: `const css = \`
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
}

.sidebar {
  background: #1a1a2e;
  padding: 1rem;
}

.main {
  padding: 1rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #16213e;
  border-radius: 8px;
}
\`;

console.log("CSS written! Check the styles.");
console.log(css);`,
          tests: [
            { description: "Dashboard uses CSS Grid", check: "code.includes('display: grid') || code.includes('display:grid')" },
            { description: "Sidebar is 250px", check: "code.includes('250px')" },
            { description: "Card grid uses repeat or 3 columns", check: "code.includes('repeat(3') || code.includes('1fr 1fr 1fr')" },
            { description: "Cards use flexbox", check: "code.includes('display: flex') || code.includes('display:flex')" }
          ]
        }
      },
      {
        id: "async-await",
        title: "How async/await Really Works",
        xp: 40,
        difficulty: "intermediate",
        hook: "You use async/await every day in your Supabase calls, but do you know what happens between the await and the response? Understanding this changes how you write React components.",
        concept: `async/await is syntax sugar over Promises, which are themselves an abstraction over callbacks. But the mental model that actually helps is this: await is a "pause point." When JavaScript hits an await, it says "I'll come back to this function later" and goes to do other work.

Imagine you're at a restaurant. You order food (make an API call), and instead of standing at the kitchen window staring (blocking), you go back to your table and chat with friends (other code runs). When the food is ready, the waiter brings it to you (the Promise resolves), and you continue eating (code after await runs).

This is why your React component doesn't freeze while fetching from Supabase. The browser keeps rendering, handling clicks, running animations — all while your data fetch is "paused" at the await. But here's the gotcha: code AFTER the await runs later, in a different "tick." This is why you sometimes see stale state in React — the component re-rendered between your await calls, but your closure still has the old values.`,
        challenge: {
          instructions: "Fix the async code below. There are 3 bugs related to async/await — find and fix them all.",
          starterCode: `// Bug 1: This function doesn't return the data properly
async function fetchUser(id) {
  const response = fetch(\`https://api.example.com/users/\${id}\`);
  const data = response.json();
  return data;
}

// Bug 2: Error handling is missing
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url);
    if (response.ok) return await response.json();
  }
}

// Bug 3: These fetches run sequentially but could be parallel
async function getDashboardData(userId) {
  const user = await fetchUser(userId);
  const posts = await fetch("/api/posts").then(r => r.json());
  const notifications = await fetch("/api/notifications").then(r => r.json());
  return { user, posts, notifications };
}

console.log("Check your fixes!");`,
          solution: `// Bug 1: Missing await keywords
async function fetchUser(id) {
  const response = await fetch(\`https://api.example.com/users/\${id}\`);
  const data = await response.json();
  return data;
}

// Bug 2: Add try/catch for error handling
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return await response.json();
    } catch (err) {
      if (i === retries - 1) throw err;
    }
  }
}

// Bug 3: Use Promise.all for parallel fetches
async function getDashboardData(userId) {
  const [user, posts, notifications] = await Promise.all([
    fetchUser(userId),
    fetch("/api/posts").then(r => r.json()),
    fetch("/api/notifications").then(r => r.json()),
  ]);
  return { user, posts, notifications };
}

console.log("Check your fixes!");`,
          tests: [
            { description: "fetchUser has await on fetch AND .json()", check: "code.includes('await fetch') && code.includes('await response.json') || code.includes('await res.json')" },
            { description: "fetchWithRetry has try/catch", check: "code.includes('try') && code.includes('catch')" },
            { description: "getDashboardData uses Promise.all", check: "code.includes('Promise.all')" }
          ]
        }
      }
    ]
  },
  {
    id: "backend",
    title: "Backend Fundamentals",
    color: "#68D391",
    icon: "🔧",
    lessons: [
      {
        id: "http-apis",
        title: "HTTP & APIs: The Language of the Web",
        xp: 25,
        difficulty: "beginner",
        hook: "Every time your React app talks to Supabase, it's speaking HTTP. Understanding this protocol means you stop guessing why requests fail and start knowing.",
        concept: `HTTP is a request-response protocol. Your browser (or your fetch call) sends a request with a method (GET, POST, PUT, DELETE), headers (metadata), and sometimes a body (data). The server responds with a status code, headers, and a body.

Think of HTTP methods like actions at a library. GET = "Can I see this book?" POST = "I want to add a new book." PUT = "I want to replace this entire book." PATCH = "I want to fix a typo on page 42." DELETE = "Please remove this book." When you call supabase.from('posts').select(), that's a GET. When you call .insert(), that's a POST.

Status codes tell you what happened: 200s mean success, 300s mean "look elsewhere" (redirects), 400s mean you messed up (bad request, unauthorized, not found), and 500s mean the server messed up. When your Supabase call returns a 401, that's the server saying "who are you?" — your auth token is missing or expired. A 403 says "I know who you are, but you can't do this" — check your Row Level Security policies.`,
        challenge: {
          instructions: "Match each scenario with the correct HTTP method and expected status code. Fill in the blanks.",
          starterCode: `const scenarios = [
  {
    action: "Fetching a list of blog posts",
    method: "", // TODO: GET, POST, PUT, PATCH, or DELETE?
    successStatus: 0, // TODO: What status code on success?
  },
  {
    action: "Creating a new user account",
    method: "", // TODO
    successStatus: 0, // TODO
  },
  {
    action: "Updating a user's email address only",
    method: "", // TODO
    successStatus: 0, // TODO
  },
  {
    action: "Removing a comment from a post",
    method: "", // TODO
    successStatus: 0, // TODO
  },
  {
    action: "Replacing an entire user profile",
    method: "", // TODO
    successStatus: 0, // TODO
  },
];

scenarios.forEach(s => {
  console.log(\`\${s.action}: \${s.method} → \${s.successStatus}\`);
});`,
          solution: `const scenarios = [
  {
    action: "Fetching a list of blog posts",
    method: "GET",
    successStatus: 200,
  },
  {
    action: "Creating a new user account",
    method: "POST",
    successStatus: 201,
  },
  {
    action: "Updating a user's email address only",
    method: "PATCH",
    successStatus: 200,
  },
  {
    action: "Removing a comment from a post",
    method: "DELETE",
    successStatus: 204,
  },
  {
    action: "Replacing an entire user profile",
    method: "PUT",
    successStatus: 200,
  },
];

scenarios.forEach(s => {
  console.log(\`\${s.action}: \${s.method} → \${s.successStatus}\`);
});`,
          tests: [
            { description: "GET for fetching posts", check: "code.includes('\"GET\"')" },
            { description: "POST for creating users (201)", check: "code.includes('\"POST\"') && code.includes('201')" },
            { description: "PATCH for partial update", check: "code.includes('\"PATCH\"')" },
            { description: "DELETE for removing", check: "code.includes('\"DELETE\"')" }
          ]
        }
      },
      {
        id: "sql-joins",
        title: "SQL JOINs Explained (with Supabase)",
        xp: 35,
        difficulty: "intermediate",
        hook: "You've been making multiple Supabase queries and combining the data in JavaScript. One JOIN would have been faster, cleaner, and used less bandwidth.",
        concept: `A JOIN combines rows from two or more tables based on a related column. The most common type is an INNER JOIN: "Give me all rows where BOTH tables have a matching value." If a user has posts, the join returns those user+post pairs. Users with no posts? Gone. Posts with no user? Gone.

A LEFT JOIN says "Give me ALL rows from the left table, and match them with the right table where possible. If there's no match, fill in NULL." This is what you want 99% of the time in apps — show all users, and include their posts if they have any.

In Supabase, you rarely write raw SQL. Instead you use the query builder: supabase.from('posts').select('*, author:users(name, avatar)') — this is doing a LEFT JOIN behind the scenes. The (name, avatar) part selects which columns from the users table you want. Understanding the SQL underneath means you can optimize these queries, add filters on the joined table, and debug when the data shape isn't what you expect.`,
        challenge: {
          instructions: "Write Supabase queries that use JOINs (via the select syntax). Each query should fetch related data efficiently in a single request.",
          starterCode: `// Imagine these tables:
// posts: id, title, content, author_id, created_at
// users: id, name, email, avatar_url
// comments: id, post_id, user_id, body, created_at

// Query 1: Get all posts with their author's name and avatar
const query1 = "supabase.from('posts').select('TODO')";

// Query 2: Get a specific user with all their posts
const query2 = "supabase.from('users').select('TODO').eq('id', userId)";

// Query 3: Get all posts with their comments and each comment's author
const query3 = "supabase.from('posts').select('TODO')";

console.log("Query 1:", query1);
console.log("Query 2:", query2);
console.log("Query 3:", query3);`,
          solution: `const query1 = "supabase.from('posts').select('id, title, content, created_at, author:users(name, avatar_url)')";

const query2 = "supabase.from('users').select('id, name, email, posts(id, title, created_at)').eq('id', userId)";

const query3 = "supabase.from('posts').select('id, title, content, comments(id, body, created_at, user:users(name, avatar_url))')";

console.log("Query 1:", query1);
console.log("Query 2:", query2);
console.log("Query 3:", query3);`,
          tests: [
            { description: "Query 1 joins users from posts", check: "code.includes('author:users') || code.includes('users(')" },
            { description: "Query 2 includes nested posts", check: "code.includes('posts(') || code.includes('posts (')" },
            { description: "Query 3 has nested comments with authors", check: "code.includes('comments(') && code.includes('users(')" }
          ]
        }
      },
      {
        id: "auth-security",
        title: "Auth & Security: What Actually Happens When You Login",
        xp: 35,
        difficulty: "intermediate",
        hook: "You've implemented Supabase Auth in your apps, but do you know what a JWT is, why tokens expire, or what stops someone from just editing their user ID in a request?",
        concept: `Authentication (AuthN) is proving WHO you are. Authorization (AuthZ) is proving WHAT you're allowed to do. Your login form handles AuthN. Your Supabase Row Level Security policies handle AuthZ. They're different layers.

When you log in, the server creates a JWT (JSON Web Token) — a signed piece of data containing your user ID, email, role, and an expiration time. "Signed" means the server used a secret key to stamp it, so if anyone tampers with the data, the signature won't match. It's like a wax seal on a letter — you can read it, but you can't forge it.

Your browser stores this JWT and sends it with every request in the Authorization header. Supabase checks the signature, extracts your user_id, and uses it in RLS policies like "auth.uid() = user_id". This is why RLS is so powerful — the security lives in the database, not in your client code. Even if someone opens DevTools and modifies your React code, the database still enforces the rules. Your client code is for UX; the database is for security.`,
        challenge: {
          instructions: "Decode this JWT manually (it's base64) and answer questions about it. Then write a Supabase RLS policy.",
          starterCode: `// A JWT has 3 parts separated by dots: header.payload.signature
// The payload is base64 encoded. Let's decode one:

const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWJjMTIzIiwiZW1haWwiOiJlbGx5QGV4YW1wbGUuY29tIiwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJleHAiOjE3MTIwMDAwMDB9.signature";

// TODO: Split the JWT and decode the payload
const parts = jwt.split(".");
const payload = JSON.parse(atob(parts[1]));
console.log("Decoded payload:", payload);

// TODO: Answer these questions (replace the nulls):
const answers = {
  userId: null,      // What's the user_id in this token?
  role: null,        // What role does this user have?
  isExpired: null,   // Is this token expired? (true/false)
};

console.log("Answers:", answers);

// TODO: Write an RLS policy (as a string) that only lets users
// see their own rows in a "posts" table
const rlsPolicy = "";
console.log("RLS Policy:", rlsPolicy);`,
          solution: `const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWJjMTIzIiwiZW1haWwiOiJlbGx5QGV4YW1wbGUuY29tIiwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJleHAiOjE3MTIwMDAwMDB9.signature";

const parts = jwt.split(".");
const payload = JSON.parse(atob(parts[1]));
console.log("Decoded payload:", payload);

const answers = {
  userId: "abc123",
  role: "authenticated",
  isExpired: true,
};

console.log("Answers:", answers);

const rlsPolicy = "CREATE POLICY select_own_posts ON posts FOR SELECT USING (auth.uid() = user_id)";
console.log("RLS Policy:", rlsPolicy);`,
          tests: [
            { description: "Correctly identified user_id", check: "code.includes('abc123')" },
            { description: "Correctly identified role", check: "code.includes('authenticated')" },
            { description: "Token is expired", check: "code.includes('isExpired: true') || code.includes('isExpired:true')" },
            { description: "RLS policy uses auth.uid()", check: "code.includes('auth.uid()') || code.includes('auth.uid ()')" }
          ]
        }
      }
    ]
  },
  {
    id: "devops",
    title: "DevOps Essentials",
    color: "#F56565",
    icon: "🚀",
    lessons: [
      {
        id: "git-internals",
        title: "Git Beyond the Basics: Understanding the DAG",
        xp: 35,
        difficulty: "intermediate",
        hook: "You use git add, commit, push every day. But when a merge conflict hits or you need to rebase, you freeze — because you don't understand what Git is actually doing under the hood.",
        concept: `Git is a directed acyclic graph (DAG) of snapshots. Every commit is a snapshot of your entire project at that moment, plus a pointer to its parent commit(s). A branch is just a pointer to a commit — it's literally a file containing a 40-character hash. That's it. "main" isn't special; it's just a pointer that moves forward with each commit.

When you "create a branch," Git creates a new pointer. When you "commit," Git creates a new snapshot and moves the current branch pointer forward. When you "merge," Git creates a commit with TWO parents, connecting the two branches in the graph. When you "rebase," Git replays your commits on top of another branch — creating new commits with new hashes (because the parent changed).

Here's what this means practically: git rebase rewrites history. The old commits still exist (for a while), but new commits replace them. This is why you never rebase commits that others have already pulled — they'd have the old commits, you'd have the new ones, and Git would see them as unrelated. Cherry-pick takes a single commit and replays it elsewhere. It's like photocopying one page from one notebook into another.`,
        challenge: {
          instructions: "Answer questions about Git operations. This tests your mental model of how Git actually works.",
          starterCode: `// Git Mental Model Quiz
// Answer each question by setting the value

const answers = {
  // Q1: What is a Git branch, technically?
  // a) "A copy of the codebase"
  // b) "A pointer to a commit"
  // c) "A separate directory"
  q1: "",

  // Q2: After running: git checkout -b feature && git commit
  // How many new objects did Git create?
  // a) "1 - just the commit"
  // b) "2 - the branch and the commit"
  // c) "3 - tree, blob, and commit"
  q2: "",

  // Q3: What does rebase do differently from merge?
  // a) "Rebase creates a merge commit, merge doesn't"
  // b) "Rebase replays commits creating new hashes, merge creates a commit with two parents"
  // c) "They do the same thing differently"
  q3: "",

  // Q4: After a rebase, your commit hashes are:
  // a) "The same"
  // b) "Different, because the parent changed"
  // c) "Different, because the content changed"
  q4: "",

  // Q5: cherry-pick takes:
  // a) "A branch and applies all its commits"
  // b) "A single commit and replays it on your current branch"
  // c) "The latest commit from another branch"
  q5: "",
};

Object.entries(answers).forEach(([q, a]) => {
  console.log(\`\${q}: \${a || "(not answered)"}\`);
});`,
          solution: `const answers = {
  q1: "b",
  q2: "a",
  q3: "b",
  q4: "b",
  q5: "b",
};

Object.entries(answers).forEach(([q, a]) => {
  console.log(\`\${q}: \${a || "(not answered)"}\`);
});`,
          tests: [
            { description: "Q1: Branch is a pointer", check: "code.includes('q1: \"b\"') || code.includes(\"q1: 'b'\")" },
            { description: "Q3: Rebase vs merge correct", check: "code.includes('q3: \"b\"') || code.includes(\"q3: 'b'\")" },
            { description: "Q4: Hashes change after rebase", check: "code.includes('q4: \"b\"') || code.includes(\"q4: 'b'\")" },
            { description: "Q5: Cherry-pick single commit", check: "code.includes('q5: \"b\"') || code.includes(\"q5: 'b'\")" }
          ]
        }
      },
      {
        id: "cicd-concepts",
        title: "What Happens When You Click Deploy",
        xp: 30,
        difficulty: "beginner",
        hook: "You push to main, Vercel shows a green checkmark, and your site is live. But what happened in those 45 seconds? Understanding this pipeline makes you dangerous.",
        concept: `When you push code to GitHub and Vercel deploys it, here's the actual sequence: (1) GitHub sends a webhook to Vercel saying "new commits on main." (2) Vercel spins up a build container — a fresh, temporary Linux machine. (3) It clones your repo, installs dependencies (npm install), and runs your build command (npm run build for Vite). (4) Vite compiles your JSX, bundles your code, tree-shakes unused imports, and outputs static files. (5) Vercel uploads those files to its CDN (Content Delivery Network) — servers all over the world. (6) It updates DNS/routing so your domain points to the new version. (7) The old version is kept around for instant rollback.

CI/CD stands for Continuous Integration / Continuous Deployment. CI is the "testing" part — every push triggers automated tests to catch bugs before they reach production. CD is the "shipping" part — if tests pass, deploy automatically. You can add CI with GitHub Actions: a YAML file that says "on push, run npm test."

The key insight: your dev server (npm run dev) and your production build are DIFFERENT. Dev mode uses hot module replacement, doesn't minify, includes source maps. Production mode optimizes everything. Bugs that only appear in production often come from this difference — like environment variables that exist in .env.local but not in Vercel's dashboard.`,
        challenge: {
          instructions: "Put the Vercel deployment steps in the correct order, and identify what each CI/CD component does.",
          starterCode: `// Put these deployment steps in order (1-7):
const steps = {
  "Vercel uploads static files to CDN": 0,    // TODO
  "GitHub sends webhook to Vercel": 0,         // TODO
  "npm run build compiles and bundles": 0,     // TODO
  "You push code to main": 0,                  // TODO
  "Vercel clones repo and runs npm install": 0,// TODO
  "DNS routes to new version": 0,              // TODO
  "Old version kept for rollback": 0,          // TODO
};

// What does each abbreviation/concept mean?
const concepts = {
  CI: "",  // TODO: One sentence
  CD: "",  // TODO: One sentence
  CDN: "", // TODO: One sentence
};

Object.entries(steps)
  .sort((a, b) => a[1] - b[1])
  .forEach(([step, order]) => {
    console.log(\`\${order}. \${step}\`);
  });

console.log("\\nConcepts:");
Object.entries(concepts).forEach(([key, val]) => {
  console.log(\`\${key}: \${val}\`);
});`,
          solution: `const steps = {
  "Vercel uploads static files to CDN": 5,
  "GitHub sends webhook to Vercel": 2,
  "npm run build compiles and bundles": 4,
  "You push code to main": 1,
  "Vercel clones repo and runs npm install": 3,
  "DNS routes to new version": 6,
  "Old version kept for rollback": 7,
};

const concepts = {
  CI: "Continuous Integration: automatically testing code on every push to catch bugs early",
  CD: "Continuous Deployment: automatically deploying code to production after tests pass",
  CDN: "Content Delivery Network: servers distributed globally to serve static files from the nearest location",
};

Object.entries(steps)
  .sort((a, b) => a[1] - b[1])
  .forEach(([step, order]) => {
    console.log(\`\${order}. \${step}\`);
  });

console.log("\\nConcepts:");
Object.entries(concepts).forEach(([key, val]) => {
  console.log(\`\${key}: \${val}\`);
});`,
          tests: [
            { description: "Push is step 1", check: "code.includes('push code to main\": 1') || code.includes('push code to main\":1')" },
            { description: "Webhook is step 2", check: "code.includes('webhook to Vercel\": 2') || code.includes('webhook to Vercel\":2')" },
            { description: "CI concept defined", check: "code.includes('CI:') && (code.includes('test') || code.includes('integrat'))" },
            { description: "CDN concept defined", check: "code.includes('CDN:') && (code.includes('server') || code.includes('deliver') || code.includes('distribut'))" }
          ]
        }
      },
      {
        id: "docker-basics",
        title: "Docker: Why 'It Works on My Machine' Is a Solved Problem",
        xp: 30,
        difficulty: "intermediate",
        hook: "Your teammate can't run the project because they have Node 18 and you have Node 20. Docker eliminates this entire class of problem.",
        concept: `Docker packages your application AND its entire environment into a container. A container is like a lightweight virtual machine — it has its own filesystem, its own installed packages, its own Node version. But unlike a VM, it shares the host's operating system kernel, making it fast and lightweight.

A Dockerfile is a recipe: "Start with Node 20 (FROM node:20). Copy my code (COPY . .). Install dependencies (RUN npm install). Run the app (CMD npm start)." Docker reads this recipe and creates an image — a snapshot of the complete environment. When you run that image, it becomes a container.

The real-world analogy: shipping containers revolutionized global trade because you don't care what's inside — the container is a standard size that fits on any ship, truck, or crane. Docker containers work the same way. Your app, with all its specific dependencies and configurations, fits in a standard container that runs on any machine with Docker installed. This is why every serious production deployment uses containers — from Vercel's build system to AWS to your company's servers.`,
        challenge: {
          instructions: "Write a Dockerfile for a Node.js/React app. Fill in each instruction with the correct Docker command.",
          starterCode: `// Write a Dockerfile for a Vite React app
const dockerfile = \`
# TODO: Start from Node 20 alpine image


# TODO: Set the working directory to /app


# TODO: Copy package.json and package-lock.json first (for caching)


# TODO: Install dependencies


# TODO: Copy the rest of the source code


# TODO: Build the production bundle


# TODO: Expose port 4173 (Vite preview default)


# TODO: Run the preview server

\`;

console.log(dockerfile);`,
          solution: `const dockerfile = \`
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]
\`;

console.log(dockerfile);`,
          tests: [
            { description: "Uses FROM for base image", check: "code.includes('FROM node')" },
            { description: "Sets WORKDIR", check: "code.includes('WORKDIR')" },
            { description: "Copies package.json first for layer caching", check: "code.includes('COPY package')" },
            { description: "Runs npm install", check: "code.includes('RUN npm install') || code.includes('RUN npm ci')" },
            { description: "Has EXPOSE and CMD", check: "code.includes('EXPOSE') && code.includes('CMD')" }
          ]
        }
      }
    ]
  },
  {
    id: "system-design",
    title: "System Design",
    color: "#B794F4",
    icon: "🏗️",
    lessons: [
      {
        id: "client-server",
        title: "Client-Server: The Architecture You Already Use",
        xp: 20,
        difficulty: "beginner",
        hook: "Every React + Supabase app you've built is a client-server application. Let's make sure you can explain why and draw the diagram.",
        concept: `The client-server model is the most fundamental architecture pattern on the web. Your React app is the client — it runs in the user's browser, handles UI, and makes requests. Supabase is the server (or rather, a collection of servers) — it stores data, enforces security, and responds to requests.

Why separate them? Three reasons. First, security: you can't trust client code. Anyone can open DevTools and modify your JavaScript. The server is the gatekeeper. Second, shared state: multiple users need to see the same data. The server is the single source of truth. Third, computation: some operations (like full-text search across millions of rows) are too expensive for a phone browser.

Here's the architecture of every Supabase app you've built: Browser → (HTTPS) → Supabase API Gateway → (routes to) → PostgREST (for DB queries) / GoTrue (for auth) / Realtime (for websockets) → PostgreSQL. When you call supabase.from('posts').select(), the JS client constructs an HTTP GET request, sends it to PostgREST, which translates it to SQL, runs it against Postgres (checking RLS), and returns JSON. Understanding these layers means you can debug at any level.`,
        challenge: {
          instructions: "Map each component of a React + Supabase app to its role in the client-server architecture.",
          starterCode: `// Classify each component as "client", "server", or "both"
// Then describe its primary responsibility in one sentence

const architecture = {
  "React components": {
    type: "",       // TODO: "client", "server", or "both"
    role: "",       // TODO: one sentence
  },
  "Supabase JS client library": {
    type: "",       // TODO
    role: "",       // TODO
  },
  "PostgREST": {
    type: "",       // TODO
    role: "",       // TODO
  },
  "Row Level Security": {
    type: "",       // TODO
    role: "",       // TODO
  },
  "localStorage": {
    type: "",       // TODO
    role: "",       // TODO
  },
  "PostgreSQL": {
    type: "",       // TODO
    role: "",       // TODO
  },
};

Object.entries(architecture).forEach(([name, info]) => {
  console.log(\`\${name} [\${info.type}]: \${info.role}\`);
});`,
          solution: `const architecture = {
  "React components": {
    type: "client",
    role: "Renders UI and handles user interactions in the browser",
  },
  "Supabase JS client library": {
    type: "client",
    role: "Constructs HTTP requests to the Supabase API from the browser",
  },
  "PostgREST": {
    type: "server",
    role: "Translates HTTP requests into SQL queries against PostgreSQL",
  },
  "Row Level Security": {
    type: "server",
    role: "Enforces per-user data access rules at the database level",
  },
  "localStorage": {
    type: "client",
    role: "Stores data persistently in the browser for offline/cache use",
  },
  "PostgreSQL": {
    type: "server",
    role: "Stores and queries all application data as the source of truth",
  },
};

Object.entries(architecture).forEach(([name, info]) => {
  console.log(\`\${name} [\${info.type}]: \${info.role}\`);
});`,
          tests: [
            { description: "React is client-side", check: "code.includes('\"client\"')" },
            { description: "PostgreSQL is server-side", check: "code.includes('\"server\"')" },
            { description: "All components classified", check: "(code.match(/type: \"/g) || []).length >= 6" },
            { description: "All roles described", check: "(code.match(/role: \"/g) || []).length >= 6" }
          ]
        }
      },
      {
        id: "databases-vs-caches",
        title: "Databases vs Caches: When to Store, When to Remember",
        xp: 30,
        difficulty: "intermediate",
        hook: "Your app fetches the same user profile on every page load. That's 50 identical database queries per session. A cache would turn that into 1.",
        concept: `A database is your source of truth — durable, persistent, reliable. If the server restarts, the data survives. A cache is a temporary, fast-access copy of data that you expect to need again soon. It trades durability for speed.

The mental model: a database is like a filing cabinet (organized, permanent, a bit slow to access). A cache is like the sticky notes on your monitor (fast to read, temporary, might fall off). You don't throw away the filing cabinet just because you have sticky notes. And you don't write everything on sticky notes.

In your React apps, you're already caching without realizing it. React state IS a cache — when you fetch data from Supabase and put it in useState, you've cached it. React Query/SWR make this explicit: they cache API responses, serve stale data while refetching, and invalidate when data changes. The browser itself caches too — HTTP cache headers tell it whether to re-request a resource or use the stored version. Understanding these layers means you can make your apps feel instant while keeping data fresh.`,
        challenge: {
          instructions: "Decide whether each scenario should use a database, a cache, or both. Explain your reasoning.",
          starterCode: `const scenarios = [
  {
    situation: "User profile data shown on every page",
    strategy: "",  // TODO: "database", "cache", or "both"
    reason: "",    // TODO: Why?
  },
  {
    situation: "E-commerce order history",
    strategy: "",  // TODO
    reason: "",    // TODO
  },
  {
    situation: "Live stock ticker prices",
    strategy: "",  // TODO
    reason: "",    // TODO
  },
  {
    situation: "User's theme preference (dark/light mode)",
    strategy: "",  // TODO
    reason: "",    // TODO
  },
  {
    situation: "Product search results for popular queries",
    strategy: "",  // TODO
    reason: "",    // TODO
  },
];

scenarios.forEach(s => {
  console.log(\`\\n\${s.situation}\\n→ \${s.strategy}: \${s.reason}\`);
});`,
          solution: `const scenarios = [
  {
    situation: "User profile data shown on every page",
    strategy: "both",
    reason: "Store in database as source of truth, cache in React state/localStorage to avoid refetching on every page",
  },
  {
    situation: "E-commerce order history",
    strategy: "database",
    reason: "Orders are critical business data that must be durable and consistent — caching is optional",
  },
  {
    situation: "Live stock ticker prices",
    strategy: "cache",
    reason: "Prices change constantly, old values are worthless — cache briefly and refresh frequently",
  },
  {
    situation: "User's theme preference (dark/light mode)",
    strategy: "both",
    reason: "Store in database for cross-device sync, cache in localStorage for instant application on page load",
  },
  {
    situation: "Product search results for popular queries",
    strategy: "both",
    reason: "Database has the full catalog, but caching popular search results reduces database load dramatically",
  },
];

scenarios.forEach(s => {
  console.log(\`\\n\${s.situation}\\n→ \${s.strategy}: \${s.reason}\`);
});`,
          tests: [
            { description: "User profile uses both", check: "code.includes('\"both\"')" },
            { description: "All strategies filled in", check: "(code.match(/strategy: \"/g) || []).length >= 5" },
            { description: "All reasons provided", check: "(code.match(/reason: \"/g) || []).length >= 5" },
            { description: "At least one 'database' only answer", check: "code.includes('\"database\"')" }
          ]
        }
      },
      {
        id: "rest-vs-graphql",
        title: "REST vs GraphQL: Two Ways to Talk to a Server",
        xp: 30,
        difficulty: "intermediate",
        hook: "Supabase gives you REST by default. But what if you could ask for exactly the data you need in one request, nothing more, nothing less? That's GraphQL's promise.",
        concept: `REST organizes your API around resources with standard HTTP methods. GET /users returns all users. GET /users/123 returns one user. POST /users creates one. Each endpoint returns a fixed data shape. If you need a user with their posts and comments, that's 3 separate requests (or one endpoint that returns everything, even fields you don't need).

GraphQL gives you one endpoint and lets you describe exactly what you want. "Give me user 123's name and email, their last 5 posts with titles, and the count of comments on each." One request. Exactly the data you need. No over-fetching (getting fields you don't use) or under-fetching (needing multiple requests).

So why isn't everyone using GraphQL? Because REST is simpler. Caching is built into HTTP for REST (GET requests are cacheable by default). GraphQL always uses POST, so caching requires extra work. REST is easier to learn, easier to debug (just curl a URL), and for most apps, the over-fetching problem is trivial. Supabase's query builder actually gives you some of GraphQL's benefits — you can select specific columns and nest related tables — while keeping REST's simplicity under the hood.`,
        challenge: {
          instructions: "Compare REST and GraphQL approaches for the same data requirements.",
          starterCode: `// Scenario: Build a dashboard showing:
// - User profile (name, avatar)
// - Their 5 most recent posts (title, date)
// - Unread notification count

// REST approach: How many requests?
const restApproach = {
  requests: [
    // TODO: List each API call needed
  ],
  totalRequests: 0, // TODO
  pros: "",  // TODO
  cons: "",  // TODO
};

// GraphQL approach: Write the query
const graphqlQuery = \`
  # TODO: Write a GraphQL query that gets all the data in one request
\`;

const graphqlApproach = {
  totalRequests: 0, // TODO
  pros: "",  // TODO
  cons: "",  // TODO
};

console.log("REST:", restApproach);
console.log("GraphQL query:", graphqlQuery);
console.log("GraphQL:", graphqlApproach);`,
          solution: `const restApproach = {
  requests: [
    "GET /api/users/me",
    "GET /api/users/me/posts?limit=5&sort=date:desc",
    "GET /api/notifications/unread/count",
  ],
  totalRequests: 3,
  pros: "Simple, cacheable, easy to debug with curl",
  cons: "Multiple round trips, may over-fetch user fields we don't need",
};

const graphqlQuery = \`
  query DashboardData {
    me {
      name
      avatar
      posts(limit: 5, orderBy: { date: DESC }) {
        title
        date
      }
      unreadNotificationCount
    }
  }
\`;

const graphqlApproach = {
  totalRequests: 1,
  pros: "Single request, exact data shape, no over-fetching",
  cons: "Harder to cache, more complex server setup, learning curve",
};

console.log("REST:", restApproach);
console.log("GraphQL query:", graphqlQuery);
console.log("GraphQL:", graphqlApproach);`,
          tests: [
            { description: "REST needs multiple requests", check: "code.includes('totalRequests: 3') || code.includes('totalRequests:3')" },
            { description: "GraphQL query is defined", check: "code.includes('query') && (code.includes('posts') || code.includes('Post'))" },
            { description: "GraphQL uses 1 request", check: "code.includes('totalRequests: 1') || code.includes('totalRequests:1')" },
            { description: "Both have pros and cons filled", check: "(code.match(/pros: \"/g) || []).length >= 2" }
          ]
        }
      }
    ]
  }
];

export const badges = [
  { id: "react-builder", name: "React Builder", icon: "⚛️", trackId: "frontend", description: "Completed Frontend Mastery track" },
  { id: "db-whisperer", name: "DB Whisperer", icon: "🗃️", trackId: "backend", description: "Completed Backend Fundamentals track" },
  { id: "algorithm-thinker", name: "Algorithm Thinker", icon: "🧠", trackId: "cs-fundamentals", description: "Completed CS Fundamentals track" },
  { id: "deploy-captain", name: "Deploy Captain", icon: "🚀", trackId: "devops", description: "Completed DevOps Essentials track" },
  { id: "architect", name: "System Architect", icon: "🏗️", trackId: "system-design", description: "Completed System Design track" },
];

export const levels = [
  { name: "Beginner", minXP: 0, maxXP: 500, color: "#68D391" },
  { name: "Intermediate", minXP: 500, maxXP: 2000, color: "#D4A853" },
  { name: "Advanced", minXP: 2000, maxXP: 5000, color: "#F56565" },
  { name: "Plena", minXP: 5000, maxXP: Infinity, color: "#B794F4" },
];
