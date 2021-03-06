# sprachanchrichten.fm

The website of the German podcast Sprachnachrichten: 
[sprachnachrichten.fm](https://sprachnachrichten.fm).

## Get started

With node and yarn installed run:

```
$ yarn install
$ yarn start
```

to start the live-reloading development server. `yarn build` will do a 
production build to `_site`.

## Architecture

This is a static [11ty](https://www.11ty.dev) website, which uses a WordPress
backend with [Podlove Publisher](https://publisher.podlove.org) to generate the 
feed, shownotes, analytics etc. When an episode is created or modified it will
trigger a re-build of this site on Netlify.
