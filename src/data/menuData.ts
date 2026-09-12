export interface MenuItem {
  id: string;
  name: string;
  arabicName: string;
  category: 'shawarma' | 'burgers' | 'plates' | 'sides' | 'drinks';
  price: number;
  description: string;
  longDescription: string;
  image: string;
  spicyLevel?: number;
  dietary?: ('Halal' | 'Vegetarian' | 'Gluten-Free' | 'Chef Signature')[];
  ingredients: string[];
  tasteNotes: string[];
  calories?: number;
}

export const MENU_ITEMS: MenuItem[] = [
  // BURGERS
  {
    id: 'deconstructed-sujuk-burger',
    name: 'The Deconstructed Damascus Flame Smash',
    arabicName: 'برجر السجق الدمشقي المشوي',
    category: 'burgers',
    price: 18.5,
    description: 'Double flame-seared sujuk beef smash patty, molten halloumi, sumac caramelized onions, and 72-hr garlic toum on charred sesame brioche.',
    longDescription: 'Our signature burger takes prime dry-aged beef infused with hand-crushed Aleppo pepper, sujuk spices, and coriander. Smashed over white-hot oak charcoal, layered with griddled local halloumi, slow-caramelized onions deglazed with pomegranate molasses, and our legendary whipped garlic toum.',
    image: '/assets/images/burger.png',
    spicyLevel: 2,
    dietary: ['Halal', 'Chef Signature'],
    ingredients: ['Prime Sujuk Beef Smash', 'Griddled Halloumi', 'Sumac Onions', 'Garlic Toum', 'Pomegranate Glaze', 'Sesame Brioche'],
    tasteNotes: ['Smoky Charcoal', 'Garlic Umami', 'Pomegranate Tartness', 'Savory Spice'],
    calories: 840,
  },
  {
    id: 'aleppo-truffle-burger',
    name: 'Aleppo Truffle & Smoked Gouda Smash',
    arabicName: 'برجر الكمأة وحلب الفاخر',
    category: 'burgers',
    price: 21.0,
    description: 'Charcoal smash patty, black truffle labneh, smoked gouda, pickled wild turnip, and crispy shallots.',
    longDescription: 'An opulent marriage of French black truffle labneh and Syrian spice heritage. Smashed ribeye patty topped with aged smoked gouda, house-made wild red turnips, and crispy shallots on toasted brioche.',
    image: '/assets/images/burger.png',
    spicyLevel: 1,
    dietary: ['Halal'],
    ingredients: ['Ribeye Smash Patty', 'Black Truffle Labneh', 'Smoked Gouda', 'Pickled Turnips', 'Crispy Shallots'],
    tasteNotes: ['Earthy Truffle', 'Creamy Tang', 'Smoky Ribeye'],
    calories: 910,
  },
  {
    id: 'halloumi-crisp-burger',
    name: 'Charred Halloumi & Mint Pesto Burger',
    arabicName: 'برجر الحلوم المشوي بالنعناع',
    category: 'burgers',
    price: 16.5,
    description: 'Crispy thick-cut grilled halloumi block, zaatar mint pesto, roasted red pepper muhammara, and wild arugula.',
    longDescription: 'A vegetarian masterpiece. Thick cut fresh Syrian halloumi seared until golden crisp, slathered with wild mint pesto and sweet roasted pepper muhammara sauce on a toasted potato roll.',
    image: '/assets/images/mezze.png',
    spicyLevel: 0,
    dietary: ['Vegetarian'],
    ingredients: ['Thick Syrian Halloumi', 'Wild Mint Pesto', 'Pepper Muhammara', 'Baby Arugula', 'Potato Bun'],
    tasteNotes: ['Salty Crispy Cheese', 'Fresh Herbaceous Mint', 'Sweet Red Pepper'],
    calories: 720,
  },

  // SHAWARMA
  {
    id: 'toum-chicken-shawarma',
    name: '72-Hour Toum Chicken Shawarma Supreme',
    arabicName: 'شاورما دجاج بالسيراميك والثوم',
    category: 'shawarma',
    price: 15.5,
    description: 'Vertical spit slow-roasted chicken thighs marinated in cardamom, orange blossom & garlic toum, pressed in crisp Saj bread.',
    longDescription: 'Free-range chicken thighs marinated for 3 days in olive oil, toasted cardamom, allspice, garlic, and wild herbs. Stacked on a traditional vertical spit over hardwood coals, sliced paper-thin, wrapped in hand-stretched Syrian Saj bread, and iron-pressed until shatteringly crisp.',
    image: '/assets/images/shawarma.png',
    spicyLevel: 1,
    dietary: ['Halal', 'Chef Signature'],
    ingredients: ['Marinated Chicken Thighs', 'Handmade Saj Bread', 'Extra Garlic Toum', 'Wild Cucumber Pickles', 'Pomegranate Drizzle'],
    tasteNotes: ['Garlic Punch', 'Crisp Saj Crust', 'Juicy Citrus Chicken'],
    calories: 680,
  },
  {
    id: 'beef-shawarma-sujuk',
    name: 'Charcoal Beef & Sumac Tarator Shawarma',
    arabicName: 'شاورما لحم بالسمّاق والطرطور',
    category: 'shawarma',
    price: 17.5,
    description: 'Prime beef tenderloin strips, toasted pine nuts, biwaz onion parsley salad, and creamy sesame tarator in hot markook.',
    longDescription: 'Dry-aged beef tenderloin marinated in pomegranate molasses, red wine vinegar (alcohol-free spice steep), cumin, and cinnamon. Paired with fresh sumac biwaz salad, roasted pine nuts, and stone-ground sesame tahini tarator sauce.',
    image: '/assets/images/shawarma.png',
    spicyLevel: 1,
    dietary: ['Halal'],
    ingredients: ['Beef Tenderloin', 'Markook Bread', 'Sumac Biwaz Salad', 'Sesame Tarator', 'Pine Nuts'],
    tasteNotes: ['Rich Beef', 'Zesty Sumac', 'Nutty Tahini'],
    calories: 740,
  },

  // PLATES
  {
    id: 'damascus-feast-plate',
    name: 'The Damascus Sultan Royal Mezze & Grill',
    arabicName: 'صحن السلطان الدمشقي الفاخر',
    category: 'plates',
    price: 26.0,
    description: 'Char-grilled sujuk beef, chicken shawarma, silky white garlic hummus, roasted red pepper muhammara, and wood-fired pita.',
    longDescription: 'The complete Syrian culinary tour. Generous portions of our slow-roasted chicken shawarma, grilled sujuk patties, wood-roasted red pepper muhammara with walnut crush, velvet garlic hummus, and fresh herbs.',
    image: '/assets/images/mezze.png',
    spicyLevel: 1,
    dietary: ['Halal', 'Chef Signature'],
    ingredients: ['Flame Beef Sujuk', 'Chicken Shawarma', 'Smooth Hummus', 'Muhammara Dip', 'Charred Chili', 'Warm Flatbread'],
    tasteNotes: ['Velvety Hummus', 'Smoky Meat', 'Nutty Sweet Pepper'],
    calories: 990,
  },
  {
    id: 'smoked-lamb-hummus',
    name: 'Spiced Smoked Lamb Shoulder Hummus',
    arabicName: 'حمّص بلحم الضأن المدخّن',
    category: 'plates',
    price: 22.5,
    description: 'Ultra-smooth stone-ground hummus topped with 12-hour wood-smoked lamb shoulder, ghee-toasted pine nuts & pomegranate seeds.',
    longDescription: 'Silky tahini hummus infused with ice water and lemon, crowned with tender pulled lamb shoulder smoked over Syrian olive wood, finished with brown butter ghee, golden pine nuts, and ruby pomegranate arils.',
    image: '/assets/images/mezze.png',
    spicyLevel: 0,
    dietary: ['Halal', 'Gluten-Free'],
    ingredients: ['Stone-ground Tahini Hummus', 'Smoked Lamb Shoulder', 'Pine Nuts', 'Brown Butter Ghee', 'Pomegranate Arils'],
    tasteNotes: ['Butter Soft Lamb', 'Silky Garlic Hummus', 'Crunchy Pine Nuts'],
    calories: 820,
  },

  // SIDES
  {
    id: 'batata-harra-fries',
    name: 'Crispy Batata Harra Fries',
    arabicName: 'بطاطا حرّة دمشفية مقرمشة',
    category: 'sides',
    price: 8.5,
    description: 'Double-cooked triple potato cubes tossed in fresh garlic, cilantro, Aleppo chili flakes, and fresh lemon zest.',
    longDescription: 'Crispy gold potato cubes fried to perfection, tossed in sizzling olive oil with crushed garlic cloves, fresh coriander leaves, sun-dried red chili, and a squeeze of fresh lemon juice.',
    image: '/assets/images/shawarma.png',
    spicyLevel: 2,
    dietary: ['Vegetarian', 'Gluten-Free'],
    ingredients: ['Yukon Gold Potatoes', 'Aleppo Red Chili', 'Fresh Cilantro', 'Minced Garlic', 'Lemon Zest'],
    tasteNotes: ['Crispy Exterior', 'Garlic Herb Blast', 'Zesty Heat'],
    calories: 420,
  },
  {
    id: 'halloumi-fries-toum',
    name: 'Golden Halloumi Fries with Garlic Dip',
    arabicName: 'أصابع الحلوم المقرمشة مع الثوم',
    category: 'sides',
    price: 11.0,
    description: 'Crispy sesame-crusted Syrian halloumi sticks served with side of whipped garlic toum and hot honey drizzle.',
    longDescription: 'Thick halloumi sticks dredged in toasted nigella seeds and sesame flour, quick-fried till melting inside, served with signature toum and wild thistly hot honey.',
    image: '/assets/images/burger.png',
    spicyLevel: 0,
    dietary: ['Vegetarian'],
    ingredients: ['Syrian Halloumi Cheese', 'Nigella & Sesame Crust', 'Whipped Toum', 'Wild Hot Honey'],
    tasteNotes: ['Crispy Salty Cheese', 'Sweet Honey Spark', 'Whipped Garlic'],
    calories: 550,
  },

  // DRINKS
  {
    id: 'karkadeh-pomegranate-craft',
    name: 'Iced Karkadeh & Pomegranate Craft Fizz',
    arabicName: 'شراب الكركديه بالرمان المنعش',
    category: 'drinks',
    price: 6.5,
    description: 'Cold-brewed Syrian hibiscus tea infused with wild pomegranate juice, orange blossom water, and sparkling soda.',
    longDescription: 'Our signature house elixir. Dried organic red hibiscus flowers steeped in cold spring water for 12 hours, blended with raw pomegranate juice, rose blossom mist, mint, and sparkling soda over crushed ice.',
    image: '/assets/images/drink.png',
    spicyLevel: 0,
    dietary: ['Vegetarian', 'Gluten-Free'],
    ingredients: ['Organic Hibiscus', 'Pomegranate Juice', 'Orange Blossom Water', 'Sparkling Soda', 'Fresh Mint'],
    tasteNotes: ['Tart Berry Floral', 'Refreshing Fizz', 'Aromatic Blossom'],
    calories: 110,
  },
  {
    id: 'syrian-mint-lemonade',
    name: 'Limonana Damascus Frozen Mint Lemonade',
    arabicName: 'ليموناضة بالنعناع الطازج المثلج',
    category: 'drinks',
    price: 6.5,
    description: 'Fresh blended Mediterranean lemons, spearmint leaves, cane sugar, and shaved ice mist.',
    longDescription: 'The ultimate Middle Eastern cooler. Whole fresh lemons blended skin and all with mountain spearmint leaves, cane sugar syrup, and micro-shaved ice for an electric green frost.',
    image: '/assets/images/drink.png',
    spicyLevel: 0,
    dietary: ['Vegetarian', 'Gluten-Free'],
    ingredients: ['Fresh Eureka Lemons', 'Spearmint Leaves', 'Pure Cane Sugar', 'Shaved Ice'],
    tasteNotes: ['Bright Sour Lemon', 'Cool Mint Wave', 'Electric Slush'],
    calories: 140,
  }
];
