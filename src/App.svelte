<script>
    import { onMount, afterUpdate } from "svelte";
    import Calendar from "./lib/Calendar.svelte";
    import Search from "./lib/Search.svelte";
    import { Runtime } from "@observablehq/runtime";
    import define from "https://api.observablehq.com/d/17358da922d09a68@22.js?v=4";
    import Megabar from "./lib/Megabar.svelte";
    import Footer from "./lib/Footer.svelte";
    import DemocracyScatterplot from "./lib/DemocracyScatterplot.svelte";
    import DemocracyDotplot from "./lib/DemocracyDotplot.svelte";
    // import DemocracyScatterplotVerticalWrapper from "./lib/DemocracyScatterplotVerticalWrapper.svelte";
    import Legend from "./lib/Legend.svelte";
    import Map from "./lib/Map.svelte";
    import Social from "./lib/Social.svelte";
    import democracyGroups, {
        getDemocracyGroup,
    } from "./lib/democracyGroups.js";

    let data = [];
    let calendarData = [];
    let width = 600;
    let countries = [];
    let democracyIndex = [];
    let democraciesTypes;
    let boxElList = [];
    let selected;

    // $: active = null;

    // $: console.log("ACTIVE", active);
    const preSelectedCountry = window.location.hash?.replace("#", "");

    onMount(async () => {
        const countriesResponse = await fetch("./data/countriesWithGov.json");
        countries = await countriesResponse.json();

        const democracyIndexResponse = await fetch(
            "./data/democracyIndex.json",
        );
        democracyIndex = await democracyIndexResponse.json();

        const runtime = new Runtime();
        const main = runtime.module(define, (name) => {
            if (name === "elections")
                return {
                    pending() {},
                    fulfilled(value) {
                        // data = value;
                        const _data = Object.entries(value).map((d) => ({
                            country: d[0],
                            elections: d[1],
                            countryInfo: countries.find(
                                (c) => c["alpha-2"] === d[0],
                            ),
                        }));
                        [data, calendarData] = [
                            _data,
                            _data.reduce((acc, d) => {
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

                                return acc;
                            }, []),
                        ];
                    },
                    rejected(error) {
                        console.error(`${name}: rejected`, error);
                    },
                };
        });
    });

    let count = 0;
    /** @type {import('svelte/action').Action}  */
    function foo(node, country) {
        const l = data.filter((d) => d.elections[0].data?.length).length;
        count++;
        if (count >= l) {
            selected = preSelectedCountry !== "" ? preSelectedCountry : null;
        }

        return {
            destroy() {
                // the node has been removed from the DOM
            },
        };
    }
</script>

<div>
    <Social />

    <header id="header">
        <h1 class="main-title">2024</h1>
        <h2 class="sub-title">Elections Year</h2>
    </header>

    <section id="intro" class="contents">
        <header>
            <p>
                <b class="highlight"
                    >Around 2 billion voters are expected to be heading to the
                    polls this year. Almost 70 countries will hold elections,
                    people in 8 of the 10 most populous countries in the world — <a
                        href="#BD">Bangladesh</a
                    >, <a href="#IN">India</a>,
                    <a href="#ID">Indonesia</a>,
                    <a href="#MX">Mexico</a>,<a href="#PK">Pakistan</a>,
                    <a href="#RU">Russia</a>
                    and the United States — will cast a vote.</b
                >
            </p>
        </header>
    </section>
    <section id="map" class="contents no-padding">
        <Map data={calendarData} {countries} />
    </section>
    <section id="introP2" class="contents">
        <header>
            <p>
                In this page, we provide a comprehensive visualization of these
                elections, offering insights into the diverse and dynamic
                democratic processes unfolding worldwide. Through interactive
                charts, informative analyses, and up-to-date election results,
                we aim to foster a deeper understanding of the intricacies of
                each electoral contest and their broader implications on global
                democracy.
            </p>
        </header>
    </section>
    <section id="scatterplot" class="contents">
        <header>
            <h2>Do Tight Elections Reflect Healthy Democracies?</h2>
            <p>
                The following chart juxtaposes the spectrum of democracy,
                ranging from
                <b>Authoritarian regimes</b> to <b>Full-fledged democracies</b>,
                against <b>the variance in election results</b>. Through this
                lens, we endeavor to unravel the complex interplay between
                governance structures and the vibrancy of electoral contests.
            </p>
            {#if data.length}
                <div id="hScatter" style="margin-bottom: 50px;">
                    <DemocracyScatterplot
                        data={data.filter((d) => d.country !== "EU")}
                        {democracyIndex}
                        {width}
                    />
                </div>
                <div id="vScatter" style="margin-bottom: 50px;">
                    <DemocracyDotplot {data} {democracyIndex} />
                </div>
            {/if}
            <p>
                This visual narrative transcends borders, spanning continents
                and encompassing diverse political landscapes. From the tightly
                controlled elections of authoritarian strongholds like Russia
                and Cambodia (showing a low score in the democracy index with
                large victories from the governing parties) to the closeness
                witnessed in democratic stalwarts like Finland and Taiwan (high
                democracy index and tight election result), each data point
                serves as a testament to the nuanced dynamics shaping our global
                electoral fabric.
            </p>
        </header>
    </section>
    <section id="introAllElections" class="contents">
        <header>
            <h2>All the elections in 2024</h2>
            <p>
                The <b>Election Calendar</b> allows you to explore elections taking
                place around the world throughout the year. The calendar provides
                a comprehensive overview of the democratic processes unfolding across
                the globe - from remote regions to major metropolises. We regularly
                update the calendar with new elections. For example, France recently
                announced legislative elections following the results of the European
                Union parliament elections.
            </p>
        </header>
    </section>
    <Calendar data={calendarData} onSelect={(d) => (selected = d)} />
    <section id="introAllElections" class="contents">
        <header>
            <p>
                The following list of results offers insights into the dynamic
                spectrum of democratic processes worldwide. From closely
                contested races to decisive victories, explore the intricate
                landscape of political expression and outcomes. Stay tuned as we
                update the list with new election results, enriching your
                understanding of the evolving democratic narrative.
            </p>
        </header>
    </section>
    <Search data={calendarData} {selected} />
    <section id="charts" class="contents">
        {#each data
            .sort((a, b) => +new Date(a.elections[0].date) - +new Date(b.elections[0].date))
            .map( (d) => ({ ...d, group: getDemocracyGroup(democracyIndex[d.country]?.democracy_eiu), gov: democracyIndex[d.country]?.gov }), ) as country}
            <div
                class={`country ${(country?.elections[0]?.data?.length ?? 0) === 0 ? "not-voted" : "voted"}`}
                id={country.country}
            >
                <h2>
                    {country.countryInfo.name}
                    {#if country?.group}
                        <span
                            ><b>{country.countryInfo.gov}</b><br /><b
                                style="color:{country.group?.color}"
                                >{country?.group?.singularName ?? ""}</b
                            ><a
                                href="#"
                                title="Data and Methodology"
                                class="info"
                                on:click={(e) => {
                                    e.preventDefault();
                                    e.target.parentElement.nextElementSibling.classList.toggle(
                                        "hidden",
                                    );
                                }}>&quest;</a
                            >
                        </span>
                        <p class="democracy-description hidden">
                            <b>{country?.group?.singularName}</b>: {democracyGroups.find(
                                (d) =>
                                    d.singularName ===
                                    country?.group?.singularName,
                            ).descr}
                        </p>
                    {/if}
                </h2>

                {#each country.elections.sort((a, b) => +new Date(a.date) - +new Date(b.date)) as election, i}
                    <div class="election" bind:offsetWidth={width}>
                        <h3 id={`${country.country}${i ? i : ""}`}>
                            {#if election.nodate}
                                No date available
                            {:else}
                                {new Intl.DateTimeFormat("en-GB", {
                                    dateStyle: "full",
                                }).format(new Date(election.date))}
                            {/if}
                        </h3>

                        {#if election.description}
                            <b style="margin-botton: 1rem;"
                                >{election.description}</b
                            >
                        {/if}
                        {#if election.summary}
                            <p style="margin-bottom: 1rem">
                                {election.summary}
                            </p>
                        {/if}
                        {#if (election?.data?.length ?? 0) === 0}
                            <p>Election results yet available</p>
                        {:else}
                            <Megabar
                                data={election.data}
                                options={{
                                    ...election.options,
                                    country: country.country,
                                }}
                                {width}
                                callback={(node) => foo(node, country.country)}
                            />
                            <Legend
                                data={election.data}
                                options={election.options}
                                {width}
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
    <section id="charts" class="contents">
        <header id="data-and-methodology">
            <h2>Data and methodology</h2>
            <p>
                The data presented on this website comes from a variety of
                authoritative sources. Election results and details for each
                country are primarily sourced from <a
                    target="_blank"
                    href="https://en.wikipedia.org/wiki/List_of_elections_in_2024"
                    >Wikipedia</a
                >, which provides comprehensive coverage of national elections
                around the world. To provide additional context on the state of
                democracy in each country, we also incorporate data from the
                <a
                    target="_blank"
                    href="https://en.wikipedia.org/wiki/The_Economist_Democracy_Index"
                    >Democracy Index</a
                >
                reports (published by the Economist Group ) and
                <a target="_blank" href="https://freedomhouse.org/"
                    >Freedom House</a
                >. These respected organizations assess the level of political
                rights and civil liberties in countries globally, giving us a
                sense of the democratic health of the nations holding elections.
                By combining granular election data with broader measures of a
                country's democratic institutions, we aim to give users a
                well-rounded understanding of the electoral landscape in 2024.
            </p>
            <p>
                <a
                    href="https://en.wikipedia.org/wiki/The_Economist_Democracy_Index#cite_note-index2015-6"
                    target="_blank">The Economist Democracy Index</a
                >
                is published by the
                <a
                    href="https://en.wikipedia.org/wiki/Economist_Group"
                    target="_blank">Economist Group</a
                >, and it is an index measuring the quality of democracy across
                the world. The index categorizes each country into one of four
                regime types: full democracies, flawed democracies, hybrid
                regimes, and authoritarian regimes as follow:
            </p>
            <ul class="democracy-index">
                {#each democracyGroups as group}
                    <li>
                        <b>{group.singularName}</b>: {group.descr}
                    </li>
                {/each}
            </ul>
        </header>
    </section>
    <section id="charts" class="contents">
        <header>
            <h2>Tech stack</h2>
            <p>
                Built with <a href="https://svelte.dev/" target="_blank"
                    >Svelte</a
                >.<br /><br />All charts built with
                <b>chrt, <i>a spontaneous approach to chart creation</i>.</b>
                <b>chrt</b>
                is still under development but we like to use it in our projects.
                If you want to know more about it, visit our
                <a
                    href="https://observablehq.com/@chrt/introducing-chrt"
                    target="_blank">Observable Collection</a
                >.<br /><br />We love Observable, and for this project we have
                initially experimented the <i>megabar view</i> in a notebook. The
                election data is collected from Wikipedia and published in dedicated
                notebook where the data is smoothly flowing directly to this page.
            </p>
        </header>
    </section>
    <Social />
</div>
<Footer />

<style>
    header {
        display: flex;
        flex-direction: column;
        /*align-items: center;*/
    }
    header b.highlight {
        font-size: 20px;
    }

    header h1,
    header h2.sub-title {
        font-size: 24px;
        font-weight: 200;
        text-align: center;
        text-transform: uppercase;
    }
    header h1.main-title {
        display: block;
        font-size: 48px;
        overflow: hidden;
    }

    .contents {
        align-items: center;
        display: flex;
        justify-content: center;
        /*min-height: 80vh;*/
        padding: 10px;
        position: relative;
    }
    a.info {
        color: #fff;
        text-align: center;
        text-decoration: none;
        font-size: 10px;
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: var(--brown1);
        opacity: 0.5;
        transform: translateY(-1px);
        margin-left: 0.4rem;
        vertical-align: middle;
        line-height: 12px;
    }
    a.info:hover {
        background-color: var(--dark);
        opacity: 1;
    }
    .democracy-description {
        font-size: 1rem;
        margin-top: 0.5rem;
        font-weight: normal;
        text-transform: none;
    }
    .democracy-description.hidden {
        display: none;
    }

    .no-padding {
        padding: 0 !important;
    }
    #charts {
        flex-direction: column;
    }
    :global(.country) {
        width: 100%;
        margin-top: 30px;
        margin-bottom: 30px;
        scroll-margin-top: calc(200px - 70px);
    }
    :global(.country .election) {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 2.5rem;
    }
    .contents h2 {
        font-size: 20px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 1rem;
    }

    .country h2 {
        font-size: 24px;
    }
    .country h2 span {
        margin-top: 8px;
        font-size: 12px;
        display: block;
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

    #vScatter {
        display: block;
        margin-top: 2rem;
    }
    #hScatter {
        display: none;
    }

    :global(.contents .country.not-voted) {
        font-size: 0.8rem;
        margin-top: 0;
        margin-bottom: 0;
    }
    :global(.contents .country.not-voted h2) {
        font-size: 1rem;
        margin-bottom: 0.2rem;
        margin-top: 0.8rem;
    }
    :global(.contents .country.not-voted .election) {
        margin-bottom: 0.5rem;
    }

    ul.democracy-index {
        list-style-position: inside;
    }
    ul.democracy-index li {
        margin: 0.5em 0;
    }

    @media screen and (min-width: 768px) {
        header h1 {
            font-size: 48px;
        }
        .contents header p {
            margin-bottom: 1rem;
        }
        header h1.main-title {
            font-size: 100px;
            font-weight: 800;
            line-height: 100px;
        }
        header h2.sub-title {
            font-size: 48px;
        }
        #vScatter {
            display: none;
        }
        #hScatter {
            display: block;
        }
        .contents header {
            max-width: 100%;
        }
        header b.highlight {
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
        :global(.country) {
            scroll-margin-top: calc(200px - 39px);
        }

        .country h2 {
            font-size: 24px;
        }
        :global(.contents .country.not-voted h2) {
            font-size: 1.1rem;
        }
    }
</style>
