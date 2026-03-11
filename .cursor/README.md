# .cursor

Project-specific Cursor configuration and skills for the real estate clone.

## Skills

Agent skills live in `.cursor/skills/`. Each skill is a directory with a `SKILL.md` file (name + description in YAML frontmatter). Cursor discovers them automatically.

### Clerk skills (authentication)

| Skill | Purpose |
|-------|--------|
| **clerk** | Router — use when adding auth, custom sign-in, Next.js patterns, orgs, webhooks, testing, Swift/iOS, or backend API. Routes to the specific skill below. |
| **clerk-setup** | Add Clerk to the project (framework detection, env, quickstart). |
| **clerk-custom-ui** | Custom sign-in/sign-up flows, appearance, themes, `useSignIn` / `useSignUp`. |
| **clerk-nextjs-patterns** | Middleware, Server Actions, caching, server vs client auth. |
| **clerk-orgs** | Organizations, RBAC, multi-tenant, member management. |
| **clerk-webhooks** | Webhooks, user/org events, sync, notifications. |
| **clerk-testing** | E2E auth tests (Playwright/Cypress). |
| **clerk-swift** | Native Swift/iOS with ClerkKit/ClerkKitUI (not Expo/React Native). |
| **clerk-backend-api** | Clerk backend REST API (browse endpoints, execute requests). |

For auth-related work, the agent should use the **clerk** skill (or the specific sub-skill) so guidance stays consistent with this project.

### Sanity skills (CMS & content)

| Skill | Purpose |
|-------|--------|
| **sanity-best-practices** | Schemas, GROQ, TypeGen, Visual Editing, images, Portable Text, Studio structure, migrations, Next.js and other framework integrations. Start here for any Sanity work. |
| **content-modeling-best-practices** | Content architecture, schema design, content reuse, references vs embedding, taxonomies. |
| **content-experimentation-best-practices** | A/B testing, experiment design, metrics, CMS-managed variants. |
| **seo-aeo-best-practices** | Metadata, Open Graph, sitemaps, JSON-LD, EEAT, AI-overview readiness. |

For Sanity, schema, GROQ, or content-related work, the agent should use **sanity-best-practices** (and related skills as needed) so guidance matches this project’s Sanity setup.
