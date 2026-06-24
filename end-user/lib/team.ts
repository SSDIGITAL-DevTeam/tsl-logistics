export type TeamDepartment = "logistics" | "express" | "movers";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  department: TeamDepartment;
  photo?: string;
  intro: string;
  experience: string[];
  contributions: string[];
  card: {
    company: string;
    email: string;
    phone: string;
    website: string;
    address: string;
    mapQuery: string;
    socials: {
      facebook: string;
      instagram: string;
      linkedin: string;
    };
  };
};

export const departmentLabels: Record<TeamDepartment, string> = {
  logistics: "Logistics",
  express: "Express",
  movers: "Movers",
};

const commonCard = {
  company: "TSL Logistics Pte Ltd",
  phone: "+65 8888 0605",
  website: "www.tsllogistics.sg",
  address: "3 Kaki Bukit Rd 1, #02-01 Eunos Technolink, Singapore 415935",
  mapQuery: "TSL Logistics Pte Ltd, 3 Kaki Bukit Road 1, Singapore 415935",
  socials: {
    facebook: "https://www.facebook.com/tsllogistics.sg/",
    instagram: "https://www.instagram.com/tsllogistics.sg/",
    linkedin: "https://www.linkedin.com/company/tsl-logistics-pte-ltd/",
  },
};

export const teamMembers: TeamMember[] = [
  {
    slug: "alan-tay",
    name: "Alan Tay",
    role: "Managing Director (Founder) - Logistics",
    department: "logistics",
    photo: "/images/team/alan-tay.png",
    intro:
      "Founder and Managing Director of TSL Group, Alan Tay oversees corporate direction, partnerships, and the long-term service standards that shape TSL's logistics operations.",
    experience: [
      "End-to-end logistics and supply-chain management",
      "Fleet operations and transport optimization",
      "Business growth and strategic expansion",
      "Partnership and client relationship development",
    ],
    contributions: [
      "Built TSL into a trusted logistics brand in Singapore",
      "Developed service standards across delivery, warehousing, and transport",
      "Maintains long-term customer confidence through dependable operations",
    ],
    card: {
      ...commonCard,
      email: "alan@tsllogistics.sg",
    },
  },
  {
    slug: "shirley-goh",
    name: "Shirley Goh",
    role: "Senior Manager - Logistics",
    department: "logistics",
    photo: "/images/team/shirley-goh.png",
    intro:
      "Shirley supports TSL's logistics team with operational planning, customer coordination, and daily service consistency across transport and warehousing requests.",
    experience: [
      "Customer service and client communications",
      "Transport and warehousing coordination",
      "Documentation control and service follow-up",
      "Daily operational planning",
    ],
    contributions: [
      "Keeps communication clear between customers and operations",
      "Supports fast turnaround for logistics requests",
      "Helps maintain steady service quality across daily jobs",
    ],
    card: {
      ...commonCard,
      email: "shirley@tsllogistics.sg",
    },
  },
  {
    slug: "phillip-wong",
    name: "Phillip Wong",
    role: "Operation Manager - Logistics",
    department: "logistics",
    photo: "/images/team/phillip-wong.png",
    intro:
      "Phillip manages operational delivery for logistics jobs, making sure schedules, manpower, and transport resources move in the right order.",
    experience: [
      "Daily logistics and fleet planning",
      "Warehouse coordination",
      "Transport scheduling and dispatch",
      "Team supervision and route management",
    ],
    contributions: [
      "Improves planning between warehouse and transport teams",
      "Coordinates resources for time-sensitive deliveries",
      "Supports reliable dispatch and on-site execution",
    ],
    card: {
      ...commonCard,
      email: "phillip@tsllogistics.sg",
    },
  },
  {
    slug: "chia-weeliang",
    name: "Chia Weeliang",
    role: "Business Development Manager - Express",
    department: "express",
    photo: "/images/team/chia-weeliang.png",
    intro:
      "Chia focuses on express delivery opportunities, helping customers plan fast, practical delivery arrangements for urgent and recurring jobs.",
    experience: [
      "Express delivery and local dispatch coordination",
      "Customer onboarding and account support",
      "Logistics administration and delivery operations",
      "Transport partnership development",
    ],
    contributions: [
      "Develops express delivery relationships with new customers",
      "Matches urgent delivery needs with suitable resources",
      "Supports clear communication from enquiry to completion",
    ],
    card: {
      ...commonCard,
      email: "weeliang@tslexpress.sg",
    },
  },
  {
    slug: "patrick-wee",
    name: "Patrick Wee",
    role: "Managing Director - Movers",
    department: "movers",
    photo: "/images/team/patrick-wee.png",
    intro:
      "Patrick leads the TSL Movers team, overseeing moving services for residential, office, commercial, and specialized relocation projects.",
    experience: [
      "Residential, office, and commercial moving",
      "Furniture handling and relocation planning",
      "Customer coordination and moving quotations",
      "Crew planning and move-day supervision",
    ],
    contributions: [
      "Built a dependable moving service for varied customer needs",
      "Keeps relocation projects organized from enquiry to completion",
      "Focuses the team on careful handling and punctual execution",
    ],
    card: {
      ...commonCard,
      email: "patrick@tslmovers.sg",
    },
  },
  {
    slug: "spencer-tan",
    name: "Spencer Tan",
    role: "Business Development Manager - Movers",
    department: "movers",
    photo: "/images/team/spencer-tan.png",
    intro:
      "Spencer helps moving customers plan the right scope, manpower, and timing for residential and business relocations.",
    experience: [
      "Business development for moving projects",
      "Quotation preparation and customer follow-up",
      "Move planning for offices and homes",
      "Customer relationship management",
    ],
    contributions: [
      "Guides customers through practical moving plans",
      "Coordinates between sales enquiries and operations",
      "Supports responsive follow-up from quotation to move day",
    ],
    card: {
      ...commonCard,
      email: "spencer@tslmovers.sg",
    },
  },
];

export function getTeamMember(slug: string) {
  return teamMembers.find((member) => member.slug === slug);
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
