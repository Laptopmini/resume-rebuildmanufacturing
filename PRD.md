# PRD: Experience Card Bullet Styling

## Tasks

- [ ] Edit `src/components/Experience.tsx` so the inner bullet `<ul>` (the one rendering `exp.bullets`) uses className `"mt-3 list-disc list-outside pl-5 space-y-2 marker:text-accent"` instead of the current `"mt-3 list-none space-y-2"`. Each child `<li>` keeps its className `"text-sm text-ink"` and its `key={b}`. Do not change the surrounding `<section>`, the outer `<ul className="grid md:grid-cols-2 gap-6">`, the `data-testid={`exp-card-${index}`}` attribute, the company/role/dates/stack spans, or any imports. `[test: npx jest tests/unit/restyle-experience-bullets.test.tsx]`
