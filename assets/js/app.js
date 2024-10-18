document.addEventListener('DOMContentLoaded', () => {
    // Enregistrement du plugin ScrollTrigger de GSAP
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Vérifie si GSAP et ScrollTrigger sont chargés correctement
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP or ScrollTrigger is not loaded properly.');
        return;
    }

    // Initialisation de Lenis pour un défilement fluide (smooth scrolling)
    const lenis = new Lenis();
    lenis.on('scroll', (e) => {});

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    function initAnimations() {
        // --- Réinitialisation des animations pour les bornes ---
        const numberElement = document.getElementById('scroll-number');
        const numberElementBar = document.querySelector('.content-bar-gsap #scroll-number');
        const yearElement = document.getElementById('scroll-year');
        const yearPlusElement = document.getElementById('scroll-year-plus'); // Va afficher l'année précédente
        const yearMoinsElement = document.getElementById('scroll-year-moins'); // Va afficher l'année suivante

        fetch('/assets/datas/operateurData.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const totalBornes = data.reduce((total, entry) => total + entry["Record Count"], 0);
                let currentValue = {value: 0};

                // --- Animation des chiffres pour les bornes ---
                gsap.to(currentValue, {
                    value: totalBornes,
                    scrollTrigger: {
                        trigger: ".orange",
                        scrub: true,
                        start: "top top",
                        end: "+=100%",
                        onUpdate: function (self) {
                            const yearIndex = Math.floor(self.progress * 12);  // Maximum 12 années
                            const divisor = 13 - yearIndex;

                            if (divisor > 0) {
                                const result = totalBornes / divisor;
                                const value = Math.floor(result);
                                numberElement.textContent = value;
                                numberElementBar.textContent = value;

                                // Mise à jour de l'année actuelle, précédente, et suivante
                                const currentYear = 2011 + yearIndex;
                                yearElement.textContent = currentYear;
                                yearPlusElement.textContent = currentYear - 1; // L'année du haut est l'année précédente
                                yearMoinsElement.textContent = currentYear + 1; // L'année du bas est l'année suivante

                                // Animation de l'opacité et du défilement pour les années
                                gsap.to(yearElement, {opacity: 1, y: 0});
                            }
                        }
                    }
                });

                // --- Animation de la ligne des bornes ---
                gsap.fromTo(".line-2",
                    {x: "-100%"},
                    {
                        x: "0%",
                        scrollTrigger: {
                            trigger: ".orange",
                            scrub: true,
                            start: "top top",
                            end: "+=100%",
                        },
                        ease: "none"
                    }
                );
            })
            .catch(error => console.error('Error loading JSON:', error));



        // --- Animation des chiffres pour les voitures ---
        const numberElementV = document.getElementById('scroll-number-cars');
        const numberElementBarV = document.querySelector('.content-bar-gsap-cars #scroll-number-cars');

        fetch('/assets/datas/nbVehicRegions.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const years = Object.keys(data.Feuil1[0]).filter(key => key !== 'regions');
                const totalByYear = years.map(year => {
                    return data.Feuil1.reduce((total, region) => total + parseInt(region[year], 10), 0);
                });

                let currentValueV = {value: totalByYear[0]};

                // --- Animation des chiffres pour les voitures au scroll ---
                gsap.to(currentValueV, {
                    value: totalByYear[totalByYear.length - 1],
                    scrollTrigger: {
                        trigger: ".orange",
                        scrub: true,
                        start: "top top",
                        end: "+=100%",
                        onUpdate: function (self) {
                            const scrollProgress = self.progress;
                            const yearIndex = Math.floor(scrollProgress * (years.length - 1));
                            const nextYearIndex = Math.min(yearIndex + 1, years.length - 1);
                            const currentYearTotal = totalByYear[yearIndex];

                            const startYearValue = totalByYear[yearIndex];
                            const endYearValue = totalByYear[nextYearIndex];
                            const localProgress = (scrollProgress * (years.length - 1)) - yearIndex;
                            const interpolatedValue = gsap.utils.interpolate(startYearValue, endYearValue, localProgress);

                            const valueToDisplay = Math.floor(interpolatedValue);
                            numberElementV.textContent = valueToDisplay;
                            numberElementBarV.textContent = valueToDisplay;

                            // Mise à jour de l'année
                            const currentYear = years[yearIndex]; // Obtenir l'année à partir du tableau
                            yearElement.textContent = currentYear; // Afficher l'année correspondante
                        }
                    }
                });

                // --- Animation de la ligne pour les voitures ---
                gsap.fromTo(".line-3",
                    {x: "-100%"},
                    {
                        x: "0%",
                        scrollTrigger: {
                            trigger: ".orange",
                            scrub: true,
                            pin: true,
                            start: "top top",
                            end: "+=100%",
                            pinSpacing: true
                        },
                        ease: "none"
                    }
                );
            })
            .catch(error => console.error('Error loading JSON:', error));

        gsap.from("#title", {
            scrollTrigger: {
                trigger: "#title",
                start: "top 30%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 20,
            duration: 2
        });

        // Optionnel : Animation d'apparition pour le titre
        gsap.from("#title", {
            scrollTrigger: {
                trigger: "#title",
                start: "top 95%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 20,
            duration: 1
        });
    }

    initAnimations();

    function initGlobe() {
        const world = Globe({ animateIn: true })
        (document.getElementById('globeViz'))
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
            .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
            .backgroundColor('rgba(0, 0, 0, 0)'); // Set the background transparent

        // Auto-rotate
        world.controls().autoRotate = true;
        world.controls().autoRotateSpeed = 0.90;

        world.controls().enableRotate = false;
        world.controls().enableZoom = false;

        // Set the renderer to use alpha (transparency)
        world.renderer().setClearColor(0x000000, 0); // Set background to transparent
    }

    function initChart() {
        const ctx = document.getElementById('myChart');
        const ctx2 = document.getElementById('myChart2');

        let chart;
        let chart2;
        let currentData = [];
        let dataEnseigne = [];
        let labels = [];
        let displayedDataCount = 8;

        // Charger les données JSON et initialiser les graphiques
        fetch('/assets/datas/operateurData.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(jsonData => {
                const filteredData = jsonData.slice(1);
                createChart(filteredData);
                return filteredData; // Renvoie les données pour une utilisation ultérieure
            })
            .then(filteredData => {
                // Appel de createChart2 après avoir chargé les données
                fetch('/assets/datas/enseigneData.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok ' + response.statusText);
                        }
                        return response.json();
                    })
                    .then(jsonData => {
                        const filteredDataEnseigne = jsonData.slice(1);
                        createChart2(filteredDataEnseigne);
                    });
            });

        function createChart(jsonData) {
            labels = jsonData.map(item => item.nom_amenageur);
            currentData = jsonData.map(item => item["Record Count"]);

            chart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels.slice(0, displayedDataCount),
                    datasets: [{
                        label: 'Bornes par marques',
                        data: currentData.slice(0, displayedDataCount),
                        borderWidth: 1,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        fill: true,
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        datalabels: {
                            color: '#fff',
                            formatter: (value, ctx) => {
                                let sum = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                                let percentage = (value * 100 / sum).toFixed(2) + "%";
                                return percentage;
                            },
                            anchor: 'center',
                            align: 'center',
                            font: {
                                weight: 'bold',
                                size: 16
                            }
                        },
                    }
                }
            });
        }


        // ajouter ou supprimer une ligne de données dans le graphique (bornes par marques)
        document.getElementById('addData').addEventListener('click', () => {
            if (displayedDataCount < labels.length) {
                displayedDataCount++;
                chart.data.labels = labels.slice(0, displayedDataCount);
                chart.data.datasets[0].data = currentData.slice(0, displayedDataCount);
                chart.update();
            }
        });

        document.getElementById('removeData').addEventListener('click', () => {
            if (displayedDataCount > 1) {
                displayedDataCount--;
                chart.data.labels = labels.slice(0, displayedDataCount);
                chart.data.datasets[0].data = currentData.slice(0, displayedDataCount);
                chart.update();
            }
        });

        function createChart2(jsonData) {
            labels = jsonData.map(item => item.nom_enseigne);
            dataEnseigne = jsonData.map(item => item["CountEnseigne"]);

            chart2 = new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    labels: labels.slice(0, displayedDataCount),
                    datasets: [{
                        label: 'Stations par enseignes',
                        data: dataEnseigne.slice(0, displayedDataCount),
                        borderWidth: 1,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        fill: true,
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        datalabels: {
                            color: '#fff',
                            formatter: (value, ctx) => {
                                let sum = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                                let percentage = (value * 100 / sum).toFixed(2) + "%";
                                return percentage;
                            },
                            anchor: 'center',
                            align: 'center',
                            font: {
                                weight: 'bold',
                                size: 16
                            }
                        },
                    }
                }
            });
        }

        // ajouter ou supprimer une ligne de données dans le graphique
        document.getElementById('addDataStation').addEventListener('click', () => {
            if (displayedDataCount < labels.length) {
                displayedDataCount++;
                chart2.data.labels = labels.slice(0, displayedDataCount);
                chart2.data.datasets[0].data = dataEnseigne.slice(0, displayedDataCount);
                chart2.update();
            }
        });

        document.getElementById('removeDataStation').addEventListener('click', () => {
            if (displayedDataCount > 1) {
                displayedDataCount--;
                chart2.data.labels = labels.slice(0, displayedDataCount);
                chart2.data.datasets[0].data = dataEnseigne.slice(0, displayedDataCount);
                chart2.update();
            }
        });
    }

    const width = 850, height = 650;
    const path = d3.geoPath();

// Définition de la projection Lambert-93
    const projection = d3.geoConicConformal()
        .center([2.454071, 46.279229])
        .scale(3500)
        .translate([width / 2, height / 2]);

    path.projection(projection);

    const svg = d3.select('#map').append("svg")
        .attr("id", "svg")
        .attr("width", width)
        .attr("height", height);

    const deps = svg.append("g");

// Palette de couleurs
    const colors = [
        '#9acd32', '#8dc73f', '#66bb6a', '#4caf50', '#388e3c', '#006400'
    ];

    const getColor = (index) => colors[index % colors.length];

// Initialisation de l'année par défaut
    var currentYear = 2020;

// Chargement simultané des fichiers GeoJSON et JSON
    Promise.all([
        d3.json('/assets/datas/regions.geojson'),
        d3.json('/assets/datas/nbVehicRegions.json')
    ]).then(function ([geojson, vehiculeData]) {
        const dataFeuil1 = vehiculeData.Feuil1;

        // Dictionnaire pour les valeurs par région
        const valueMap = {};
        dataFeuil1.forEach(item => {
            valueMap[item.regions] = item; // Map chaque région à son objet complet
        });

        // Fonction pour mettre à jour la carte avec le pourcentage en fonction de l'année
        function updateMap() {
            // Calculer le total global pour l'année actuelle
            const totalGlobal = Object.values(valueMap).reduce((acc, val) => {
                return acc + parseInt(val[currentYear] || 0); // Utilise l'année courante
            }, 0);

            // Mettre à jour les couleurs et les chemins
            deps.selectAll("path")
                .data(geojson.features)
                .join("path")  // Utilisation de join pour lier les données
                .attr('class', 'regions')
                .attr("d", path) // Tracé des chemins pour chaque région
                .attr("fill", (d, i) => {
                    const regionName = d.properties.nom;
                    const valueObject = valueMap[regionName];
                    if (valueObject) {
                        const value = parseInt(valueObject[currentYear] || 0);
                        const percentage = (value / totalGlobal) * 100;
                        return getColor(i); // Détermine la couleur ici
                    }
                    return '#ccc'; // Couleur par défaut si la région n'est pas trouvée
                })
                .on("mouseover", function (event, d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html("Région : " + d.properties.nom)
                        .style("left", (event.pageX + 30) + "px")
                        .style("top", (event.pageY - 30) + "px");
                })
                .on("mouseout", function (event, d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });

            // Mettre à jour les labels de pourcentage
            deps.selectAll("text")
                .data(geojson.features)
                .join("text")
                .attr("class", "percentage-label")
                .attr("x", d => projection(d3.geoCentroid(d))[0]) // Centrer le texte
                .attr("y", d => projection(d3.geoCentroid(d))[1]) // Centrer le texte
                .attr("text-anchor", "middle") // Centrer le texte
                .attr("font-size", "15px") // Taille de police
                .attr("font-weight", "bold") // Poids de la police
                .attr("background", "#000") // Couleur de fond
                .attr("fill", "#fff") // Couleur du texte
                .text(d => {
                    const regionName = d.properties.nom; // Assurez-vous que c'est le bon nom
                    const valueObject = valueMap[regionName]; // Récupérer l'objet pour la région

                    if (valueObject) {
                        const value = parseInt(valueObject[currentYear] || 0); // Valeur pour l'année actuelle
                        const percentage = (value / totalGlobal) * 100; // Calcul du pourcentage
                        return percentage.toFixed(1) + '%'; // Affichez le pourcentage
                    }
                    return ''; // Si aucune valeur n'est trouvée, retourner une chaîne vide
                });
        }

        // Initialisation de la carte
        updateMap();

        // Gestion des événements pour les boutons
        d3.select('#btnPlus').on('click', () => {
            if (currentYear < 2023) {
                currentYear++;
                d3.select('#currentYear').text(currentYear); // Mettre à jour l'année affichée
                updateMap(); // Mettre à jour la carte
            }
        });

        d3.select('#btnMinus').on('click', () => {
            if (currentYear > 2011) {
                currentYear--;
                d3.select('#currentYear').text(currentYear); // Mettre à jour l'année affichée
                updateMap(); // Mettre à jour la carte
            }
        });
    });

    let div = d3.select("body").append("div")
        .attr("class", "map-tooltip")
        .style("opacity", 0);






    // Charger les données depuis nbVehicRegions.json
    fetch('assets/datas/nbVehicRegions.json')
        .then(response => response.json())
        .then(jsonData => {
            // Extraire les années disponibles
            const years = Object.keys(jsonData.Feuil1[0]).filter(key => key !== 'regions');
            let currentYearIndex = years.indexOf('2020');  // Initialiser l'année courante à 2011

            // Extraire les régions
            const regions = jsonData.Feuil1.map(item => item.regions);

            // Fonction pour mettre à jour le graphique et le nombre total de véhicules
            function updateChart(yearIndex) {
                const year = years[yearIndex];
                const dataForYear = jsonData.Feuil1.map(item => item[year]);

                // Mise à jour du graphique
                myChart.data.datasets[0].data = dataForYear;  // Mettre à jour les données du graphique
                myChart.data.datasets[0].label = `Nombre de véhicules en ${year}`;  // Mettre à jour le label
                myChart.update();  // Redessiner le graphique

                // Mise à jour du nombre total de véhicules pour l'année
                const totalVehicles = dataForYear.reduce((sum, num) => sum + Number(num), 0);
                document.getElementById('totalVehicules').textContent = totalVehicles.toLocaleString();  // Formatage du nombre avec des virgules

                // Mettre à jour l'affichage de l'année actuelle
                document.getElementById('currentYear').textContent = year;
            }

            // Initialisation du graphique
            const ctx = document.getElementById('myChart3').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: regions,  // Affichage des régions sur l'axe Y
                    datasets: [{
                        label: `Nombre de véhicules en ${years[currentYearIndex]}`,
                        data: jsonData.Feuil1.map(item => item[years[currentYearIndex]]),
                        backgroundColor: 'rgba(144, 250, 0, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: {
                                display: false,
                            },
                            ticks: {
                                display: false,
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 8,
                                    family: 'Arial',
                                    style: 'italic'
                                },
                                color: '#fff'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });

            // Mettre à jour les données initiales pour 2011
            updateChart(currentYearIndex);

            // Gestion des boutons pour changer d'année
            document.getElementById('btnMinus').addEventListener('click', () => {
                if (currentYearIndex > 0) {
                    currentYearIndex--;
                    updateChart(currentYearIndex);
                }
            });

            document.getElementById('btnPlus').addEventListener('click', () => {
                if (currentYearIndex < years.length - 1) {
                    currentYearIndex++;
                    updateChart(currentYearIndex);
                }
            });
        })
        .catch(error => console.error('Erreur lors du chargement des données :', error));

    initChart();
    initGlobe();

    gsap.utils.toArray('.data-1-count').forEach((data, index) => {
        gsap.from(data, {
            scrollTrigger: {
                trigger: data,
                start: "top 80%",
                end: "top 20%",
                scrub: true,
                toggleActions: "play none none reverse"
            },
            x: -100,
            opacity: 0,
            duration: 1
        });
    });

    document.querySelectorAll('.storyButton').forEach(button => {
        button.addEventListener('click', () => {
            const storyContainer = button.closest('.storyContainer');  // Trouve le bon storyContainer
            const storyTitleDisable = storyContainer.querySelector('.storyTitleDisable');
            const storyLightningDisable = storyContainer.querySelector('.storyLightningDisable');
            const storyTextContainer = storyContainer.querySelector('.storyTextContainer');

            // Ajout ou suppression des classes uniquement dans le storyContainer actuel
            storyTitleDisable.classList.toggle('storyTitle');
            storyLightningDisable.classList.toggle('storyLightning');
            storyTextContainer.classList.toggle('active');
            button.classList.toggle('storyButtonActive');

            // Ajout ou suppression de la classe 'active' dans le storyContainer lui-même
            storyContainer.classList.toggle('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Ajoutez ici votre code JavaScript, y compris fetch et addEventListener

    let stations = [];

    // Charger le fichier JSON avec fetch
    fetch('/assets/datas/pointChargeMap.json')
        .then(response => response.json())
        .then(data => {
            stations = data;  // On stocke les données JSON dans la variable stations
        })
        .catch(error => {
            console.error("Erreur lors du chargement du fichier JSON :", error);
        });

    // Fonction pour extraire la ville à partir de l'adresse
    function extraireVille(adresse) {
        const regex = /\d{5}\s(.+)/;
        const match = adresse.match(regex);
        return match ? match[1] : '';
    }

    // Fonction de filtrage
    function filtrerStations(searchTerm) {
        const ville = searchTerm.trim().toLowerCase();
        return stations.filter(station => {
            const villeStation = extraireVille(station.adresse_station).toLowerCase();
            return villeStation.includes(ville);
        });
    }

    // Fonction pour afficher les résultats
    function afficherStations(stations) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // On vide les résultats précédents

        const stationsAAfficher = stations.slice(0, 4);

        stationsAAfficher.forEach(station => {
            const stationDiv = document.createElement('div');
            stationDiv.classList.add('station');
            stationDiv.innerHTML = `
                <p class="stationTitle">${station.nom_station}</p>
                <p>Adresse : ${station.adresse_station}</p>
                <div class="stationStats">
                <div class="stationPuissance">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none">
                        <path d="M4.8 0C4.95913 0 5.11174 0.0632141 5.22426 0.175736C5.33679 0.288258 5.4 0.44087 5.4 0.6V3.6H9V0.6C9 0.44087 9.06321 0.288258 9.17574 0.175736C9.28826 0.0632141 9.44087 0 9.6 0C9.75913 0 9.91174 0.0632141 10.0243 0.175736C10.1368 0.288258 10.2 0.44087 10.2 0.6V3.6H11.4C11.5591 3.6 11.7117 3.66321 11.8243 3.77574C11.9368 3.88826 12 4.04087 12 4.2V7.8C12 8.91391 11.5575 9.98219 10.7698 10.7698C9.9822 11.5575 8.91391 12 7.8 12C7.7976 12.5208 7.788 13.014 7.752 13.464C7.7028 14.0808 7.6008 14.6676 7.3716 15.1728C7.13949 15.7073 6.7277 16.1437 6.2076 16.4064C5.67 16.68 5.0028 16.8 4.2 16.8C3.0024 16.8 2.268 17.196 1.8312 17.6616C1.43663 18.0779 1.21156 18.6265 1.2 19.2H0C0 18.4608 0.2784 17.5596 0.9564 16.8384C1.6488 16.104 2.7132 15.6 4.2 15.6C4.8972 15.6 5.3544 15.4944 5.6616 15.3372C5.9508 15.1896 6.1416 14.9772 6.2784 14.6772C6.4236 14.358 6.51 13.932 6.5544 13.3692C6.5868 12.9612 6.5964 12.5076 6.5988 12C5.4851 11.9997 4.41712 11.557 3.62973 10.7694C2.84233 9.9818 2.4 8.9137 2.4 7.8V4.2C2.4 4.04087 2.46321 3.88826 2.57574 3.77574C2.68826 3.66321 2.84087 3.6 3 3.6H4.2V0.6C4.2 0.44087 4.26321 0.288258 4.37574 0.175736C4.48826 0.0632141 4.64087 0 4.8 0ZM3.6 4.8V7.8C3.6 8.59565 3.91607 9.35871 4.47868 9.92132C5.04129 10.4839 5.80435 10.8 6.6 10.8H7.8C8.59565 10.8 9.35871 10.4839 9.92132 9.92132C10.4839 9.35871 10.8 8.59565 10.8 7.8V4.8H3.6Z" fill="#90FF00"/>
                    </svg>
                    <div class="stationPuissanceTitle">
                    <span>Nombres de bornes</span>
                    <p>${station.puissance_nominale} disponible(s)</p>
                    </div>
                </div>
                <div class="stationPuissance">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="16" viewBox="0 0 23 16" fill="none">
                      <path d="M13.7784 0.0989252C13.9189 0.180705 14.0274 0.30766 14.0864 0.459079C14.1454 0.610498 14.1514 0.777442 14.1033 0.932675L12.4732 6.22843H15.3338C15.4742 6.22837 15.6115 6.26942 15.7288 6.34652C15.8461 6.42361 15.9383 6.53337 15.994 6.66225C16.0496 6.79113 16.0663 6.93348 16.042 7.07174C16.0176 7.20999 15.9534 7.3381 15.8571 7.44024L8.18944 15.5866C8.07817 15.7049 7.93009 15.782 7.76936 15.8054C7.60863 15.8288 7.44471 15.7971 7.30433 15.7154C7.16394 15.6337 7.05537 15.5068 6.9963 15.3555C6.93723 15.2042 6.93116 15.0374 6.97906 14.8822L8.61062 9.58499H5.75C5.60962 9.58504 5.4723 9.54399 5.35498 9.4669C5.23767 9.3898 5.1455 9.28004 5.08985 9.15116C5.0342 9.02228 5.01751 8.87993 5.04184 8.74168C5.06617 8.60342 5.13045 8.47532 5.22675 8.37318L12.8929 0.226863C13.0042 0.108357 13.1523 0.0310484 13.3131 0.00755189C13.4739 -0.0159446 13.638 0.0157583 13.7784 0.0974875V0.0989252Z" fill="#90FF00"/>
                      <path d="M2.875 2.15743H9.10225L7.751 3.59493H2.875C2.49375 3.59493 2.12812 3.74638 1.85853 4.01596C1.58895 4.28554 1.4375 4.65118 1.4375 5.03243V10.7824C1.4375 11.1637 1.58895 11.5293 1.85853 11.7989C2.12812 12.0685 2.49375 12.2199 2.875 12.2199H6.29625L5.8535 13.6574H2.875C2.1125 13.6574 1.38124 13.3545 0.842068 12.8154C0.302901 12.2762 0 11.5449 0 10.7824V5.03243C0 4.26993 0.302901 3.53866 0.842068 2.99949C1.38124 2.46033 2.1125 2.15743 2.875 2.15743Z" fill="#90FF00"/>
                      <path d="M2.875 5.03243H6.39687L4.18025 7.38849C3.9515 7.63163 3.78233 7.92457 3.68606 8.24423C3.5898 8.56388 3.56907 8.90152 3.62551 9.23055C3.68195 9.55958 3.81402 9.87101 4.01131 10.1403C4.20861 10.4096 4.46573 10.6294 4.76244 10.7824H2.875V5.03243ZM15.2303 2.15743L14.7876 3.59493H17.25C17.6312 3.59493 17.9969 3.74638 18.2665 4.01596C18.536 4.28554 18.6875 4.65118 18.6875 5.03243V10.7824C18.6875 11.1637 18.536 11.5293 18.2665 11.7989C17.9969 12.0685 17.6312 12.2199 17.25 12.2199H13.3343L11.9801 13.6574H17.25C18.0125 13.6574 18.7438 13.3545 19.2829 12.8154C19.8221 12.2762 20.125 11.5449 20.125 10.7824V5.03243C20.125 4.26993 19.8221 3.53866 19.2829 2.99949C18.7438 2.46033 18.0125 2.15743 17.25 2.15743H15.2303Z" fill="#90FF00"/>
                      <path d="M17.25 10.7824H14.6869L16.9036 8.42636C17.0435 8.27686 17.159 8.11395 17.25 7.93761V10.7824ZM17.25 5.96105V5.03243H16.3214C16.7199 5.23788 17.0445 5.56248 17.25 5.96105ZM23 7.90743C23 8.4793 22.7728 9.02775 22.3685 9.43213C21.9641 9.8365 21.4156 10.0637 20.8438 10.0637V5.75118C21.4156 5.75118 21.9641 5.97835 22.3685 6.38273C22.7728 6.7871 23 7.33555 23 7.90743Z" fill="#90FF00"/>
                    </svg>
                    <div class="stationPuissanceTitle">
                    <span>Puissance</span>
                    <p>max ${station.puissance_nominale} kW</p>
                    </div>
                </div>
                </div>
            `;
            resultsDiv.appendChild(stationDiv);
        });
    }

    // Fonction pour gérer la recherche en temps réel
    document.getElementById('searchInput').addEventListener('input', (event) => {
        const searchTerm = event.target.value;
        const filteredStations = filtrerStations(searchTerm);
        afficherStations(filteredStations);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.landing-button').addEventListener('click', function() {
        document.getElementById('title').scrollIntoView({ behavior: 'smooth' });
    });
});


