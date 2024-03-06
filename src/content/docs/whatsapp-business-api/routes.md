---
title: Configuring Routes
description: Handling routes in Express.js
---

First, for x-hub verification, the body is stored into the key `req.rawBody`.
The exported routes are being imported here and assigned to their respective routes.
Finally if any errors, are handled using error handlers.

```js
// app.js

// Copy raw body buffer to req["rawBody"] to generate x-hub signature
app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      req.rawBody = buf;
    },
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
```
