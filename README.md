# gulp-defer-html

If you want to make your document smaller (just to remind you this is the most critical resource, nothing happens in the browser until it's loaded) and you have a bunch of hidden items or items that are not visible on the initial screen then you can defer it!

## Install

```
npm i -D gulp-defer-html
```

## Usage

### Wrap your html code that you want to defer with

```html
<defer-html data-name="my_html_code">
  This content will be loaded dynamically
</defer-html>
```

### Use `gulp-defer-html` plugin in your `gulpfile.js`

```js
const deferHtml = require("gulp-defer-html");

gulp
  .src("output/**/*.html")
  .pipe(deferHtml())
  .pipe(gulp.dest("output"));
```

### In the output you will get 

- extracted `.html` files with the content you want to load dynamically
- placeholders in the main `.html` files, for example:

```html
<div data-defer-html="my_html_code.html"></div>
```

## Options

`deferHtml` takes an object which may contain the following parameters:

```js
deferHtml({
  tag: 'p',  // 'div' by default,
  attr: 'my-custom-attr' // 'data-defer-html' by default
})
```

## Load html files dynamically

There are different ways how to import html files dynamically, for example [link rel="import"](https://www.html5rocks.com/en/tutorials/webcomponents/imports/) from WebComponents API, 
but here is another npm module with the full browsers support: https://www.npmjs.com/package/defer-html Check it out!