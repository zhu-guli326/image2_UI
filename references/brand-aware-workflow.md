# 组件与品牌工作流 / Component and Brand-Aware Workflow

Resolve the workflow mode first, then apply component/design-system constraints.

## Recreate

`reference -> component/design-system identification -> direct decomposition -> assets -> implementation -> reference comparison`

Use public component/design-system references to improve implementation accuracy, but never let them override visible evidence in the target screenshot unless the user asks for modernization.

## Redesign / Create

`component selection -> brand/design-system resolution -> Effect Image -> review -> decomposition -> assets -> token implementation -> compliance verification`

1. Resolve the selected case, optional style profile, and Component References. Record owning Brand Profile, public source, source status, review date, and authorization boundary.
2. Generate the complete Effect Image under those constraints.
3. Use the inspected Effect Image to produce `code-ui` and `image2-assets` inventories.
4. Generate real bitmap assets and record purpose, dimensions, crop strategy, negative constraints, path, channel, and provenance.
5. Implement tokens and behavior from the selected Component References in the existing stack.
6. Verify interactions and visual fidelity against the workflow's source of truth.

When public design-system components or a Brand Profile are applied, produce:

```text
artifacts/brand-profile.json
artifacts/brand-tokens.json
artifacts/brand-compliance.md
```

`brand-profile.json` must include selected `componentReferenceIds`. `brand-compliance.md` must cover component anatomy, states, behavior, tokens, accessibility, source provenance, and logo/trademark/font authorization boundaries. Public guidelines never imply affiliation or endorsement.
