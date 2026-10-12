// Product categories. To grow the portfolio, add a new object to this array:
// the Products page, footer links, home preview and the enquiry form's
// "Product Interest" field all read from here.

export const productCategories = [
  {
    id: 'fresh-fruits',
    label: 'Fresh Fruits',
    interest: 'fruits',
    summary:
      'Indian fruit sourced with care and offered to international buyers through a relationship-led approach.',
    description:
      'Connecting quality Indian fruit sourcing with international market opportunities through a dependable, relationship-led approach.',
    points: [
      'Sourcing aligned to buyer requirements',
      'Product checks against agreed specifications',
      'Packing and documentation coordinated per shipment',
    ],
    image: 'fruits-basket',
    alt: 'Mangoes, grapes, kiwi and apples arranged together in a basket',
    detailImage: 'hero-mangoes',
    detailAlt: 'Ripe red and yellow mangoes stacked together',
  },
  {
    id: 'fresh-vegetables',
    label: 'Fresh Vegetables',
    interest: 'vegetables',
    summary:
      'Fresh vegetables from Indian growing regions, handled with attention and communicated clearly.',
    description:
      'Supporting international trade in fresh vegetables through considered sourcing, quality-focused handling, and clear communication.',
    points: [
      'Considered sourcing based on product requirements',
      'Quality-focused handling and preparation',
      'Clear communication from enquiry to dispatch',
    ],
    image: 'market-vegetables',
    alt: 'Bitter gourd, carrots, green chillies and red chillies at an Indian vegetable market',
    detailImage: 'carrots-crate',
    detailAlt: 'Freshly harvested carrots with leafy tops in a wooden crate',
  },
];

export const interestOptions = [
  ...productCategories.map((c) => ({ value: c.interest, label: c.label })),
  { value: 'other', label: 'Other Enquiry' },
];
