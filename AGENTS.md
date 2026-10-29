<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:heroui-agent-rules -->

## HeroUI v3 Official Development Standards

HeroUI v3 is the primary UI component system for this application, built on **Tailwind CSS v4** and **React Aria Components**. Always follow these strict conventions:

1. **v3 Only — Never Use v2 Patterns:**
   - **No Provider:** Never wrap the application in `<HeroUIProvider>`. HeroUI v3 is zero-config and provider-less.
   - **Imports:** Import components directly from `@heroui/react` and style variants from `@heroui/styles`.
   - **Styling:** CSS variables + BEM classes. `@import "@heroui/styles";` is imported in `globals.css` immediately after `@import "tailwindcss";`.

2. **Component Architecture & Composition:**
   - **Compound Pattern:** Use compound components (`<Card><Card.Header><Card.Title>...</Card.Title></Card.Header><Card.Content>...</Card.Content></Card>`).
   - **Semantic Variants:** Use semantic variants (`primary`, `secondary`, `tertiary`, `outline`, `ghost`, `danger`) instead of visual descriptions.
   - **Next.js Link Integration:** Use the render function prop or variant helper:
     ```tsx
     <Button render={(props) => <Link href="/destination" {...props}>Label</Link>} />
     ```
     Or apply variant classes directly: `className={buttonVariants({ variant: "primary", size: "md" })}`.

3. **Accessibility Standards (React Aria):**
   - Use `onPress` instead of `onClick` for HeroUI interactive components.
   - Use `isDisabled` instead of `disabled`.
   - Use `isPending` for loading state indicators.
   - Maintain full WAI-ARIA keyboard navigation and focus rings.

<!-- END:heroui-agent-rules -->

