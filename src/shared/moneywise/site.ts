export type PageKey = 'home' | 'budget' | 'income' | 'profit' | 'tips' | 'about'

export const PAGES: { key: PageKey; label: string; short: string }[] = [
  { key: 'home', label: 'Home', short: 'Home' },
  { key: 'budget', label: 'Budget Management', short: 'Budget' },
  { key: 'income', label: 'Income and Expenses', short: 'Income & Expenses' },
  { key: 'profit', label: 'Profit Management', short: 'Profit' },
  { key: 'tips', label: 'Financial Tips', short: 'Tips' },
  { key: 'about', label: 'About', short: 'About' },
]

export const IMAGES = {
  hero: 'https://cdn.magicpatterns.com/patterns/generated-images/b25a1fdd-767a-43a8-98b2-ef86f3cf00bb.jpg',
  budget: 'https://cdn.magicpatterns.com/patterns/generated-images/63de22c5-a9a8-47ad-ae90-fc28f8b471be.jpg',
  income: 'https://cdn.magicpatterns.com/patterns/generated-images/9c1b9184-e3d6-4560-8f56-6bab57539097.jpg',
  profit: 'https://cdn.magicpatterns.com/patterns/generated-images/bea82d6c-d9df-48af-91d9-139d4713d699.jpg',
  about: 'https://cdn.magicpatterns.com/patterns/generated-images/5ffd7409-a0ca-4f80-86f5-e0788c8bc91b.jpg',
}

export const peso = (n: number) =>
  '₱' + n.toLocaleString('en-PH', { maximumFractionDigits: 0 })

export const EASE = [0.23, 1, 0.32, 1] as const
