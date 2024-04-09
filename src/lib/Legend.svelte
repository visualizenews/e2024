<script>
    export let data = [];
    export let options = {};
</script>

<ul class="legend">
    {#each data as d}
        {#if d[1] && d[2] > 0}
            <li>
                <span style="background-color:{d[3]}"></span>
                {d[1]}{d[0] && d[1] !== d[0] ? `(${d[0]})` : ""}
                {d[2]}{options.percentage ? "%" : ""}
                {options.withPerc ? ` (${d[5]}%)` : ""}
            </li>
        {/if}
    {/each}
</ul>

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
        font-size: 0.6rem;
        line-height: 20px;
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
