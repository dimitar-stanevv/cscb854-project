# CSCB854 Demo Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

You can also use `npm start`.

## Project description

This project was created as a demo project for CSCB854 in order to showcase some of the modern web technologies. The project is hosted at:

`https://cscb854-demo-project.netlify.app`

Please, head over to the hosted website and take a look. The project is self-documented in an artistic way.

### Scroll animations

One of the main parts of the project I've done work on is the scroll-animation directive. It allows us to easily apply animations to components using the powerful directive syntax from Angular.

Usage:

`<div class="my-div" scrollAnimation="fade-up">This div will be animated once scrolled into view</div>`

Types of animation available:
- `fade-in` (opacity change)
- `fade-up` / `fade-left` / `fade-right` / `fade-right-large` (movement and opacity change)
- `grow` / `grow-small` / `grow-height` / `grow-height-extended` / `grow-width` (size change)
- `blur` (shrink and blur-out into view)

Parameters:
- `sensitivity`: At what point to make the element visible regarding current scroll position. Measured as the distance from top of the element to the bottom of the window area (in pixels)
- `duration`: Duration of the animation in milliseconds. Under the hood, this is the "transition-duration" CSS property. Default is 1000ms (it's provided in CSS). Negative values are ignored and the default is used instead
- `delay`: Delay of the animation in milliseconds. Default is 0ms (no delay) - the animation will be applied immediately after the element is deemed visible (see "sensitivity"). Negative values are ignored and the default is used instead

Events:
- `onAnimationStarted`: Fired right after animation starts playing
- `onAnimationCompleted`: Fired right after animation is done

### Star trail effect background

The effect is achieved using **only** CSS. In the `trailing-lines-animation.component.scss` component styles you can see how I've achieved this. There are in total 80 lines (number can be adjusted) - divs with height = 1px and width random between 180px and 280px. The `left`, `top` and `rotation` properties are also randomized to achieve the effect. And the animation duration and delay are also random.
### Custom components

Several custom components are used:
- `animated-text-box`: Uses scrollAnimation directive under the hood to provide per-char or per-word animation of text)
- `custom-button`: Used in header
- `custom-input`: Used in Netlify test form
- `custom-link`: Used in feature cards
- `icon`: Used in feature cards links - uses SVGs under the hood w/ color manipulation
- `trailing-lines-animation`: The star trail effect in the background - all CSS and no JS

### Backend

There is one serverless Netlify function to showcase this functionality:
- send-email

An external SMTP server via a service (SendInBlue) is used. As such, the API key must not be exposed to the outside world and hence, the email request must be sent in the backend - this way the SIB API key stays hidden.

On the frontend, the service that calls it is `NetlifyService`.
