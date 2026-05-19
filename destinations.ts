export const destinations = [
  {
    id: 1,
    name: 'Gunung Mulu National Park',
    region: 'Miri Division',
    activity: 'Adventure & Hiking',
    category: 'Adventure',
    season: 'Dry Season (April-Oct)',
    location: 'Miri, Sarawak',
    rating: '4.9 (12.4k reviews)',
    description: "Explore the world's largest cave chambers and the razor-sharp limestone pinnacles. A true masterpiece of nature's architecture.",
    overview: "Mulu is not just about its famous caves; it's a biodiverse wonderland. The park features massive mountain ranges, deep canyons, and rushing rivers. It is home to thousands of species of plants and animals, many of which are endemic to Borneo.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTkIc9MdGA9HOI6P1LZc4D_YgDiIkSKEJzXVY3mZWGmWBl3SXdhUMnQ19p9-zh6YyYlPgah_ZN0NG2m2a2CMea7MNMRcqKll8K723f_hmu9LmTFEbyzooBZTAR49MXXaIgKLf-uiptP5BMCoEsuagqIINstis10yYADDaZCJHFiBBi4wrbrA5jfxz7wZmF-g9KsAub1cznBJpdoQRdfEHZoleMeUBtkbx56deQEM4uy8NfKYgXFWGmHzosagx1kJSf4SscdETVxoY',
    tags: ['UNESCO World Heritage', 'Adventure'],
    featured: true,
    activities: [
      { name: 'Deer Cave & Bats', description: 'Witness the spectacular evening bat exodus from one of the world\'s largest cave passages.' },
      { name: 'Pinnacles Trek', description: 'A challenging hike to see spectacular limestone needles rising 45m out of the forest.' },
      { name: 'Clearwater Cave', description: 'Take a longboat upriver to explore one of Southeast Asia\'s longest river cave systems.' }
    ],
    officialWebsite: 'https://mulupark.com/'
  },
  {
    id: 2,
    name: 'Kuching Waterfront',
    category: 'Kuching Heritage',
    region: 'Kuching Division',
    activity: 'Culture & Heritage',
    season: 'Any Time',
    location: 'Kuching, Sarawak',
    rating: '4.7 (8.2k reviews)',
    description: 'A scenic esplanade perfect for evening strolls, offering stunning views of heritage buildings and river life.',
    overview: 'The Kuching Waterfront is the most popular gathering place in the city. The esplanade is landscaped with sculptures, fountains, and restored heritage buildings, providing a beautiful walk along the Sarawak River.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW3X2TE2dhJrsrOZcOz8-yNd4e_oXGpUAao7ATvKEQHl_Z3hB35cOnvS2omj81rU2xiZ2W39t0U6sQvHv_RTYKUI0GtUYQDbq_0i9bh1ohdtc2KbB3iExRFZ8Jc9Wxean1LieM0cdXlAiJD-sTtYkI0jGqrJVrIYOA1OoWZy7kkHCSaqpO2YeKqmC6u4RbkyN_Bq_n9Dhyg5lmGcp8OBhx1fqkwLnzKNwDPmWCvzSK968MhagcuB4n0KFTBHN8acUMmyF9d9t6e6M',
    tags: ['Heritage', 'City'],
    activities: [
      { name: 'River Cruise', description: 'Take a traditional sampan or a modern cruise boat to see the city from the water.' },
      { name: 'Food Stalls', description: 'Enjoy local Sarawakian snacks like Layer Cake and Laksa from the various stalls.' },
      { name: 'Sunset Watch', description: 'The waterfront offers some of the best sunset views in Kuching behind the Parliament building.' }
    ]
  },
  {
    id: 3,
    name: 'Bako National Park',
    category: 'Wildlife & Trekking',
    region: 'Kuching Division',
    activity: 'Wildlife Spotting',
    season: 'Dry Season (April-Oct)',
    location: 'Kuching, Sarawak',
    rating: '4.8 (5.1k reviews)',
    description: "Sarawak's oldest national park, home to the rare proboscis monkeys and stunning sandstone sea stacks.",
    overview: "Bako contains almost every type of vegetation found in Borneo. Its well-maintained trails offer everything from easy walks to challenging full-day treks through jungle and along spectacular coastline.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIRxRQ3bLqHA6_g6Qj4CimYyxK2knCg4tyTEyjJh4lr22FyCFPBJTRUpZ_2ftMrSMAWIiYq3BXroUehR_-UTvZcdcJyOzYJMh1jaRA8x2Fv20bQ_d36u_x4_NHKqbLEXNH_I4A96U2rrDeYv-1QNkLowmvJa2o25msEm3lbqqh6QTlT3Ph1SAfc8qk0e2FaUTEeLU4SuYWTf_tUSGz4fsDNgTA32DVrlfWhTb-rzWDC87gD7tQHRR6PPCk6iNZeT2Z9nE3xOAPSLQ',
    tags: ['Day Trip', 'Guided'],
    activities: [
      { name: 'Wildlife Trekking', description: 'Spot proboscis monkeys, silver leaf monkeys, and wild boars.' },
      { name: 'Sea Stacks', description: 'Take a boat to see the iconic sandstone sea stacks carved by the waves.' },
      { name: 'Night Walk', description: 'Experience the rainforest at night and spot nocturnal creatures with a guide.' }
    ]
  },
  {
    id: 4,
    name: 'Sarawak Cultural Village',
    category: 'Kuching Heritage',
    region: 'Kuching Division',
    activity: 'Culture & Heritage',
    season: 'Festive Season (June)',
    location: 'Santubong, Sarawak',
    rating: '4.6 (6.8k reviews)',
    description: 'The "Living Museum" showcasing the diverse ethnic groups of Sarawak through traditional longhouses.',
    overview: "Located at the base of Mount Santubong, the Cultural Village is a must-visit to understand the rich heritage and traditions of Sarawak's many indigenous tribes.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDffW8yJMAT0w1S2THZhpA4RIs0PPlV909w77emD7lVX0wxoM1BiYQu84ElxIdmRDLTc1-6Av3cEF-g7ZRYqT28VsU138HGwoHRTZ8dCVIDmn0z0uzGXJBvp8tAJx8voKcfMY6iSsAUK5EZ1Sc2sv3o8WZavDocyZfkEMJ9SOKvrMq0XegECJkzZXvCaFiYiQkfAi7gM6QC9I0VDZ7rE8-eBdxdiI7FfwfzJ8eocgcLg62XJlPkyQqROEVkBNobMeJ6-N80F7t00pm_ag',
    tags: ['Family Friendly', 'Show'],
    activities: [
      { name: 'Cultural Show', description: 'A daily multi-ethnic performance showcasing traditional music and dance.' },
      { name: 'Longhouse Tour', description: 'Visit replicas of Iban, Bidayuh, Orang Ulu and Melanaue dwellings.' },
      { name: 'Craft Workshops', description: 'Try your hand at traditional weaving, beadwork, or blowpipe shooting.' }
    ]
  },
  {
    id: 5,
    name: 'Semenggoh Wildlife Centre',
    category: 'Conservation',
    region: 'Kuching Division',
    activity: 'Wildlife Spotting',
    season: 'Any Time',
    location: 'Padawan, Sarawak',
    rating: '4.9 (4.5k reviews)',
    description: 'A unique opportunity to witness semi-wild orangutans in their natural habitat during feeding times.',
    overview: "Semenggoh is the best place in Sarawak to see semi-wild orangutans who have been rescued and rehabilitated. It is not a zoo, but a sanctuary where the animals roam free in the forest.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOuP0T_MTXe9qtx_b6Ip1Egx4lT1HimqU0Xp9SPI1mcFqTHmJ-eQHs7qv7f8MGFkUksUuZXFpwaySs3Z4qlhwF4gNZoa3MHTRNhA0hR5eLWgmPRUr6cXrPUh3eh5fW8L8I6cU7xYMlgOTHA_mRIjMI86uL5yfPtho710-vaOYYlQq7dUklEaqGmI1sAlSiyTlNDSe6x7Z289LcPW5zLALOHrhuEPdzIY7Ua6gEVEm6YyyZXh8JmyluIoHZJZAkKA5bzR9xaBCTwSQ',
    tags: ['Top Choice', 'Eco'],
    activities: [
      { name: 'Feeding Sessions', description: 'Occur twice daily at 9:00 AM and 3:00 PM. Sightings are frequent but not guaranteed.' },
      { name: 'Education Gallery', description: 'Learn about the conservation efforts and the history of Semenggoh sanctuary.' },
      { name: 'Nature Trails', description: 'Walk through the surrounding low-land forest and enjoy the peaceful atmosphere.' }
    ]
  },
  {
    id: 6,
    name: 'Niah National Park',
    category: 'Adventure',
    region: 'Miri Division',
    activity: 'Adventure & Hiking',
    season: 'Dry Season (April-Oct)',
    location: 'Niah, Sarawak',
    rating: '4.7 (3.2k reviews)',
    description: 'Home to archaeological wonders and one of the largest limestone caves in the world.',
    overview: "Niah Caves are famous for the discovery of 40,000-year-old human remains. The park combines history, archaeology, and striking natural beauty in its massive limestone chambers.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTkIc9MdGA9HOI6P1LZc4D_YgDiIkSKEJzXVY3mZWGmWBl3SXdhUMnQ19p9-zh6YyYlPgah_ZN0NG2m2a2CMea7MNMRcqKll8K723f_hmu9LmTFEbyzooBZTAR49MXXaIgKLf-uiptP5BMCoEsuagqIINstis10yYADDaZCJHFiBBi4wrbrA5jfxz7wZmF-g9KsAub1cznBJpdoQRdfEHZoleMeUBtkbx56deQEM4uy8NfKYgXFWGmHzosagx1kJSf4SscdETVxoY',
    tags: ['History', 'Nature'],
    activities: [
      { name: 'Great Cave Exploration', description: 'Walk through the massive main entrance and see the swifts and bats nesting.' },
      { name: 'Painted Cave', description: 'See the ancient wall drawings and canoe-shaped "death ships" burial sites.' },
      { name: 'Jungle Boardwalk', description: 'A long boardwalk through the swamp and forest leading to the cave entrances.' }
    ]
  }
];
