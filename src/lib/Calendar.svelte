<script>
    import { onMount, beforeUpdate } from "svelte";
    import App from "../App.svelte";

    export let data = [];
    export let onSelect = () => {};

    const numOfDays = 366;
    const numOfRows = 7;
    const numOfCols = Math.ceil(numOfDays / numOfRows);
    let calendarWidth;
    let calendarHeight;
    let binWidth = 100 / (numOfCols + 1);
    let binHeight = 100 / numOfRows;

    const getDay = (dayIndex, year = 2024) => {
        const date = new Date(year, 0, dayIndex + 1);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };
    const getDate = (dayIndex, year = 2024) => {
        const date = new Date(year, 0, dayIndex + 1);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
        });
    };
    const getDayNumberOfTheYear = (date) => {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    };

    const today = getDay(getDayNumberOfTheYear(new Date()) - 1);
    // $: console.log("TODAY", today);
    $: calendarDays = Array(numOfDays)
        .fill(0)
        .map((_, i) => {
            const timestamp = new Date(Date.UTC(2024, 0, i + 1));
            return {
                timestamp,
                date: getDate(i),
                day: getDay(i),
                today: getDay(i) === today,
                dayIndex: i,
                columnIndex: Math.floor(i / numOfRows),
                columnDelta: getDelta(i),
                elections: data.filter((d) => {
                    return +new Date(d.date) === +timestamp;
                }),
            };
        });

    const getDelta = (index, year = 2024) => {
        return (
            Math.floor(
                getDayNumberOfTheYear(new Date(year, index, 1)) / numOfRows,
            ) -
            Math.floor(
                (index > 0
                    ? getDayNumberOfTheYear(new Date(year, index - 1, 1))
                    : 0) / numOfRows,
            )
        );
    };

    // beforeUpdate(() => {
    //     console.log(data);

    //     console.log("calendarDays", calendarDays);
    // });
</script>

<section
    id="calendar"
    style="--binWidth:{calendarWidth / 54}px;--binHeight:{calendarWidth / 54}px"
>
    <div>
        <ul class="months">
            {#each ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] as m, i}
                <li
                    data-date={getDayNumberOfTheYear(new Date(2024, i, 1))}
                    data-column-index={Math.floor(
                        getDayNumberOfTheYear(new Date(2024, i, 1)) / numOfRows,
                    )}
                    data-column-delta={getDelta(i)}
                    style="margin-left:{getDelta(i) * binWidth}%"
                >
                    {m.slice(0, 3)}
                </li>
            {/each}
        </ul>
        <ul
            class="days"
            bind:clientWidth={calendarWidth}
            bind:clientHeight={calendarHeight}
        >
            {#each calendarDays as d, i}
                <li
                    data-date={d.day}
                    aria-label={d.day}
                    class="{d.elections.length > 0
                        ? 'with-elections'
                        : ''} {d.elections.some((election) => election.hasData)
                        ? 'with-data'
                        : ''}"
                >
                    {#if d.elections.length}
                        <a
                            href="#{d.elections[0].country}"
                            on:click={(e) => {
                                e.preventDefault();
                                onSelect(d.elections[0].country);
                            }}
                        />
                    {/if}
                    {#if d.today}
                        <span class="today" />
                    {/if}
                    <span
                        data-text={`${d.day} ${[...new Set(d.elections.map((e) => e.countryInfo.name))].join(", ")}`}
                        class="tooltip"
                    />
                </li>
            {/each}
        </ul>
    </div>
    <ul class="days day-names">
        {#each ["S", "M", "T", "W", "T", "F", "S"] as d}
            <li class="name-of-the-day">
                {d}
            </li>
        {/each}
    </ul>
</section>

<style>
    #calendar {
        position: sticky;
        top: 0;
        margin-top: 0;
        font-family: sans-serif;
        align-items: stretch;
        font-size: 10px;
        width: 100%;
        z-index: 9999;
        padding-bottom: 20px;

        --monthHeight: 22px;
    }
    #calendar * {
        box-sizing: border-box;
    }
    #calendar > div {
        width: 100%;
        position: relative;
        overflow-x: auto;
        padding-bottom: 10px;
        background-color: var(--lighter);
    }
    #calendar ul {
        position: relative;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    #calendar ul.months li {
        font-size: 0.7rem;
    }

    #calendar ul.months {
        margin-left: var(--binWidth);
        display: flex;
        align-content: flex-start;
        height: 22px;
        width: 200%;
        font-size: 0.5rem;
        color: var(--dark);
    }
    #calendar ul.months li {
        width: 0px;
        text-align: left;
        line-height: var(--monthHeight);
        margin: 0;
        background: var(--lighter);
    }
    #calendar ul.days {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-content: flex-start;
        width: 200%;
        /*height: calc(7 * 15px);*/
        height: calc(7 * var(--binHeight));
        /* overflow-x: auto; */
        margin-left: var(--binWidth);
    }
    #calendar ul.days li {
        text-align: center;
        line-height: var(--binHeight);
        margin: 0;
        width: var(--binWidth);
        height: var(--binHeight);
        position: relative;
    }
    #calendar ul.days:not(.day-names) li:nth-child(1) {
        margin-top: var(--binHeight);
    }
    #calendar ul.day-names {
        position: absolute;
        z-index: 999;
        top: var(--monthHeight);
        left: 0;
        width: var(--binWidth);
        height: calc(7 * var(--binHeight) + 1px);
        padding-top: 1px;
        overflow: hidden;
        margin-left: 0;
    }
    #calendar ul li.name-of-the-day {
        background: transparent;
        color: var(--dark);
        font-weight: 200;
        font-size: 1vh;
    }
    #calendar ul.days li:not(.name-of-the-day):after {
        content: "";
        display: block;
        border-radius: 3px;
        background: #ede2ca;
        width: calc(100% - 1px);
        height: calc(var(--binHeight) - 1px);
        margin-left: 1px;
        margin-top: 1px;
    }
    #calendar ul.days li.with-elections:after {
        background: #c4b889;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
    }
    #calendar ul.days li.with-elections.with-data:after {
        background: var(--dark);
    }
    #calendar ul.days li a {
        display: block;
        width: 100%;
        height: 100%;
        background-color: transparent;
    }
    #calendar ul.days li span.today {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6px;
        height: 6px;
        pointer-events: none;
        background: var(--dark);
        transform: translate(-50%, -50%);
        border-radius: 50%;
    }
    @media screen and (min-width: 641px) {
        #calendar {
            --monthHeight: 22px;
        }
    }
    @media screen and (min-width: 641px) {
        #calendar > div {
            overflow: visible;
        }
        #calendar ul.days:not(.day-names) {
            width: 100%;
            /*overflow-x: hidden;*/
            overflow: visible;
        }
        #calendar ul.months {
            width: 100%;
            font-size: 0.7rem;
        }
        #calendar ul li.name-of-the-day {
            font-size: 10px;
        }
        #calendar ul.months li {
            font-size: 0.8rem;
        }
    }

    @media screen and (min-width: 1024px) {
    }

    #calendar ul li .tooltip {
        position: absolute;
        top: 50%;
        height: 0;
        pointer-events: none;
    }
    #calendar ul li .tooltip:before {
        content: attr(data-text);
        position: absolute;
        font-size: 0.8rem;
        top: 50%;
        transform: translateY(-50%);

        left: 100%;
        margin-left: 15px;

        text-align: left;
        min-width: 80px;
        padding: 10px;
        border-radius: 10px;
        background: #000;
        color: #fff;
        z-index: 9;

        white-space: nowrap;

        display: none; /* hide by default */
    }
    #calendar ul li:hover .tooltip:before,
    #calendar ul li:hover .tooltip:after {
        display: block;
    }

    #calendar ul li .tooltip:after {
        content: "";
        position: absolute;

        /* position tooltip correctly */
        left: 100%;
        margin-left: 2px;

        /* vertically center */
        top: 50%;
        transform: translateY(-50%);

        /* the arrow */
        border: 10px solid #000;
        border-color: transparent black transparent transparent;

        display: none;
        z-index: 9;
    }
</style>
