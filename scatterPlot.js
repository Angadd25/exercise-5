d3.csv('../data/data-2.csv').then(data => {
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const svg = d3.select('#scatter-plot-container').append('svg')  // Now this matches
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
    .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d['Star Rating Index'])]) // Ensure it's treated as a number
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d['Avg_mode_power'])]) // Ensure it's treated as a number
        .range([height, 0]);

    svg.append('g')
        .selectAll('circle')
        .data(data)
        .enter().append('circle')
        .attr('cx', d => x(+d['Star Rating Index'])) // Convert to number
        .attr('cy', d => y(+d['Avg_mode_power'])) // Convert to number
        .attr('r', 5)
        .style('fill', '#69b3a2');

    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

    svg.append('g')
        .call(d3.axisLeft(y));
});
