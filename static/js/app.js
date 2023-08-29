// Use the D3 library to read in samples.json from the 
// URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

function init() {
        
    // Grab a reference to the dropdown select element
    let selector = d3.select("#selDataset");
    // .on("change", optionChanged);
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    d3.json(url).then(function(data) {
        console.log(data);
    // Use the list of sample names to populate the select options
        let sampleNames = data.names;
    
        for (let i = 0; i < sampleNames.length; i++){
        selector
            .append("option")
            .text(sampleNames[i])
            .property("value", sampleNames[i]);
        };
    
        // Use the first sample from the list to build the initial plots
        let firstSample = sampleNames[0];
        barchart(firstSample);
        bubble(firstSample);
    // metadata(firstSample);
})
    
function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    barchart(newSample);
    bubble(newSample);
    // metadata(newSample);
    }
    
      // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    
function barchart(sample) {
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    d3.json(url).then(function(data) {
    let samples_data = data.samples.filter(eachperson => eachperson.id == sample)[0];
    let otu_ids = samples_data.otu_ids;
    let otu_labels = samples_data.otu_labels;
    let sample_values = samples_data.sample_values;
    let otu_name = otu_ids.slice(0, 10).map(otu_ids => `OTU ${otu_ids}`).reverse();
    let trace1 = {
        x: sample_values.slice(0, 10).reverse(),
        y: otu_name,
        type: "bar",
        orientation: "h",
        text: otu_labels.slice(0, 10).reverse()
    }
    let bar_data = [trace1]
    Plotly.newPlot("bar", bar_data);
});
}
function bubble(sample){
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    d3.json(url).then(function(data) {
    let samples_data = data.samples.filter(eachperson => eachperson.id == sample)[0];
    let otu_ids = samples_data.otu_ids;
    let otu_labels = samples_data.otu_labels;
    let sample_values = samples_data.sample_values;
    let otu_name = otu_ids.slice(0, 10).map(otu_ids => `OTU ${otu_ids}`).reverse();
    let trace2 = {
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        marker: {
            colorscale: "Earth",
            color: otu_ids,
            size: sample_values,
            text: otu_labels
        },
    };
    let bubble_data = [trace2]
    Plotly.newPlot("bubble", bubble_data)
});
    function metadata (sample){

    };

     
};
}
init();  