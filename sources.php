<?php
require_once 'components/header.php';
?>

<style>
    .ref {
        width: 100%; /* Largeur de la section */
        height: 100vh; /* Hauteur de la section */
        display: flex; /* Flexbox pour un meilleur alignement */
        justify-content: start; /* Centrer horizontalement */
        color: white; /* Couleur du texte */
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
        <h2>Références</h2>
    </div>
    <div class="ref">
        <div class="ref-item">
            <p>Nombres de bornes de recharges:
                <a href="">Avere France
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2"></path>
                    </svg>
                </a>
            </p>
            <p>Nombres de voitures par régions:
                <a href="">Avere France
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
