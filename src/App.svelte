<script>
    import Calendar from "./lib/Calendar.svelte";
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

<Calendar />
<footer></footer>
