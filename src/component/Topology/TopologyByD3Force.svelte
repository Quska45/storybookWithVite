<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import {nodes, links} from './graph.json'

    export let alpha;

    let width = window.innerWidth-100;
    let height = window.innerHeight-100;

    function resize(){
        console.log('resize');
        console.log(this);
    };

    window.resize = function(){
        resize();
    }

    onMount(() => {

        function getNodeColor(node) {
            return node.level === 1 ? 'red' : 'gray'
        };
        
        const svg = d3.select( 'svg' )
            .attr( 'width', width )
            .attr( 'height', height )
        ;

        const linkForce = d3
            .forceLink()
            .id(function (link) { return link.id })
            .strength(function (link) { return link.strength })

        const simulation = d3
            .forceSimulation()
            .force('link', linkForce)
            .force('charge', d3.forceManyBody().strength(-120))
            .force('center', d3.forceCenter(width / 2, height / 2))
        ;

        const linkElements = svg.append('g')
            .selectAll('line')
            .data(links)
            .enter().append('line')
                .attr('stroke-width', 1)
                .attr('stroke', '#E5E5E5')

        const nodeElements = svg.append('g')
            .selectAll('circle')
            .data(nodes)
            .enter().append('circle')
                .attr('r', 10)
                .attr('fill', getNodeColor)
        ;

        const textElements = svg.append('g')
            .selectAll('text')
            .data(nodes)
            .enter().append('text')
                .text(node => node.label)
                .attr('font-size', 15)
                .attr('dx', 15)
                .attr('dy', 4)
        ;

        simulation.nodes(nodes).on('tick', () => {
            nodeElements
                .attr('cx', function (node) { return node.x })
                .attr('cy', function (node) { return node.y })
            textElements
                .attr('x', function (node) { return node.x })
                .attr('y', function (node) { return node.y })
            linkElements
                .attr('x1', function (link) { return link.source.x })
                .attr('y1', function (link) { return link.source.y })
                .attr('x2', function (link) { return link.target.x })
                .attr('y2', function (link) { return link.target.y })
        })

        simulation.force("link").links(links)

        const dragDrop = d3.drag()
            .on('start', (event, node) => {
                node.fx = null;
                node.fy = null;
            })
            .on('drag', (event, node) => {
                simulation.alphaTarget(alpha).restart();
                node.fx = event.x;
                node.fy = event.y;
                node.x = event.x;
                node.y = event.y;
            })
            .on('end', (event, node) => {
                node.fx = null;
                node.fy = null;
                // node.fx = event.x;
                // node.fy = event.y;
            })
        
        nodeElements.call(dragDrop)

        function getNeighbors(node) {
            return links.reduce((neighbors, link) => {
                if (link.target.id === node.id) {
                    neighbors.push(link.source.id)
                } else if (link.source.id === node.id) {
                    neighbors.push(link.target.id)
                };

                return neighbors;
            }, [node.id])
        }

        function isNeighborLink(node, link) {
           return link.target.id === node.id || link.source.id === node.id
        }

        function getNodeColor(node, neighbors) {
            if(!neighbors.indexOf){
                return node.level === 1 ? 'red' : 'gray'
            };

            if (neighbors.indexOf(node.id) >= 0) {
                return node.level === 1 ? 'blue' : 'green'
            }
            return node.level === 1 ? 'red' : 'gray'
        }

        function getTextColor(node, neighbors) {
            return neighbors.indexOf(node.id) >= 0 ? 'green' : 'black'
        }

        function getLinkColor(node, link) {
            return isNeighborLink(node, link) ? 'green' : '#E5E5E5'
        }

        function selectNode(selectedNode) {
            // const neighbors = getNeighbors(selectedNode)
            const neighbors = getNeighbors(selectedNode.currentTarget.__data__)

            nodeElements
                .attr('fill', node => getNodeColor(node, neighbors)) 
            textElements
                .attr('fill', node => getTextColor(node, neighbors))
            linkElements
                .attr('stroke', link => getLinkColor(selectedNode.currentTarget, link))
        }

        nodeElements.on('click', selectNode)
    });
</script>

<svg {width} {height}>
</svg>

<style>
</style>
