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

#### License

<sup>
Licensed under either of <a href="LICENSE-APACHE">Apache License, Version
2.0</a> or <a href="LICENSE-MIT">MIT license</a> at your option.
</sup>

<br>

<sub>
Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in Sprachnachrichten.fm by you, as defined in the Apache-2.0 license, 
shall be dual licensed as above, without any additional terms or conditions.
</sub>
