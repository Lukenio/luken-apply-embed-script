

# Embeddable Loanz.io Form Script

## How to Run

- `yarn` or `npm install` to install dependencies
- `yarn start` or `npm start` to run `example` folder locally (accessible at `localhost:8080` by default)
- `yarn run build` or `npm run build` to build and minify script and style (will be located in `dist` folder as `embed.min.js` and `embed.min.css`)

## Notes

Script is written in ES5 to avoid use of transpilers (most likely will increase file size which isn't good).

Also note that you will need to run `build` command every time files changed.

##  example embed code:

```
<script src="https://app.loanz.io/embed/embed.min.js"></script>
<a href="https://app.loanz.io/apply-embed/?partner_token=hj43h-4nj33jk-4j3nk3-nk43" class="loanz-apply-widget">Apply</a>
```
