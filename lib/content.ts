export const services = [
  {
    name: "Brand Strategy",
    short: "Find the position only you can own.",
    problem:
      "Good businesses can sound interchangeable. A clear position gives every decision a purpose.",
    approach:
      "We connect audience research with your ambition, then turn those insights into a practical direction for your brand.",
    deliverables: [
      "Audience and competitor research",
      "Positioning and brand narrative",
      "Messaging framework",
      "Brand voice guidelines",
    ],
  },
  {
    name: "Branding & Design",
    short: "Make recognition second nature.",
    problem:
      "An inconsistent identity makes even a great offer easy to overlook.",
    approach:
      "We build a visual language that feels like you and works wherever your audience meets your brand.",
    deliverables: [
      "Logo and identity system",
      "Typography and color direction",
      "Art direction and moodboards",
      "Campaign and social design",
      "Brand guidelines and templates",
    ],
  },
  {
    name: "Social Media Management",
    short: "Build a presence worth returning to.",
    problem:
      "Posting more is not a strategy. Your audience needs a reason to listen, respond, and return.",
    approach:
      "We define content pillars, plan a sustainable rhythm, and bring community feedback into every new cycle.",
    deliverables: [
      "Channel strategy and content pillars",
      "Monthly content calendars",
      "Community management",
      "Performance reporting",
    ],
  },
  {
    name: "Production & Photography",
    short: "Turn a good idea into a feeling.",
    problem:
      "Generic content disappears in the feed. Strong production makes your point unmistakable.",
    approach:
      "From a single shoot to a complete campaign, we develop the concept, plan the production, and shape assets for each channel.",
    deliverables: [
      "Creative concepts and storyboards",
      "Product, lifestyle, and campaign photography",
      "Brand films and shoot direction",
      "Short-form video and editing",
      "Platform-specific asset libraries",
    ],
  },
  {
    name: "Influencer Campaigns",
    short: "The right voices. A shared point of view.",
    problem: "Reach means little when a partnership does not feel credible.",
    approach:
      "We match creator communities to your audience and give collaborators a clear brief with room for their own voice.",
    deliverables: [
      "Creator research and shortlist",
      "Creator briefs and coordination",
      "Campaign content review",
      "Partnership performance reporting",
    ],
  },
  {
    name: "Performance Marketing",
    short: "Give your strongest ideas more room.",
    problem:
      "Media spend cannot fix an unclear message. Creative and targeting need to work together.",
    approach:
      "We build focused testing plans, adapt creative around audience signals, and report against the outcomes that matter to you.",
    deliverables: [
      "Paid social planning and audience mapping",
      "Ad creative and copy variants",
      "Testing and optimization",
      "Measurement and reporting",
    ],
  },
  { name: "Web Development", short: "A website that works as well as it looks.", problem: "A confusing or slow website turns interest into missed opportunities.", approach: "We plan clear user journeys, design responsive interfaces, and build around the actions your visitors need to take. Integrations and maintenance are agreed before development begins.", deliverables: ["Site structure and interactive prototypes", "Responsive website development", "CMS and agreed integrations", "Accessibility, performance testing, and launch handover"] },
  { name: "App Development", short: "Turn a useful idea into an everyday experience.", problem: "Too many features can hide the one thing your users came to do.", approach: "We define the core journey, test a prototype, and build an agreed first release. Together we choose the right platform and release plan for your audience.", deliverables: ["Product discovery and MVP scope", "UX flows and UI prototypes", "Web or mobile app development to an agreed scope", "Integration testing, release support, and documentation"] },
];
export const serviceGroups = [
  { name: "Brand", start: 0, end: 2, description: "Find your position and build an identity people remember." },
  { name: "Social", start: 2, end: 6, description: "Create content, grow your presence, and reach the right people." },
  { name: "Web / App", start: 6, end: 8, description: "Build digital experiences that turn interest into action." },
];
export type Project = {
  slug: string;
  brand: string;
  title: string;
  industry: string;
  tags: string[];
  color: string;
  ink: string;
  image?: string;
  description: string;
  challenge: string;
  insight: string;
  strategy: string;
  execution: string;
  measures: string[];
  timeline: string;
  phrase: string;
};
export const projects: Project[] = [
  {
    slug: "forma",
    brand: "FORMA",
    title: "Less noise. More presence.",
    industry: "Fashion",
    tags: ["Branding", "Campaigns", "Content"],
    color: "#b9b9b1",
    ink: "#111",
    image: "/images/forma.webp",
    description:
      "A contemporary fashion concept built around the confidence of doing less.",
    challenge:
      "Give a minimalist label a recognizable point of view without relying on decoration or trend-led messaging.",
    insight:
      "Style-conscious shoppers look for clothes that express confidence without asking for attention. They want to see how a piece moves through real life.",
    strategy:
      "Position FORMA around quiet presence. Lead with silhouette, material, and negative space, using a restrained identity that lets the collection speak.",
    execution:
      "A tightly spaced wordmark anchors the identity. Sculptural photography, cropped editorial layouts, and short motion studies create a consistent language across launch film, social, and campaign assets.",
    measures: [
      "Brand recognition in audience research",
      "Product-page visits from campaign content",
      "Saves and shares of editorial stories",
    ],
    timeline: "Illustrative plan: 8 weeks",
    phrase: "LESS NOISE.\nMORE PRESENCE.",
  },
  {
    slug: "orra",
    brand: "ORRA",
    title: "A brighter kind of everyday.",
    industry: "Beauty",
    tags: ["Branding", "Social Media", "Content"],
    color: "#d9e756",
    ink: "#1634b4",
    image: "/images/orra.webp",
    description:
      "Skincare with a sunny disposition and a refreshingly simple routine.",
    challenge:
      "Make a daily skincare range feel approachable in a category crowded with elaborate routines and clinical promises.",
    insight:
      "Routine-conscious buyers want clarity: what a product does, where it fits, and how it feels to use. More steps are not always more appealing.",
    strategy:
      "Build the brand around an optimistic daily ritual. Pair confident color with plain-language product education and tactile, sunlit imagery.",
    execution:
      "Cobalt and citrus packaging establish shelf recognition. A reusable social system balances ingredient explainers, routine demonstrations, and intimate product still lifes. Creator briefs emphasize real routines without unsupported efficacy claims.",
    measures: [
      "Comprehension of the product routine",
      "Saves on educational content",
      "Qualified product-page traffic",
    ],
    timeline: "Illustrative plan: 7 weeks",
    phrase: "YOUR DAILY\nBRIGHT SIDE.",
  },
  {
    slug: "daybreak",
    brand: "DAYBREAK",
    title: "Make a little room for morning.",
    industry: "Food & beverage",
    tags: ["Branding", "Campaigns", "Social Media"],
    color: "#d45b2f",
    ink: "#431c12",
    image: "/images/daybreak.webp",
    description:
      "An independent coffee concept that makes an everyday pause feel intentional.",
    challenge:
      "Give a coffee brand a distinct story beyond familiar language about origin and craft.",
    insight:
      "For many coffee drinkers, the ritual matters as much as the drink: a small, reliable moment before the day gets busy.",
    strategy:
      "Own the first pause of the day. Use warm, direct imagery and conversational copy to connect the product with an everyday ritual.",
    execution:
      "A bold packaging system brings the identity to the shelf. The launch campaign pairs morning still lifes with short ritual films, while social prompts invite people to share their own first pause.",
    measures: [
      "Campaign recall among intended buyers",
      "Engagement with ritual-led stories",
      "Traffic to stockist and product pages",
    ],
    timeline: "Illustrative plan: 6 weeks",
    phrase: "GOOD THINGS\nSTART SLOW.",
  },
  {
    slug: "pace",
    brand: "PACE",
    title: "Progress has your rhythm.",
    industry: "Fitness",
    tags: ["Campaigns", "Social Media"],
    color: "#d6ff3f",
    ink: "#17281d",
    description:
      "An inclusive fitness campaign centered on consistency over comparison.",
    challenge:
      "Move beyond elite-performance imagery to welcome people starting or rebuilding a movement habit.",
    insight:
      "People are more likely to return when progress feels personal and achievable.",
    strategy:
      "Celebrate repeatable effort with a flexible campaign system that puts individual rhythm first.",
    execution:
      "Oversized kinetic typography, weekly movement prompts, and creator-led routine stories make small wins visible. A modular social toolkit lets each story retain its own pace.",
    measures: [
      "Participation in weekly prompts",
      "Repeat engagement across the campaign",
      "Qualified membership inquiries",
    ],
    timeline: "Illustrative plan: 5 weeks",
    phrase: "YOUR PACE.\nYOUR PROGRESS.",
  },
  {
    slug: "index",
    brand: "INDEX",
    title: "Find your focus.",
    industry: "Technology",
    tags: ["Branding", "Content"],
    color: "#a5b8ee",
    ink: "#152447",
    description: "A clear, human identity for a digital workspace concept.",
    challenge:
      "Explain a productivity product without adding to the noise it promises to remove.",
    insight: "Busy teams need a clear next step, not another wall of features.",
    strategy:
      "Make clarity the organizing principle of identity, product storytelling, and launch content.",
    execution:
      "An orderly typographic system pairs concise product stories with direct use-case messaging. Launch content follows one task from scattered inputs to an actionable next step.",
    measures: [
      "Understanding of the core use case",
      "Visits to the product demonstration",
      "Qualified trial interest",
    ],
    timeline: "Illustrative plan: 6 weeks",
    phrase: "LESS FRICTION.\nMORE FOCUS.",
  },
  {
    slug: "still",
    brand: "STILL",
    title: "Space to just be.",
    industry: "Lifestyle",
    tags: ["Branding", "Social Media"],
    color: "#b87d65",
    ink: "#f8eee3",
    description:
      "A considered homeware identity for slower, more personal spaces.",
    challenge:
      "Create a warm homeware brand that avoids an impersonal showroom aesthetic.",
    insight:
      "The objects people keep often hold personal meaning beyond their function.",
    strategy:
      "Frame the collection around lived-in moments, combining careful typography with a conversational editorial voice.",
    execution:
      "A restrained identity system supports object stories, care notes, and room-by-room social features. The launch explores how one small object can change a daily ritual.",
    measures: [
      "Saves of styling and care content",
      "Product story completion",
      "Qualified collection-page traffic",
    ],
    timeline: "Illustrative plan: 7 weeks",
    phrase: "MAKE ROOM\nFOR STILL.",
  },
];
export const stages = [
  {
    name: "Discover",
    text: "We listen, ask better questions, and map your audience, ambition, and category.",
    output: "A shared brief and opportunity map.",
  },
  {
    name: "Strategize",
    text: "We choose the position, message, and creative direction that will guide the work.",
    output: "A strategy and a clear creative brief.",
  },
  {
    name: "Create",
    text: "We turn the direction into an identity, campaign, or content system, with focused review points.",
    output: "Finished assets and tools your team can use.",
  },
  {
    name: "Launch",
    text: "We bring the work to the right channels, with a clear message, audience, and rollout plan.",
    output: "A coordinated launch and a measurement framework.",
  },
  {
    name: "Scale",
    text: "We review what people respond to, test improvements, and use those findings to shape the next cycle.",
    output: "Performance insights and a prioritized plan for improvement.",
  },
];
