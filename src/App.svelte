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
    import { getDemocracyGroup } from "./lib/democracyGroups.js";

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
        // console.log("democracyIndexJSON", democracyIndexJSON);
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
                short: d.short,
                "alpha-2": countryInfo?.["alpha-2"],
                "alpha-3": countryInfo?.["alpha-3"],
                democracy_eiu: +d.DemocracyIndex2023,
            };

            return acc;
        }, {});
        // console.log("democracyIndex", democracyIndex);

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
                        // console.log("App data", data);
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
                        // console.log("calendarData", calendarData);
                    },
                    rejected(error) {
                        console.error(`${name}: rejected`, error);
                    },
                };
        });
    });
</script>

<div>
    <header id="header">
        <h1 class="main-title"><span>2024</span>Elections Year</h1>
    </header>

    <section id="intro" class="contents">
        <header>
            <p>
                <b class="highlight"
                    >Around 2 billion voters are expected to be heading to the
                    polls this year. Almost 70 countries will hold elections,
                    people in 8 of the 10 most populous countries in the world — <a
                        href="#BD">Bangladesh</a
                    >, Brazil, <a href="#IN">India</a>,
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
                    <DemocracyScatterplot {data} {democracyIndex} {width} />
                </div>
                <div id="vScatter" style="margin-bottom: 50px;">
                    <DemocracyDotplot {data} {democracyIndex} />
                </div>
            {/if}
            <p>
                This visual narrative transcends borders, spanning continents
                and encompassing diverse political landscapes. From the tightly
                controlled elections of authoritarian strongholds like Russia
                and Cambodia (top left of the chart, showing a low score in the
                democracy index and landslide victories) to the closeness
                witnessed in democratic stalwarts like Finland and Taiwan
                (bottom right, showing high democracy index and tight
                elections), each data point serves as a testament to the nuanced
                dynamics shaping our global electoral fabric.
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
            .map( (d) => ({ ...d, group: getDemocracyGroup(democracyIndex[d.country]?.democracy_eiu) }), ) as country}
            <div
                class={`country ${(country?.elections[0]?.data?.length ?? 0) === 0 ? "not-voted" : "voted"}`}
                id={country.country}
            >
                <h2>
                    {country.countryInfo.name}
                    <span
                        ><b style="color:{country.group?.color}"
                            >{country?.group?.singularName ?? ""}</b
                        >
                        <!--({democracyIndex[country.country]?.democracy_eiu} democracy index)--></span
                    >
                </h2>

                {#each country.elections.sort((a, b) => +new Date(a.date) - +new Date(b.date)) as election, i}
                    <div class="election" bind:offsetWidth={width}>
                        <h3 id={`${country.country}${i ? i : ""}`}>
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
                            <p style="margin-bottom: 1rem">
                                {election.summary}
                            </p>
                        {/if}
                        {#if (election?.data?.length ?? 0) === 0}
                            <p>Election results not yet available</p>
                        {:else}
                            <Megabar
                                data={election.data}
                                options={{
                                    ...election.options,
                                    country: country.country,
                                }}
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
    <section id="charts" class="contents">
        <header>
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
                <li>
                    <b>Full democracies</b> are nations where civil liberties and
                    fundamental political freedoms are not only respected but also
                    reinforced by a political culture conducive to the thriving of
                    democratic principles. These nations have a valid system of governmental
                    checks and balances, an independent judiciary whose decisions
                    are enforced, governments that function adequately, and diverse
                    and independent media. These nations have only limited problems
                    in democratic functioning.
                </li>
                <li>
                    <b>Flawed democracies</b> are nations where elections are fair
                    and free and basic civil liberties are honoured but may have
                    issues (e.g. media freedom infringement and minor suppression
                    of political opposition and critics). These nations can have
                    significant faults in other democratic aspects, including underdeveloped
                    political culture, low levels of participation in politics, and
                    issues in the functioning of governance.
                </li>
                <li>
                    <b>Hybrid regimes</b> are nations with regular electoral frauds,
                    preventing them from being fair and free democracies. These nations
                    commonly have governments that apply pressure on political opposition,
                    non-independent judiciaries, widespread corruption, harassment
                    and pressure placed on the media, anaemic rule of law, and more
                    pronounced faults than flawed democracies in the realms of underdeveloped
                    political culture, low levels of participation in politics, and
                    issues in the functioning of governance.
                </li>
                <li>
                    <b>Authoritarian regimes</b> are nations where political pluralism
                    is nonexistent or severely limited. These nations are often absolute
                    monarchies or dictatorships, may have some conventional institutions
                    of democracy but with meagre significance, infringements and
                    abuses of civil liberties are commonplace, elections (if they
                    take place) are not fair or free (including sham elections),
                    the media is often state-owned or controlled by groups associated
                    with the ruling regime, the judiciary is not independent, and
                    censorship and suppression of governmental criticism are commonplace
                </li>
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

    header h1 {
        font-size: 24px;
        font-weight: 200;
        line-height: 48px;
        text-align: center;
        text-transform: uppercase;
    }

    /*header h1::after {
        content: "🗳️";
        display: inline-block;
        filter: grayscale(100);
        font-size: 16px;
        padding-left: 10px;
        vertical-align: top;
    }

    header h1::before {
        content: "🗳️";
        display: inline-block;
        filter: grayscale(100);
        font-size: 16px;
        padding-right: 10px;
        vertical-align: top;
    }*/
    header h1 span {
        display: block;
        font-size: 48px;
    }

    .contents {
        align-items: center;
        display: flex;
        justify-content: center;
        /*min-height: 80vh;*/
        padding: 10px;
        position: relative;
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
            line-height: 72px;
        }
        .contents header p {
            margin-bottom: 1rem;
        }
        header h1 span {
            font-size: 100px;
            font-weight: 800;
        }
        header h1::before,
        header h1::after {
            font-size: 36px;
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
