<script>
    import { onMount } from "svelte";
    import { variance } from "d3-array";
    import * as chrt from "chrt";
    export let data = [];
    export let democracyIndex = [];
    export let width;
    let chartNode;

    function normalizeElection(data, percentage) {
        if (percentage) {
            return data;
        }
        const sum = data.reduce((acc, d) => acc + d[2], 0);
        console.log(data, sum);
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
        ...Object.values(dataWithVariance)
            .filter((d) => d?.[0])
            .map((d) => d[0].variance),
    );

    $: chart = chrt.Chrt();

    // $: console.log("democracyIndex", democracyIndex);

    onMount(() => {
        // console.log("chrt", chrt);
        const scatterPlot = democracyScatterplot(data);
        // console.log(bar);
        chartNode.appendChild(scatterPlot);
    });
    // $: {
    //     if (data) {
    //         const scatterPlot = democracyScatterplot(data);
    //         // console.log(bar);
    //         if (chartNode) {
    //             chartNode.appendChild(scatterPlot);
    //         }
    //     }
    // }
    $: {
        // console.log("width", width);
        chart?.size(width, (width * 9) / 16);
    }

    const democracyScatterplot = (data, options = {}) => {
        chart
            .size(width, (width * 9) / 16)
            .margins({
                left: 0,
                right: 0,
            })
            .x([0, 10])
            .y([0, maxVariance * 1.1])
            .data(
                Object.values(dataWithVariance)
                    .filter((d) => d.length)
                    .sort((a, b) => a[0].variance - b[0].variance),
                (d, i) => {
                    console.log("--->", d);
                    return {
                        y: d[0].variance,
                        x: democracyIndex[d[0].country]?.democracy_eiu,
                    };
                },
            )
            .add(
                chrt
                    .yAxis(0)
                    .hideAxis()
                    .add(
                        chrt
                            .axisTitle("↓ Close call")
                            .align("right")
                            .valign("bottom")
                            .offset({ x: 0, y: 10 }),
                    )
                    .add(
                        chrt
                            .axisTitle("↑ Landslide victory")
                            .align("right")
                            .valign("top")
                            .offset({ x: 0, y: -5 }),
                    ),
            )
            .add(
                chrt
                    .yAxis(0)
                    .orient("right")
                    .hideAxis()
                    .add(
                        chrt
                            .axisTitle("Close call ↓")
                            .align("left")
                            .valign("bottom")
                            .offset({ x: 0, y: 10 }),
                    )
                    .add(
                        chrt
                            .axisTitle("Landslide victory ↑")
                            .align("left")
                            .valign("top")
                            .offset({ x: 0, y: -5 }),
                    ),
            )
            .add(
                chrt
                    .verticalRange()
                    .from(8)
                    .to(10)
                    .fill("#2f5cd5")
                    .fillOpacity(0.1)
                    .stroke("none"),
            )
            .add(
                chrt
                    .verticalRange()
                    .from(6)
                    .to(7.99)
                    .fill("#6bd2df")
                    .fillOpacity(0.1)
                    .stroke("none"),
            )
            .add(
                chrt
                    .verticalRange()
                    .from(4)
                    .to(5.99)
                    .fill("#fad45d")
                    .fillOpacity(0.1)
                    .stroke("none"),
            )
            .add(
                chrt
                    .verticalRange()
                    .from(0)
                    .to(3.99)
                    .fill("#a8261f")
                    .fillOpacity(0.1)
                    .stroke("none"),
            )
            .add(
                chrt
                    .points()
                    .radius(4)
                    .fill("#333")
                    .add(chrt.labels().value((d) => d[0].countryInfo.name))
                    .add(
                        chrt
                            .label()
                            .value("Authoritarian regimes")
                            .left(2)
                            .offset(0, 5)
                            .top(
                                Math.max(
                                    ...Object.values(dataWithVariance)
                                        .filter((d) => d?.[0])
                                        .map((d) => d[0].variance),
                                ) * 1.1,
                            )
                            .align("middle")
                            .valign("bottom")
                            .class("democracy-rank")
                            .fill("#a8261f"),
                    )
                    .add(
                        chrt
                            .label()
                            .value("Hybrid regimes")
                            .left(5)
                            .top(maxVariance * 1.1)
                            .offset(0, 5)
                            .align("middle")
                            .valign("bottom")
                            .class("democracy-rank")
                            .fill("rgb(175 141 33)"),
                    )
                    .add(
                        chrt
                            .label()
                            .value("Flawed democracies")
                            .left(7)
                            .offset(0, 5)
                            .top(maxVariance * 1.1)
                            .align("middle")
                            .valign("bottom")
                            .class("democracy-rank")
                            .fill("rgb(71 172 184)"),
                    )
                    .add(
                        chrt
                            .label()
                            .value("Full democracies")
                            .left(9)
                            .offset(0, 5)
                            .top(maxVariance * 1.1)
                            .align("middle")
                            .valign("bottom")
                            .class("democracy-rank")
                            .color("#2f5cd5")
                            .fill("#2f5cd5"),
                    ),
            );
        return chart.node();
    };
</script>

<div bind:this={chartNode} style="margin-top: 0.5rem"></div>

<style>
    :global(svg) {
        overflow: visible;
        font-size: 10px;
        font-weight: normal;
        font-family: system-ui;
    }
</style>
