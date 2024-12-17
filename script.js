// Data URLs
const EDUCATION_URL =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
const COUNTY_URL =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

// Define dimensions
const margin = { top: 100, right: 0, bottom: 0, left: 0 };
const width = 960 - margin.left - margin.right;
const height = 680 - margin.top - margin.bottom;
const padding = 60;

// Select the map container and append an SVG
const svg = d3
  .select('body')
  .append('svg')
  .attr('id', 'map')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom);

// Tooltip
const tooltip = d3
  .select('body')
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0);

// Define color scale
const colorScale = d3
  .scaleThreshold()
  .domain([10, 20, 30, 40, 50, 60])
  .range(['#f0f9e8', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac', '#023457']);

// Load Data
Promise.all([d3.json(COUNTY_URL), d3.json(EDUCATION_URL)]).then(
  ([us, educationData]) => {
    const educationMap = new Map(educationData.map((d) => [d.fips, d]));

    // Add Title and Description
    svg
      .append('text')
      .attr('id', 'title')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('font-size', '2rem')
      .style('fill', '#343434')
      .text('United States Educational Attainment');

    svg
      .append('text')
      .attr('id', 'description')
      .attr('x', width / 2)
      .attr('y', 55)
      .attr('text-anchor', 'middle')
      .attr('font-size', '1rem')
      .style('fill', '#252525')
      .text(
        "Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)"
      );
  }
);
