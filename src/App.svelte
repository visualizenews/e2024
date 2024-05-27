<script>
    import { onMount, afterUpdate } from "svelte";
    import Calendar from "./lib/Calendar.svelte";
    import Search from "./lib/Search.svelte";
    import { Runtime } from "@observablehq/runtime";
    import define from "https://api.observablehq.com/d/17358da922d09a68@22.js?v=4";
    import Megabar from "./lib/Megabar.svelte";
    import Footer from "./lib/Footer.svelte";
    import DemocracyScatterplot from "./lib/DemocracyScatterplot.svelte";
    import DemocracyScatterplotVertical from "./lib/DemocracyScatterplotVertical.svelte";
    import Legend from "./lib/Legend.svelte";
    import Map from "./lib/Map.svelte";

    let data = [];
    let calendarData = [];
    let width = 600;
    let countries = [];
    let democracyIndex = [];
    let boxElList = [];
    let selected;

    // $: active = null;

    // $: console.log("ACTIVE", active);

    onMount(async () => {
        // window.onpopstate = history.onpushstate = function (e) {
        //     console.log("PUSH STATE!!!!", e);
        // };
        const countriesResponse = await fetch("./data/countries.json");
        countries = await countriesResponse.json();

        const democracyIndexResponse = await fetch(
            "./data/democracy-index-by-country-2024.json",
        );
        const democracyIndexJSON = await democracyIndexResponse.json();
        democracyIndex = democracyIndexJSON.reduce((acc, d) => {
            const countryInfo = countries.find((c) => c.name === d.country);

            // d["alpha-2"] = countryInfo?.["alpha-2"];
            // d["alpha-3"] = countryInfo?.["alpha-3"];
            // d.democracy_eiu = +d.DemocracyIndex2023;
            // if (!countryInfo?.["alpha-2"]) {
            //     console.log("!!!!!!", d);
            // }
            acc[countryInfo["alpha-2"]] = {
                name: d.country,
                "alpha-2": countryInfo?.["alpha-2"],
                "alpha-3": countryInfo?.["alpha-3"],
                democracy_eiu: +d.DemocracyIndex2023,
            };

            return acc;
        }, {});

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
                        console.log("App data", data);
                        calendarData = data.reduce((acc, d) => {
                            acc = [
                                ...acc,
                                ...d.elections.map((election) => {
                                    return {
                                        date: election.date,
                                        country: d.country,
                                        countryInfo: d.countryInfo,
                                        hasData: election?.data?.length,
                                        alreadyVoted:
                                            d.elections[0]?.data?.length !=
                                            null,
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
            <b class="highlight"
                >Around 2 billion voters are expected to be heading to the polls
                this year. Almost 70 countries will hold elections, people in 8
                of the 10 most populous countries in the world — <a href="#BD"
                    >Bangladesh</a
                >, Brazil, India, <a href="#ID">Indonesia</a>, Mexico,
                <a href="#PK">Pakistan</a>, <a href="#RU">Russia</a> and the United
                States — will cast a vote.</b
            >
        </p>
    </header>
</section>
<section id="map" class="contents">
    <Map data={calendarData} {countries} />
</section>
<section id="introP2" class="contents">
    <header>
        <p>
            In this page, we provide a comprehensive visualization of these
            elections, offering insights into the diverse and dynamic democratic
            processes unfolding worldwide. Through interactive charts,
            informative analyses, and up-to-date election results, we aim to
            foster a deeper understanding of the intricacies of each electoral
            contest and their broader implications on global democracy.
        </p>
    </header>
</section>
<section id="scatterplot" class="contents">
    <header>
        <h2>Do Tight Elections Reflect Healthy Democracies?</h2>
        <p>
            The following chart juxtaposes the spectrum of democracy, ranging
            from
            <b>Authoritarian regimes</b> to <b>Full-fledged democracies</b>,
            against the variance in election results. Through this lens, we
            endeavor to unravel the complex interplay between governance
            structures and the vibrancy of electoral contests.
        </p>
        {#if data.length}
            <div style="margin-bottom: 50px;">
                <DemocracyScatterplot {data} {democracyIndex} {width} />
            </div>
            <div style="margin-bottom: 50px;">
                <DemocracyScatterplotVertical {data} {democracyIndex} {width} />
            </div>
        {/if}
        <p>
            This visual narrative transcends borders, spanning continents and
            encompassing diverse political landscapes. From the tightly
            controlled elections of authoritarian strongholds like Russia and
            Cambodia to the closeness witnessed in democratic stalwarts like
            Finland and Taiwan, each data point serves as a testament to the
            nuanced dynamics shaping our global electoral fabric.
        </p>
    </header>
</section>
<section id="introAllElections" class="contents">
    <header>
        <h2>All the elections in 2024</h2>
        <p>
            Step into the chronicles of democracy's heartbeat with the <b
                >election calendar</b
            > for the year 2024. This interactive calendar serves as a beacon, guiding
            you through the ebb and flow of electoral processes across the globe.
            From the shores of distant continents to the bustling metropolises of
            the world, each date marks a pivotal moment in the democratic journey
            of nations.
        </p>
    </header>
</section>
<Calendar data={calendarData} onSelect={(d) => (selected = d)} />
<section id="introAllElections" class="contents">
    <header>
        <p>
            The following list of results offers insights into the dynamic
            spectrum of democratic processes worldwide. From closely contested
            races to decisive victories, delve into the intricate tapestry of
            political expression and outcomes. Stay tuned as we update the list
            with new election results, enriching your understanding of the
            evolving democratic narrative.
        </p>
    </header>
</section>
<Search data={calendarData} {selected} />
<section id="charts" class="contents">
    {#each data.sort((a, b) => +new Date(a.elections[0].date) - +new Date(b.elections[0].date)) as country}
        <div class="country" id={country.country}>
            <h2>{country.countryInfo.name}</h2>
            {#each country.elections.sort((a, b) => +new Date(a.date) - +new Date(b.date)) as election, i}
                <div class="election" bind:offsetWidth={width}>
                    <h3 id={`zzz${country.country}${i ? i : ""}`}>
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
                        <Legend
                            data={election.data}
                            options={election.options}
                        />
                        {#if election.notes}
                            <p class="notes">{election.notes}</p>
                        {/if}
                    {/if}
                </div>
            {/each}
        </div>
    {/each}
</section>
<Footer />

<style>
    .contents {
        align-items: center;
        display: flex;
        justify-content: center;
        /*min-height: 80vh;*/
        padding: 10px;
        position: relative;
    }
    .full-width {
        width: 100vw;
        position: absolute;
    }
    #charts {
        flex-direction: column;
    }
    :global(.country) {
        width: 100%;
        margin-bottom: 60px;
        scroll-margin-top: calc(200px - 39px);
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
        margin-bottom: 1rem;
    }

    #intro.contents h2 {
        font-size: 28px;
        font-weight: 800;
        text-transform: uppercase;
        margin: 0;
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
        header b.highlight {
            font-size: 28px;
        }
        header span.highlight {
            font-size: 28px;
        }
        header p {
            font-size: 20px;
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
