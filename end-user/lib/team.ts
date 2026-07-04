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
  company: "TSL LOGISTICS PTE LTD",
  phone: "+65 8688 8606",
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
    photo: "/images/alan-tay.jpg",
    intro:
      "Founder and Managing Director of TSL Group, with over 20 years of experience in the logistics industry. He began his career in courier services and has since built deep expertise across trucking, warehousing, and end-to-end supply chain operations, driving efficiency and reliability at every level.",
    experience: [
      "End-to-end logistics and supply chain management",
      "Fleet operations and transport optimization",
      "Business growth and strategic expansion",
      "Warehousing and distribution solutions",
    ],
    contributions: [
      "Alan has been instrumental in building TSL Group into a trusted logistics partner. His leadership drives operational excellence, scalable growth, and strong client relationships across Singapore and the region",
    ],
    card: {
      ...commonCard,
      email: "alan@tsllogistics.sg",
    },
  },
  {
    slug: "shirley-goh",
    name: "Shirley Goh",
    role: "Sales Manager - Logistics",
    department: "logistics",
    photo: "/images/shirley-goh.jpg",
    intro:
      "Started with TSL Logistics in 2018 without prior industry experience, driven by a strong willingness to learn. Gained hands-on experience across Sales, Customer Service, Accounts, and Operations, building a well-rounded understanding of logistics, client management, and operations. Brings a practical, adaptable approach backed by years of cross-functional experience.",
    experience: [
      "Versatile across sales, customer service, accounts, and operations",
      "Strong understanding of logistics processes and coordination",
      "Skilled in managing client relationships and service quality",
      "Adaptable with continuous growth from zero experience",
    ],
    contributions: [
      "Shirley contributes to smooth and efficient daily operations. She responds promptly to customer needs while maintaining strong client relationships. She supports sales activities and helps drive business growth. She collaborates effectively across teams to improve workflow efficiency, and remains flexible in handling multiple roles to strengthen team performance and reliability.",
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
      "Joined logistics industry in 2017 as an Operations Controller cum Customer Service, gaining extensive hands-on experience in operational coordination and client support. Over the years, has developed strong expertise in managing and optimizing trucking operations.",
    experience: [
      "End-to-end operations management and workflow optimization",
      "Customer service strategy and client relationship management",
      "Experienced in managing complex logistics operations with a focus on compliance and safety standards",
      "Performance management and team leadership",
    ],
    contributions: [
      "Drives operational efficiency by streamlining logistics processes and improving turnaround times. Enhances customer satisfaction through reliable delivery and proactive communication. Contributes to business growth by optimizing resources and supporting cost-effective logistics solutions.",
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
    photo: "/images/chia-weeliang.jpg",
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
    photo: "/images/spencer-tan.jpg",
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
