<?php
require_once 'components/header.php';
?>

<style>
    .ref {
        height: 100vh;
        display: flex;
        justify-content: start;
        color: white;
        flex-direction: column;
        align-items: start;
        margin: 0 auto;
        padding: 150px;
    }

    .ref-item h3 {
        margin: 0;
        font-size: 1.5em;
    }

    .ref-item p {
        font-family: 'Inter', sans-serif;
        color: #fff;
        text-decoration: none;
        font-size: 20px;
        margin: 0px 0px 30px 0px;
    }

    .ref-item p a {
        color: #fff;
        border-bottom: 2px solid #fff;
        font-size: 20px;
        margin: 0;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
    }

    .ref-item p a svg {
        color: #fff;
        width: 20px;
        margin-left: 3px;
        transition: ease-in-out .2s;
    }
</style>

<div>
    <!-- Contact section -->
    <div id="contact" class="container title animate-this">
        <h1>Références</h1>
    </div>
    <div class="ref">
        <div class="ref-item">
            <p>Données en général:
                <a href="https://www.data.gouv.fr/fr/" target="_blank">Data.gouv
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2"></path>
                    </svg>
                </a>
            </p>
            <p>Nombres de bornes de recharges:
                <a href="https://www.avere-france.org/" target="_blank">Avere France
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2"></path>
                    </svg>
                </a>
            </p>
            <p>Nombres de voitures par régions:
                <a href="https://www.avere-france.org/" target="_blank">Avere France
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2"></path>
                    </svg>
                </a>
            </p>
            <p>Cartes et données autoroutes:
                <a href="https://ufe-electricite.fr/watt-the-carte/" target="_blank">Watt the carte
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2"></path>
                    </svg>
                </a>
            </p>
            <p>Transport routier:
                <a href="https://www.ecologie.gouv.fr/politiques-publiques/transport-routier" target="_blank">Écologie.gouv
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2"></path>
                    </svg>
                </a>
            </p>
            <p>Infrastructures de recharge pour véhicule électrique:
                <a href="https://www.ecologie.gouv.fr/sites/default/files/documents/2019-07-Rapport-IRVE.pdf" target="_blank">Écologie.gouv
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2"></path>
                    </svg>
                </a>
            </p>
            <p>Histoire de la voiture électrique:
                <a href="https://beqtechnology.com/blog/histoire-voiture-electrique-evolution-impressionnante/" target="_blank">Beqtechnology
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2"></path>
                    </svg>
                </a>
            </p>
            <p>La loi d'orientation des mobilités:
                <a href="https://www.ecologie.gouv.fr/loi-dorientation-des-mobilites" target="_blank">Écologie.gouv
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2"></path>
                    </svg>
                </a>
            </p>
            <p>Nombres de bornes de recharges plus:
                <a href="https://www.enedis.fr/nombre-bornes-recharge-france" target="_blank">Enedis
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2"></path>
                    </svg>
                </a>
            </p>
            <p>Première voiture électrique:
                <a href="https://www.futura-sciences.com/tech/questions-reponses/voiture-electrique-premiere-voiture-electrique-t-elle-ete-inventee-966/" target="_blank">Futura-sciences
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2"></path>
                    </svg>
                </a>
            </p>
            <p>Pistes d'évolution:
                <a href="https://www.drivetozero.fr/2161-quelles-sont-les-pistes-devolution-des-infrastructures-de-recharge/" target="_blank">Drivetozero
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2"></path>
                    </svg>
                </a>
            </p>
            <p>Problématique bornes:
                <a href="https://www.mikealbert.com/fleet-studies-lab/electric-hybrid-alt-fuel/are-there-enough-ev-charging-stations-to-power-your-fleet" target="_blank">Mikealbert
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2"></path>
                    </svg>
                </a>
            </p>
        </div>
    </div>
</div>

<?php
require_once 'components/footer.php';
?>
