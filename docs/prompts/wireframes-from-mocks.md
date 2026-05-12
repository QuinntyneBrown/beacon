# Prompt: Generate Wireframes From Mocks

Review `docs/mocks` and identify only the mock files that represent final application pages or screens. Exclude mock files that are only informational, metadata, index/navigation, or design-system references.

For each final app screen, create a folder under `docs/wireframes` named after that screen. In each folder, create simple Markdown wireframe files for the mobile, tablet, and desktop versions of the screen. The wireframes should be plain text diagrams and notes, but they must accurately reflect the mock layout, visible content, navigation pattern, major sections, responsive behavior, and important UI states.

Also create a `components.md` file in each screen folder that lists the reusable components expected on that screen. Split the file into these two sections:

- **Components library candidates** - presentation-only UI components that are reusable across screens and domains. Put a component in this section when it can be implemented without depending on backend API services, domain models, routes, permissions, or feature-specific business rules. These components should be configurable through inputs, outputs, content projection, styling variants, and UI state only.
- **Domain library candidates** - domain-aware UI components suitable for the domain projects/libraries. Put a component in this section when it represents a business concept, workflow, or feature-specific composition; depends on API library models or services; owns data loading, saving, validation, authorization-aware behavior, or mutation flows; or would not make sense outside the application domain.

For every listed component, include its purpose, expected inputs and outputs, important states or variants, and a short placement reason explaining why it belongs in the components library or the domain library.
