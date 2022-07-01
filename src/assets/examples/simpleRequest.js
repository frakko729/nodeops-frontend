let request = require("request");

exports.myExternalAdapter = (req, res) => {
  const url = "https://some-api.example.com/api";
  const coin = req.body.data.coin || "";
  const market = req.body.data.market || "";
  let requestObj = {
    coin: coin,
    market: market,
  };
  let headerObj = {
    API_KEY: "abcd-efgh-ijkl-mnop-qrst-uvwy",
  };
  let options = {
    url: url,
    headers: headerObj,
    qs: requestObj,
    json: true,
  };

  request(options, (error, response, body) => {
    if (error || response.statusCode >= 400) {
      let errorData = {
        jobRunID: req.body.id,
        status: "errored",
        error: body,
      };
      res.status(response.statusCode).send(errorData);
    } else {
      let returnData = {
        jobRunID: req.body.id,
        data: body,
      };
      res.status(response.statusCode).send(returnData);
    }
  });
};
