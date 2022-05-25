function getJsonFromUrl(url: string) {
  const query = url.split("?")[1] || null;
  var result: any = {};

  if (query) {
    query.split("&").forEach(function (part) {
      var item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });
  }

  return result;
}

export const useUrl = () => {
  return { getJsonFromUrl };
};
