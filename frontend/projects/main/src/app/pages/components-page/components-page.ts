import { Component } from '@angular/core';

@Component({
  selector: 'app-components-page',
  template: `
    <section class="components-page">
      <header class="page-header">
        <div class="titles">
          <p class="page-kicker">Reference</p>
          <h1 class="page-title">Design system</h1>
          <p class="page-subtitle body-medium">Beacon's Material 3 component reference</p>
        </div>
        <div class="trailing">
          <button type="button" class="icon-btn" aria-label="Code">
            <span class="material-symbols-rounded" aria-hidden="true">code</span>
          </button>
          <button type="button" class="btn btn-tonal with-icon">
            <span class="material-symbols-rounded" aria-hidden="true">download</span>
            Export tokens
          </button>
        </div>
      </header>

      <div class="showcase">
        <section class="card">
          <h2>Color</h2>
          <p class="lead">Source palette and Material 3 light scheme roles.</p>
          <h3>Source palette</h3>
          <div class="swatch-grid">
            <div class="swatch swatch-primary"><span>Primary</span><span>#006782</span></div>
            <div class="swatch swatch-secondary"><span>Secondary</span><span>#4EB2EF</span></div>
            <div class="swatch swatch-tertiary"><span>Tertiary</span><span>#3ACFF5</span></div>
            <div class="swatch swatch-surface"><span>Surface</span><span>#F8FAFB</span></div>
          </div>
          <h3>M3 roles</h3>
          <div class="swatch-grid">
            <div class="swatch swatch-primary"><span>Primary</span><span>On primary</span></div>
            <div class="swatch swatch-surface"><span>Container</span><span>Surface roles</span></div>
          </div>
        </section>

        <section class="card">
          <h2>Typography</h2>
          <p class="lead">Roboto and Roboto Flex sizes used across product pages.</p>
          <div class="type-row display display-small">Display large</div>
          <div class="type-row headline headline-medium">Headline medium</div>
          <div class="type-row headline-small">Headline small</div>
          <div class="type-row title-large">Title large</div>
          <div class="type-row title-medium">Title medium</div>
          <div class="type-row title-small">Title small</div>
          <div class="type-row body-large">Body large text</div>
          <div class="type-row body body-medium">Body medium text</div>
          <div class="type-row label-large">LABEL LARGE</div>
        </section>

        <section class="card">
          <h2>Buttons</h2>
          <div class="row">
            <button type="button" class="btn btn-filled">Filled</button>
            <button type="button" class="btn btn-tonal">Tonal</button>
            <button type="button" class="btn btn-elevated">Elevated</button>
            <button type="button" class="btn btn-outlined">Outlined</button>
            <button type="button" class="btn btn-text">Text</button>
            <button type="button" class="btn btn-filled">Add</button>
            <button type="button" class="btn btn-outlined">Default</button>
          </div>
          <div class="row">
            <button type="button" class="btn btn-filled with-icon">
              <span class="material-symbols-rounded" aria-hidden="true">add</span>
              New
            </button>
            <button type="button" class="btn btn-tonal with-icon">
              <span class="material-symbols-rounded" aria-hidden="true">download</span>
              Export
            </button>
            <button type="button" class="btn btn-outlined with-icon">
              <span class="material-symbols-rounded" aria-hidden="true">filter_list</span>
              Filter
            </button>
            <button type="button" class="btn btn-filled" disabled>Disabled</button>
            <button type="button" class="btn btn-outlined" disabled>Disabled</button>
          </div>
        </section>

        <section class="card">
          <h2>Icon buttons</h2>
          <div class="row">
            <button type="button" class="icon-btn" aria-label="Search"><span class="material-symbols-rounded" aria-hidden="true">search</span></button>
            <button type="button" class="icon-btn tonal" aria-label="Star"><span class="material-symbols-rounded" aria-hidden="true">star</span></button>
            <button type="button" class="icon-btn filled" aria-label="Notifications"><span class="material-symbols-rounded" aria-hidden="true">notifications</span></button>
            <button type="button" class="icon-btn" aria-label="Notifications with badge">
              <span class="icon-with-badge">
                <span class="material-symbols-rounded" aria-hidden="true">notifications</span>
                <span class="badge">5</span>
              </span>
            </button>
          </div>
        </section>

        <section class="card">
          <h2>FABs</h2>
          <div class="row">
            <button type="button" class="fab small"><span class="material-symbols-rounded" aria-hidden="true">add</span></button>
            <button type="button" class="fab"><span class="material-symbols-rounded" aria-hidden="true">add</span></button>
            <button type="button" class="fab extended"><span class="material-symbols-rounded" aria-hidden="true">add</span>New card</button>
            <button type="button" class="fab surface" aria-label="Edit"><span class="material-symbols-rounded" aria-hidden="true">edit</span></button>
          </div>
        </section>

        <section class="card">
          <h2>Chips</h2>
          <div class="row">
            <button type="button" class="chip active selected"><span class="material-symbols-rounded" aria-hidden="true">check</span>Selected</button>
            <button type="button" class="chip assist"><span class="material-symbols-rounded" aria-hidden="true">filter_list</span>Filter</button>
            <button type="button" class="chip">Suggestion</button>
            <button type="button" class="chip">Sam R. <span class="material-symbols-rounded" aria-hidden="true">close</span></button>
            <button type="button" class="chip"><span class="material-symbols-rounded label" aria-hidden="true">label</span>Bug</button>
          </div>
        </section>

        <section class="card">
          <h2>Text fields</h2>
          <div class="field-grid">
            <label class="text-field outlined">
              <span class="field"><input class="input" aria-label="Outlined Supporting text" value="Example value" /><span class="floating-label">Outlined</span></span>
              <span class="supporting">Supporting text</span>
            </label>
            <label class="text-field filled">
              <span class="field"><input class="input" aria-label="Filled Supporting text" value="Hello world" /><span class="floating-label">Filled</span></span>
              <span class="supporting">Supporting text</span>
            </label>
            <label class="text-field outlined focused">
              <span class="field"><input class="input" aria-label="Focused state" value="Focused" /><span class="floating-label">Focused state</span></span>
            </label>
            <label class="text-field outlined error">
              <span class="field"><input class="input" aria-label="Email Enter a valid email address." value="invalid@" /><span class="floating-label">Email</span></span>
              <span class="supporting">Enter a valid email address.</span>
            </label>
          </div>
        </section>

        <section class="card">
          <h2>Switches</h2>
          <h3>Selection controls</h3>
          <div class="row">
            <label class="switch">
              <input type="checkbox" checked />
              <span class="track"><span class="thumb"></span></span>
            </label>
            <label class="checkbox-row checkbox checked">
              <input type="checkbox" checked />
              Checkbox
            </label>
          </div>
        </section>

        <section class="card">
          <h2>Cards</h2>
          <div class="card elevated">
            <h3 class="title-medium">Elevated card</h3>
            <p class="body-medium">A contained surface with elevation.</p>
          </div>
        </section>

        <section class="card">
          <h2>Notifications</h2>
          <div class="snackbar">
            <span>Saved changes</span>
            <button type="button" class="action">UNDO</button>
          </div>
          <div class="snackbar">
            <span>Sync failed</span>
            <button type="button" class="action">RETRY</button>
          </div>
        </section>

        <section class="card">
          <h2>Dialog</h2>
          <div class="dialog-preview dialog">
            <span class="dialog-icon material-symbols-rounded" aria-hidden="true">delete</span>
            <h3>Archive board?</h3>
            <p>Dialog surface, title, body copy, and actions.</p>
            <div class="row dialog-actions">
              <button type="button" class="btn btn-text">Cancel</button>
              <button type="button" class="btn btn-filled">Archive</button>
            </div>
          </div>
        </section>

        <div class="divider" role="separator" aria-hidden="true"></div>

        <section class="card">
          <h2>Delete this board?</h2>
          <p class="lead">Confirmation title, danger action, and dismiss control.</p>
          <div class="row">
            <button type="button" class="btn btn-text">cancel Cancel</button>
            <button type="button" class="btn btn-filled">Delete</button>
          </div>
        </section>

        <section class="card">
          <h2>Navigation</h2>
          <div class="row">
            <button type="button" class="chip active selected">Boards</button>
            <button type="button" class="chip assist">Inbox</button>
            <button type="button" class="chip assist">Settings</button>
          </div>
        </section>

        <section class="card">
          <h2>Lists</h2>
          <div class="list">
            <div class="list-item">
              <span class="avatar">JM</span>
              <div class="meta">
                <div class="headline">Jamie Morgan</div>
                <div class="supporting">Reviewing PR #842</div>
              </div>
              <button type="button" class="icon-btn" aria-label="Jamie Morgan details"><span class="icon-wrap"><span class="material-symbols-rounded" aria-hidden="true">chevron_right</span></span></button>
            </div>
            <div class="list-item">
              <span class="avatar">SR</span>
              <div class="meta">
                <div class="headline">Sam Rivera</div>
                <div class="supporting">Mentioned you on Realtime presence</div>
              </div>
              <button type="button" class="icon-btn" aria-label="Sam Rivera details"><span class="icon-wrap"><span class="material-symbols-rounded" aria-hidden="true">chevron_right</span></span></button>
            </div>
          </div>
        </section>

        <div class="snackbar">
          <span>Board saved</span>
          <button type="button">Undo</button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .components-page {
      display: grid;
      gap: var(--beacon-space-5);
      max-width: 72rem;
      margin: 0 auto;
    }

    .showcase {
      display: grid;
      gap: var(--beacon-space-4);
    }

    .page-header .titles {
      min-width: 0;
    }

    .page-header .trailing {
      display: flex;
      align-items: center;
      gap: var(--beacon-space-2);
      flex-wrap: wrap;
    }

    .card {
      display: grid;
      gap: var(--beacon-space-3);
      padding: var(--beacon-space-5);
      border: 1px solid color-mix(in srgb, var(--beacon-color-outline) 70%, transparent);
      border-radius: var(--beacon-radius-lg);
      background: var(--beacon-color-surface);
      box-shadow: var(--beacon-shadow-1);
    }

    .card h2,
    .lead {
      margin: 0;
    }

    .lead {
      color: var(--beacon-color-on-surface-variant);
    }

    .swatch-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
      gap: var(--beacon-space-3);
    }

    .swatch {
      display: grid;
      align-content: space-between;
      min-height: 6rem;
      border-radius: var(--beacon-radius-md);
      padding: var(--beacon-space-4);
      font-weight: 700;
    }

    .swatch-primary { color: #fff; background: var(--beacon-color-primary); }
    .swatch-secondary { color: #001f2a; background: var(--beacon-color-secondary); }
    .swatch-tertiary { color: #001f2a; background: var(--beacon-color-tertiary); }
    .swatch-surface { color: var(--beacon-color-on-surface); background: var(--beacon-color-surface-container); }

    .type-row {
      padding-block: var(--beacon-space-2);
      border-bottom: 1px solid color-mix(in srgb, var(--beacon-color-outline) 55%, transparent);
    }

    .display {
      font-size: 3rem;
      line-height: 1.1;
      font-weight: 650;
    }

    .headline {
      font-size: 1.75rem;
      font-weight: 650;
    }

    .headline-small {
      font-size: 1.5rem;
      font-weight: 650;
    }

    .title-large,
    .title-medium,
    .title-small {
      font-weight: 700;
    }

    .title-large {
      font-size: 1.375rem;
    }

    .title-medium {
      font-size: 1rem;
    }

    .title-small,
    .label-large {
      font-size: 0.875rem;
    }

    .body-large {
      font-size: 1rem;
      line-height: 1.55;
    }

    .body-medium {
      color: var(--beacon-color-on-surface-variant);
      font-size: 0.875rem;
      line-height: 1.45;
    }

    .label-large {
      letter-spacing: 0;
      text-transform: uppercase;
    }

    .row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--beacon-space-2);
    }

    .btn,
    .fab {
      border: 0;
      cursor: pointer;
      font: inherit;
      font-weight: 700;
    }

    .btn {
      min-height: 2.5rem;
      border-radius: 999px;
      padding: 0 var(--beacon-space-4);
    }

    .btn.with-icon,
    .chip,
    .icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--beacon-space-2);
    }

    .btn:disabled {
      opacity: 0.55;
      cursor: default;
    }

    .btn-filled,
    .fab {
      color: #fff;
      background: var(--beacon-color-primary);
    }

    .btn-tonal {
      color: var(--beacon-color-on-surface);
      background: var(--beacon-color-primary-container);
    }

    .btn-elevated {
      color: var(--beacon-color-primary);
      background: var(--beacon-color-surface-container);
      box-shadow: var(--beacon-shadow-1);
    }

    .btn-outlined {
      border: 1px solid var(--beacon-color-outline);
      color: var(--beacon-color-primary);
      background: transparent;
    }

    .btn-text {
      color: var(--beacon-color-primary);
      background: transparent;
    }

    .icon-btn {
      width: 2.5rem;
      height: 2.5rem;
      border: 0;
      border-radius: 50%;
      color: var(--beacon-color-primary);
      background: transparent;
      cursor: pointer;
      font: inherit;
    }

    .icon-btn.tonal {
      background: var(--beacon-color-primary-container);
    }

    .icon-btn.filled {
      color: #fff;
      background: var(--beacon-color-primary);
    }

    .icon-with-badge {
      position: relative;
      display: inline-flex;
    }

    .badge {
      position: absolute;
      top: -0.4rem;
      right: -0.5rem;
      display: inline-grid;
      place-items: center;
      min-width: 1rem;
      height: 1rem;
      border-radius: 999px;
      padding: 0 0.25rem;
      color: #fff;
      background: var(--beacon-color-danger);
      font-size: 0.625rem;
      font-weight: 800;
      line-height: 1;
    }

    .chip {
      min-height: 2rem;
      border: 1px solid var(--beacon-color-outline);
      border-radius: 999px;
      padding: 0 var(--beacon-space-3);
      color: var(--beacon-color-primary);
      background: var(--beacon-color-surface);
      cursor: pointer;
      font: inherit;
      font-weight: 650;
    }

    .chip.selected,
    .chip.active {
      color: var(--beacon-color-on-surface);
      background: var(--beacon-color-primary-container);
    }

    .chip.assist {
      border-color: transparent;
      color: var(--beacon-color-on-surface);
      background: var(--beacon-color-surface-container);
    }

    .fab {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 3.5rem;
      height: 3.5rem;
      border-radius: var(--beacon-radius-lg);
      padding: 0 var(--beacon-space-4);
      box-shadow: var(--beacon-shadow-2);
    }

    .fab.small {
      min-width: 2.5rem;
      height: 2.5rem;
      border-radius: var(--beacon-radius-md);
    }

    .fab.surface {
      color: var(--beacon-color-primary);
      background: var(--beacon-color-surface-container);
    }

    .field-grid {
      display: grid;
      gap: var(--beacon-space-3);
      grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    }

    .field-grid label {
      display: grid;
      gap: var(--beacon-space-1);
      color: var(--beacon-color-on-surface-variant);
      font-weight: 650;
    }

    .field-grid .field {
      position: relative;
      display: block;
    }

    .field-grid input,
    .field-grid textarea {
      width: 100%;
      border: 1px solid var(--beacon-color-outline);
      border-radius: var(--beacon-radius-sm);
      padding: 1.35rem var(--beacon-space-3) var(--beacon-space-2);
      background: var(--beacon-color-surface);
      font: inherit;
    }

    .text-field .floating-label {
      position: absolute;
      top: 0.35rem;
      left: var(--beacon-space-3);
      color: var(--beacon-color-primary);
      font-size: 0.75rem;
      line-height: 1;
      pointer-events: none;
    }

    .text-field.error input {
      border-color: var(--beacon-color-danger);
    }

    .text-field.filled input {
      border-color: transparent;
      background: var(--beacon-color-surface-container);
    }

    .text-field.error .floating-label,
    .text-field.error .supporting {
      color: var(--beacon-color-danger);
    }

    .supporting {
      color: var(--beacon-color-on-surface-variant);
      font-size: 0.8125rem;
      line-height: 1.35;
    }

    .switch {
      position: relative;
      display: inline-flex;
      width: 3.25rem;
      height: 2rem;
    }

    .switch input {
      opacity: 0;
    }

    .switch .track {
      position: absolute;
      inset: 0;
      border-radius: 999px;
      background: var(--beacon-color-primary);
    }

    .switch .thumb {
      position: absolute;
      top: 0.25rem;
      right: 0.25rem;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background: #fff;
      box-shadow: var(--beacon-shadow-1);
    }

    .checkbox-row {
      display: inline-flex;
      align-items: center;
      gap: var(--beacon-space-2);
      font-weight: 650;
    }

    .dialog-preview {
      max-width: 28rem;
      border-radius: var(--beacon-radius-xl);
      padding: var(--beacon-space-5);
      background: var(--beacon-color-surface-container-high);
      box-shadow: var(--beacon-shadow-2);
    }

    .dialog-preview h3,
    .dialog-preview p {
      margin: 0 0 var(--beacon-space-3);
    }

    .dialog-icon {
      display: inline-grid;
      place-items: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      color: var(--beacon-color-danger);
      background: var(--beacon-color-danger-container);
      font-size: 1.35rem;
    }

    .divider {
      height: 1px;
      background: color-mix(in srgb, var(--beacon-color-outline) 70%, transparent);
    }

    .elevated {
      background: var(--beacon-color-surface-container);
      box-shadow: var(--beacon-shadow-2);
    }

    .list {
      display: grid;
      gap: var(--beacon-space-2);
    }

    .list-item {
      display: flex;
      align-items: center;
      gap: var(--beacon-space-3);
      justify-content: space-between;
      border-radius: var(--beacon-radius-md);
      padding: var(--beacon-space-3);
      background: var(--beacon-color-surface-container);
    }

    .avatar {
      display: inline-grid;
      place-items: center;
      flex: 0 0 auto;
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      color: #fff;
      background: var(--beacon-color-primary);
      font-size: 0.8125rem;
      font-weight: 800;
    }

    .meta {
      flex: 1;
      min-width: 0;
    }

    .list-item .headline {
      color: var(--beacon-color-on-surface);
      font-size: 0.95rem;
      font-weight: 700;
    }

    .icon-wrap {
      display: inline-grid;
      place-items: center;
    }

    .snackbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--beacon-space-3);
      max-width: 36rem;
      border-radius: var(--beacon-radius-sm);
      padding: var(--beacon-space-3) var(--beacon-space-4);
      color: #fff;
      background: #2d3132;
      box-shadow: var(--beacon-shadow-2);
    }

    .snackbar button {
      border: 0;
      color: var(--beacon-color-tertiary);
      background: transparent;
      font: inherit;
      font-weight: 700;
    }
  `]
})
export class ComponentsPageComponent {}
