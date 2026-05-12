# Sign In - Components

Reusable components expected on this screen, split by where they should live.

## Components library candidates

These are presentation-only components that can be reused across screens and domains. They should not depend on backend API services, Beacon models, routes, permissions, or authentication business rules.

| Component | Purpose | Inputs | Outputs | States / variants | Placement reason |
| --- | --- | --- | --- | --- | --- |
| `AuthShell` | Provides the responsive authentication layout. | Projected form content, optional hero content, breakpoint mode. | None. | One-column mobile/tablet, split desktop. | It only arranges supplied content and can serve any auth-style page. |
| `AuthCard` | Wraps a form in an elevated card surface. | Heading slot, body slot, actions slot, density. | None. | Mobile full-width, tablet capped width, desktop centered. | It is a generic presentation container. |
| `OutlinedTextField` | Provides email and password inputs with labels and supporting text. | Label, value, placeholder, type, required, errors, disabled. | Value changed, blurred, submitted. | Default, focused, invalid, disabled, password visibility. | It is a generic form control wrapper and does not validate credentials itself. |
| `Checkbox` | Captures remember-me selection. | Checked, label, disabled. | Checked changed. | Checked, unchecked, disabled. | It emits boolean UI state and does not persist authentication sessions. |
| `Button` | Provides primary and secondary actions. | Label, icon, variant, disabled, loading, full-width. | Clicked. | Filled, outlined, disabled, loading. | It is a generic action primitive. |
| `DividerText` | Displays a horizontal divider with centered text. | Label. | None. | Default, compact. | It is purely presentational. |
| `InlineLink` | Displays text links such as forgot-password and create-account. | Label, href or command id, disabled. | Clicked. | Default, visited, disabled. | It is a generic navigation/action affordance. |
| `FeatureListItem` | Displays an icon, title, and supporting copy. | Icon, title, description. | None. | Default, compact. | It renders supplied marketing/help content without owning product behavior. |

## Domain library candidates

These components are suitable for the domain projects/libraries because they represent Beacon identity, sign-in, and product-specific authentication compositions. They may depend on API library models or services, own validation or session flows, or would not make sense outside the Beacon application domain.

| Component | Purpose | Inputs | Outputs | States / variants | Placement reason |
| --- | --- | --- | --- | --- | --- |
| `SignInView` | Composes the complete sign-in screen with brand, hero content, credentials form, remember-me option, and account links. | Return URL, initial email, auth provider availability, loading/error flags. | Sign-in submitted, forgot-password selected, create-account selected, external provider selected. | Initial, submitting, invalid credentials, locked out, success redirect. | It coordinates authentication workflow and screen-level navigation. |
| `SignInForm` | Captures email, password, remember-me, and submit behavior. | Credentials form model, validation errors, submitting state, remember-me value. | Credentials submitted, field changed, remember-me changed. | Empty, dirty, invalid, submitting, authentication error. | It maps directly to local sign-in rules and API-backed authentication. |
| `BrandMark` | Shows the Beacon logo icon plus wordmark. | Size, color mode, compact flag. | None. | Full wordmark, compact icon, light/dark contrast. | It is product identity, so it is not reusable across unrelated domains even though it has no API dependency. |
| `AuthHeroPanel` | Presents Beacon-specific pitch text and feature list on desktop. | Product headline, supporting copy, feature list. | None. | Desktop visible, hidden on mobile/tablet. | The content is Beacon product messaging and would not make sense in a generic components library. |
| `ExternalAuthOptions` | Presents configured external sign-in options when available. | Provider list, enabled flags, submitting provider id. | Provider selected. | None available, available, submitting, disabled. | Provider availability and sign-in behavior are authentication-domain concerns. |
