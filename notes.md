NextJS

By default pre0renders all pages (server-side rendering SSR)

Main reason for using NextJS

- With react, needs to wait for data to b loaded after we render the html page. With large data files can take time.
- React bad for SEO as root only server on the front end
- With Next it returns a pre-rendered page and al html content / finised page sent to user
- Great for SEO - search engine crawlers will see content as pre-rendered
- Only effects the initial load
- Hydrates with React code once loaded
- Two forms of pre-rendering
  -- Static Generation (deployed all static pages)
  -- Server-side Rendering (just in time, after deployment)

Staic Generation

inside components we can use
