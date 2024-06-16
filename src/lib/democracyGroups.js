const democracyGroups = [
  {
    name: "Full democracies",
    singularName: "Full democracy",
    range: [8, 10],
    color: "#00a651",
    descr:
      "are nations where civil liberties and fundamental political freedoms are not only respected but also reinforced by a political culture conducive to the thriving of democratic principles.These nations have a valid system of governmental checks and balances, an independent judiciary whose decisions are enforced, governments that function adequately, and diverse and independent media.These nations have only limited problems in democratic functioning.",
  },
  {
    name: "Flawed democracies",
    singularName: "Flawed democracy",
    range: [6, 8],
    color: "#f9a700",
    descr:
      "are nations where elections are fair and free and basic civil liberties are honoured but may have issues(e.g.media freedom infringement and minor suppression of political opposition and critics).These nations can have significant faults in other democratic aspects, including underdeveloped political culture, low levels of participation in politics, and issues in the functioning of governance.",
  },
  {
    name: "Hybrid regimes",
    singularName: "Hybrid regime",
    range: [4, 6],
    color: "#f9a700",
    descr: `are nations with regular electoral frauds,
    preventing them from being fair and free democracies.These nations
    commonly have governments that apply pressure on political opposition,
    non- independent judiciaries, widespread corruption, harassment
    and pressure placed on the media, anaemic rule of law, and more
    pronounced faults than flawed democracies in the realms of underdeveloped
    political culture, low levels of participation in politics, and
    issues in the functioning of governance.`,
  },
  {
    name: "Authoritarian regimes",
    singularName: "Authoritarian regime",
    range: [0, 4],
    color: "#ed1c24",
    descr: `are nations where political pluralism
    is nonexistent or severely limited.These nations are often absolute
    monarchies or dictatorships, may have some conventional institutions
    of democracy but with meagre significance, infringements and
    abuses of civil liberties are commonplace, elections(if they
    take place) are not fair or free(including sham elections),
    the media is often state - owned or controlled by groups associated
  with the ruling regime, the judiciary is not independent, and
    censorship and suppression of governmental criticism are commonplace.`,
  },
];

export const getDemocracyGroup = (score) =>
  score
    ? democracyGroups.find((g) => score >= g.range[0] && score < g.range[1])
    : null;

export default democracyGroups;
