const render = async (_req, files) => {
  return `
    <html>
        <head>
            <link rel="stylesheet" href="/public/style.css" >
            <style>${files.css.contents}</style>
        </head>
        <body>
            <div id="root"></div>
            <script src="${files.js.path}"></script>
        </body>
    </html>
   `
}

module.exports = render
