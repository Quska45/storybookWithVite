import LineChart from './LineChart.svelte';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes
export default {
  title: 'Example/LineChart',
  component: LineChart,
  argTypes: {
    containerId: {
      control: { type: 'select' },
      options: ['canvasContainer1', 'canvasContainer2', 'canvasContainer3'],
    },
    config: {
      control: 'object'
    }
  },
};

// More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args
const Template = (args) => ({
  Component: LineChart,
  props: args,
  on: {
    click: args.onClick,
  },
});

// More on args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Primary = Template.bind({});
Primary.args = {
  containerId: 'canvasContainer1',
  config: {
    type: {},
    data: {
      labels: ['1','2','3','4','5','6','7','8'],
      datasets: [{
        label: '1',
        data: [-1,-2,-3,-4,-5,-6,-7,-8],
        fill: true,
        borderColor: '',
        tension: 0
      }, {
        label: '2',
        data: [10,20,30,40,50,60,70,80],
        fill: true,
        borderColor: '',
        tension: 0
      }]
    },
    options: {}
  }
};
