<script>
    export let data = [];
    export let options = {};

    const n = 5;
    let showAll = false;
    $: sortedData = [...data]
        .sort((a, b) => b[2] - a[2])
        .map((d) => `${d[0]}${d[1]}`);
    $: topN = sortedData.slice(0, n);

    $: filteredData = data.filter((d) => options.withZero || d[1] || d[2] > 0);
</script>

<ul class="legend">
    {#each filteredData as d}
        <li
            class={topN.includes(`${d[0]}${d[1]}`) ||
            showAll ||
            topN.length >= filteredData.length - 2
                ? "topN"
                : ""}
        >
            <span style="background-color:{d[3]}"></span>
            {d[1]}{d[0] && d[1] !== d[0] ? `(${d[0]})` : ""}
            {d[2]}{options.percentage ? "%" : ""}
            {options.withPerc ? ` (${d[5]}%)` : ""}
        </li>
    {/each}
</ul>
{#if filteredData.length > n && topN.length < filteredData.length - 2}
    <ul class="legend show-more">
        <li>
            <span>{showAll ? "↥" : "↧"}</span><a
                href="#"
                on:click={(e) => {
                    e.preventDefault();
                }}
                on:mousedown={(e) => {
                    e.preventDefault();
                    showAll = !showAll;
                }}
                >Show {showAll ? "less" : "all"}
                {data[0][0] ? "candidates" : "parties"}</a
            >
        </li>
    </ul>
{/if}

<style>
    .legend {
        font-family: system-ui;
        font-size: 12px;
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
        max-width: none;
        margin-top: 10px;
        margin-bottom: 0;
    }
    .legend li {
        margin-right: 10px;
        padding-left: 15px;
        position: relative;
        margin-bottom: 5px;
        font-size: 0.8rem;
        line-height: 20px;
        display: none;
    }
    .legend li.topN {
        display: inline-block;
    }
    .legend.show-more {
        margin: 0;
    }
    .legend.show-more li {
        display: block;
    }
    .legend.show-more li span {
        font-size: 1.5em;
    }
    .legend li span {
        display: inline-block;
        width: 10px;
        height: 20px;
        border-radius: 2px;
        margin-right: 3px;
        position: absolute;
        left: 0;
        line-height: 20px;
    }
    @media screen and (min-width: 768px) {
        .legend {
            display: flex;
            flex-wrap: wrap;
        }
        .legend li {
            white-space: nowrap;
            font-size: 0.8rem;
            margin-bottom: 15px;
        }
    }
</style>
