const through = require("through2");
const fs = require("fs");

const deferRx = /<defer-html data-name="([\s\S]*?)">([\s\S]*?)<\/defer-html>/;
const defaults = {
  attr: "data-defer-html",
  tag: "div"
};

const handleTag = (name, filepath, content, opts) => {
  const path = filepath.split("/");
  const filename = path.pop();
  const lazyFilename = filename.replace(".html", `-${name}.html`);
  const lazyPath = [...path, lazyFilename].join("/");
  fs.writeFileSync(lazyPath, content);
  return `<${opts.tag} ${opts.attr}="${lazyFilename}"></${opts.tag}>`;
};

module.exports = (opts = {}) => through.obj((file, enc, cb) => {
  opts = { ...defaults, ...opts };
  let html = String(file.contents),
    match;

  while ((match = deferRx.exec(html)) !== null) {
    const [block, name, content] = match;
    const replacement = handleTag(name, file.path, content, opts);
    html = html.replace(deferRx, replacement);
  }

  file.contents = new Buffer(html);
  cb(null, file);
});
