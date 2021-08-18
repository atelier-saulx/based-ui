export default ({ head, body }) => {
  return `
    <html>
        <head>${head}</head>
        <body>
            <div id="react"/>
            ${body}
        </body>
    </html>
  `
}
