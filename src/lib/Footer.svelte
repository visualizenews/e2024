<script>
    import { onMount } from "svelte";
    const footerLegalURL =
        "https://visualize.news/remotes/footer/legal_en.html";
    const footerCorporateURL =
        "https://visualize.news/remotes/footer/corporate_en.html";

    let legal = "";
    let corporate = "";

    onMount(async () => {
        const legalResponse = await fetch(footerLegalURL);
        legal = await legalResponse.text();

        const corporateResponse = await fetch(footerCorporateURL);
        corporate = await corporateResponse.text();
    });
</script>

<div id="footer" class="footer">
    <div class="footer-wrapper vn">
        <div class="sources">
            <h3>Design and Development</h3>
            <p>
                <a href="https://carlo.im/" target="_blank">Carlo Zapponi</a>
            </p>
        </div>
        <div class="cols">
            <div class="legal col" id="footer-legal">
                {@html legal}
            </div>
            <div class="corporate col" id="footer-corporate">
                {@html corporate}
            </div>
        </div>
    </div>
</div>
