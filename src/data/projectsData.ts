
export interface Project {
  title: string;
  location: string;
  image: string;
  secondaryImage: string;
  additionalImages?: string[];
  type: string;
  size: string;
  year: string;
  description: string;
  client?: string;
}

export type ProjectsDataType = {
  [key: string]: Project;
};

const projectsData: ProjectsDataType = {
  'no66-residential-home': {
    title: 'No 66',
    location: 'Colombo, Sri Lanka',
    image: '/lovable-uploads/a8f75fe3-0fad-4614-9d8c-d42c8d0c3c23.png',
    secondaryImage: '/lovable-uploads/ac7f8633-1ad0-4120-abed-bca90d1e1f05.png',
    additionalImages: ['/lovable-uploads/53f914b8-8d39-4d18-882f-5e7f3609bd6c.png', '/lovable-uploads/18307451-b9dd-4802-9af5-7d7b1ec0ec44.png'],
    type: 'Residential House',
    size: '~1500 sqft',
    year: '2022',
    description: 'A modern residential home designed for warmth and flow. Natural wood finishes, open-concept living areas, and earthy tones lend a calm, grounded atmosphere. The house is crafted to harmonize indoor comfort with the surrounding greenery, offering a peaceful, everyday living experience.'
  },
  'highland-view-villa': {
    title: 'Highland View Villa',
    location: 'Weligama, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153058.png',
    additionalImages: ['/lovable-uploads/Screenshot 2025-05-01 153210.png'],
    type: 'Villa',
    size: '2000+ sqft',
    year: '2022',
    description: 'Perched with panoramic views of the hill country, this luxury villa blends contemporary design with natural textures. Expansive glass walls, earthy palettes, and curated interiors create a tranquil yet elevated experience. Ideal for short stays, long retreats, or premium getaways.'
  },
  'forest-edge-retreat': {
    title: 'Forest Edge Retreat',
    location: 'Knuckles, Sri Lanka',
    image: '/lovable-uploads/8152e265-4553-452a-b5e2-60219938a926.png',
    secondaryImage: '/lovable-uploads/365ff580-8bb9-48e2-ad90-144069bfad6d.png',
    additionalImages: [
      '/lovable-uploads/69ee228e-2645-4900-ad10-280f93663bb4.png',
      '/lovable-uploads/3df25f7a-ac8d-4a3f-b0ba-33737e7de958.png'
    ],
    type: 'Nature Retreat',
    size: '1530 sqft',
    year: '2022',
    description: 'Set deep within a lush forest canopy, this serene retreat was designed to create a sense of immersion in nature. Floor-to-ceiling glass panels, neutral tones, and minimalist décor ensure that the landscape takes center stage. Perfect for restful escapes and mindful getaways.'
  },
  'un-canteen': {
    title: 'Warm Minimalist Home Renovation',
    location: 'Wellawatta, Sri Lanka',
    image: '/lovable-uploads/wellawatta_Photo - 1.jpg',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Residential Renovation',
    size: '1200 sqft',
    year: '2021',
    description: 'A complete residential transformation designed with earthy palettes, modern lighting, and natural textures. This renovation created a cozy yet contemporary environment, ideal for urban living with a focus on open spaces and serene finishes.'
  },
  'united-nations-conference-hall': {
    title: 'Wellness Salon Interior',
    location: 'Colombo, Sri Lanka',
    image: '/lovable-uploads/593313ba-c2a0-49bd-8f4c-4767942a8756.png',
    secondaryImage: '/lovable-uploads/e1a82d9c-02b5-4c30-b9fa-804b56fbf50e.png',
    additionalImages: [
      '/lovable-uploads/f8e6cb45-4f88-42ab-abe8-92f7796b0cb9.png'
    ],
    type: 'Salon',
    size: '950 sqft',
    year: '2022',
    description: 'A thoughtfully designed salon space that balances luxury with comfort. Featuring soft lighting, arched walls, and curated details, the layout enhances the customer experience while maintaining a clean, professional atmosphere.'
  },
  'unops-office': {
    title: 'Collage Recreation Hub',
    location: 'Colombo, Sri Lanka',
    image: '/lovable-uploads/49cc3576-c5bb-470d-a960-23ef613e5057.png',
    secondaryImage: '/lovable-uploads/419a0089-28fc-420e-8a24-63f1f742b64f.png',
    additionalImages: ['/lovable-uploads/ad4b9dd6-5c38-4142-9b52-b8249d4313aa.png'],
    type: 'Campus Recreation Area / Showroom Renovation',
    size: '1200 sqft',
    year: '2023',
    description: 'An exciting renovation of the former Lamborghini showroom, this vibrant campus-style recreational space blends bold design with function. Featuring tiered seating, playful lighting, gaming areas, and tropical accents, it\'s built to energize and engage the next generation of students.'
  },
  'who-health-corner': {
    title: 'Model Health Corner',
    location: 'Colombo 05, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Health Facility',
    size: '500sqft',
    year: '2021',
    description: 'A model health corner designed to showcase best practices in health facility design and management.',
    client: 'United Nations World Health Organization (WHO)'
  },
  'un-communications-office': {
    title: 'Resident Coordinator\'s Communication\'s Office',
    location: 'UN Compound, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Office Space',
    size: '450sqft',
    year: '2022',
    description: 'A specialized office designed for the communications team of the UN Resident Coordinator in Sri Lanka.',
    client: 'United Nations'
  },
  'un-library-corner': {
    title: 'UN Library Corner',
    location: 'Colombo Public Library, Colombo 07, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Library',
    size: '350sqft',
    year: '2021',
    description: 'A dedicated corner in the Colombo Public Library designed to house UN publications and resources.',
    client: 'United Nations'
  },
  'ilo-office': {
    title: 'Office',
    location: 'UN Compound, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Office Space',
    size: '700sqft',
    year: '2022',
    description: 'An office space designed for the International Labour Organization team in Sri Lanka.',
    client: 'United Nations International Labour Organization (ILO)'
  },
  'unv-youth-corner': {
    title: 'Youth Corner',
    location: 'UN Compound, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Youth Space',
    size: '400sqft',
    year: '2021',
    description: 'A dedicated space for young volunteers and youth engagement activities within the UN compound.',
    client: 'United Nations Volunteers (UNV)'
  },
  'usaid-office': {
    title: 'Chemonics Office',
    location: 'One Galle Face Tower, Colombo 03, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Office Space',
    size: '850sqft',
    year: '2022',
    description: 'A functional office space designed for the USAID Sri Lanka Energy Program, focused on functionality and collaborative work.',
    client: 'US AID Sri Lanka Energy Program'
  },
  'hsbc-nursing-room': {
    title: 'Nursing Room for Staff',
    location: 'Global Service Center, Rajagiriya, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Specialized Room',
    size: '200sqft',
    year: '2021',
    description: 'A comfortable nursing room designed for HSBC staff at their Global Service Center.',
    client: 'HSBC'
  },
  'target-pack-office': {
    title: 'Factory Container Office',
    location: 'Ratmalana, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Container Office',
    size: '320sqft',
    year: '2020',
    description: 'An innovative office space created within a shipping container for the Target Pack factory.',
    client: 'Target Pack'
  },
  'future-i-wmm': {
    title: 'W. M. Mendis & Co. Limited Reception & Lounge Area',
    location: 'Welisara, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Reception & Lounge',
    size: '600sqft',
    year: '2021',
    description: 'A sophisticated reception and lounge area designed for W. M. Mendis & Co. Limited.',
    client: 'Future-i'
  },
  'hopper-island-office': {
    title: 'Office',
    location: 'Dehiwala, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Office Space',
    size: '450sqft',
    year: '2021',
    description: 'A modern office space designed for The Hopper Island, combining functionality with aesthetic appeal.',
    client: 'The Hopper Island'
  },
  'bright-panda-office': {
    title: 'Office',
    location: 'Colombo 08, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Office Space',
    size: '500sqft',
    year: '2020',
    description: 'A functional office space designed for Bright Panda Consultants, focused on ergonomics and productivity.',
    client: 'Bright Panda Consultants'
  },
  'vista-engineering-office': {
    title: 'Office',
    location: 'Boralesgamuwa, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Office Space',
    size: '430sqft',
    year: '2021',
    description: 'An office space designed for Vista Engineering, with a focus on technical functionality and client presentation.',
    client: 'Vista Engineering'
  },
  'future-i-hutch': {
    title: 'Hutch Customer Information Container Pod',
    location: 'Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Container Pod',
    size: '200sqft',
    year: '2020',
    description: 'A custom-designed container pod for Hutch customer information services.',
    client: 'Future-i'
  },
  'packages-lanka': {
    title: 'Reception, Visitor Lounge, Boardroom & Visitor Prep Room',
    location: 'Ekala, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Corporate Space',
    size: '800sqft',
    year: '2021',
    description: 'A complete redesign of the client-facing areas of Packages Lanka, including reception, lounge, boardroom, and visitor prep areas.',
    client: 'Packages Lanka'
  },
  // Commercial Projects
  'alankara-jewellery-1': {
    title: 'Factory Showroom',
    location: 'Ratmalana, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Showroom',
    size: '550sqft',
    year: '2020',
    description: 'A jewellery showroom designed within a factory setting, creating an elegant retail space for Alankara Jewellery.',
    client: 'Alankara Jewellery'
  },
  'alankara-jewellery-2': {
    title: 'Factory Showroom',
    location: 'Ratmalana, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Showroom',
    size: '550sqft',
    year: '2021',
    description: 'A second jewellery showroom for Alankara Jewellery, with updated design elements and improved customer experience.',
    client: 'Alankara Jewellery'
  },
  'fhix45-gym': {
    title: 'Gym',
    location: 'Kollupitiya, Colombo 03, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Fitness Center',
    size: '1200sqft',
    year: '2021',
    description: 'A modern fitness center designed for FHIX45, focusing on functionality and an energetic atmosphere.',
    client: 'FHIX45'
  },
  'beyond-beauty-salon': {
    title: 'Salon',
    location: 'Kandana, Sri Lanka',
    image: '/lovable-uploads/0c2291eb-05da-4f0e-83a1-239a723f73bc.png',
    secondaryImage: '/lovable-uploads/0c2291eb-05da-4f0e-83a1-239a723f73bc.png',
    type: 'Salon',
    size: '680sqft',
    year: '2021',
    description: 'A contemporary salon space designed with functionality and aesthetic appeal in mind. The project focused on creating an inviting atmosphere for clients while ensuring an efficient workflow for the stylists.',
    client: 'Beyond Beauty'
  },
  'zelen-leisure-wilpattu': {
    title: 'Wilpattu Tents Restaurant, Single/Double & Triple/Quad Tents',
    location: 'Wilpattu, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Restaurant & Accommodation',
    size: '2000sqft',
    year: '2022',
    description: 'A unique project designing tented accommodation and dining facilities near Wilpattu National Park.',
    client: 'Zelen Leisure (Pvt) Ltd'
  },
  'cit-cafe': {
    title: 'Ground Floor Cafe',
    location: 'Bambalapitiya, Colombo 04, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Cafe',
    size: '750sqft',
    year: '2021',
    description: 'A contemporary cafe designed for the ground floor of the Colombo Innovation Tower, catering to creative professionals and visitors.',
    client: 'Colombo Innovation Tower (CIT)'
  },
  'fish-and-chips': {
    title: 'Restaurant',
    location: 'Kollupitiya, Colombo 03, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Restaurant',
    size: '900sqft',
    year: '2020',
    description: 'A themed restaurant for Fish & Chips, combining modern design elements with a nautical atmosphere.',
    client: 'Fish & Chips'
  },
  'jat-holdings-stall': {
    title: 'JAT Holdings Stall',
    location: 'Sri Lanka Design Festival',
    image: '/lovable-uploads/3d7d20eb-2db2-4eb3-b421-1226384fbe4e.png',
    secondaryImage: '/lovable-uploads/43c77f58-07c0-407c-9983-cb31dc70d974.png',
    type: 'Exhibition Stall',
    size: '580sqft',
    year: '2016',
    description: 'An exhibition stall that was a 3D mock-up of the concept and sketch drawing given to me. The project was done during internship at JAT Holdings (Private) Limited in 2016. The layout was done in a way which differentiated each area, from outdoor to an indoor lounge and bar counter and to an office setup.',
  },
  'aviation-voice': {
    title: 'Aviation Voice',
    location: 'Nugegoda',
    image: '/lovable-uploads/ae66ff19-b00d-48e9-9e04-e2c8e4ed1eb9.png',
    secondaryImage: '/lovable-uploads/15449c9f-314c-4587-b2e3-26942516db03.png',
    type: 'Office Space',
    size: '470sqft',
    year: '2018',
    description: "One of the most challenging projects, which required maximum use of the very limited space given. Being the first project I undertook, while in my second year at college, it was a great project to have tested all my skills right from the very beginning. Although the project may not have been built due to further expansion of the company, it was a great way to start off my professional career. The client wanted a space that's bright and colourful and the inspiration was taken from one of their very own magazines.",
  },
  'bella-hair-designs': {
    title: 'Bella Hair Designs',
    location: 'Kandana',
    image: '/lovable-uploads/0c2291eb-05da-4f0e-83a1-239a723f73bc.png',
    secondaryImage: '/lovable-uploads/0c2291eb-05da-4f0e-83a1-239a723f73bc.png',
    type: 'Salon',
    size: '680sqft',
    year: '2021',
    description: 'A contemporary salon space designed with functionality and aesthetic appeal in mind. The project focused on creating an inviting atmosphere for clients while ensuring an efficient workflow for the stylists.',
  },
  'matara-convent': {
    title: 'Primary School Public Auditorium',
    location: 'Matara, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Educational Space',
    size: '1500sqft',
    year: '2020',
    description: 'A public auditorium designed for a primary school, with focus on accommodating school functions and community events.',
    client: 'Matara Convent'
  },
  'food-web': {
    title: 'Restaurant',
    location: 'Mattakuliya, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Restaurant',
    size: '850sqft',
    year: '2021',
    description: 'A contemporary restaurant space with modern design elements focusing on creating a welcoming dining experience.',
    client: 'Food Web'
  },
  'fibaro': {
    title: 'Showroom Space',
    location: 'Pitakotte, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Showroom',
    size: '700sqft',
    year: '2021',
    description: 'A modern showroom designed to showcase smart home technology products in an interactive environment.',
    client: 'Fibaro'
  },
  'the-cuisine': {
    title: 'Restaurant',
    location: 'Colombo 07, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Restaurant',
    size: '950sqft',
    year: '2020',
    description: 'An elegantly designed restaurant space focusing on creating a comfortable and sophisticated dining experience.',
    client: 'The Cuisine'
  },
  'ard-holdings': {
    title: 'Car Park',
    location: 'CR & FC, Colombo 07, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Car Park',
    size: '3000sqft',
    year: '2022',
    description: 'A functional and efficient car park design for a sports club, with careful consideration of traffic flow and space optimization.',
    client: 'ARD Holdings (Pvt) Ltd'
  },
  'sense-micro': {
    title: 'Sense.lk Showroom 01',
    location: 'Ground Floor - Unity Plaza, Colombo 04, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Showroom',
    size: '650sqft',
    year: '2021',
    description: 'A modern retail showroom designed to display and showcase electronic products in an engaging environment.',
    client: 'Sense Micro Distributions'
  },
  'future-i-dimo': {
    title: 'DIMO Flagship Store',
    location: 'Pannipitiya, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Retail Store',
    size: '1200sqft',
    year: '2022',
    description: 'A flagship store designed to showcase the DIMO brand and products in a premium retail environment.',
    client: 'Future-i'
  },
  'future-i-elephant': {
    title: 'Elephant House Vendor Container Stall',
    location: 'Arcade Independence Square, Colombo 07, Sri Lanka',
    image: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    secondaryImage: '/lovable-uploads/Screenshot 2025-05-01 153023.png',
    type: 'Container Stall',
    size: '250sqft',
    year: '2021',
    description: 'An innovative container stall designed for Elephant House, situated in a prime location at Arcade Independence Square.',
    client: 'Future-i'
  },
};

export default projectsData;
