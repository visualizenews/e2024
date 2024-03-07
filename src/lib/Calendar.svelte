<script>
    import { onMount, beforeUpdate } from "svelte";
    import App from "../App.svelte";

    export let data = [];

    const numOfDays = 366;
    const numOfRows = 7;
    const numOfCols = Math.ceil(numOfDays / numOfRows);
    let calendarWidth;
    let calendarHeight;
    let binWidth = 100 / (numOfCols + 1);
    let binHeight = 100 / numOfRows;
    $: calendarDays = Array(numOfDays)
        .fill(0)
        .map((_, i) => {
            const timestamp = new Date(Date.UTC(2024, 0, i + 1));
            return {
                timestamp,
                date: getDate(i),
                day: getDay(i),
                dayIndex: i,
                columnIndex: Math.floor(i / numOfRows),
                columnDelta: getDelta(i),
                elections: data.filter((d) => {
                    return +new Date(d.date) === +timestamp;
                }),
            };
        });

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

    beforeUpdate(() => {
        console.log(data);

        console.log("calendarDays", calendarDays);
    });
</script>

<section
    id="calendar"
    style="--binWidth:{calendarWidth / 54}px;--binHeight:{calendarWidth / 54}px"
>
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
        {#each ["S", "M", "T", "W", "T", "F", "S"] as d}
            <li class="name-of-the-day">
                {d}
            </li>
        {/each}
        {#each calendarDays as d, i}
            <li
                data-date={d.day}
                class={d.elections.length > 0 ? "with-elections" : ""}
            >
                {#if d.elections.length}
                    <a href="#{d.elections[0].country}" />
                {/if}
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
        background-color: var(--lighter);
        z-index: 9999;
        padding-bottom: 20px;
    }
    #calendar * {
        box-sizing: border-box;
    }
    #calendar ul {
        position: relative;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    #calendar ul.months li {
    }

    #calendar ul.months {
        margin-left: var(--binWidth);
        display: flex;
        align-content: flex-start;
        height: 22px;
    }
    #calendar ul.months li {
        width: 0px;
        text-align: left;
        line-height: 22px;
        margin: 0;
        background: var(--lighter);
    }
    #calendar ul.days {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-content: flex-start;
        width: 100%;
        /*height: calc(7 * 15px);*/
        height: calc(7 * var(--binHeight));
    }
    #calendar ul.days li {
        text-align: center;
        line-height: var(--binHeight);
        margin: 0;
        width: var(--binWidth);
        height: var(--binHeight);
        position: relative;
    }
    #calendar ul.days li:nth-child(8) {
        margin-top: var(--binHeight);
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
        background: var(--gray);
        width: calc(100% - 1px);
        height: calc(var(--binHeight) - 1px);
        margin-left: 1px;
        margin-top: 1px;
    }
    #calendar ul.days li.with-elections:after {
        background: var(--dark);
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
    }
    #calendar ul.days li a {
        display: block;
        width: 100%;
        height: 100%;
        background-color: transparent;
    }

    #calendar .container {
        display: block;
        flex: 1 1 auto;
        margin: 0 auto;
        max-width: 960px;
        position: relative;
    }

    #calendar table {
        border: 0;
        border-collapse: separate;
        margin: 0 auto;
        padding: 0;
        position: relative;
    }

    #calendar thead {
        background-color: var(--lighter);
        position: sticky;
        top: 0;
    }

    #calendar th {
        font-family: "adomania", sans-serif;
        font-size: 10px;
        font-weight: 200;
        text-align: center;
        text-transform: uppercase;
    }

    #calendar tbody th {
        text-align: right;
    }

    #calendar tbody td,
    #calendar thead th {
        vertical-align: middle;
    }

    #calendar thead th .long {
        display: none;
    }

    #calendar tbody th {
        padding-right: 5px;
        vertical-align: top;
    }

    #calendar .day {
        border-radius: 2px;
        display: block;
        height: 20px;
        position: relative;
        width: 20px;
    }

    #calendar .day.day-empty {
        background: var(--gray);
        opacity: 0.25;
    }

    #calendar .day.day-1 {
        background: var(--pink1);
    }

    #calendar .day.day-2 {
        background: var(--pink2);
    }

    #calendar .day.day-3 {
        background: var(--pink3);
    }

    #calendar .popover {
        background: var(--light);
        bottom: 50%;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        display: none;
        font-family: "adomania", sans-serif;
        height: auto;
        left: 50%;
        padding: 5px;
        position: absolute;
        transform: translate3d(-5px, -5px, 0);
        width: 160px;
        z-index: 99;
    }

    #calendar .popover::before {
        content: "";
        display: block;
        left: 0;
        position: absolute;
        top: 100%;
        transform: translate3d(0, 0, 0);

        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid var(--light);
    }

    #calendar .popover.left {
        left: auto;
        right: 50%;
        transform: translate3d(5px, -5px, 0);
    }

    #calendar .popover.left::before {
        left: auto;
        right: 0;
    }

    #calendar .popover.center {
        left: 50%;
        transform: translate3d(-50%, -5px, 0);
    }

    #calendar .popover.center::before {
        left: 50%;
        transform: translate3d(-50%, 0, 0);
    }

    #calendar .day:hover .popover {
        display: block;
    }

    #calendar .popover .title {
        font-size: 14px;
        font-weight: 200;
        margin-bottom: 10px;
    }

    #calendar .popover .country {
        cursor: pointer;
        font-size: 12px;
        font-weight: 400;
        text-transform: uppercase;
    }

    @media screen and (min-width: 768px) {
        #calendar thead th .long {
            display: inline;
        }

        #calendar .day {
            height: 26px;
            width: 26px;
        }
        #calendar ul li.name-of-the-day {
            font-size: 10px;
        }
    }

    @media screen and (min-width: 1024px) {
        #calendar thead th .long {
            display: inline;
        }

        #calendar .day {
            height: 40px;
            width: 40px;
        }

        #calendar th {
            font-size: 14px;
        }
    }
</style>
