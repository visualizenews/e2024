<script>
    export let data = [];
    export let options = {};
    export let width;

    $: n = width > 641 ? 8 : 5;
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
            <div class="color-key">
                <span style="background-color:{d[3]}"></span>
            </div>
            <div class="description">
                <span class="value"
                    >{d[2]}{options.percentage ? "%" : ""}
                    <i>{options.withPerc ? `${d[5]}%` : ""}</i></span
                >
                <span>{d[1]}{d[0] && d[1] !== d[0] ? `(${d[0]})` : ""}</span>
            </div>
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
        margin-right: 20px;
        padding-left: 0;
        position: relative;
        margin-bottom: 10px;
        font-size: 0.8rem;
        line-height: 15px;
        display: none;
        flex-direction: row;
        flex-wrap: wrap;
        height: fit-content;
    }
    .legend li.topN {
        display: flex;
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
    .legend li .color-key span {
        display: inline-block;
        width: 7px;
        min-width: 7px;
        height: 100%;
        border-radius: 2px;
        margin-right: 3px;
        position: relative;
        left: 0;
    }

    .legend li div {
        display: flex;
        flex-direction: column;
    }
    .legend li div.description {
        max-width: calc(100% - 10px);
        height: fit-content;
    }
    .legend li div.description span.value {
        font-size: 1.1rem;
        font-weight: 500;
    }
    .legend li div.description span.value i {
        font-size: 0.8rem;
        font-weight: normal;
        font-style: normal;
    }
    @media screen and (min-width: 768px) {
        .legend {
            display: flex;
            flex-wrap: wrap;
        }
        .legend li {
            font-size: 0.8rem;
            line-height: 20px;
            margin-bottom: 10px;
            min-width: 22%;
        }
        .legend li div.description {
            max-width: 200px;
        }
    }
</style>
