<script>
    export let data = [];
    export let selected;

    function scrollIntoView(target) {
        if (!target) return;
        const el = document.querySelector(`#${target}`);
        if (!el) return;
        el.scrollIntoView({
            behavior: "smooth",
        });
    }

    $: {
        // console.log("SELECTED", selected);
        if (selected) {
            window.history.pushState(
                selected,
                "country",
                `/e2024/#${selected}`,
            );
            scrollIntoView(selected);
        }
    }
    // $: console.log("SEARCH", data);
</script>

<section id="search">
    <select bind:value={selected}>
        <option value={null}>Select a country (or just scroll)</option>
        {#each Object.values(data.reduce((acc, e) => {
                acc[e.country] = acc[e.country] ?? { country: e.country, info: e.countryInfo };
                return acc;
            }, {})).sort((a, b) => a.info.name.localeCompare(b.info.name)) as c}
            <option value={c.country}>{c.info.name}</option>
        {/each}
    </select>
</section>

<style>
    #search {
        position: sticky;
        top: 133px;
        margin-top: 0;
        z-index: 99999;
        padding: 0 10px;
    }
    #search select {
        width: 100%;
        font-family: "Roboto Slab", serif, system-ui;
        font-size: 24px;
        font-weight: 400;
        text-transform: uppercase;
        -webkit-appearance: none;
        appearance: none;
        color: var(--darkest);
        border: none;
        border-bottom: 2px solid #c4b889;
        line-height: 1;
        outline: 0;
        padding: 0.3em 2.5em 0.3em 0px;
        /* border-radius: 0.5rem; */
        background-color: #fff8e6;
        background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
        background-repeat: no-repeat;
        background-position-x: 100%;
        background-position-y: 5px;
    }
    @media screen and (min-width: 768px) {
        #search {
            top: 160px;
        }
        #search select {
            /*background-color: #fff8e6dd;*/
        }
    }
</style>
