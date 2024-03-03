<script>
    import { onMount } from "svelte";
    import Calendar from "./lib/Calendar.svelte";
    import { Runtime } from "@observablehq/runtime";
    import define from "https://api.observablehq.com/d/17358da922d09a68@22.js?v=4";
    import Megabar from "./lib/Megabar.svelte";
    import Legend from "./lib/Legend.svelte";

    let data = [];
    let calendarData = [];
    let width = 600;
    let countries = [];

    onMount(async () => {
        const countriesResponse = await fetch("/countries.json");
        countries = await countriesResponse.json();

        const runtime = new Runtime();
        const main = runtime.module(define, (name) => {
            if (name === "elections")
                return {
                    pending() {},
                    fulfilled(value) {
                        data = value;
                        // console.log("data", data);

                        data = Object.entries(value).map((d) => ({
                            country: d[0],
                            elections: d[1],
                            countryInfo: countries.find(
                                (c) => c["alpha-2"] === d[0],
                            ),
                        }));
                        console.log("data", data);
                        calendarData = data.reduce((acc, d) => {
                            acc = [
                                ...acc,
                                ...d.elections.map((election) => {
                                    return {
                                        date: election.date,
                                        country: d.country,
                                        countryInfo: d.countryInfo,
                                    };
                                }),
                            ];
                            // console.log(country, elections);

                            return acc;
                        }, []);
                        console.log("calendarData", calendarData);
                    },
                    rejected(error) {
                        console.error(`${name}: rejected`, error);
                    },
                };
        });
    });
</script>

<header id="header">
    <h1 class="show-calendar">2024 The Elections Year</h1>
    <Calendar data={calendarData} />
</header>
<section id="intro" class="contents">
    <header>
        <h3>
            In the year 2024 almost 70 countries will hold elections, people in
            8 of the 10 most populous countries in the world —Bangladesh,
            Brazil, India, Indonesia, Mexico, Pakistan, Russia and the United
            States— will cast a vote.
        </h3>
    </header>
</section>

<section id="charts" class="contents">
    {#each data.sort((a, b) => +new Date(a.elections[0].date) - +new Date(b.elections[0].date)) as country}
        <div class="country">
            <h2>{country.countryInfo.name}</h2>
            {#each country.elections.sort((a, b) => +new Date(a.date) - +new Date(b.date)) as election}
                <div class="election" bind:offsetWidth={width}>
                    <h3>{election.date}</h3>
                    <p>{election.description}</p>
                    <Legend data={election.data} />
                    <Megabar
                        data={election.data}
                        options={election.options}
                        {width}
                    />
                </div>
            {/each}
        </div>
    {/each}
</section>
<footer></footer>

<style>
    .contents {
        align-items: center;
        display: flex;
        justify-content: center;
        /*min-height: 80vh;*/
        padding: 40px;
        position: relative;
    }
    #charts {
        flex-direction: column;
    }
    :global(.country) {
        margin-bottom: 40px;
    }
    :global(.country .election) {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    .contents h2 {
        font-size: 16px;
        font-weight: 400;
        text-transform: uppercase;
    }

    .contents h3 {
        font-size: 16px;
        font-weight: 200;
    }

    .contents em {
        filter: grayscale(100);
        font-style: normal;
        text-decoration: underline;
    }

    .contents header {
        max-width: 600px;
    }

    /*.contents::after {
        animation-direction: alternate;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-name: jump;
        bottom: 0;
        content: "☟";
        display: block;
        font-size: 32px;
        left: 50%;
        position: absolute;
        transform: translate3d(-50%, 0, 0);
        }*/

    @media screen and (min-width: 768px) {
        .contents h2,
        .contents h3 {
            font-size: 24px;
        }
    }
</style>
