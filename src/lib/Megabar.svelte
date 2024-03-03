<script>
    import { onMount } from "svelte";
    import * as chrt from "chrt";

    export let data = [];
    export let options = {};
    export let width;

    let chart;

    onMount(() => {
        // console.log("chrt", chrt);
        const bar = megaBar(data, options);
        // console.log(bar);
        chart.appendChild(bar);
    });

    const megaBar = (data, options = {}) => {
        console.log(options);
        const h = 120;
        const middle =
            Math.floor(data.reduce((acc, d) => d[2] + acc, 0) / 2) + 1;
        const chart = chrt
            .Chrt()
            .size(width, h)
            .margins({ left: 0, right: 20, top: 0, bottom: 25 })
            .x({ domain: [0, null] })
            .y({ scale: "ordinal" });
        const stack = chrt.stack().orientation("left");
        data.filter((d) => d[2]).forEach((party) => {
            const labelFilter = options.labelFilter ?? (() => true);
            stack.add(
                chrt
                    .bars()
                    .data([
                        {
                            x: party[2],
                            y: 0,
                            party: party[0],
                        },
                    ])
                    .inset(0)
                    .fill(party?.[3] ?? "#000")
                    // .stroke(party?.[4] ?? '#fff')
                    // .strokeWidth(d => party?.[4] ? 1 : 0.5)
                    // .add(chrtTooltip.chrtTooltip().text((d) => "ciao"))
                    .add(
                        chrt
                            .labels()
                            .filter((d) => labelFilter(d))
                            .value(
                                (d) => `${d.x}${options.percentage ? "%" : ""}`,
                            )
                            .relativePosition([0.5, party[4] ?? 0])
                            .align("middle")
                            .valign(party[4] ? "bottom" : "top"),
                        // .color(party?.[2] ?? '#000')
                    ),
            );
            // .add(
            //   chrt.labels()
            //   .value(d => d.party)
            //   .relativePosition([0.5, 0])
            //   .align('middle')
            //   .valign('top')
            //   .color('#000')
            //   .class('choco-labels'))
            // )
        });
        chart.add(stack);
        if (options.majority) {
            chart.add(
                chrt
                    .xAxis(1)
                    .ticks([middle])
                    .ticksWidth(2)
                    .ticksLength(8)
                    .hideAxis(),
            );

            chart.add(
                chrt
                    .verticalRange()
                    .from(middle)
                    .stroke("#000")
                    .strokeWidth(2)
                    .class("mid-point"),
            );

            chart.add(
                chrt
                    .points()
                    .data([
                        {
                            x: middle,
                            y: 0,
                        },
                    ])
                    .fill("none")
                    .add(
                        chrt
                            .labels()
                            .value(
                                `${options.majorityText ?? middle} for a majority`,
                            )
                            .offset(0, h / 2 + 10),
                    ),
            );
        }
        return chart.node();
    };
</script>

<div bind:this={chart}></div>

<style>
    :global(svg) {
        overflow: visible;
        font-size: 10px;
        font-weight: normal;
        font-family: system-ui;
    }
    :global(svg .mid-point line) {
        stroke-dasharray: 4 6;
    }
</style>
