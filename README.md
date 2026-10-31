# Meal Plan

Our ~1,400 kcal a day meal plan for two, as a small website that works on a phone. It's built by GitHub Pages straight from this repo, so there's nothing to install or run.

- **Recipes** (home page): search by any ingredient or word, filter by meal (breakfast, snack, lunch, tea), by set (in the plan, extra, freezer extra), and by ingredient tags.
- **Plan**: the two-week calendar. Repeat it three times for six weeks.
- **Shopping**: the weekly list. Tap items to tick them off; ticks are remembered on that phone.

## Adding or editing a recipe

Each recipe is one file in `_recipes/`. Copy an existing one, rename it and edit it. You can do this in the GitHub website or app, and the site updates about a minute after you commit.

```yaml
---
title: Dukkah-Crusted Chicken with Herby Couscous
code: T14                    # B, S, L, T or FE plus a number
meal: tea                    # breakfast, snack, lunch or tea
group: extra                 # plan, extra or freezer
kcal: ~500 kcal per portion  # shown as written
kcal_num: 500                # plain number
yield: serves 2
order: 48                    # position in the list
tags:                        # the ingredient chips you can filter on
- chicken
- couscous
ingredients:
- 2 chicken breasts (~300g)
- 100g couscous and hot stock (per pack)
---

## Method

1. First step.
2. Second step.

## Notes

- Optional notes.
```

Search looks at the title, code, tags and every ingredient line, so you don't need to tag everything. Tags are for the main things you'd want to tap to filter on. Reuse existing tag names where you can (for example `chicken`, not `Chicken breast`) so they group together.

## Changing the calendar

The two-week calendar is in `_data/plan.yml`. Each day lists the recipe codes for breakfast (`b`), snack (`s`), lunch (`l`) and tea (`t`). Add `l_label` or `t_label` to show a different name for that day, such as "Leftover Chilli & Rice".

## Publishing

In the repo's **Settings → Pages**, set the source to **Deploy from a branch**, branch `main`, folder `/ (root)`. The site is at https://mjholmes.github.io/recipe-ideas/.

The site asks search engines not to index it, but anyone with the link can open it.
