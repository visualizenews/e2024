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
        <div class="sources">
            <div class="corporate col" id="footer-corporate">
                <div class="footer-vn footer-vn-corporate">
                    <h3>
                        <a href="https://visualize.news" target="_visualize"
                            ><img
                                src="https://visualize.news/assets/logo/vn.png"
                                loading="lazy"
                                alt="Visualize News Logo"
                            /> Visualize News</a
                        >
                    </h3>
                    <p>
                        We're a Collective of Designers, Coders, and Humanists
                        in Love with Data Visualization.
                    </p>
                </div>
                <div
                    class="footer-vn footer-vn-corporate cols"
                    style="margin-top: 2rem"
                >
                    <div>
                        <h3>Contacts</h3>
                        <ul>
                            <li>
                                Web: <a
                                    href="https://visualize.news"
                                    target="_visualize">Visualize.News</a
                                >
                            </li>
                            <li>
                                X/Twitter: <a
                                    href="https://twitter.com/visualizenews"
                                    target="_twitter">@visualizenews</a
                                >
                            </li>
                            <li>
                                Instagram: <a
                                    href="https://instagram.com/visualizenews"
                                    target="_twitter">@visualizenews</a
                                >
                            </li>
                            <li>
                                Medium: <a
                                    href="https://medium.com/visualize-news"
                                    target="_medium">@visualize.news</a
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>Our Projects</h3>
                        <ul>
                            <li>
                                <a
                                    href="https://ghali.visualize.news/"
                                    target="_ghali">Tutte le parole di Ghali</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://2024.visualize.news/"
                                    target="_elections">2024 - Elections Year</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://meloni-vs-schlein.visualize.news/"
                                    target="_meloni"
                                    >(Giorgia) Meloni VS (Elly) Schlein</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://traffico.mia.mi.it"
                                    target="_traffico">Il traffico di Milano</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://simonelippolis.com/archived/l-aria-di-milano/"
                                    target="_aria">L'aria di Milano</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://coronavirus.visualize.news"
                                    target="_virus">Corona Virus in Italy</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://matteointour.visualize.news"
                                    target="_elezioni">Matteo in Tour</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://india.visualize.news"
                                    target="_elezioni">Lok Sabha Elections</a
                                >
                            </li>
                            <li>
                                <a href="https://elezioni.io" target="_elezioni"
                                    >Elezioni.io</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="sources">
            <div class="legal col" id="footer-legal">
                {@html legal}
            </div>
        </div>
    </div>
</div>

<style>
    #footer {
        max-width: 100%;

        background: var(--darkest);
        border: 0;
        color: var(--light);
        display: block;
        margin-top: 80px;
        padding: 80px 10px;
        text-align: left;
        width: auto;
    }
    #footer .sources,
    #footer .cols {
        margin-bottom: 40px;
    }
    #footer .cols div {
        margin-bottom: 2rem;
    }
    #footer a {
        color: #fff;
        text-decoration: none;
    }
    #footer a:hover {
        color: #fff;
        text-decoration: underline;
    }
    @media screen and (min-width: 1024px) {
        #footer {
            padding: 80px 0px;
        }
        #footer .footer-wrapper {
            max-width: 1000px;
            margin: 0 auto;
        }
        #footer .cols {
            display: flex;
        }
        #footer .cols div {
            width: 50%;
        }
    }
</style>
