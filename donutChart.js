d3.csv('../data/data-2.csv').then(data => {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const svg = d3.select('#donut-chart-container').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
    .append('g')
        .attr('transform', 'translate(' + (width + margin.left) / 2 + ',' + (height + margin.top) / 2 + ')');

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Compute the total consumption by screen technology using rollups
    const technologyData = d3.rollups(
        data, 
        v => d3.sum(v, d => +d['Avg_mode_power']),  // Sum energy consumption
        d => d['Screen_Tech']  // Group by screen technology
    );

    const pie = d3.pie().value(d => d[1]);  // d[1] is the summed value
    const arc = d3.arc().innerRadius(radius - 50).outerRadius(radius - 20);

    const pieData = pie(technologyData);

    svg.selectAll('path')
        .data(pieData)
        .enter().append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data[0]));  // d.data[0] is the screen technology key

    // Optional: Add labels to the slices
    svg.selectAll('text')
        .data(pieData)
        .enter().append('text')
        .attr('transform', d => 'translate(' + arc.centroid(d) + ')')
        .attr('dy', '0.35em')
        .style('text-anchor', 'middle')
        .text(d => d.data[0] + ': ' + Math.round(d.data[1]));  // Display technology and total consumption
});
