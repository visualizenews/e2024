<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import {
        geoRobinson,
        geoHill,
        geoHyperelliptical,
        geoMollweide,
    } from "d3-geo-projection";
    // import { geoAlbers } from "d3-geo";
    // import { hexgrid } from "d3-hexgrid";
    import { hexbin } from "d3-hexbin";
    import countryNameMapping from "./countryNameMapping.js";
    import eu from "./eu.js";

    export let data;
    export let countries;

    let w;
    let h;
    let h2;

    let world;
    // let points;
    let cities;
    let bins;

    let width = 960;
    let height = width / 2;
    let svg;

    let projection; //  = geoMollweide();

    $: {
        // console.log("world", world);
        // console.log("bins", bins);
        // console.log("data", data);
        // console.log("eu", eu);
        // if (!projection && countries && world && bins?.length && w) {
        // projection = geoHyperelliptical().fitSize([w, (w * 9) / 16], world);
        // projection = geoMollweide().fitSize([width, height], world);

        // l = Math.min(Math.ceil(x1 - x0), dy);

        const xbin = hexbin()
            // .size([w, (w * 9) / 16])
            .size([w, w / 2])
            .radius(3)
            .x((d) => d.projection[0])
            .y((d) => d.projection[1]);

        // console.log(bins);

        d3.select(svg)
            .append("g")
            .attr("fill", "#ddd")
            .attr("stroke", "black")
            .selectAll("path")
            .data(bins ?? [])
            .enter()
            .append("path")
            .attr("transform", (d) => `translate(${d.x},${d.y})`)
            .attr("d", xbin.hexagon())
            .attr("fill", (bin) => {
                const cc = bin?.countryCodes?.[0];
                const votedStatus = [...data, ...eu].find(
                    (d) => d.country === cc,
                );
                if (votedStatus) {
                    return votedStatus.alreadyVoted ? "#735b00" : "#c4b889";
                } else {
                    return "#f1e9d4";
                }
            })
            .attr("stroke", "#bbb")
            // .attr("stroke-opacity", 0.25)
            .attr("stroke", (bin) => {
                const cc = bin?.countryCodes?.[0];
                const votedStatus = data.find((d) => d.country === cc);
                if (votedStatus) {
                    return votedStatus.alreadyVoted ? "#333" : "#333";
                } else {
                    return "#333";
                }
            })
            .attr("stroke-width", 0.5)
            // .style("stroke", (d) =>
            //     d.pointDensity ? "#fff3d5" : "#c4b889",
            // )
            .attr("data-country", (d) => d?.info?.[0] ?? "")
            .attr("data-countryCode", (d) => d?.countryCodes?.[0] ?? "");

        // d3.select(svg)
        //     .append("g")
        //     .selectAll("path")
        //     .data(hex.grid.layout.filter((d) => d.y < height - 110))
        //     .enter()
        //     .append("path")
        //     .attr("d", hex.hexagon())
        //     .attr("transform", (d) => `translate(${d.x} ${d.y})`)
        //     .style("fill", (d) => {
        //         if (d.pointDensity) {
        //             return d?.[0]?.alreadyVoted ? "#735b00" : "#c4b889";
        //         } else {
        //             return "none";
        //         }
        //     })
        //     .style("stroke", (d) =>
        //         d.pointDensity ? "#fff3d5" : "#c4b889",
        //     )
        //     .style("stroke-opacity", 0.5)
        //     .style("stroke-width", 0.5)
        //     .attr("data-country", (d) => {
        //         return d?.[0]?.country ?? "";
        //     });
        //}
    }

    onMount(async () => {
        const dsv = d3.dsv(";", "text/plain");
        const rawBins = await d3.json("./data/binsMollweide.json");
        [
            world,
            // cities,
            bins,
        ] = [
            await d3.json(
                "https://raw.githubusercontent.com/larsvers/map-store/master/earth-lands-10km.json",
            ),
            // await d3.dsv(";", "./data/geonames-postal-code@public.csv"),
            rawBins.map((d) => ({
                ...d,
                countryCodes: d.info.map((c) => {
                    const country = countries.find(
                        (c2) =>
                            c2.name.toLowerCase() ===
                            (countryNameMapping[c] || c).toLowerCase(),
                    );
                    // if (!country) {
                    //     console.log(c);
                    // }
                    return country ? country["alpha-2"] : null;
                }),
            })),
        ];
    });

    //     .style("fill", (d) => {
    //         if (d.pointDensity) {
    //             return d?.[0]?.alreadyVoted ? "#735b00" : "#c4b889";
    //         } else {
    //             return "none";
    //         }
    //     })
</script>

<div class="election-map" bind:clientWidth={w} bind:clientHeight={h}>
    {#if w}
        <svg
            bind:this={svg}
            width={w}
            height={w / 1.8}
            viewBox={`${width * 0.15} 0 ${width * 0.85} ${height * 0.85}`}
        ></svg>
        <ul class="color-key">
            <li>
                <span style="background-color: #735b00;" />Already voted
            </li>
            <li>
                <span style="background-color: #c4b889;" />Voting later in 2024
            </li>
        </ul>
    {/if}
</div>

<style>
    .election-map {
        width: 100%;
        height: fit-content;
        max-height: 90vh;
        overflow: visible;
        position: relative;
    }
    .election-map svg {
        /*position: absolute;*/
    }
    .color-key {
        position: relative;
        bottom: 0;
        left: 0;
        list-style: none;
        padding: 0;
        margin: 0;
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        flex-direction: row;
        gap: 1rem;
        font-size: 0.8rem;
    }
    .color-key li {
        display: flex;
        align-items: center;
    }
    .color-key span {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin-right: 0.5rem;
        border-radius: 15%;
    }

    @media screen and (min-width: 768px) {
        .election-map {
            height: 100%;
            overflow: visible;
        }
        .election-map svg {
            position: relative;
            top: auto;
        }
        .color-key {
            bottom: 20px;
            flex-direction: column;
            position: absolute;
        }
    }
</style>
