'use client'

import { useState } from 'react'
import { Sparkles, ChefHat, Loader2 } from 'lucide-react'

const DIET_OPTIONS = ['Balanced', 'Vegan', 'Keto', 'High-Protein', 'Vegetarian'] as const
type DietType = typeof DIET_OPTIONS[number]

interface Meal {
  type: string
  name: string
  macros: { protein: string; carbs: string; fat: string }
  ingredients: string[]
}

interface MealPlan {
  total_calories: number
  meals: Meal[]
}

/* Pre-computed mock meal plans — no real API call needed for the demo */
const MOCK_PLANS: Record<DietType, MealPlan> = {
  Balanced: {
    total_calories: 2050,
    meals: [
      {
        type: 'Breakfast',
        name: 'Avocado & Egg Toast',
        macros: { protein: '22g', carbs: '38g', fat: '18g' },
        ingredients: ['2 eggs', 'sourdough bread', '1 avocado', 'cherry tomatoes', 'chili flakes'],
      },
      {
        type: 'Lunch',
        name: 'Grilled Chicken Quinoa Bowl',
        macros: { protein: '45g', carbs: '52g', fat: '14g' },
        ingredients: ['180g chicken breast', '90g quinoa', 'roasted bell peppers', 'cucumber', 'tahini dressing'],
      },
      {
        type: 'Dinner',
        name: 'Salmon with Steamed Broccoli',
        macros: { protein: '38g', carbs: '22g', fat: '20g' },
        ingredients: ['200g salmon fillet', 'broccoli florets', 'lemon', 'garlic', 'olive oil'],
      },
    ],
  },
  Vegan: {
    total_calories: 1920,
    meals: [
      {
        type: 'Breakfast',
        name: 'Chia Seed Açaí Bowl',
        macros: { protein: '12g', carbs: '55g', fat: '10g' },
        ingredients: ['açaí pack', 'chia seeds', 'oat milk', 'banana', 'granola'],
      },
      {
        type: 'Lunch',
        name: 'Lentil & Sweet Potato Curry',
        macros: { protein: '22g', carbs: '68g', fat: '8g' },
        ingredients: ['red lentils', 'sweet potato', 'coconut milk', 'garam masala', 'spinach'],
      },
      {
        type: 'Dinner',
        name: 'Tofu Buddha Bowl',
        macros: { protein: '28g', carbs: '44g', fat: '16g' },
        ingredients: ['firm tofu', 'edamame', 'brown rice', 'shredded carrots', 'sesame-ginger dressing'],
      },
    ],
  },
  Keto: {
    total_calories: 1980,
    meals: [
      {
        type: 'Breakfast',
        name: 'Bacon & Cheese Omelette',
        macros: { protein: '32g', carbs: '3g', fat: '38g' },
        ingredients: ['3 eggs', '3 bacon strips', 'cheddar cheese', 'butter', 'chives'],
      },
      {
        type: 'Lunch',
        name: 'Lettuce Wrap Burger',
        macros: { protein: '40g', carbs: '6g', fat: '35g' },
        ingredients: ['beef patty', 'iceberg lettuce', 'avocado', 'bacon', 'mustard'],
      },
      {
        type: 'Dinner',
        name: 'Butter-Basted Ribeye & Asparagus',
        macros: { protein: '48g', carbs: '5g', fat: '42g' },
        ingredients: ['ribeye steak', 'asparagus', 'garlic butter', 'rosemary', 'sea salt'],
      },
    ],
  },
  'High-Protein': {
    total_calories: 2200,
    meals: [
      {
        type: 'Breakfast',
        name: 'Protein Pancakes',
        macros: { protein: '40g', carbs: '45g', fat: '10g' },
        ingredients: ['whey protein', 'oats', 'egg whites', 'banana', 'Greek yogurt'],
      },
      {
        type: 'Lunch',
        name: 'Turkey & Chickpea Power Bowl',
        macros: { protein: '55g', carbs: '40g', fat: '12g' },
        ingredients: ['ground turkey', 'chickpeas', 'quinoa', 'kale', 'hummus'],
      },
      {
        type: 'Dinner',
        name: 'Tuna Steak with Edamame',
        macros: { protein: '60g', carbs: '18g', fat: '14g' },
        ingredients: ['tuna steak', 'edamame', 'soy sauce', 'sesame oil', 'ginger'],
      },
    ],
  },
  Vegetarian: {
    total_calories: 1900,
    meals: [
      {
        type: 'Breakfast',
        name: 'Spinach & Feta Omelette',
        macros: { protein: '24g', carbs: '10g', fat: '16g' },
        ingredients: ['3 eggs', 'feta cheese', 'fresh spinach', 'olive oil', 'black pepper'],
      },
      {
        type: 'Lunch',
        name: 'Caprese Panini',
        macros: { protein: '22g', carbs: '48g', fat: '18g' },
        ingredients: ['ciabatta', 'fresh mozzarella', 'heirloom tomatoes', 'basil', 'balsamic glaze'],
      },
      {
        type: 'Dinner',
        name: 'Mushroom Risotto',
        macros: { protein: '18g', carbs: '55g', fat: '14g' },
        ingredients: ['arborio rice', 'mixed mushrooms', 'parmesan', 'white wine', 'vegetable broth'],
      },
    ],
  },
}

const BALANCED_PLAN = MOCK_PLANS['Balanced']

export function TastebudsDemo() {
  const [diet,     setDiet]     = useState<DietType>('Balanced')
  const [loading,  setLoading]  = useState(false)
  const [plan,     setPlan]     = useState<typeof BALANCED_PLAN | null>(null)

  const handleGenerate = () => {
    setLoading(true)
    setPlan(null)
    /* Simulate a 1.2s API response time */
    setTimeout(() => {
      setPlan(MOCK_PLANS[diet])
      setLoading(false)
    }, 1200)
  }

  return (
    <div className="rounded-2xl border border-border bg-background/60 p-6 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
          <ChefHat className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground">Tastebuds AI</h4>
          <p className="font-mono text-xs text-muted-foreground">gemini-api / meal-generator</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
          <span className="font-mono text-[10px] text-green-400">API LIVE</span>
        </div>
      </div>

      {/* Diet selector */}
      <div className="mb-5">
        <label className="mb-2 block font-mono text-xs text-muted-foreground uppercase tracking-widest">
          Diet Preference
        </label>
        <div className="flex flex-wrap gap-2">
          {DIET_OPTIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDiet(d)}
              className={`rounded-full border px-3 py-1 font-mono text-xs transition-all duration-200 ${
                diet === d
                  ? 'border-primary bg-primary/15 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent py-3 font-semibold text-background transition-all duration-300 hover:opacity-90 disabled:opacity-60"
      >
        {loading ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Generating plan…</>
        ) : (
          <><Sparkles className="h-4 w-4" /> Generate Meal Plan</>
        )}
      </button>

      {/* Results */}
      {plan && (
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-primary/5 px-4 py-2">
            <span className="font-mono text-xs text-muted-foreground">Total Daily Calories</span>
            <span className="font-display font-bold text-primary">{plan.total_calories} kcal</span>
          </div>

          {plan.meals.map((meal) => (
            <div
              key={meal.type}
              className="rounded-xl border border-border bg-card/50 p-4"
            >
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    {meal.type}
                  </span>
                  <h5 className="font-display font-semibold text-foreground">{meal.name}</h5>
                </div>
                <div className="text-right font-mono text-xs text-muted-foreground">
                  <div>P: {meal.macros.protein}</div>
                  <div>C: {meal.macros.carbs}</div>
                  <div>F: {meal.macros.fat}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {meal.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {!plan && !loading && (
        <p className="text-center font-mono text-xs text-muted-foreground/60">
          Select a diet type and generate your personalized plan.
        </p>
      )}
    </div>
  )
}
