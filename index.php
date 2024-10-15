<?php
require_once 'components/header.php';
?>
<div>
    <!-- Anim voiture section -->
    <div id="home" class="container home">
        <div class="circle"></div>
        <div class="animtxt">
        <div class="titleCont"><div class="title">Votre condu</div><svg class="lightning" xmlns="http://www.w3.org/2000/svg" width="109" height="80px" viewBox="0 0 89 129" fill="none">
                    <path d="M0 74.4231L56.6364 0L44.5 54.5769H89L32.3636 129L44.5 74.4231H0Z" fill="#90FF00" /></svg
            ><div class="title">te,</div></div><br><div class="title">votre planète.</div>
        </div>
    </div>
    <!-- Title section -->
    <div id="title" class="container title">
        <h2>L'histoire de l'électrique</h2>
    </div>
    <!-- Histoire sections -->
    <div id="histoire1" class="histoire">
        <p>Histoire voiture</p>
    </div>
    <div id="histoire2" class="container histoire">
        <p>Histoire bornes</p>
    </div>
    <!-- Data sections -->
    <div id="data1" class="data1 panel orange">
        <div class="data-1-count">
            <div class="data-1-count">
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div class="year-scroll">
                        <div class="scroll-year" id="scroll-year">
                            2010
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex; flex-direction: column">
                <div class="count-scroll">
                    <div class="scroll-number" id="scroll-number">0</div>
                    <span>bornes</span>
                </div>
                <div class="count-scroll">
                    <div class="scroll-number-cars" id="scroll-number-cars">0</div>
                    <span>voitures</span>
                </div>
            </div>
        </div>
        <span class="line line-2">
        <div class="content-bar-gsap">
            <div class="scroll-number" id="scroll-number">0</div>
            <span>bornes</span>
        </div>
    </span>
        <span class="line line-3">
        <div class="content-bar-gsap-cars">
            <div class="scroll-number-cars" id="scroll-number-cars">0</div>
            <span>voitures</span>
        </div>
    </span>
    </div>
    <div id="data2" class="data2">
        <div style="display: flex; flex-direction: row; align-items: center; width: 100%; justify-content: center">
            <div style="background: rgba(105, 105, 105, 35%); width: 100%; max-width: 450px; padding: 20px; border-radius: 30px; text-align: left; position: relative">
                <div style="position: absolute; top: 0; right: 0; margin-top: -30px; margin-right: -30px ; background: rgba(105, 105, 105, 0.35);
backdrop-filter: blur(27px); padding: 10px; border-radius: 30px; display: flex; align-items: center; gap: 10px ">
                    <button id="btnMinus" style="border-radius: 999px;padding: 5px 6px; background: rgb(139,139,139,25%); color: #90FF00; border: none;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><path d="M5 12h14"/></svg>
                    </button>
                    <span id="currentYear" style="font-size: 20px; color: rgb(255,255,255,60%); font-weight: 200">2011</span>
                    <button id="btnPlus" style="border-radius: 999px;padding: 5px 6px; background: rgb(139,139,139,25%); color: #90FF00; border: none;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    </button>
                </div>
                <p style="color: rgb(255,255,255,60%);">Nombres de <span class="bold-green-title">voitures électriques</span> en France</p>
                <div style="display: flex; align-items: center; justify-content: flex-start; gap: 150px;">
                <span>
                    <span style="font-size: 40px;" class="bold-green-title" id="totalVehicules">13,000,000</span>
                    <img style="width: 20px;" src="/assets/img/cars.svg" alt="">
                </span>
                    <div>
                        <button style="background: rgba(139, 139, 139, 0.25); border: none; border-radius: 999px; color: #90FF00; padding: 12px; display: inline-flex;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw">
                                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                                <path d="M3 3v5h5"/>
                                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                                <path d="M16 16h5v5"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <p style="color: rgb(255,255,255,60%)">Par région</p>
                <div style="width: 100%;">
                    <canvas id="myChart3"></canvas>
                </div>
                <script>

                </script>

            </div>
            <div style="width: 100%; max-width: 800px; margin-top: 20px;" id="map"></div>
        </div>
    </div>

    <div id="data3" class="data3">
        <p>Histoire data3</p>
    </div>
    <div id="data4" class="data4">
        <div class="block-data4">
            <div class="block-data4-chart1">
                <div class="text-data5">
                    <h3>Répartition des bornes électriques par <span class="bold-green-title">marques</span> en France</h3>
                </div>
                <div>
                    <button id="addData">Ajouter une borne</button>
                    <button id="removeData">Retirer une borne</button>
                </div>
                <canvas id="myChart"></canvas>
            </div>
            <div class="block-data4-chart2">
                <div class="text-data5">
                    <h3>Répartition des stations de recharges par <span class="bold-green-title">enseignes</span> de grande distribution</h3>
                </div>
                <div>
                    <button id="addDataStation">Ajouter une station</button>
                    <button id="removeDataStation">Retirer une station</button>
                </div>
                <canvas id="myChart2"></canvas>
            </div>
        </div>
        <div></div>
    </div>
    <div id="data5" class="data5">
        <h3>Chart race du <span class="bold-green-title">nombre</span> de voitures électriques par région</h3>
        <div class="div-data5">
            <div class="text-data5">
                <p>
                    Depuis <span class="bold-green-title">2010</span>, la mobilité électrique a connu une croissance exponentielle en France. Avec près de <span class="bold-green-title">295 000</span> véhicules électriques mis en circulation, cette technologie est passée de l’expérimentation à une adoption de masse.
                </p>
            </div>
            <div style="width: 100%" class="flourish-embed flourish-bar-chart-race" data-src="visualisation/19696907">
                <script src="https://public.flourish.studio/resources/embed.js"></script>
                <noscript><img src="https://public.flourish.studio/visualisation/19696907/thumbnail" alt="bar-chart-race visualization" /></noscript>
            </div>
        </div>
    </div>
    <div id="data6" class="data6">
        <div id="globeViz"></div>
    </div>
    <!-- Mapbox iframe -->
    <div id="mapbox" class="mapbox">
        <iframe src="https://api.mapbox.com/styles/v1/aloneday-91/cm1rthncw00z601pi9k3i3yp7.html?title=false&access_token=pk.eyJ1IjoiYWxvbmVkYXktOTEiLCJhIjoiY20xcnRmcnI2MGVjajJtczlwbWN3cDBpMiJ9.J9vvQyBfq33b_gRuga8qrQ&zoomwheel=false#5.17/46.886/2.413" title="Untitled" style="border:none;"></iframe>
    </div>
</div>

<?php
require_once 'components/footer.php';
?>