# Settings - Components

Reusable components expected on this screen, split by where they should live.

## Components library candidates

These are presentation-only components that can be reused across screens and domains. They should not depend on backend API services, Beacon models, routes, permissions, or account-specific business rules.

| Component | Purpose | Inputs | Outputs | States / variants | Placement reason |
| --- | --- | --- | --- | --- | --- |
| `AppShell` | Provides the responsive app frame with top bar, navigation, and main content slots. | Navigation items, active item id, toolbar content, projected page content, breakpoint mode. | Navigation item selected, menu toggled. | Mobile bottom navigation, tablet rail, desktop drawer. | It only arranges supplied content and emits UI events; settings data stays outside the component. |
| `TopAppBar` | Displays leading menu, brand, title, help action, and avatar slot. | Title, leading icon, action items, avatar content. | Leading action clicked, help clicked, avatar clicked. | Sticky, dense, with or without actions. | It is a generic toolbar configured by inputs and projected actions. |
| `ResponsiveNavigation` | Renders bottom navigation, rail, or drawer navigation from the same item model. | Items, active item id, badges, expanded state, section labels. | Item selected, create action clicked. | Bottom nav, rail, expanded drawer, active/inactive rows. | It renders a provided navigation structure without owning account routing or data. |
| `PageHeader` | Presents title, subtitle, and right-aligned actions. | Title, subtitle, projected actions. | Action outputs from projected controls. | Compact mobile stack, desktop horizontal layout. | It handles reusable header layout only. |
| `Button` | Provides consistent command styling. | Label, icon, variant, disabled, loading, destructive flag. | Clicked. | Filled, tonal, outlined, text, destructive, disabled, loading. | It is a generic control primitive. |
| `ListItem` | Displays icon, label, supporting text, and trailing content. | Icon, label, supporting text, selected, trailing slot. | Clicked. | Selected, unselected, disabled, dense. | It is a generic list-row pattern. |
| `Avatar` | Shows a user image or initials. | Image URL, initials, size, color token, label. | Clicked when interactive. | Normal, large, loading, fallback initials. | It renders provided identity display data without fetching the profile. |
| `OutlinedTextField` | Provides text entry with label and supporting text. | Label, value, placeholder, type, required, errors, disabled. | Value changed, blurred, submitted. | Default, focused, invalid, disabled, multiline. | It is a generic form control wrapper. |
| `Switch` | Toggles a binary setting. | Checked, label, disabled. | Checked changed. | On, off, disabled. | It emits a boolean state and does not save preferences itself. |
| `SegmentedChipGroup` | Provides single-choice segmented options. | Options, selected option, disabled. | Selection changed. | Selected, unselected, disabled. | It is a generic selection control. |
| `SettingsSection` | Groups related settings rows under a heading. | Icon, title, description, projected rows. | Action outputs from projected controls. | Default, compact, divided. | It is a reusable layout section with no account knowledge. |
| `SettingsRow` | Displays a setting title, description, and trailing control or action. | Title, description, trailing slot, disabled. | Row clicked when interactive. | Static, interactive, disabled, warning. | It is a generic settings layout row. |

## Domain library candidates

These components are suitable for the domain projects/libraries because they represent Beacon account, profile, workspace, and preference workflows. They may depend on API library models or services, own data loading or saving, or encode authorization-aware account behavior.

| Component | Purpose | Inputs | Outputs | States / variants | Placement reason |
| --- | --- | --- | --- | --- | --- |
| `SettingsPageView` | Composes profile, notifications, appearance, workspace, security, billing, and danger-zone settings. | Current user, profile model, preference model, workspace context, permissions, loading/error flags. | Save requested, section selected, preference changed, account deletion requested. | Loading, dirty, saving, saved, validation error, permission-limited. | It coordinates account-specific data, save behavior, and section routing. |
| `SettingsNav` | Provides in-page navigation for Profile, Notifications, Appearance, Workspace, Security, and Billing. | Sections, active section, disabled sections, badge counts. | Section selected. | Mobile horizontal, desktop side nav, active, disabled. | The sections are Beacon account/workspace settings concepts rather than generic list content. |
| `ProfileSummary` | Shows avatar, name, role/email, and profile photo actions. | User profile, photo state, upload/remove permissions. | Upload requested, photo removed. | With photo, initials fallback, uploading, remove disabled. | It represents authenticated user profile data and photo workflow. |
| `ProfileSettingsForm` | Edits full name, username, email, and bio. | Profile form model, validation errors, saving state. | Field changed, save requested, validation surfaced. | Clean, dirty, invalid, saving, saved. | It maps to account/profile API fields and validation rules. |
| `NotificationPreferencesPanel` | Edits email digest, mentions, due-date reminders, and comment replies. | Notification preferences, saving state, disabled reasons. | Preference toggled. | Enabled, disabled, saving, partial failure. | The options are Beacon notification preferences backed by account data. |
| `AppearancePreferencesPanel` | Edits theme and compact density preferences. | Appearance preferences, available themes, saving state. | Theme changed, density changed. | Light, dark, system, compact on/off, saving. | It stores user-specific app preferences rather than only rendering segmented controls. |
| `DangerZonePanel` | Presents destructive account deletion behavior. | Account deletion availability, warning text, confirmation state. | Delete account requested, confirmation accepted, confirmation canceled. | Idle, confirmation required, deleting, disabled. | It owns an account-level destructive workflow and permission-aware state. |
