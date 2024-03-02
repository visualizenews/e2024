<script>
    import { onMount } from 'svelte';
    import Calendar from './lib/Calendar.svelte';
    import { Runtime } from '@observablehq/runtime';
    import define from 'https://api.observablehq.com/d/2779de33b7db5a6b@764.js?v=4';

    let data = {};
    let calendarData = [];

    onMount(async () => {
        const runtime = new Runtime();
        const main = runtime.module(define, (name) => {
            if (name === 'data')
                return {
                    pending() {},
                    fulfilled(value) {
                        data = value;
                        console.log('data', data);
                        calendarData = Object.entries(value).reduce(
                            (acc, [country, elections]) => {
                                acc = [
                                    ...acc,
                                    ...elections.map((election) => {
                                        return {
                                            date: election.date,
                                            country,
                                        };
                                    }),
                                ];
                                // console.log(country, elections);

                                return acc;
                            },
                            [],
                        );
                        console.log('calendarData', calendarData);
                    },
                    rejected(error) {
                        console.error(`${name}: rejected`, error);
                    },
                };
        });
    });
</script>

<header id="header">
    <h1 class="show-calendar">Elections Year</h1>
</header>
<section id="intro">
    <header>
        <h2>2024 is Elections Year!</h2>
        <h3>
            Yes, with more than 2,500 different countried going to the polls for
            several different elections, either local, national, or
            sovra-national 2024 is already special.
        </h3>
        <h3>
            Here is a quick recap of all the appointments and their results.
            Feel free to scroll down to browse chronologically, or <em
                class="show-calendar">jump to the election you want 🗳️</em
            >.
        </h3>
    </header>
</section>

<section id="charts"></section>

<Calendar data={calendarData} />
<footer></footer>
