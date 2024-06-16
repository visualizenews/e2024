<script>
    import { onMount } from "svelte";
    import { variance } from "d3-array";
    import * as chrt from "chrt";
    import democracyGroups from "./democracyGroups.js";
    export let data = [];
    export let democracyIndex = [];
    let chartNode;

    let w, h;

    function normalizeElection(data, percentage) {
        if (percentage) {
            return data;
        }
        const sum = data.reduce((acc, d) => acc + d[2], 0);
        // console.log(data, sum);
        return data.map((d) => {
            const newD = [...d];
            newD[2] = d[2] / sum;
            return newD;
        });
    }

    $: dataWithVariance = data.reduce(
        (acc, { country, elections, countryInfo }) => {
            const democracy = Object.values(democracyIndex).find(
                (di) => di["alpha-2"] === country,
            );

            const group = democracyGroups.find(
                (g) =>
                    democracy?.democracy_eiu >= g.range[0] &&
                    democracy?.democracy_eiu < g.range[1],
            );

            acc[country] = acc[country] ?? [];
            elections.forEach((election) => {
                if (election?.data?.length) {
                    acc[country].push({
                        country,
                        countryInfo,
                        data: election.data,
                        normalizedData: normalizeElection(
                            election.data,
                            elections?.options?.percentage,
                        ),
                        variance: variance(
                            normalizeElection(
                                election.data,
                                elections?.options?.percentage,
                            ),
                            (d) => {
                                return d[2];
                            },
                        ),
                        group,
                    });
                }
            });
            // (d3.variance(elections.data, (party) => party[2]));
            return acc;
        },
        {},
    );
    // $: console.log("democracyDotPlot dataWithVariance", dataWithVariance);
    $: maxVariance = Math.max(
        ...Object.values(dataWithVariance)
            .filter((d) => d?.[0])
            .map((d) => d[0].variance),
    );

    $: chart = chrt.Chrt();

    // $: console.log("democracyIndex", democracyIndex);
    //
    const interestingCountries = [
        "IN",
        "FI",
        "TW",
        "PK",
        "MX",
        "RU",
        "KR",
        "BY",
        "SV",
        "BD",
        "PT",
        "ID",
        "ZA",
        "AZ",
        "KH",
    ];

    onMount(() => {
        // console.log("chrt", chrt);
        const scatterPlot = democracyScatterplot(data);
        // console.log(bar);
        chartNode.appendChild(scatterPlot);

        document.querySelectorAll("g.point-label").forEach((el) =>
            el.addEventListener("click", (e) => {
                console.log(e.target);
            }),
        );
    });

    $: {
        chart?.size(w, h);
    }
    // $: console.log("Democracy DOTPOLOT", data);

    const democracyScatterplot = (data, options = {}) => {
        chart
            //.size(width, (width * 3) / 4)
            .size(w, h)
            .margins({ left: 0, right: 0, bottom: 0, top: 0 })
            .padding({ top: 20, left: 10 })
            .x([0, maxVariance * 1.1])
            .y({ scale: "ordinal" })
            .add(
                chrt
                    .yAxis()
                    .format((d) => unescape(d))
                    .hideAxis()
                    .hideTicks()
                    .setLabelPosition("inside")
                    .labelsColor("#000")
                    .labelsOffset([-10, -40]),
            )
            .add(
                chrt
                    .xAxis()
                    .color("#666")
                    .hideTicks()
                    .hideLabels()
                    .add(
                        chrt
                            .axisTitle("← Narrow margin")
                            .align("left")
                            .valign("bottom")
                            .fill("#999")
                            .offset({ x: 0, y: 0 }),
                    )
                    .add(
                        chrt
                            .axisTitle("Landslide victory →")
                            .align("right")
                            .valign("bottom")
                            .fill("#999")
                            .offset({ x: 0, y: 0 }),
                    ),
            )
            .add(
                chrt
                    .xAxis()
                    .orient("top")
                    .hideTicks()
                    .hideLabels()
                    .color("#666")
                    .add(
                        chrt
                            .axisTitle("← Narrow margin")
                            .align("left")
                            .valign("top")
                            .fill("#999")
                            .offset({ x: 0, y: 10 }),
                    )
                    .add(
                        chrt
                            .axisTitle("Landslide victory →")
                            .align("right")
                            .valign("top")
                            .fill("#999")
                            .offset({ x: 0, y: 10 }),
                    ),
            )
            .add(
                chrt
                    .dotPlot()
                    .data(
                        Object.values(dataWithVariance)
                            .filter((d) => d.length && d[0]?.group?.name)
                            .sort(
                                (a, b) =>
                                    democracyGroups.findIndex(
                                        (d) => d.name === a[0]?.group?.name,
                                    ) -
                                    democracyGroups.findIndex(
                                        (d) => d.name === b[0]?.group?.name,
                                    ),
                            ),
                        (d, i) => {
                            return {
                                x: d[0].variance,
                                y: d[0]?.group?.name,
                                alpha2: d[0]?.country,
                                country:
                                    d[0].countryInfo?.short ??
                                    d[0].countryInfo?.name,
                            };
                        },
                    )
                    .range()
                    .color((d) => d[0]?.group?.color ?? "#333")
                    .opacity(0.5)
                    .stroke((d) => d[0]?.group?.color ?? "#333")
                    .strokeWidth(1.5)
                    .radius(5)
                    .rangeWidth(1)
                    .rangeColor("#999")
                    .add(
                        chrt
                            .chrtLabels()
                            .value((d, i, arr) => {
                                return d.country;
                            })
                            .filter((d, i, arr) => {
                                return interestingCountries.includes(d.alpha2);
                            })
                            .offset(0, 10)
                            .align("middle")
                            .valign((d) =>
                                ["KM", "MX", "FI", "PT", "ID", "BY"].includes(
                                    d[0].country,
                                )
                                    ? "top"
                                    : "bottom",
                            )
                            .offset(0, (d) =>
                                ["KM", "MX", "FI", "PT", "ID", "BY"].includes(
                                    d[0].country,
                                )
                                    ? -7
                                    : 7,
                            )
                            .color("#999"),
                    ),
            );
        return chart.node();
    };
</script>

<div
    bind:this={chartNode}
    style="margin-top: 0.5rem"
    bind:clientWidth={w}
    bind:clientHeight={h}
    class="democracy-dotplot"
></div>

<style>
    .democracy-dotplot {
        position: relative;
        width: 100%;
        height: calc(70vh);
    }
    :global(svg) {
        overflow: visible;
        font-size: 10px;
        font-weight: normal;
        font-family: "Roboto Slab", serif, system-ui;
    }
    :global(.chrt-x-axis) {
        font-size: 12px;
        font-family: sans-serif, system-ui;
        text-transform: uppercase;
        fill: #666;
    }
    :global(.democracy-rank) {
        font-size: 14px;
    }
    :global(g.point-label:hover text) {
        font-weight: bold;
        cursor: pointer;
    }
</style>
