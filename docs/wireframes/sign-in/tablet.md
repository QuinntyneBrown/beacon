# Sign In - Tablet Wireframe

Source mock: `docs/mocks/login.html`  
Source screenshot: `docs/mocks/screenshots/login-tablet.png`  
Responsive state: tablet auth layout, one column, hero hidden.

## Layout

```text
FULL TABLET VIEWPORT
background: pale cyan gradient



                         +----------------------------------------+
                         | AUTH CARD                              |
                         | rounded large, elevated, white         |
                         |                                        |
                         | [logo] Beacon                          |
                         |                                        |
                         | Welcome back                           |
                         | Sign in to keep your team's work       |
                         | moving.                                |
                         |                                        |
                         | +------------------------------------+ |
                         | | Email address                      | |
                         | | alex@beacon.dev                    | |
                         | +------------------------------------+ |
                         |                                        |
                         | +------------------------------------+ |
                         | | Password                           | |
                         | | **********                         | |
                         | +------------------------------------+ |
                         |   At least 8 characters.              |
                         |                                        |
                         | [x] Remember me      Forgot password? |
                         |                                        |
                         | +------------------------------------+ |
                         | |              Sign in               | |
                         | +------------------------------------+ |
                         |                                        |
                         | ----- OR CONTINUE WITH -----          |
                         |                                        |
                         | +----------------+ +----------------+ |
                         | | [mail] Google  | | [code] GitHub  | |
                         | +----------------+ +----------------+ |
                         |                                        |
                         | New to Beacon? Create an account       |
                         +----------------------------------------+



```

## Exact Content And Behavior

- The single auth card is centered in the viewport with substantial empty space around it.
- The card max width matches the mock form width; it does not stretch across the tablet.
- No left hero panel is shown because the split layout starts at desktop-auth width.
- Form content order and controls match mobile exactly.
