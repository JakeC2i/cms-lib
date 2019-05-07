// Server essentials

function setCorsHeaders(req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}

function inputTextBody(req, res, next) {
  let data: string = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    data += chunk;
  });

  req.on('end', function() {
    req.body = data;
    next();
  });
}

function parseJsonBody(req, res, next) {
  if (req.get('Content-Type') !== 'application/json') {
    return next();
  }
  let body: any;
  try {
    body = JSON.parse(req.body);
  } catch (err) {
    return next();
  }
  req.body = body;
  next();
}

function optionsResponse(methods: string[]) {
  return function(req, res) {
    res.header(
      'Access-Control-Allow-Methods',
      methods
        .map(m => m.toUpperCase())
        .join(', ')
    );
    res.status(200).send('ok');
  }
}


module.exports = {
  setCorsHeaders,
  inputTextBody,
  parseJsonBody,
  optionsResponse
};
