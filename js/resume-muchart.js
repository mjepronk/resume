"use strict";

/*
 * 2017 Matthias Pronk
 *
 * Micro library to create a doughnut chart.
 */

(function() {
    var NS = "http://www.w3.org/2000/svg";

    var getPathElement = function(value, total, className) {
        var alpha = 360 / total * value,
            a = (90 - alpha) * Math.PI / 180,
            x = 300 + 200 * Math.cos(a),
            y = 300 - 200 * Math.sin(a),
            path,
            d,
            elem;
        if (total == value) {
            path = [["M", 300, 100], ["A", 200, 200, 0, 1, 1, 299.99, 100]];
        } else {
            path = [["M", 300, 100], ["A", 200, 200, 0, 1, 1, x, y]];
        }
        var elem = document.createElementNS(NS, 'path');
        d = path.reduce(function(a, b) { return a.concat(b) }).join(' ');
        elem.setAttribute('d', d);
        elem.setAttribute('fill', 'transparent');
        elem.setAttribute('stroke-width', 20)
        elem.classList.add(className)
        return elem;
    };

    var createMuChart = function(value) {
        var svg = document.createElementNS(NS, "svg");
        svg.setAttribute("viewBox", "50 50 500 500");
        
        var title = document.createElementNS(NS, "title");
        title.textContent = value;
        
        var ring = getPathElement(100, 100, 'muchart-ring');
        var segment = getPathElement(value, 100, 'muchart-segment');
        svg.appendChild(title);
        svg.appendChild(ring);
        svg.appendChild(segment);
        return svg;
    };

    var replaceMuCharts = function() {
        var sel = document.querySelectorAll('.muchart'),
            value, svg;
        for (var elem of sel) {
            value = parseFloat(elem.getAttribute('data-muchart-value'));
            svg = createMuChart(value);
            elem.appendChild(svg);
        }
    };

    document.addEventListener("DOMContentLoaded", function() { 
        replaceMuCharts();
    });
})();
