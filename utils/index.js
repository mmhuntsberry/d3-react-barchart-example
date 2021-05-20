export const getTotalNumberOfViewers = (query, data) => {
  return data.reduce((acc, curr) => {
    // Find the item that matches the query
    const index = acc.findIndex((item) => item[query] === curr[query]);

    // If the item is found
    // Add the current "Number of Viewers"
    // to that indexed "Number of Viewers" property
    index > -1
      ? (acc[index]["Number of Viewers"] += Number(curr["Number of Viewers"]))
      : // Else create an object with a key
        // of the query  (Example: "Program Title")
        // and a property called "Number of Viewers"
        // inititated at the current "Number of Viewers" value.
        acc.push({
          [query]: curr[query],
          ["Number of Viewers"]: Number(curr["Number of Viewers"]),
        });
    return acc;
  }, []);
};

export const getAverageNumberOfViewers = (query, data) => {
  const res = data.reduce((acc, curr) => {
    // Find the item that matches the query
    const index = acc.findIndex((item) => item[query] === curr[query]);

    if (index > -1) {
      acc[index]["Number of Viewers"] += Number(curr["Number of Viewers"]);
      // Create a running total of
      // of how many times we see a query (Example: "Program Title")
      acc[index]["total"] += 1;
    } else {
      acc.push({
        [query]: curr[query],
        ["Number of Viewers"]: Number(curr["Number of Viewers"]),
        total: 1,
      });
    }
    return acc;
  }, []);

  return res.map((r) => {
    return {
      [query]: r[query],
      // Use total to find the "average" number of users
      ["Average Number of Viewers"]: r["Number of Viewers"] / r.total,
    };
  });
};
