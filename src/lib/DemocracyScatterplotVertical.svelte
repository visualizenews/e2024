<script>
    import { onMount } from "svelte";
    import { variance, extent } from "d3-array";
    import * as chrt from "chrt";
    export let data = [];
    export let allData = [];
    export let democracyIndex = [];
    export let width;
    export let group;
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
            acc[country] = acc[country] ?? [];
            elections.forEach((election) => {
                if (election?.data?.length) {
                    // console.log(country, election);
                    // console.log(
                    //     normalizeElection(
                    //         election.data,
                    //         elections?.options?.percentage,
                    //     ),
                    // );
                    // console.log("######");

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
                    });
                }
            });
            // (d3.variance(elections.data, (party) => party[2]));
            return acc;
        },
        {},
    );

    $: allDataWithVariance = allData.reduce(
        (acc, { country, elections, countryInfo }) => {
            acc[country] = acc[country] ?? [];
            elections.forEach((election) => {
                if (election?.data?.length) {
                    // console.log(country, election);
                    // console.log(
                    //     normalizeElection(
                    //         election.data,
                    //         elections?.options?.percentage,
                    //     ),
                    // );
                    // console.log("######");

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
                    });
                }
            });
            // (d3.variance(elections.data, (party) => party[2]));
            return acc;
        },
        {},
    );
    // $: console.log("dataWithVariance", dataWithVariance);
    $: maxVariance = Math.max(
        ...Object.values(allDataWithVariance)
            .filter((d) => d?.[0])
            .map((d) => d[0].variance),
    );

    $: chart = chrt.Chrt();

    // $: console.log("democracyIndex", democracyIndex);

    onMount(() => {
        // console.log("chrt", chrt);
        const scatterPlot = democracyScatterplot(data);
        chartNode.appendChild(scatterPlot);

        document.querySelectorAll("g.point-label").forEach((el) =>
            el.addEventListener("click", (e) => {
                console.log(e.target);
            }),
        );
    });

    $: {
        // console.log("SET SIZE", width);
        chart?.size(w, h);
        // if (chartNode) {
        //     const scatterPlot = democracyScatterplot(data);
        //     chartNode.appendChild(scatterPlot);
        // }
    }

    const democracyScatterplot = (data, options = {}) => {
        const democracyIndexRange = extent(
            data,
            (d) => d.democracy.democracy_eiu,
        );
        console.log("democracyIndexRange", democracyIndexRange);
        chart
            .size(w || width, h || width)
            .margins({
                left: 0,
                right: 0,
            })
            .padding({
                top: 0,
                bottom: 0,
                left: 15,
            })
            // .y([0.26, 9.9])
            //.y(group.range)
            .y(democracyIndexRange)
            .x([0, maxVariance * 1.1])
            .data(
                Object.values(dataWithVariance)
                    .filter((d) => d.length)
                    .sort((a, b) => a[0].variance - b[0].variance),
                (d, i) => {
                    // console.log("--->", d);
                    return {
                        x: d[0].variance,
                        y: democracyIndex[d[0].country]?.democracy_eiu,
                    };
                },
            )
            .add(
                chrt
                    .yAxis(0)
                    .hideAxis()
                    .add(
                        chrt
                            .axisTitle("← Narrow margin")
                            .align("right")
                            .valign("bottom")
                            .offset({ x: 0, y: 15 }),
                    ),
            )
            .add(
                chrt
                    .yAxis(0)
                    .orient("right")
                    .hideAxis()
                    .add(
                        chrt
                            .axisTitle("Landslide victory →")
                            .align("left")
                            .valign("bottom")
                            .offset({ x: 0, y: 15 }),
                    ),
            )
            .add(
                chrt
                    .horizontalRange()
                    .from(democracyIndexRange[0])
                    .to(democracyIndexRange[1])
                    .fill(group.color)
                    .fillOpacity(0.1)
                    .stroke("none"),
            )
            .add(
                chrt
                    .points()
                    .radius(4)
                    .stroke("#331a00")
                    .strokeOpacity(0.75)
                    .fill("none")
                    .strokeWidth(2)
                    .add(
                        chrt
                            .labels()
                            .value((d) => d[0].countryInfo.name)
                            .valign((d) =>
                                [
                                    "HR",
                                    "FI",
                                    "PA",
                                    "PL",
                                    "DO",
                                    "TW",
                                    "BT",
                                    "MG",
                                    // "SN",
                                ].includes(d[0].country)
                                    ? "bottom"
                                    : "top",
                            )
                            .offset(0, (d) => {
                                return [
                                    "HR",
                                    "FI",
                                    "PA",
                                    "PL",
                                    "DO",
                                    "TW",
                                    "BT",
                                    "MG",
                                    //"SN",
                                ].includes(d[0].country)
                                    ? 7
                                    : 0;
                            })
                            .class("point-label"),
                    )
                    .add(
                        chrt
                            .label()
                            .value(group.name)
                            .top(group.range[1])
                            .offset(-10, -20)
                            .left(0)
                            .align("start")
                            .valign("bottom")
                            .class("democracy-rank")
                            .fill(group.color),
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
    class="democracy-scatterplot-vertical"
></div>

<style>
    .democracy-scatterplot-vertical {
        position: relative;
        width: 100%;
        height: calc(60vh);
    }
    :global(svg) {
        overflow: visible;
        font-size: 10px;
        font-weight: normal;
        font-family: "Roboto Slab", serif, system-ui;
    }
    :global(.chrt-axis) {
        font-size: 14px;
    }
    :global(.democracy-rank) {
        font-size: 14px;
    }
    :global(g.point-label:hover text) {
        font-weight: bold;
        cursor: pointer;
    }
</style>
