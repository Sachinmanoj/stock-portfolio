import React, { Component } from 'react';
import * as d3 from 'd3';
import utils from '../utils/utils-service';

class graphStockStatus extends Component {

    graphRegion() {
        let graphOptions = {};
        graphOptions.width = 500;
        graphOptions.height = 250;
        graphOptions.padding = 35;
        graphOptions.graphMargin = 50;
        return graphOptions;
    }

    initGraphRegion() {
        this.getGraphRegion().remove();
        var graphOptions = this.graphRegion();  
        d3.select('#stockGraph')
            .append('svg')
                .attr('id', 'stockGraphPlot')
                .attr('width', graphOptions.width)
                .attr('height', graphOptions.height);                
    }

    getGraphRegion() {
        return d3.select('#stockGraphPlot');
    }

    getGraphSVG() {
        return d3.select('#stockGraph svg');
    }

    calcNetWorthInTime(props, time) {
        return props.portfolioStocks.reduce((netValue, stock) => {
            return netValue + (props.stockdata.getPriceOfStockInTime(stock.stockId, time) * 
            props.findInShareDetails(props.shareDetails, stock.stockId).shareCount)
        }, 0);
    } 

    constructPlotData(props) {
        return props.stockdata.getTimeData()
        .map((timeXaxis) => {
            var plot = {};
            plot.time = new Date(timeXaxis);
            plot.netWorth = this.calcNetWorthInTime(props, timeXaxis);
            return plot;
        }); 
    } 

    setGraphScale(plotData) {
        var graphOptions = this.graphRegion();
        var scale = {};
        scale.xScale = d3.scaleTime()
            .domain(d3.extent(plotData, function(plot) { return plot.time; }))
            .range([graphOptions.padding, graphOptions.width - graphOptions.padding]);
        scale.yScale = d3.scaleLinear()
            .domain([
                d3.min(plotData, function(plot) { 
                    let min = (plot.netWorth - graphOptions.graphMargin)
                    return min > 0 ? min : 0; 
                }),
                d3.max(plotData, function(plot) { 
                    return plot.netWorth + graphOptions.graphMargin; 
                })
            ])
            .range([graphOptions.height - graphOptions.padding, graphOptions.padding]);
        return scale;
    }

    setGraphAxis(scale) {
        var graphOptions = this.graphRegion();
        var graphHolder = this.getGraphRegion();
        var xAxis = d3.axisBottom(scale.xScale)
            .tickFormat(d3.timeFormat("%d %b"))
            .ticks(7)
            .tickSizeInner(0)
            .tickSizeOuter(0);
        var yAxis = d3.axisLeft(scale.yScale)
            .tickFormat(d3.format("d"))
            .ticks(5)
            .tickSizeInner(-(graphOptions.width - 2 * graphOptions.padding))
            .tickSizeOuter(0);
        
        graphHolder.append('g')
            .attr('transform', 'translate(' + 0 + ', ' + (graphOptions.height - graphOptions.padding ) + ')')
            .call(xAxis);
        graphHolder.append('g')
            .attr('transform', 'translate(' + graphOptions.padding + ', ' + 0 + ')')
            .call(yAxis);

        graphHolder.append('text')
            .text('Value')
            .attr('class', 'axis-text')
            .attr('transform', 'translate(' + (graphOptions.padding) + ', ' +(graphOptions.padding) + ')')
            .attr('dx', '0em')
            .attr('dy', '-1em')
            .style("text-anchor", "middle");
    }

    drawLine(plotData, scale) {        
        var graphHolder = this.getGraphRegion();
        var line = d3.line()
            .x((data) => { return scale.xScale(data.time); })        
            .y((data) => { return scale.yScale(data.netWorth); });
        
        graphHolder.append('svg:path')
            .data([plotData])
            .attr('d', line)
            .attr('stroke', '#82AFE4')
            .attr('stroke-width', 2)
            .attr('fill', 'none');
    }

    drawArea(plotData, scale) {
        var graphHolder = this.getGraphRegion();
        var graphOptions = this.graphRegion();
        var area = d3.area()
            .x(function(data) { return scale.xScale(data.time); })
            .y0(graphOptions.height - graphOptions.padding )
            .y1(function(data) { return scale.yScale(data.netWorth); });

        graphHolder.append('svg:path')
            .data([plotData])
            .attr('d', area)
            .attr('fill', '#82AFE4')
            .attr('fill-opacity', 0.7);
    }
    
    
    tooltip(plotData, scale) {
        var graphHolder = this.getGraphRegion();
        var getGraphSVG = this.getGraphSVG();
        var graphOptions = this.graphRegion();
        var graphMaxWidth = graphOptions.width - graphOptions.padding;
        var graphMinWidth = graphOptions.padding;
        var bisector = d3.bisector(function(d) { return d.time; }).left;
        var focus = graphHolder.append("g")
                        .attr("class", "focus")
                        .style("display", "none");

        focus.append("circle")
            .attr("r", 4.5)
            .attr('fill', '#15569C');
        focus.append("text")
            .attr("dx", "-1em")
            .attr("dy", "-1em")
            .attr('fill', '#15569C');

        getGraphSVG.on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", function () {
                let xpointer = d3.mouse(this)[0];
                if(xpointer >= graphMinWidth &&  xpointer <= graphMaxWidth) {
                    var x0 = scale.xScale.invert(d3.mouse(this)[0]),
                    i = bisector(plotData, x0, 1),
                    d0 = plotData[i - 1],
                    d1 = plotData[i],
                    d = x0 - d0.time > d1.time - x0 ? d1 : d0;
                    focus.attr("transform", "translate(" + scale.xScale(d.time) + "," + scale.yScale(d.netWorth) + ")");
                    focus.select("text").text(utils.toRupeeFormat(d.netWorth));                
                }
            })
        
    }

    updateGraphPlot(props) {
        var plotData = this.constructPlotData(props);
        var scale = this.setGraphScale(plotData)
        this.setGraphAxis(scale);
        this.drawLine(plotData, scale);
        this.drawArea(plotData, scale);
        this.tooltip(plotData, scale);
    }
    
    render() {
        return  (
            <div className="graph-container"> 
                <h3 className="graph-header"> Portfolio Overview </h3>
                <div id="stockGraph"></div>
            </div>
        );
    }
    
    componentDidUpdate() {
        this.initGraphRegion();
        this.updateGraphPlot(this.props);
    }
    
    componentDidMount() {
        this.initGraphRegion();
        this.updateGraphPlot(this.props);
    }

    componentWillUnmount() {
        this.getGraphRegion().remove();
    }
}

export default graphStockStatus;