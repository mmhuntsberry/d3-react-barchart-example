import { getAverageNumberOfViewers, getTotalNumberOfViewers } from ".";

const data = [
  {
    "Program Title": "Wilfred",
    "Program Genre": "Comedy",
    "Number of Viewers": 200,
  },
  {
    "Program Title": "Wilfred",
    "Program Genre": "Comedy",
    "Number of Viewers": 400,
  },
  {
    "Program Title": "American Gothic",
    "Program Genre": "Horror",
    "Number of Viewers": 200,
  },
  {
    "Program Title": "American Gothic",
    "Program Genre": "Horror",
    "Number of Viewers": 1400,
  },
];

test("Should return total num of viewers for 'Program Title'", () => {
  expect(getTotalNumberOfViewers("Program Title", data)).toMatchObject([
    {
      "Program Title": "Wilfred",
      "Number of Viewers": 600,
    },
    {
      "Program Title": "American Gothic",
      "Number of Viewers": 1600,
    },
  ]);
});

test("Should return total num of viewers for 'Program Genre'", () => {
  expect(getTotalNumberOfViewers("Program Genre", data)).toMatchObject([
    {
      "Program Genre": "Comedy",
      "Number of Viewers": 600,
    },
    {
      "Program Genre": "Horror",
      "Number of Viewers": 1600,
    },
  ]);
});

test("Should return average num of viewers for 'Program Title'", () => {
  expect(getAverageNumberOfViewers("Program Title", data)).toMatchObject([
    {
      "Program Title": "Wilfred",
      "Average Number of Viewers": 300,
    },
    {
      "Program Title": "American Gothic",
      "Average Number of Viewers": 800,
    },
  ]);
});

test("Should return average num of viewers for 'Program Genre'", () => {
  expect(getAverageNumberOfViewers("Program Genre", data)).toMatchObject([
    {
      "Program Genre": "Comedy",
      "Average Number of Viewers": 300,
    },
    {
      "Program Genre": "Horror",
      "Average Number of Viewers": 800,
    },
  ]);
});

test("Should NOT return average num of viewers for 'Program Genre'", () => {
  expect(getAverageNumberOfViewers("Program Genre", data)).not.toMatchObject([
    {
      "Program Genre": "Drama",
      "Average Number of Viewers": 1200,
    },
    {
      "Program Genre": "Adventure",
      "Average Number of Viewers": 800,
    },
  ]);
});
