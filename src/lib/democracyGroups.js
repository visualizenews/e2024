const democracyGroups = [
  {
    name: "Full democracies",
    singularName: "Full democracy",
    range: [8, 10],
    color: "#00a651",
  },
  {
    name: "Flawed democracies",
    singularName: "Flawed democracy",
    range: [6, 8],
    color: "#f9a700",
  },
  {
    name: "Hybrid regimes",
    singularName: "Hybrid regime",
    range: [4, 6],
    color: "#f9a700",
  },
  {
    name: "Authoritarian regimes",
    singularName: "Authoritarian regime",
    range: [0, 4],
    color: "#ed1c24",
  },
];

export const getDemocracyGroup = (score) =>
  score
    ? democracyGroups.find((g) => score >= g.range[0] && score < g.range[1])
    : null;

export default democracyGroups;
