  
export default () => {
    return `<!doctype html>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
          <link href = "https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <meta charset="utf-8">
          <title>SSR Template</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/javascript" src="/dist/bundle.js"></script>
        </body>
      </html>`
}