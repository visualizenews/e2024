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

    export let data;

    let w;
    let h;

    let world;
    // let points;
    let cities;
    let bins;

    let width = 1200;
    let height = 600;
    let svg;

    let projection;

    // $: {
    //     console.log("world", world);
    //     // console.log("points", points);
    //     console.log("cities", cities);
    //     console.log("data", data);

    //     if (!projection && world && data?.length && cities && w) {
    //         projection = geoHyperelliptical().fitSize([w, (w * 9) / 16], world);
    //         // projection = geoRobinson().fitSize([width, height], world);
    //         let geoPath = d3.geoPath(projection);

    //         const grid = hexgrid()
    //             .extent([w, (w * 9) / 16])
    //             .geography(world)
    //             .pathGenerator(geoPath)
    //             .projection(projection)
    //             .hexRadius(50, "km")
    //             //.hexRadius(3)
    //             .gridExtend(0);

    //         console.log(
    //             "ONLY MAPPED",
    //             cities
    //                 .filter((d) => {
    //                     const countryData = data.find(
    //                         (c) => c.country === d.country,
    //                     );
    //                     return countryData;
    //                 })
    //                 .map((d) => ({
    //                     country: d.country,
    //                     lat: d.lat,
    //                     lon: d.lon,
    //                 })),
    //         );

    //         const hex = grid(
    //             cities.filter((d) => {
    //                 const countryData = data.find(
    //                     (c) => c.country === d.country,
    //                 );
    //                 d.alreadyVoted = countryData?.alreadyVoted;
    //                 return countryData;
    //             }),
    //             ["country", "date", "alreadyVoted"],
    //         );
    //         console.log("hex", hex.grid);

    //         d3.select(svg)
    //             .append("g")
    //             .selectAll("path")
    //             .data(hex.grid.layout.filter((d) => d.y < height - 110))
    //             .enter()
    //             .append("path")
    //             .attr("d", hex.hexagon())
    //             .attr("transform", (d) => `translate(${d.x} ${d.y})`)
    //             .style("fill", (d) => {
    //                 if (d.pointDensity) {
    //                     return d?.[0]?.alreadyVoted ? "#735b00" : "#c4b889";
    //                 } else {
    //                     return "none";
    //                 }
    //             })
    //             .style("stroke", (d) =>
    //                 d.pointDensity ? "#fff3d5" : "#c4b889",
    //             )
    //             .style("stroke-opacity", 0.5)
    //             .style("stroke-width", 0.5)
    //             .attr("data-country", (d) => {
    //                 return d?.[0]?.country ?? "";
    //             });
    //     }
    // }
    $: {
        console.log("world", world);
        console.log("bins", bins);
        if (!projection && world && bins?.length && w) {
            // projection = geoHyperelliptical().fitSize([w, (w * 9) / 16], world);
            // // projection = geoRobinson().fitSize([width, height], world);
            // let geoPath = d3.geoPath(projection);
            const xbin = hexbin()
                .size([w, (w * 9) / 16])
                .radius(3)
                .x((d) => d.projection[0])
                .y((d) => d.projection[1]);

            console.log(bins);

            d3.select(svg)
                .append("g")
                .attr("fill", "#ddd")
                .attr("stroke", "black")
                .selectAll("path")
                .data(bins)
                .enter()
                .append("path")
                .attr("transform", (d) => `translate(${d.x},${d.y})`)
                .attr("d", xbin.hexagon())
                .attr("fill", (bin) => "#f60");

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
        }
    }

    onMount(async () => {
        const dsv = d3.dsv(";", "text/plain");
        [
            world,
            // cities,
            bins,
        ] = [
            await d3.json(
                "https://raw.githubusercontent.com/larsvers/map-store/master/earth-lands-10km.json",
            ),
            // await d3.dsv(";", "./data/geonames-postal-code@public.csv"),
            await d3.json("./data/binsMollweide.json"),
        ];
    });
</script>

<div class="election-map" bind:clientWidth={w} bind:clientHeight={h}>
    <svg bind:this={svg} width={w} height={(w * 9) / 16}></svg>
    <ul class="color-key">
        <li>
            <span style="background-color: #735b00;" />Already voted
        </li>
        <li>
            <span style="background-color: #c4b889;" />Voting later in 2024
        </li>
    </ul>
</div>

<style>
    .election-map {
        width: 100%;
        height: 100%;
        overflow: visible;
        position: relative;
    }
    .color-key {
        position: absolute;
        bottom: 100px;
        left: 0;
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        flex-direction: column;
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
</style>
