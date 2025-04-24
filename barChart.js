d3.csv('../data/data-2.csv').then(data => {
    // Filter the data for TVs with a screen size of 55 inches
    const filteredData = data.filter(d => +d['Screen Size (in inches)'] > 50 && +d['Screen Size (in inches)'] < 60);
    console.log(filteredData);  // Debugging line to check filtered data

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    // Create the SVG container for the bar chart
    const svg = d3.select('#bar-chart-container').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
    .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Set the x and y scales
    const x = d3.scaleBand()
        .domain(filteredData.map(d => d['Screen_Tech']))  // Group by screen technology
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => +d['Avg_mode_power']) * 1.1])  // Add a buffer for visibility
        .range([height, 0]);

    // Create the bars for the bar chart
    svg.selectAll('.bar')
        .data(filteredData)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d['Screen_Tech']))
        .attr('y', d => y(+d['Avg_mode_power']))  // Convert to number
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(+d['Avg_mode_power']))  // Height based on power
        .style('fill', '#69b3a2');

    // Add the x-axis
    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

    // Add the y-axis
    svg.append('g')
        .call(d3.axisLeft(y));
})
.catch(error => {
    console.error('Error loading or processing data:', error);
});
