d3.csv('../data/data-2.csv').then(data => {
    // Parse the data - convert the necessary columns to numbers
    data.forEach(d => {
        d['Star Rating Index'] = +d['Star Rating Index'];  // Convert to number
        d['Avg_mode_power'] = +d['Avg_mode_power'];  // Convert to number
    });

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    // Create the SVG container for the line chart
    const svg = d3.select('#line-chart-container').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
    .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Set the x and y scales
    const x = d3.scaleLinear()
        .domain([d3.min(data, d => d['Star Rating Index']), d3.max(data, d => d['Star Rating Index'])])  // Use 'Star Rating Index' as the x-axis
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d['Avg_mode_power'])])  // Use 'Avg_mode_power' as the y-axis
        .range([height, 0]);

    // Define the line generator function
    const line = d3.line()
        .x(d => x(d['Star Rating Index']))  // Use 'Star Rating Index' for x positions
        .y(d => y(d['Avg_mode_power']));  // Use 'Avg_mode_power' for y positions

    // Append the line to the SVG container
    svg.append('path')
        .data([data])  // Bind the data to the line path
        .attr('class', 'line')
        .attr('d', line)  // Generate the path for the line chart
        .style('fill', 'none')
        .style('stroke', '#69b3a2')
        .style('stroke-width', 2);

    // Add the X axis
    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

    // Add the Y axis
    svg.append('g')
        .call(d3.axisLeft(y));
});

