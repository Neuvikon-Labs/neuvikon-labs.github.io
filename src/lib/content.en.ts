import type { About, Careers, Division, Org, ProjectStatus } from "./content";
import { TODO_EN } from "./i18n";

/**
 * İngilizce içerik.
 *
 * `content.ts` Türkçe kaynağın aynısı — aynı projeler, aynı sıra, aynı
 * alanlar. Çeviri değil, yeniden yazım: birebir çevrilen Türkçe pazarlama
 * metni İngilizcede tuhaf duruyor.
 *
 * ⚠️ Türkçe tarafa bir proje eklendiğinde buraya da eklenmeli. İki dosya
 * ayrı durduğu için derleyici bunu yakalamıyor; `content.test` yok, gözle
 * kontrol gerekiyor.
 */

export const orgEn: Org = {
  name: "Neuvikon",
  tagline: "An independent technology studio working in software, games and robotics.",
  description:
    "Neuvikon is an independent technology studio working across product " +
    "development, mobile games and embedded systems. We design, build and " +
    "ship the work in our three divisions end to end, in house.",
  email: "neuvikon@gmail.com",
  year: 2026,
};

export const divisionsEn: Division[] = [
  {
    slug: "games",
    name: "Neuvikon Games",
    short: "Games",
    tagline: "Mobile games — multiplayer, and the kind you finish in one sitting.",
    image: "/apps/pushbump.png",
    intro:
      "Games builds short-session mobile games that take seconds to learn and " +
      "a long time to master. Every stage happens inside the studio: design, " +
      "networking, art and store release.",
    capabilities: [
      "Mobile game development in Unity 6 — URP 2D, Input System",
      "Multiplayer architecture — Netcode for GameObjects, Mirror, Unity Relay",
      "Mobile games in React Native + Expo, with Firestore room sync",
      "Procedural art and audio; interfaces built in code",
      "Server-authoritative rule engines, matchmaking and MMR/ELO",
      "Accessibility, two languages (TR/EN) and store release pipelines",
    ],
    projects: [
      {
        name: "PushBump",
        tagline: "Tilt, charge, release. One shove changes everything.",
        description:
          "An online multiplayer mobile arena game. You move by tilting the " +
          "phone, then charge a shot and let it go. Characters with their own " +
          "weapons and abilities, four arenas, a bot mode and a defence mode.",
        status: "gelistirme",
        tags: ["Unity", "Mirror", "Android", "Multiplayer"],
        image: "/apps/pushbump.png",
      },
      {
        name: "Neu-Pummel Party",
        tagline: "Two to eight phones, thirty minigames, one room.",
        description:
          "A party game played on phones. One person hosts, everyone else " +
          "joins from a list on the same Wi-Fi — no IP addresses, no accounts; " +
          "a six-digit room code covers play over the internet. Each round " +
          "pulls one of thirty minigames, and every game has three arena " +
          "variants and its own bot AI. There is not a single binary art " +
          "asset in the repository: all visuals and sound are generated in " +
          "code at runtime. Team mode, Grand Prix, a colour-blind palette and " +
          "reduced motion are built in; no ads and no in-app purchases.",
        status: "gelistirme",
        tags: ["Unity 6", "Netcode for GameObjects", "Android", "2-8 players"],
        image: "/apps/neuparty.png",
      },
      {
        name: "UnderCard",
        tagline: "Call it when your hand is lowest. Be wrong and you lose.",
        description:
          "A real-time multiplayer mobile card game in the Cabo family. Two " +
          "to eight players join with a four-digit room code or an invite " +
          "link, and room state syncs through Firestore. Bots at three " +
          "difficulties, a fully offline single-player mode, reconnection, " +
          "ability and event cards, three themes and two languages.",
        status: "gelistirme",
        tags: ["React Native", "Expo", "Firebase", "2-8 players"],
        image: "/apps/undercard.png",
      },
      {
        name: "EdgeOut",
        tagline: "Push six of your opponent's marbles off the board.",
        description:
          "Competitive online push strategy on a hexagonal board, using the " +
          "Abalone rule set. Client and server share the same rule engine: " +
          "the client previews a move instantly, the server validates it and " +
          "broadcasts the result — so previews feel immediate while cheating " +
          "still hits the server wall. An MMR-windowed matchmaking queue, a " +
          "rank ladder, turn timers, a reconnect grace period and a practice bot.",
        status: "gelistirme",
        tags: ["TypeScript", "Node.js", "WebSocket", "Multiplayer"],
        image: "/apps/edgeout.png",
      },
      {
        name: "GuessFast",
        tagline: "Find the number. Find it fast.",
        description:
          "A number-guessing game. Every guess narrows the range; what counts " +
          "is not how many tries you needed but how long you took.",
        status: "yayinda",
        tags: ["React Native", "Expo", "Android", "Puzzle"],
        image: "/apps/guessfast.png",
        links: [
          {
            label: "Google Play",
            href: "https://play.google.com/store/apps/details?id=com.scientist001.GuessFast",
          },
          {
            label: "App Store",
            href: "https://apps.apple.com/ng/app/guessfast/id6758861605",
          },
        ],
      },
      {
        name: "Card Wars",
        tagline: "Lane-based card combat, 1v1 or 2v2.",
        description:
          "A lane-based card battler. The game bootstraps itself at launch — " +
          "it runs even in an empty scene, so a corrupted scene file cannot " +
          "take the game down and everything stays as text under version " +
          "control. In 2v2 each player faces exactly one opponent and a team " +
          "only loses once every member is down, which makes keeping your " +
          "ally alive a real decision.",
        status: "gelistirme",
        tags: ["Unity 6", "Card game", "2v2"],
      },
      {
        name: "Today's Word",
        /* ⚠️ Metin geçici; görsel oyunun kendi ikonu. */
        tagline: "The word of the day.",
        description:
          "A word puzzle game. Still in design; the rules and screenshots "
          + "will be added once it is ready to show.",
        image: "/apps/todays-word.jpg",
        status: "gelistirme",
        tags: ["Word game"],
      },
      {
        name: "Timber Supply & Co",
        /* ⚠️ Geçici: ad ve etiketten çıkarılmış, doğrulanmamış metin. */
        tagline: "Cut it, haul it, sell it — the whole chain is yours.",
        description:
          "A management game built on a timber supply chain. Details will be "
          + "added once it is ready to show.",
        image: "/apps/timber-supply.png",
        status: "gelistirme",
        tags: ["Management"],
      },
      {
        name: "Muavin-Sim",
        /* ⚠️ Geçici: ad ve etiketten çıkarılmış, doğrulanmamış metin. */
        tagline: "You are not at the wheel — you are at the door.",
        description:
          "A simulation game about working as a bus conductor. Details will "
          + "be added once it is ready to show.",
        image: "/apps/muavin-sim.png",
        status: "gelistirme",
        tags: ["Simulation"],
      },
      {
        name: "Duskfield",
        /* ⚠️ Geçici: ad ve etiketten çıkarılmış, doğrulanmamış metin. */
        tagline: "A world set at dusk.",
        description:
          "The backend is being written in Bun. Details about the game itself " +
          "will be added when it is ready to show.",
        image: "/apps/duskfield.png",
        status: "gelistirme",
        tags: ["Bun", "TypeScript"],
      },
    ],
  },
  {
    slug: "tech",
    name: "Neuvikon Tech",
    short: "Tech",
    tagline: "Web and mobile products, and the backend under them.",
    image: "/apps/eclosion.png",
    intro:
      "On the Tech side we take on the whole product: interface, server, data " +
      "and deployment. Because the team is small we cap complexity early and " +
      "prefer shipping something that works over something that is complete.",
    capabilities: [
      "Web applications — TypeScript, React, Next.js, Angular",
      "Mobile applications — React Native, Expo",
      "Backend and real-time services — Node.js, Bun, Firebase",
      "Data collection, scoring and report generation — Python",
      "Computer vision and gesture interaction",
      "CI/CD, release management and store submission",
    ],
    projects: [
      {
        name: "Neuvikon Web",
        tagline: "This site.",
        description:
          "A static company site built with the Next.js App Router, " +
          "TypeScript and Tailwind. All content comes from a single data file.",
        status: "gelistirme",
        tags: ["Next.js", "TypeScript", "Tailwind"],
      },
      {
        name: "Neu-Source",
        tagline: "Which ticket the agent is on, and what it spent.",
        description:
          "An internal platform written in Next.js and TypeScript. The " +
          "`neuvikon` CLI connects to it and reports which ticket a coding " +
          "agent is working on and how many tokens it spent.",
        status: "yayinda",
        tags: ["Next.js", "TypeScript"],
        links: [{ label: "neuvikon.space", href: "https://www.neuvikon.space/" }],
      },
      {
        name: "Neu-Chat",
        /* ⚠️ Geçici: ad ve etiketten çıkarılmış, doğrulanmamış metin. */
        tagline: "The studio's own chat layer.",
        description:
          "A chat application. Details will be added once it is ready to show.",
        image: "/apps/neu-chat.png",
        status: "gelistirme",
        tags: ["Chat"],
      },
      {
        name: "Eclosion",
        tagline: "Grow in six areas at once.",
        description:
          "A habit tracker. It follows six areas of personal development " +
          "separately; progress accumulates as long as the daily streak holds.",
        status: "gelistirme",
        tags: ["React Native", "Expo", "Habit tracking"],
        image: "/apps/eclosion.png",
      },
    ],
  },
  {
    slug: "robotics",
    name: "Neuvikon Robotics",
    short: "Robotics",
    tagline: "Embedded systems, autonomous robots and hardware prototypes.",
    intro:
      "Robotics works where hardware meets software: systems that read " +
      "sensors, decide, and then do something in the physical world. The " +
      "focus is on shortening the road from prototype to working device.",
    capabilities: [
      "Embedded software — ESP32 / ESP32-S3, C++, FreeRTOS",
      "Sensor fusion and control loops — IMU, compass, ToF",
      "Device-to-cloud and device-to-desktop links — WebSocket, BLE, USB HID",
      "Over-the-air firmware updates and modular firmware architecture",
      "ROS 2 / Gazebo simulation, motion planning and navigation",
      "Kinematic analysis and workspace visualisation",
    ],
    projects: [],
  },
];

export const statusLabelEn: Record<ProjectStatus, string> = {
  yayinda: "Released",
  gelistirme: "In development",
  taslak: "In preparation",
};

export const aboutEn: About = {
  lead:
    "Neuvikon is an independent technology studio. We prefer to own a piece " +
    "of work from end to end: design, software, infrastructure and release " +
    "come from the same hands. That is why we run few things at a time and " +
    "try to actually finish each one.",
  principles: [
    {
      title: "End to end, in house",
      body:
        "From game design to the network layer, from circuit diagram to store " +
        "release, every stage happens inside the studio. Even when we hand " +
        "work out, the architectural decision stays with us.",
    },
    {
      title: "The server is the authority",
      body:
        "In our multiplayer work the client only sends intent; the server " +
        "runs the rules and broadcasts the result. The same rule engine also " +
        "runs on the client, so players feel no latency — but cheating never " +
        "gets past the server wall.",
    },
    {
      title: "Trust the source, not the file",
      body:
        "Our projects bootstrap themselves at launch; nothing is wired into a " +
        "scene by hand. A corrupted binary asset cannot take the system down, " +
        "and everything stays as text under version control.",
    },
    {
      title: "Accessibility is not bolted on",
      body:
        "A colour-blind palette, a shape paired with every player colour, " +
        "text sizing, reduced motion and a left-handed mode are in the first " +
        "release. Accessibility left for later never arrives.",
    },
    {
      title: "Attention is not for sale",
      body:
        "There are no ads and no in-app purchases in our games. Making a game " +
        "good is a more sustainable goal than making money by getting in the " +
        "player's way.",
    },
  ],
  facts: [
    { label: "Founded", value: TODO_EN },
    { label: "Location", value: TODO_EN },
    { label: "Team", value: TODO_EN },
    { label: "Divisions", value: "3" },
  ],
};

export const careersEn: Careers = {
  lead:
    "There are no open positions right now. If you still want to work " +
    "together, write to us: a short email naming the division you care about " +
    "and one thing you actually finished is enough.",
  openings: [],
  interests: [
    "Unity and multiplayer network architecture",
    "Mobile products in React Native / Expo",
    "Embedded software — ESP32, sensor fusion",
    "Game and interface design",
  ],
};
