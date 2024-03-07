<script>
    export let data = [];
</script>

<ul class="legend">
    {#each data as d}
        {#if d[1] && d[2] > 0}
            <li>
                <span style="background-color:{d[3]}"></span>
                {d[1]}{d[0] && d[1] !== d[0] ? `(${d[0]})` : ""} ({d[2]})
            </li>
        {/if}
    {/each}
</ul>

<style>
    .legend {
        display: flex;
        font-family: system-ui;
        font-size: 12px;
        list-style: none;
        margin: 0;
        padding: 0;
        flex-wrap: wrap;
        width: 100%;
        max-width: none;
        margin-top: 30px;
        margin-bottom: 15px;
    }
    .legend li {
        margin-right: 10px;
        padding-left: 15px;
        position: relative;
        margin-bottom: 15px;
    }
    .legend li span {
        display: inline-block;
        width: 10px;
        height: 20px;
        border-radius: 2px;
        margin-right: 3px;
        position: absolute;
        transform: translateY(-25%);
        left: 0;
    }
    @media screen and (min-width: 768px) {
        .legend li {
            white-space: nowrap;
            line-height: 10px;
        }
    }
</style>
