# Sign In - Mobile Wireframe

Source mock: `docs/mocks/login.html`  
Source screenshot: `docs/mocks/screenshots/login-mobile.png`  
Responsive state: mobile auth layout, one column, hero hidden.

## Layout

```text
FULL VIEWPORT
background: pale cyan gradient

        top breathing space

  +------------------------------------------------+
  | AUTH CARD                                      |
  | rounded large, elevated, white                 |
  |                                                |
  |  [logo] Beacon                                |
  |                                                |
  |  Welcome back                                  |
  |  Sign in to keep your team's work moving.      |
  |                                                |
  |  +------------------------------------------+  |
  |  | Email address                            |  |
  |  | alex@beacon.dev                          |  |
  |  +------------------------------------------+  |
  |                                                |
  |  +------------------------------------------+  |
  |  | Password                                 |  |
  |  | **********                               |  |
  |  +------------------------------------------+  |
  |  At least 8 characters.                       |
  |                                                |
  |  [x] Remember me            Forgot password?   |
  |                                                |
  |  +------------------------------------------+  |
  |  |                 Sign in                  |  |
  |  +------------------------------------------+  |
  |                                                |
  |  ----------- OR CONTINUE WITH -----------      |
  |                                                |
  |  +-------------------+  +-------------------+  |
  |  | [mail] Google     |  | [code] GitHub     |  |
  |  +-------------------+  +-------------------+  |
  |                                                |
  |  New to Beacon? Create an account              |
  +------------------------------------------------+

        bottom breathing space
```

## Exact Content And Behavior

- The card is centered horizontally with large top and bottom margins.
- The marketing hero content is not visible on mobile.
- The Beacon brand row sits inside the auth card.
- Email field is focused with a thicker primary outline.
- Password field is outlined and has supporting text below it.
- Remember-me and forgot-password share one horizontal row.
- Google and GitHub buttons are side by side, even on mobile.
