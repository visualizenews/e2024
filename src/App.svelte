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
        const countriesResponse = await fetch("./data/countries.json");
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
                                        hasData: election?.data?.length,
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
</header>
<section id="intro" class="contents">
    <header>
        <p>
            In the year 2024 almost 70 countries will hold elections, people in
            8 of the 10 most populous countries in the world — <a href="#BD"
                >Bangladesh</a
            >, <a href="#BR">Brazil</a>, India, <a href="#ID">Indonesia</a>,
            <a href="#MX">Mexico</a>,
            <a href="#PK">Pakistan</a>, <a href="#RU">Russia</a> and the
            <a href="#US">United States</a>— will cast a vote.
        </p>
    </header>
</section>
<Calendar data={calendarData} />
<section id="charts" class="contents">
    {#each data.sort((a, b) => +new Date(a.elections[0].date) - +new Date(b.elections[0].date)) as country}
        <div id={country.country} class="country">
            <h2>{country.countryInfo.name}</h2>
            {#each country.elections.sort((a, b) => +new Date(a.date) - +new Date(b.date)) as election}
                <div class="election" bind:offsetWidth={width}>
                    <h3>
                        {new Intl.DateTimeFormat("en-GB", {
                            dateStyle: "full",
                        }).format(new Date(election.date))}
                    </h3>
                    {#if election.description}
                        <b style="margin-botton: 1rem;"
                            >{election.description}</b
                        >
                    {/if}
                    {#if election.summary}
                        <p style="margin-bottom: 1rem">{election.summary}</p>
                    {/if}
                    {#if (election?.data?.length ?? 0) === 0}
                        <p>No data available</p>
                    {:else}
                        <Megabar
                            data={election.data}
                            options={election.options}
                            {width}
                        />
                        <Legend data={election.data} />
                        {#if election.notes}
                            <p class="notes">{election.notes}</p>
                        {/if}
                    {/if}
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
        padding: 10px;
        position: relative;
    }
    #charts {
        flex-direction: column;
    }
    :global(.country) {
        width: 100%;
        margin-bottom: 60px;
        scroll-margin-top: 200px;
    }
    :global(.country .election) {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 2.5rem;
    }
    .contents h2 {
        font-size: 16px;
        font-weight: 400;
        text-transform: uppercase;
    }

    .contents h3 {
        font-size: 14px;
        font-weight: 200;
    }

    .contents header {
        max-width: 600px;
    }

    .election p.notes {
        font-style: italic;
        margin-top: 20px;
    }

    @media screen and (min-width: 768px) {
        .contents header {
            max-width: 100%;
        }
        header p {
            font-size: 28px;
            width: 100%;
            margin-bottom: 50px;
        }
        .contents h2 {
            font-size: 24px;
        }
        .contents h3 {
            font-size: 18px;
        }
    }
</style>
