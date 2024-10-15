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
        const startValue = 0;
        const endValue = 120;
        let currentValue = {value: startValue};

        // Animation des chiffres au scroll
        gsap.to(currentValue, {
            value: endValue,
            scrollTrigger: {
                trigger: ".orange",
                scrub: true,
                start: "top top",
                end: "+=100%",
            },
            onUpdate: function () {
                const value = Math.floor(currentValue.value);
                if (numberElement && numberElementBar) {
                    numberElement.textContent = value;
                    numberElementBar.textContent = value;
                }
            }
        });

        // --- Réinitialisation des animations pour la ligne des bornes ---
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

        // --- Animation des chiffres pour les voitures ---
        const numberElementV = document.getElementById('scroll-number-cars');
        const numberElementBarV = document.querySelector('.content-bar-gsap-cars #scroll-number-cars');
        const startValueV = 0;
        const endValueV = 3340;
        let currentValueV = {value: startValueV};

        // Animation des chiffres pour les voitures au scroll
        gsap.to(currentValueV, {
            value: endValueV,
            scrollTrigger: {
                trigger: ".orange",
                scrub: true,
                start: "top top",
                end: "+=100%"
            },
            onUpdate: function () {
                const valueV = Math.floor(currentValueV.value);
                numberElementV.textContent = valueV;
                numberElementBarV.textContent = valueV;
            }
        });

        // --- Animation de la ligne (sans scale) pour les voitures ---
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
});
