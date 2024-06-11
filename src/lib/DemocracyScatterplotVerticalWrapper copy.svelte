<script>
    import DemocracyScatterplotVertical from "./DemocracyScatterplotVertical.svelte";

    export let data = [];
    export let democracyIndex = [];
    export let width;

    const democracyGroups = [
        {
            name: "Full democracy",
            range: [8, 10],
            color: "#00a651",
        },
        {
            name: "Flawed democracy",
            range: [6, 8],
            color: "#f9a700",
        },
        {
            name: "Hybrid regime",
            range: [4, 6],
            color: "#f9a700",
        },
        {
            name: "Authoritarian",
            range: [0, 4],
            color: "#ed1c24",
        },
    ];

    $: console.log("DATA", data, democracyIndex, width, democracyGroups);

    $: data = data.map((d) => {
        const democracy = Object.values(democracyIndex).find(
            (di) => di["alpha-2"] === d.country,
        );
        const group = democracyGroups.find(
            (g) =>
                democracy?.democracy_eiu >= g.range[0] &&
                democracy?.democracy_eiu < g.range[1],
        );
        return {
            ...d,
            democracy,
            group,
        };
    });
</script>

{#each democracyGroups.map( (d) => ({ ...d, data: data.filter((dd) => dd?.group?.name === d.name) }), ) as groupData}
    <div class="democracy-group">
        <DemocracyScatterplotVertical
            group={groupData}
            data={groupData.data}
            allData={data}
            {democracyIndex}
            {width}
        />
    </div>
{/each}
