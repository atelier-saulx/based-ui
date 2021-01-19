export default ({ head, body }) => {
  return `
    <html>
        <head>${head}</head>
        <body>
            <div id="root"/>
            ${body}xxxxxxxxxxxxxxxxxxxx
        </body>
    </html>
  `
}
