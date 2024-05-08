<script>
    export let data = [];

    $: console.log("SEARCH", data);
</script>

<section id="search">
    <select>
        <option>Select a country</option>
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
        top: 160px;
        margin-top: 0;
        z-index: 99999;
    }
    #search select {
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
        padding: 0.3em 2.5em 0.3em 10px;
        /* border-radius: 0.5rem; */
        background-color: #fff8e6dd;
        background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
        background-repeat: no-repeat;
        background-position-x: 100%;
        background-position-y: 5px;
    }
</style>
