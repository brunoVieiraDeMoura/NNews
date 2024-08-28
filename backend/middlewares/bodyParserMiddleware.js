import bodyParser from "body-parser";

export const bodyParserMiddleware = (req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
};
